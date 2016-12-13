/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function cropDataURL(dataURL,x,y,width,height){
    var tempCanvas = document.createElement('canvas');
    var cropCanvas = document.createElement('canvas');

    var image = new Image();
    image.src = dataURL;

    tempCanvas.width = image.width;
    tempCanvas.height = image.height;
    var tcx = tempCanvas.getContext('2d');

    cropCanvas.width = width;
    cropCanvas.height = height;
    var ccx = cropCanvas.getContext('2d');

    tcx.drawImage(image,0,0,tempCanvas.width,tempCanvas.height);

    var uncroppedData = tcx.getImageData(x,y,width,height);

    ccx.putImageData(uncroppedData,0,0);

    return cropCanvas.toDataURL();
};
