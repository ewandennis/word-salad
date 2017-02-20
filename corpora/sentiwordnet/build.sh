#!/bin/sh

echo "Downloading SentiWordNet and building adjective noun database..."
curl -s http://sentiwordnet.isti.cnr.it/SentiWordNet_3.0.0.tgz | tar xO > SentiWordNet.txt
node build.js SentiWordNet.txt db.json
rm SentiWordNet.txt
echo "Done"

