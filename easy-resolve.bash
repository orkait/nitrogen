#!/bin/bash

# Function to remove all node_modules directories recursively
function remove_node_modules() {
    # Find all directories named "node_modules" and remove them
    find . -name "node_modules" -type d -prune -exec echo "Removing {}" \; -exec rm -rf {} +
}

# Run the functions synchronously
echo "Removing node_modules directories..."
remove_node_modules

echo ""
echo "Cleaning up bun lock files..."
rm -f bun.lockb

echo ""
echo "Running 'bun install' from root (for monorepo workspaces)..."
bun install
