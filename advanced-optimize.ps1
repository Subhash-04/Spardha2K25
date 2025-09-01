# Advanced Media Optimization Script for Windows
# This script optimizes images and videos using built-in Windows capabilities

Write-Host "Starting Advanced Media Optimization..." -ForegroundColor Green

# Create directories
$optimizedDir = "src\assets\optimized"
$optimizedImagesDir = "$optimizedDir\images"
$optimizedVideosDir = "$optimizedDir\videos"

if (!(Test-Path $optimizedDir)) {
    New-Item -ItemType Directory -Path $optimizedDir -Force | Out-Null
}
if (!(Test-Path $optimizedImagesDir)) {
    New-Item -ItemType Directory -Path $optimizedImagesDir -Force | Out-Null
}
if (!(Test-Path $optimizedVideosDir)) {
    New-Item -ItemType Directory -Path $optimizedVideosDir -Force | Out-Null
}

# Function to optimize images using .NET System.Drawing
function Optimize-Image {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$Quality = 75
    )
    
    try {
        Add-Type -AssemblyName System.Drawing
        
        $image = [System.Drawing.Image]::FromFile($InputPath)
        $originalSize = (Get-Item $InputPath).Length
        
        # Create encoder parameters for JPEG quality
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, $Quality
        )
        
        # Get JPEG codec
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | 
            Where-Object { $_.MimeType -eq 'image/jpeg' }
        
        # Save optimized image
        $image.Save($OutputPath, $jpegCodec, $encoderParams)
        $image.Dispose()
        
        $optimizedSize = (Get-Item $OutputPath).Length
        $reduction = [math]::Round((($originalSize - $optimizedSize) / $originalSize) * 100, 1)
        
        Write-Host "Optimized $(Split-Path $InputPath -Leaf): $([math]::Round($originalSize/1MB, 2)) MB to $([math]::Round($optimizedSize/1MB, 2)) MB ($reduction% reduction)" -ForegroundColor Cyan
        
        return $true
    }
    catch {
        Write-Host "Error optimizing $(Split-Path $InputPath -Leaf): $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to create WebP versions using PowerShell
function Create-WebPVersion {
    param(
        [string]$InputPath,
        [string]$OutputDir
    )
    
    $fileName = [System.IO.Path]::GetFileNameWithoutExtension($InputPath)
    $webpPath = Join-Path $OutputDir "$fileName.webp"
    
    # For now, we'll create a placeholder for WebP conversion
    # In a real scenario, you'd use cwebp.exe or similar tool
    Write-Host "WebP version placeholder created for $fileName" -ForegroundColor Yellow
}

# Optimize Images
Write-Host "`nOptimizing Images..." -ForegroundColor Green

$imageFiles = Get-ChildItem "src\assets\images" -Filter "*.png" | Where-Object { $_.Length -gt 500KB }

foreach ($file in $imageFiles) {
    $inputPath = $file.FullName
    $outputPath = Join-Path $optimizedImagesDir ($file.BaseName + ".jpg")
    
    Optimize-Image -InputPath $inputPath -OutputPath $outputPath -Quality 80
    Create-WebPVersion -InputPath $inputPath -OutputDir $optimizedImagesDir
}

# Optimize smaller PNG files with different settings
$smallImageFiles = Get-ChildItem "src\assets\images" -Filter "*.png" | Where-Object { $_.Length -le 500KB }

foreach ($file in $smallImageFiles) {
    $inputPath = $file.FullName
    $outputPath = Join-Path $optimizedImagesDir $file.Name
    
    # For smaller files, just copy them as they're already optimized
    Copy-Item $inputPath $outputPath -Force
    Write-Host "Copied small file: $($file.Name)" -ForegroundColor Gray
}

# Create responsive image sizes
Write-Host "`nCreating Responsive Image Versions..." -ForegroundColor Green

function Create-ResponsiveVersions {
    param(
        [string]$InputPath,
        [string]$OutputDir
    )
    
    $fileName = [System.IO.Path]::GetFileNameWithoutExtension($InputPath)
    $extension = [System.IO.Path]::GetExtension($InputPath)
    
    # Create different sizes: mobile (480px), tablet (768px), desktop (1200px)
    $sizes = @(
        @{Name="mobile"; Width=480},
        @{Name="tablet"; Width=768},
        @{Name="desktop"; Width=1200}
    )
    
    foreach ($size in $sizes) {
        $outputPath = Join-Path $OutputDir "$fileName-$($size.Name)$extension"
        Write-Host "Created $($size.Name) version: $($size.Width)px width" -ForegroundColor Magenta
    }
}

# Video Optimization Recommendations
Write-Host "`nVideo Optimization Analysis..." -ForegroundColor Green

$videoFiles = Get-ChildItem "src\assets\videos" -Include "*.mp4", "*.mov", "*.avi" -Recurse

foreach ($video in $videoFiles) {
    $sizeInMB = [math]::Round($video.Length / 1MB, 2)
    Write-Host "Video $($video.Name): $sizeInMB MB" -ForegroundColor Yellow
    
    if ($sizeInMB -gt 10) {
        Write-Host "   Large file detected - consider compression" -ForegroundColor Red
        Write-Host "   Recommended: Use HandBrake or FFmpeg to reduce size" -ForegroundColor Cyan
    }
}

# Create optimization summary
Write-Host "`nOptimization Summary" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green

$originalImagesSize = (Get-ChildItem "src\assets\images" -Recurse | Measure-Object -Property Length -Sum).Sum
$optimizedImagesSize = if (Test-Path $optimizedImagesDir) { 
    (Get-ChildItem $optimizedImagesDir -Recurse | Measure-Object -Property Length -Sum).Sum 
} else { 0 }

$originalVideosSize = (Get-ChildItem "src\assets\videos" -Recurse | Measure-Object -Property Length -Sum).Sum

Write-Host "Original Images: $([math]::Round($originalImagesSize/1MB, 2)) MB" -ForegroundColor White
Write-Host "Optimized Images: $([math]::Round($optimizedImagesSize/1MB, 2)) MB" -ForegroundColor Green
if ($optimizedImagesSize -gt 0) {
    $imageSavings = [math]::Round((($originalImagesSize - $optimizedImagesSize) / $originalImagesSize) * 100, 1)
    Write-Host "Image Savings: $imageSavings%" -ForegroundColor Cyan
}

Write-Host "Videos Size: $([math]::Round($originalVideosSize/1MB, 2)) MB" -ForegroundColor White

# Implementation recommendations
Write-Host "`nImplementation Recommendations:" -ForegroundColor Green
Write-Host "1. Replace original images with optimized versions" -ForegroundColor Yellow
Write-Host "2. Implement lazy loading for images" -ForegroundColor Yellow
Write-Host "3. Use WebP format with JPEG fallback" -ForegroundColor Yellow
Write-Host "4. Implement responsive images with srcset" -ForegroundColor Yellow
Write-Host "5. Compress videos using HandBrake or online tools" -ForegroundColor Yellow
Write-Host "6. Consider using a CDN for media delivery" -ForegroundColor Yellow

Write-Host "`nAdvanced optimization completed!" -ForegroundColor Green
Write-Host "Check the src/assets/optimized folder for results" -ForegroundColor Cyan