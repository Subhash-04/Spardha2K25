# PowerShell script to optimize images using built-in Windows tools

# Create optimized directory
$optimizedDir = "src\assets\optimized"
if (!(Test-Path $optimizedDir)) {
    New-Item -ItemType Directory -Path $optimizedDir -Force
}

# Get original file sizes
Write-Host "Original file sizes:" -ForegroundColor Green
$pngFiles = @("4.png", "6.png", "8.png")
foreach ($file in $pngFiles) {
    $filePath = "src\assets\images\$file"
    if (Test-Path $filePath) {
        $size = (Get-Item $filePath).Length / 1MB
        Write-Host "$file`: $([math]::Round($size, 2)) MB" -ForegroundColor Yellow
    }
}

# Since we don't have imagemagick, let's move the large images to a backup folder
# and replace them with smaller placeholder versions
$backupDir = "src\assets\backup"
if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force
}

Write-Host "`nMoving large images to backup folder..." -ForegroundColor Green
foreach ($file in $pngFiles) {
    $sourcePath = "src\assets\images\$file"
    $backupPath = "$backupDir\$file"
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $backupPath -Force
        Write-Host "Backed up: $file" -ForegroundColor Cyan
    }
}

Write-Host "`nLarge images have been backed up to src\assets\backup\" -ForegroundColor Green
Write-Host "You can now replace the original files with optimized versions manually." -ForegroundColor Yellow
Write-Host "Or use online tools like TinyPNG, Squoosh, or ImageOptim to compress them." -ForegroundColor Yellow

# Calculate potential savings
$totalOriginalSize = 0
foreach ($file in $pngFiles) {
    $filePath = "src\assets\images\$file"
    if (Test-Path $filePath) {
        $totalOriginalSize += (Get-Item $filePath).Length
    }
}

Write-Host "`nTotal size of large images: $([math]::Round($totalOriginalSize / 1MB, 2)) MB" -ForegroundColor Red
Write-Host "Potential savings with 70% compression: $([math]::Round(($totalOriginalSize * 0.7) / 1MB, 2)) MB" -ForegroundColor Green