# 图片格式转换网站 - 产品需求文档

## 项目简介

通过纯前端技术实现的图片格式转换工具，用户可以在本地浏览器完成图片的格式转换，不涉及后端存储或网络请求。用户上传图片，选择目标格式后直接在浏览器中处理，转换完成后支持单张下载或批量打包下载。

---

## 功能需求

### 1. 首页

**页面描述：**  
首页展示项目的主要功能和操作步骤，并提供进入转换功能页面的入口。

**功能要点：**

- 简要介绍功能和支持的图片格式（如“支持 PNG、JPEG、WEBP、BMP 等格式之间的转换”）。
- 进入图片上传与转换功能页面的按钮。

---

### 2. 图片上传与转换页面

**页面布局：**  

- **左侧区域：** 已上传图片的缩略图列表，每个缩略图下方有操作按钮（如删除、下载）。  
- **右侧区域：** 提供功能操作，包括上传图片按钮、格式选择菜单、批量转换与下载按钮。

**功能模块：**

#### 2.1 图片上传

- **支持格式：** PNG、JPEG、WEBP、BMP 等常见图片格式。
- **批量上传：** 支持一次性选择多张图片上传（支持拖拽上传）。
- **文件大小限制：** 单张图片最大 10 MB。
- **缩略图展示：** 上传成功的图片以缩略图形式展示，列表可滚动，支持删除操作。

#### 2.2 格式选择

- 提供一个下拉菜单，列出支持的目标格式：
  - PNG
  - JPEG
  - WEBP
  - BMP
- 用户可以选择一个统一的目标格式。

#### 2.3 图片格式转换

- 利用浏览器的 Web API（如 `<canvas>` 或 WebAssembly）进行图片格式转换。
- 转换过程完全在用户浏览器中完成，不依赖网络或后端服务器。
- 转换完成后，支持实时预览和下载。

#### 2.4 下载功能

- **单张下载：** 在每张缩略图下方提供下载按钮。
- **批量下载：** 将所有转换完成的图片打包为 ZIP 文件，并提供下载。

#### 2.5 错误处理

- 上传失败或格式不支持时，显示友好提示（如“格式不支持”或“文件过大”）。
- 转换失败时，提供明确错误信息（如“转换超时”或“目标格式不支持”）。

---

## 非功能性需求

### 1. 性能

- 确保页面加载时间低于 3 秒。
- 每张图片转换时间小于 2 秒（基于常见图片大小）。

### 2. 兼容性

- 支持现代主流浏览器（Chrome、Firefox、Edge、Safari）。
- 响应式设计，适配 PC 和移动端。

### 3. 安全性

- 图片处理和转换完全在用户浏览器中进行，不涉及数据传输或存储，确保用户隐私。

---

## 实现方案

### 1. 技术栈

- **前端框架：** React + [shadcn/ui](https://shadcn.dev/)
- **图片处理库：** 使用以下工具完成图片预览、格式转换和下载功能：
  - **Canvas API:** 利用 HTML5 `<canvas>` 元素完成图片的格式转换。
  - **File API:** 处理文件上传和本地下载。
  - **JSZip:** 用于打包多张图片生成 ZIP 文件。
  - **Browser FileReader API:** 实现图片上传预览。

---

## 具体功能设计

### 图片上传

1. **拖拽上传：**  
   使用 HTML 的 `<input type="file" multiple />` 和 `DragEvent` 实现拖拽上传。
2. **本地预览：**  
   利用 `FileReader` 将上传的图片文件生成缩略图并显示。

### 图片格式转换

1. **Canvas 绘制：**  

   - 将图片绘制到 `<canvas>`，再使用 `toDataURL` 生成目标格式的图片。

   - 示例代码：

     ```javascript
     const convertImage = (file, format) => {
       const img = new Image();
       const canvas = document.createElement('canvas');
       const ctx = canvas.getContext('2d');
     
       img.onload = () => {
         canvas.width = img.width;
         canvas.height = img.height;
         ctx.drawImage(img, 0, 0);
         const dataURL = canvas.toDataURL(`image/${format}`);
         downloadImage(dataURL, `converted.${format}`);
       };
       img.src = URL.createObjectURL(file);
     };
     ```

### 下载功能

1. **单张下载：**  
   利用 `<a>` 标签的 `download` 属性实现：

   ```javascript
   const downloadImage = (dataURL, filename) => {
     const link = document.createElement('a');
     link.href = dataURL;
     link.download = filename;
     link.click();
   };
   ```

2. **批量 ZIP 下载：**  
   使用 JSZip 将所有图片打包：

   ```javascript
   const zip = new JSZip();
   files.forEach((file, index) => {
     zip.file(`image_${index + 1}.png`, file.split(',')[1], { base64: true });
   });
   zip.generateAsync({ type: 'blob' }).then((content) => {
     const link = document.createElement('a');
     link.href = URL.createObjectURL(content);
     link.download = 'images.zip';
     link.click();
   });
   ```

---


## 成功标准

- 用户可在浏览器中完成图片格式转换并下载。
- 操作流畅，页面性能良好。
- 转换效果准确，支持常见图片格式。