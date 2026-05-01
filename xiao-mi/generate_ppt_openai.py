#!/usr/bin/env python3
"""
PPT Generator - Generate PPT slide images using OpenAI DALL-E API.

This script generates PPT slide images based on a slide plan and style template,
then creates an HTML viewer for playback.
"""

import argparse
import json
import os
import sys
import base64
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

import requests
from dotenv import load_dotenv


# =============================================================================
# Constants
# =============================================================================

DEFAULT_RESOLUTION = "2K"
DEFAULT_TEMPLATE_PATH = "templates/viewer.html"
OUTPUT_BASE_DIR = "outputs"

# OpenAI API Configuration
OPENAI_API_URL = "https://api.openai.com/v1/images/generations"


# =============================================================================
# Environment Configuration
# =============================================================================

def find_and_load_env() -> bool:
    """Find and load .env file from multiple locations."""
    current_dir = Path(__file__).parent
    env_locations = [
        current_dir / ".env",
        *[parent / ".env" for parent in current_dir.parents],
        Path.home() / ".claude" / "skills" / "ppt-generator" / ".env",
    ]

    for env_path in env_locations:
        if env_path.exists():
            load_dotenv(env_path, override=True)
            print(f"Loaded environment from: {env_path}")
            return True

    load_dotenv(override=True)
    print("Using system environment variables")
    return True


# =============================================================================
# Style Template
# =============================================================================

def load_style_template(style_path: str) -> str:
    """Load and parse style template file."""
    with open(style_path, "r", encoding="utf-8") as f:
        content = f.read()

    start_marker = "## "
    end_marker = "## "

    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker, start_idx + len(start_marker))

    if start_idx == -1 or end_idx == -1:
        print("Warning: Could not parse style template, using full content")
        return content

    return content[start_idx + len(start_marker):end_idx].strip()


# =============================================================================
# Prompt Generation
# =============================================================================

def generate_prompt(
    style_template: str,
    page_type: str,
    content_text: str,
    slide_number: int,
    total_slides: int,
) -> str:
    """Generate a prompt for a single slide."""
    prompt_parts = [style_template, "\n\n"]

    is_cover = page_type == "cover" or slide_number == 1
    is_data = page_type == "data" or slide_number == total_slides

    if is_cover:
        prompt_parts.append(
            f"""Please generate a cover page based on visual balance aesthetics.
Place a large complex 3D glass object in center, overlaid with bold text:

{content_text}

Background with extended aurora waves."""
        )
    elif is_data:
        prompt_parts.append(
            f"""Please generate a data/summary page using split-screen design.
Left side: typeset the following text.
Right side: floating large glowing 3D data visualization:

{content_text}"""
        )
    else:
        prompt_parts.append(
            f"""Please generate a content page using Bento grid layout.
Organize the following content in modular rounded rectangle containers.
Container material must be frosted glass with blur effect:

{content_text}"""
        )

    return "".join(prompt_parts)


# =============================================================================
# Image Generation with OpenAI API
# =============================================================================

def generate_slide_openai(
    prompt: str,
    slide_number: int,
    output_dir: str,
    resolution: str = DEFAULT_RESOLUTION,
) -> Optional[str]:
    """
    Generate a single PPT slide image using OpenAI DALL-E API.

    Args:
        prompt: The generation prompt.
        slide_number: Slide number for filename.
        output_dir: Output directory path.
        resolution: Image resolution (2K or 4K).

    Returns:
        Path to saved image, or None if generation failed.
    """
    print(f"Generating slide {slide_number} using OpenAI DALL-E...")

    # Determine image size based on resolution
    if resolution == "4K":
        size = "1792x1024"  # 16:9 aspect ratio for 4K
    else:
        size = "1024x576"  # 16:9 aspect ratio for 2K

    # Get API key from environment
    api_key = os.environ.get("OPENAI_API_KEY")

    if not api_key:
        print(f"  ✗ Slide {slide_number} failed: OPENAI_API_KEY not set")
        return None

    # Prepare request payload
    payload = {
        "model": "dall-e-3",
        "prompt": prompt,
        "n": 1,
        "size": size,
        "quality": "standard",
        "response_format": "b64_json",
    }

    # Prepare headers
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    try:
        # Make API call
        response = requests.post(OPENAI_API_URL, json=payload, headers=headers, timeout=60)

        if response.status_code == 200:
            result = response.json()

            # Check for image data in response
            if "data" in result and len(result["data"]) > 0:
                image_b64 = result["data"][0].get("b64_json")

                if image_b64:
                    # Decode base64 and save
                    image_data = base64.b64decode(image_b64)

                    image_path = os.path.join(
                        output_dir, "images", f"slide-{slide_number:02d}.png"
                    )

                    with open(image_path, "wb") as f:
                        f.write(image_data)

                    print(f"  ✓ Slide {slide_number} saved: {image_path}")
                    return image_path
                else:
                    print(f"  ✗ Slide {slide_number} failed: No image data in response")
                    return None
            else:
                print(f"  ✗ Slide {slide_number} failed: Unexpected response format")
                print(f"    Response: {result}")
                return None
        else:
            print(f"  ✗ Slide {slide_number} failed: HTTP {response.status_code}")
            print(f"    Error: {response.text[:300]}")
            return None

    except requests.exceptions.Timeout:
        print(f"  ✗ Slide {slide_number} failed: Request timeout")
        return None
    except requests.exceptions.RequestException as e:
        print(f"  ✗ Slide {slide_number} failed: {e}")
        return None
    except Exception as e:
        print(f"  ✗ Slide {slide_number} failed: {e}")
        return None


