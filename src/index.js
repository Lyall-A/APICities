const fs = require('fs');
const path = require('path');
const express = require('express');

const { config } = require('./globals');

const app = express();

app.get('/assets/{*assetPath}', (req, res) => {
    if (!req.params.assetPath) return res.status(404).send();

    const assetsPath = path.resolve(config.assetsPath);
    const filePath = path.resolve(assetsPath, req.params.assetPath.join(path.sep));

    if (!filePath.startsWith(assetsPath) || !fs.existsSync(filePath)) return res.status(404).send();
    
    res.sendFile(filePath);
});

app.listen(config.port, config.hostname || '0.0.0.0', () => console.log(`Listening at ${config.hostname || ''}:${config.port}`));