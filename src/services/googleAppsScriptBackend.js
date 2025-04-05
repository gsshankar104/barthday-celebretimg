/**
 * Google Apps Script Backend Code
 * 
 * This file contains the code that should be deployed as a Google Apps Script Web App.
 * Copy this code to your Google Apps Script project.
 */

/**
 * Global variables
 */
// Folder ID where celebration data will be stored
const FOLDER_ID = 'YOUR_GOOGLE_DRIVE_FOLDER_ID';

/**
 * Handle HTTP GET and POST requests
 */
function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

/**
 * Main request handler
 */
function handleRequest(e) {
  try {
    const action = e.parameter.action;
    
    switch (action) {
      case 'submit':
        return submitCelebration(e);
      case 'get':
        return getCelebration(e);
      default:
        return createResponse({ error: 'Invalid action' }, 400);
    }
  } catch (error) {
    return createResponse({ error: error.message }, 500);
  }
}

/**
 * Submit celebration data
 */
function submitCelebration(e) {
  // Get form data
  const formData = e.parameter;
  const fileBlob = e.parameter.photo;
  
  // Generate unique ID
  const uniqueId = Utilities.getUuid();
  
  // Create folder for this celebration
  const folder = DriveApp.getFolderById(FOLDER_ID)
    .createFolder(uniqueId);
  
  // Save photo
  let photoUrl = '';
  if (fileBlob) {
    const photoFile = folder.createFile(fileBlob);
    photoFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    photoUrl = photoFile.getUrl();
  }
  
  // Save data as JSON file
  const data = {
    id: uniqueId,
    name: formData.name,
    date: formData.date,
    message: formData.message,
    photoUrl: photoUrl,
    createdAt: new Date().toISOString()
  };
  
  const jsonFile = folder.createFile('data.json', JSON.stringify(data), MimeType.JSON);
  
  // Generate shareable link
  const shareableLink = ScriptApp.getService().getUrl() + '?action=view&id=' + uniqueId;
  
  return createResponse({
    success: true,
    id: uniqueId,
    shareableLink: shareableLink
  });
}

/**
 * Get celebration data by ID
 */
function getCelebration(e) {
  const id = e.parameter.id;
  
  if (!id) {
    return createResponse({ error: 'ID is required' }, 400);
  }
  
  // Find folder by name (ID)
  const folders = DriveApp.getFolderById(FOLDER_ID).getFoldersByName(id);
  
  if (!folders.hasNext()) {
    return createResponse({ error: 'Celebration not found' }, 404);
  }
  
  const folder = folders.next();
  
  // Get data.json file
  const files = folder.getFilesByName('data.json');
  
  if (!files.hasNext()) {
    return createResponse({ error: 'Celebration data not found' }, 404);
  }
  
  const file = files.next();
  const content = file.getBlob().getDataAsString();
  const data = JSON.parse(content);
  
  return createResponse(data);
}

/**
 * Create JSON response
 */
function createResponse(data, code = 200) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
