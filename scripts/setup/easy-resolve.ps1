# PowerShell script to clean and reinstall dependencies for the monorepo

# Function to remove all node_modules directories recursively
function Remove-NodeModules {
    Write-Host "Removing node_modules directories..."
    Get-ChildItem -Path . -Name "node_modules" -Directory -Recurse -Force | ForEach-Object {
        $path = $_
        Write-Host "Removing $_"
        Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Function to remove bun lock files
function Remove-BunLockFiles {
    Write-Host ""
    Write-Host "Cleaning up bun lock files..."
    if (Test-Path "bun.lockb") {
        Remove-Item -Path "bun.lockb" -Force -ErrorAction SilentlyContinue
        Write-Host "Removed bun.lockb"
    }
}

# Function to install dependencies
function Install-Dependencies {
    Write-Host ""
    Write-Host "Running 'bun install' from root (for monorepo workspaces)..."
    & bun install
}

# Run the functions synchronously
Remove-NodeModules
Remove-BunLockFiles
Install-Dependencies
