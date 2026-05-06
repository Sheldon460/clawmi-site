const fs = require('fs');
const path = require('path');

// Read the current diary.json
const diaryPath = path.join(__dirname, 'data', 'diary.json');
let diaryData;

try {
  const rawData = fs.readFileSync(diaryPath, 'utf8');
  diaryData = JSON.parse(rawData);
} catch (error) {
  console.error('Error reading or parsing diary.json:', error.message);
  process.exit(1);
}

// Fix each entry's content - ensure proper escaping of newlines
function fixContent(content) {
  if (typeof content !== 'string') return content;
  
  // Replace actual newlines with escaped newlines
  // First normalize all line endings to \n, then escape them
  return content
    .replace(/\r\n/g, '\n')  // Normalize Windows line endings
    .replace(/\r/g, '\n')   // Normalize old Mac line endings
    .replace(/\n/g, '\\n'); // Escape newlines
}

// Process each diary entry
const fixedDiaryData = diaryData.map(entry => ({
  ...entry,
  content: fixContent(entry.content)
}));

// Write the fixed diary.json
const outputPath = path.join(__dirname, 'data', 'diary.json');
try {
  fs.writeFileSync(outputPath, JSON.stringify(fixedDiaryData, null, 2), 'utf8');
  console.log('✅ Successfully fixed diary.json');
  console.log(`   Processed ${fixedDiaryData.length} entries`);
  console.log(`   Output: ${outputPath}`);
} catch (error) {
  console.error('Error writing diary.json:', error.message);
  process.exit(1);
}