# =============================================================================
# Output Generation
# =============================================================================

def generate_viewer_html(
    output_dir: str,
    slide_count: int,
    template_path: str,
) -> str:
    """Generate HTML viewer for slides playback."""
    with open(template_path, "r", encoding="utf-8") as f:
        html_template = f.read()

    # Generate image list
    slides_list = [f"'images/slide-{i:02d}.png'" for i in range(1, slide_count + 1)]

    # Replace placeholder
    html_content = html_template.replace(
        "/* IMAGE_LIST_PLACEHOLDER */",
        ",\n            ".join(slides_list),
    )

    html_path = os.path.join(output_dir, "index.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"  Viewer HTML generated: {html_path}")
    return html_path


def save_prompts(output_dir: str, prompts_data: Dict[str, Any]) -> str:
    """Save all prompts to JSON file."""
    prompts_path = os.path.join(output_dir, "prompts.json")
    with open(prompts_path, "w", encoding="utf-8") as f:
        json.dump(prompts_data, f, ensure_ascii=False, indent=2)
    print(f"  Prompts saved: {prompts_path}")
    return prompts_path


# =============================================================================
# Main Entry Point
# =============================================================================

def create_argument_parser() -> argparse.ArgumentParser:
    """Create and configure argument parser."""
    parser = argparse.ArgumentParser(
        description="PPT Generator - Generate PPT images using OpenAI DALL-E API",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Example usage:
  python generate_ppt_openai.py --plan slides_plan.json --style styles/gradient-glass.md --resolution 2K

Environment variables:
  OPENAI_API_KEY: OpenAI API key (required)
""",
    )

    parser.add_argument(
        "--plan",
        required=True,
        help="Path to slides plan JSON file (generated by Skill)",
    )
    parser.add_argument(
        "--style",
        required=True,
        help="Path to style template file",
    )
    parser.add_argument(
        "--resolution",
        choices=["2K", "4K"],
        default=DEFAULT_RESOLUTION,
        help=f"Image resolution (default: {DEFAULT_RESOLUTION})",
    )
    parser.add_argument(
        "--output",
        help="Output directory path (default: outputs/TIMESTAMP)",
    )
    parser.add_argument(
        "--template",
        default=DEFAULT_TEMPLATE_PATH,
        help=f"HTML template path (default: {DEFAULT_TEMPLATE_PATH})",
    )

    return parser


def main() -> None:
    """Main entry point for PPT generation."""
    # Load environment variables
    find_and_load_env()

    # Parse arguments
    parser = create_argument_parser()
    args = parser.parse_args()

    # Load slides plan
    with open(args.plan, "r", encoding="utf-8") as f:
        slides_plan = json.load(f)

    # Load style template
    style_template = load_style_template(args.style)

    # Create output directory
    if args.output:
        output_dir = args.output
    else:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_dir = f"{OUTPUT_BASE_DIR}/{timestamp}"

    os.makedirs(os.path.join(output_dir, "images"), exist_ok=True)

    # Print configuration
    slides = slides_plan["slides"]
    total_slides = len(slides)

    print("=" * 60)
    print("PPT Generator Started (OpenAI DALL-E)")
    print("=" * 60)
    print(f"Style: {args.style}")
    print(f"Resolution: {args.resolution}")
    print(f"Slides: {total_slides}")
    print(f"Output: {output_dir}")
    print(f"API: OpenAI DALL-E 3")
    print("=" * 60)
    print()

    # Check for API key
    if not os.environ.get("OPENAI_API_KEY"):
        print("ERROR: OPENAI_API_KEY environment variable not set!")
        print("Please set: export OPENAI_API_KEY='your-api-key'")
        sys.exit(1)

    # Initialize prompts data
    prompts_data: Dict[str, Any] = {
        "metadata": {
            "title": slides_plan.get("title", "Untitled Presentation"),
            "total_slides": total_slides,
            "resolution": args.resolution,
            "style": args.style,
            "generated_at": datetime.now().isoformat(),
            "api": "openai-dalle3",
        },
        "slides": [],
    }

    # Generate each slide
    success_count = 0
    for slide_info in slides:
        slide_number = slide_info["slide_number"]
        page_type = slide_info.get("page_type", "content")
        content_text = slide_info["content"]

        # Generate prompt
        prompt = generate_prompt(
            style_template,
            page_type,
            content_text,
            slide_number,
            total_slides,
        )

        # Generate image
        image_path = generate_slide_openai(prompt, slide_number, output_dir, args.resolution)

        if image_path:
            success_count += 1

        # Record prompt data
        prompts_data["slides"].append({
            "slide_number": slide_number,
            "page_type": page_type,
            "content": content_text,
            "prompt": prompt,
            "image_path": image_path,
        })

        print()

    # Save prompts
    save_prompts(output_dir, prompts_data)

    # Generate viewer HTML
    generate_viewer_html(output_dir, total_slides, args.template)

    # Print completion summary
    print()
    print("=" * 60)
    print("Generation Complete!")
    print("=" * 60)
    print(f"Output directory: {output_dir}")
    print(f"Success: {success_count}/{total_slides} slides")
    print(f"Viewer HTML: {os.path.join(output_dir, 'index.html')}")
    print()
    print("Open viewer in browser:")
    print(f"  open {os.path.join(output_dir, 'index.html')}")
    print()


if __name__ == "__main__":
    main()
