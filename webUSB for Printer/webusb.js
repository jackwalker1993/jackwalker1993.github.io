document.addEventListener('DOMContentLoaded', event => {
  let button = document.getElementById('connect')
  let device22;
  button.addEventListener('click', event => {
    navigator.usb.requestDevice({ filters: [{ vendorId: 0x046D  },{ vendorId: 0x0000  },{ vendorId: 0x0CA6  },{ vendorId: 0x072F  }] })
    .then(device => {
      console.log("device.productName");  
      device22 = device
      device22.open();
      device22.claimInterface(0);
      console.log(device.productName);
      console.log(device.manufacturerName); 
      console.log(device); 
    })
    .catch(error => { console.error(error); });
    
  })
})



// document.addEventListener('DOMContentLoaded', event => {
//   let button = document.getElementById('connectserial')
//   button.addEventListener('click', async() => {
//     if ("serial" in navigator) {
//       console.log('supported');
//     } else {
//       console.log('Not supported');
//     }

//     try {
//       const port = await navigator.serial.requestPort();
//       console.log(port);
//     } catch (e) {
//       // The prompt has been dismissed without selecting a device.
//     }
//   })
// })


document.addEventListener('DOMContentLoaded', event => {
  let button = document.getElementById('connectserial')
  button.addEventListener('click', async() => {
    
let deviceFilter = { vendorId: 0x0CA6, productId: 0xA050 };
let requestParams  = { filters: [deviceFilter] };
let outputReportId = 0x01;
let outputReport = new Uint8Array([42]);

function handleConnectedDevice(e) {
    console.log('Device connected: ' + e.device.productName);
}

function handleDisconnectedDevice(e) {
    console.log('Device disconnected: ' + e.device.productName);
}

function handleInputReport(e) {
    console.log(e.device.productName + ': got input report ' + e.reportId);
    console.log(new Uint8Array(e.data.buffer));
}

navigator.hid.addEventListener('connect', handleConnectedDevice);
navigator.hid.addEventListener('disconnect', handleDisconnectedDevice);

navigator.hid.getDevices().then((devices) => {
    if (devices.length == 0)
      return;
    devices[0].open().then(() => {
        console.log('Opened device: ' + device.productName);
        device.addEventListener('inputreport', handleInputReport);
        device.sendReport(outputReportId, outputReport).then(() => {
            console.log('Sent output report ' + outputReportId);
        });
    });
});
  })
})
