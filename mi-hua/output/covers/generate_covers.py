#!/usr/bin/env python3
"""
AI Intelligence Weekly Cover Generator
Neural Luminescence Design Philosophy
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import random
import os

# Set random seed for reproducibility
random.seed(42)

# Canvas dimensions (16:9)
WIDTH = 1920
HEIGHT = 1080

def create_gradient_background(draw, width, height, color1, color2, color3=None):
    """Create a vertical gradient background"""
    for y in range(height):
        if color3:
            # Three-color gradient
            if y < height / 2:
                ratio = y / (height / 2)
                r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
                g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
                b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            else:
                ratio = (y - height / 2) / (height / 2)
                r = int(color2[0] * (1 - ratio) + color3[0] * ratio)
                g = int(color2[1] * (1 - ratio) + color3[1] * ratio)
                b = int(color2[2] * (1 - ratio) + color3[2] * ratio)
        else:
            # Two-color gradient
            ratio = y / height
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def draw_grid(draw, width, height, color, spacing=60, alpha=0.15):
    """Draw subtle grid pattern"""
    r, g, b = hex_to_rgb(color)
    grid_color = (r, g, b, int(255 * alpha))
    
    for i in range(0, width, spacing):
        draw.line([(i, 0), (i, height)], fill=grid_color[:3])
    for i in range(0, height, spacing):
        draw.line([(0, i), (width, i)], fill=grid_color[:3])

def draw_neural_network(draw, nodes, accent_color, base_color):
    """Draw neural network connections and nodes"""
    ar, ag, ab = hex_to_rgb(accent_color)
    br, bg, bb = hex_to_rgb(base_color)
    
    # Draw connections
    for i, node1 in enumerate(nodes):
        for j, node2 in enumerate(nodes):
            if i < j:
                dist = math.hypot(node1['x'] - node2['x'], node1['y'] - node2['y'])
                if dist < 200:
                    alpha = 1 - dist / 200
                    line_color = (
                        int(ar * alpha * 0.6 + br * (1 - alpha * 0.6)),
                        int(ag * alpha * 0.6 + bg * (1 - alpha * 0.6)),
                        int(ab * alpha * 0.6 + bb * (1 - alpha * 0.6))
                    )
                    draw.line([(node1['x'], node1['y']), (node2['x'], node2['y'])], 
                             fill=line_color, width=1)
    
    # Draw nodes
    for node in nodes:
        # Glow effect
        for r in range(int(node['size'] * 4), 0, -2):
            alpha = 0.3 * (1 - r / (node['size'] * 4))
            glow_color = (int(ar * alpha + br * (1 - alpha)),
                         int(ag * alpha + bg * (1 - alpha)),
                         int(ab * alpha + bb * (1 - alpha)))
            draw.ellipse([node['x'] - r, node['y'] - r, 
                         node['x'] + r, node['y'] + r], fill=glow_color)
        
        # Core
        draw.ellipse([node['x'] - node['size'], node['y'] - node['size'],
                     node['x'] + node['size'], node['y'] + node['size']], 
                     fill=(ar, ag, ab))

def draw_data_streams(draw, width, height, color, count=5):
    """Draw vertical data flow streams"""
    r, g, b = hex_to_rgb(color)
    spacing = (width - 600) // (count - 1) if count > 1 else width // 2
    
    for i in range(count):
        x = 300 + i * spacing
        for y in range(0, height, 2):
            alpha = math.sin(y / height * math.pi) * 0.15
            stream_color = (int(r), int(g), int(b))
            draw.line([(x - 20, y), (x + 20, y)], fill=stream_color, width=1)

def draw_corner_accents(draw, width, height, color, size=60):
    """Draw corner accent lines"""
    r, g, b = hex_to_rgb(color)
    margin = 40
    
    # Top left
    draw.line([(margin, margin + size), (margin, margin)], fill=(r, g, b), width=3)
    draw.line([(margin, margin), (margin + size, margin)], fill=(r, g, b), width=3)
    
    # Top right
    draw.line([(width - margin - size, margin), (width - margin, margin)], fill=(r, g, b), width=3)
    draw.line([(width - margin, margin), (width - margin, margin + size)], fill=(r, g, b), width=3)
    
    # Bottom left
    draw.line([(margin, height - margin - size), (margin, height - margin)], fill=(r, g, b), width=3)
    draw.line([(margin, height - margin), (margin + size, height - margin)], fill=(r, g, b), width=3)
    
    # Bottom right
    draw.line([(width - margin - size, height - margin), (width - margin, height - margin)], fill=(r, g, b), width=3)
    draw.line([(width - margin, height - margin), (width - margin, height - margin - size)], fill=(r, g, b), width=3)

def draw_border(draw, width, height, color, line_width=2):
    """Draw border frame"""
    r, g, b = hex_to_rgb(color)
    margin = 40
    draw.rectangle([margin, margin, width - margin, height - margin], 
                   outline=(r, g, b), width=line_width)

def draw_geometric_elements(draw, width, height, color, count=8):
    """Draw geometric warning elements"""
    r, g, b = hex_to_rgb(color)
    for i in range(count):
        x = 200 + i * 220
        y = 150 + (i % 2) * 600
        size = 80
        # Draw triangle
        points = [(x, y - size), (x + size * 0.866, y + size * 0.5), (x - size * 0.866, y + size * 0.5)]
        draw.polygon(points, outline=(r, g, b))

def generate_nodes(count=45):
    """Generate random node positions"""
    nodes = []
    for _ in range(count):
        nodes.append({
            'x': 100 + random.random() * (WIDTH - 200),
            'y': 100 + random.random() * (HEIGHT - 200),
            'size': 3 + random.random() * 5,
            'pulse': random.random() * math.pi * 2
        })
    return nodes

def create_cover_1_controversy():
    """Cover 1: Crimson Warning - 争议监管类"""
    img = Image.new('RGB', (WIDTH, HEIGHT), '#0a0e27')
    draw = ImageDraw.Draw(img)
    
    # Background gradient
    create_gradient_background(draw, WIDTH, HEIGHT, (10, 14, 39), (13, 20, 51), (10, 14, 39))
    
    # Grid
    draw_grid(draw, WIDTH, HEIGHT, '#1e3c78', 60, 0.15)
    
    # Neural network
    nodes = generate_nodes()
    draw_neural_network(draw, nodes, '#ff3355', '#0a0e27')
    
    # Data streams
    draw_data_streams(draw, WIDTH, HEIGHT, '#dc3232', 5)
    
    # Geometric elements
    draw_geometric_elements(draw, WIDTH, HEIGHT, '#dc3232', 8)
    
    # Border
    draw_border(draw, WIDTH, HEIGHT, '#dc3232', 2)
    
    # Corner accents
    draw_corner_accents(draw, WIDTH, HEIGHT, '#ff3355', 60)
    
    # Labels
    try:
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
    except:
        font_small = ImageFont.load_default()
    
    draw.text((60, HEIGHT - 60), 'CONTROVERSY & REGULATION', fill=(255, 255, 255, 153), font=font_small)
    draw.text((WIDTH - 60, HEIGHT - 60), 'AI INTELLIGENCE WEEKLY', fill=(255, 255, 255, 153), font=font_small, anchor='rt')
    
    return img

def create_cover_2_breakthrough():
    """Cover 2: Violet Innovation - 技术突破类"""
    img = Image.new('RGB', (WIDTH, HEIGHT), '#0a0e27')
    draw = ImageDraw.Draw(img)
    
    # Purple-tinted background
    create_gradient_background(draw, WIDTH, HEIGHT, (15, 10, 40), (30, 15, 60), (15, 10, 40))
    
    # Grid with purple tint
    draw_grid(draw, WIDTH, HEIGHT, '#4a3c78', 60, 0.15)
    
    # Neural network with violet accents
    nodes = generate_nodes()
    draw_neural_network(draw, nodes, '#b84dff', '#1a0e35')
    
    # Hexagonal pattern overlay
    for i in range(12):
        x = 150 + (i % 4) * 450
        y = 180 + (i // 4) * 350
        size = 100
        points = []
        for j in range(6):
            angle = j * math.pi / 3
            points.append((x + size * math.cos(angle), y + size * math.sin(angle)))
        draw.polygon(points, outline=(184, 77, 255, 50))
    
    # Border
    draw_border(draw, WIDTH, HEIGHT, '#b84dff', 2)
    
    # Corner accents
    draw_corner_accents(draw, WIDTH, HEIGHT, '#b84dff', 60)
    
    # Labels
    try:
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
    except:
        font_small = ImageFont.load_default()
    
    draw.text((60, HEIGHT - 60), 'TECHNICAL BREAKTHROUGH', fill=(255, 255, 255, 153), font=font_small)
    draw.text((WIDTH - 60, HEIGHT - 60), 'AI INTELLIGENCE WEEKLY', fill=(255, 255, 255, 153), font=font_small, anchor='rt')
    
    return img

def create_cover_3_product():
    """Cover 3: Azure Future - 产品发布类"""
    img = Image.new('RGB', (WIDTH, HEIGHT), '#0a0e27')
    draw = ImageDraw.Draw(img)
    
    # Blue gradient background
    create_gradient_background(draw, WIDTH, HEIGHT, (8, 20, 50), (15, 40, 90), (8, 20, 50))
    
    # Grid
    draw_grid(draw, WIDTH, HEIGHT, '#2e5c9e', 60, 0.15)
    
    # Neural network with cyan accents
    nodes = generate_nodes()
    draw_neural_network(draw, nodes, '#00d4ff', '#0a1a3a')
    
    # Circular elements suggesting products
    for i in range(6):
        x = 250 + (i % 3) * 550
        y = 250 + (i // 3) * 500
        radius = 120
        draw.ellipse([x - radius, y - radius, x + radius, y + radius], 
                    outline=(0, 212, 255, 80), width=2)
        draw.ellipse([x - radius + 20, y - radius + 20, x + radius - 20, y + radius - 20], 
                    outline=(0, 212, 255, 40), width=1)
    
    # Border
    draw_border(draw, WIDTH, HEIGHT, '#00d4ff', 2)
    
    # Corner accents
    draw_corner_accents(draw, WIDTH, HEIGHT, '#00d4ff', 60)
    
    # Labels
    try:
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
    except:
        font_small = ImageFont.load_default()
    
    draw.text((60, HEIGHT - 60), 'PRODUCT LAUNCH', fill=(255, 255, 255, 153), font=font_small)
    draw.text((WIDTH - 60, HEIGHT - 60), 'AI INTELLIGENCE WEEKLY', fill=(255, 255, 255, 153), font=font_small, anchor='rt')
    
    return img

def create_cover_4_enterprise():
    """Cover 4: Corporate Graphite - 企业动态类"""
    img = Image.new('RGB', (WIDTH, HEIGHT), '#0a0e27')
    draw = ImageDraw.Draw(img)
    
    # Professional gray-blue gradient
    create_gradient_background(draw, WIDTH, HEIGHT, (20, 25, 35), (35, 42, 55), (20, 25, 35))
    
    # Subtle grid
    draw_grid(draw, WIDTH, HEIGHT, '#4a5568', 60, 0.12)
    
    # Neural network with silver accents
    nodes = generate_nodes()
    draw_neural_network(draw, nodes, '#a0aec0', '#2d3748')
    
    # Rectangular blocks suggesting corporate structure
    for i in range(8):
        x = 150 + (i % 4) * 480
        y = 200 + (i // 4) * 500
        width = 200
        height = 120
        draw.rectangle([x, y, x + width, y + height], outline=(160, 174, 192, 60), width=2)
        # Inner detail
        draw.rectangle([x + 10, y + 10, x + width - 10, y + height - 10], outline=(160, 174, 192, 30), width=1)
    
    # Border
    draw_border(draw, WIDTH, HEIGHT, '#718096', 2)
    
    # Corner accents
    draw_corner_accents(draw, WIDTH, HEIGHT, '#a0aec0', 60)
    
    # Labels
    try:
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
    except:
        font_small = ImageFont.load_default()
    
    draw.text((60, HEIGHT - 60), 'ENTERPRISE DYNAMICS', fill=(255, 255, 255, 153), font=font_small)
    draw.text((WIDTH - 60, HEIGHT - 60), 'AI INTELLIGENCE WEEKLY', fill=(255, 255, 255, 153), font=font_small, anchor='rt')
    
    return img

def create_cover_5_investment():
    """Cover 5: Golden Capital - 投融资类"""
    img = Image.new('RGB', (WIDTH, HEIGHT), '#0a0e27')
    draw = ImageDraw.Draw(img)
    
    # Dark blue with gold undertones
    create_gradient_background(draw, WIDTH, HEIGHT, (15, 15, 30), (30, 25, 45), (15, 15, 30))
    
    # Grid with gold tint
    draw_grid(draw, WIDTH, HEIGHT, '#5c4d3c', 60, 0.15)
    
    # Neural network with gold accents
    nodes = generate_nodes()
    draw_neural_network(draw, nodes, '#ffd700', '#1a1525')
    
    # Diamond shapes suggesting value/growth
    for i in range(10):
        x = 180 + (i % 5) * 380
        y = 200 + (i // 5) * 550
        size = 70
        points = [(x, y - size), (x + size, y), (x, y + size), (x - size, y)]
        draw.polygon(points, outline=(255, 215, 0, 60))
        # Inner diamond
        inner_size = size * 0.6
        inner_points = [(x, y - inner_size), (x + inner_size, y), (x, y + inner_size), (x - inner_size, y)]
        draw.polygon(inner_points, outline=(255, 215, 0, 30))
    
    # Border
    draw_border(draw, WIDTH, HEIGHT, '#d4af37', 2)
    
    # Corner accents
    draw_corner_accents(draw, WIDTH, HEIGHT, '#ffd700', 60)
    
    # Labels
    try:
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
    except:
        font_small = ImageFont.load_default()
    
    draw.text((60, HEIGHT - 60), 'INVESTMENT & FINANCE', fill=(255, 255, 255, 153), font=font_small)
    draw.text((WIDTH - 60, HEIGHT - 60), 'AI INTELLIGENCE WEEKLY', fill=(255, 255, 255, 153), font=font_small, anchor='rt')
    
    return img

def main():
    output_dir = '/Volumes/My house/Users/Sheldon/clawd/mi-army/mi-hua/output/covers'
    os.makedirs(output_dir, exist_ok=True)
    
    covers = [
        ('cover_01_controversy.png', create_cover_1_controversy),
        ('cover_02_breakthrough.png', create_cover_2_breakthrough),
        ('cover_03_product.png', create_cover_3_product),
        ('cover_04_enterprise.png', create_cover_4_enterprise),
        ('cover_05_investment.png', create_cover_5_investment),
    ]
    
    generated_paths = []
    for filename, create_func in covers:
        print(f"Generating {filename}...")
        img = create_func()
        filepath = os.path.join(output_dir, filename)
        img.save(filepath, 'PNG', quality=95)
        generated_paths.append(filepath)
        print(f"  Saved: {filepath}")
    
    print("\nAll covers generated successfully!")
    return generated_paths

if __name__ == '__main__':
    paths = main()
    for p in paths:
        print(p)
