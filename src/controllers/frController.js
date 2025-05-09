import path from 'path';
import { processCSV, processExcel } from '../utils/rateFileUpload';

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    // Process the file based on extension
    let data = [];

    if (fileExt === '.csv') {
      data = await processCSV(filePath);
    } else if (fileExt === '.xlsx' || fileExt === '.xls') {
      data = processExcel(filePath);
    }

    // Return success response with processed data
    res.status(200).json({
      success: true,
      message: 'File uploaded and processed successfully',
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      data: data.slice(0, 10), // Send first 10 rows as preview
      totalRows: data.length,
    });
  } catch (error) {
    console.error('Error processing file:', error);
    next(error);
  }
};
