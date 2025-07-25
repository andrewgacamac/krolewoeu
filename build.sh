#!/bin/bash
# Simple build script for Digital Ocean

# Create public directory
mkdir -p public

# Copy all static files to public directory
cp -r index.html css js assets public/

echo "Build complete - files copied to public directory"