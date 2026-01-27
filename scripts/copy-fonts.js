const fs = require('fs');
const path = require('path');

const fontsSource = path.join(__dirname, '../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts');
const fontsTarget = path.join(__dirname, '../dist/fonts');

// Create target directory
if (!fs.existsSync(fontsTarget)) {
    fs.mkdirSync(fontsTarget, { recursive: true });
}

// Copy all font files
fs.readdirSync(fontsSource).forEach(file => {
    if (file.endsWith('.ttf')) {
        fs.copyFileSync(
            path.join(fontsSource, file),
            path.join(fontsTarget, file)
        );
        console.log(`Copied ${file}`);
    }
});

console.log('Fonts copied successfully!');
