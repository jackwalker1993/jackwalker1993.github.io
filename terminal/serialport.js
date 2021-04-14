document.addEventListener("DOMContentLoaded", (event) => {
  let button = document.getElementById("connectserial");
  button.addEventListener("click", async () => {
    if ("serial" in navigator) {
      console.log("supported");
      window.alert("supported");
    } else {
      console.log("Not supported");
      window.alert("Not supported");
    }

    try {
      const ports = await navigator.serial.getPorts();
      console.log("ports List : ");
      console.log(ports);

      port = await navigator.serial.requestPort();
      // - Wait for the port to open.
      await port.open({ baudrate: 115200, baudRate: 115200 });
      console.log("port opened");
      console.log("port start write");
      const writer = port.writable.getWriter();

      // Reset Sequence
      // const data = new Uint8Array([2, 64, 0, 0, 0,51,181,131,153,0,0,126,67,108,215,14,0,0,0,255,255,255,255,1,0,0,0,0,16,16,1,0,0,32,1,0,0,0,0,0,87,16,0,0,1,78,97,188,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]); // hello
      // await writer.write(data);
      const fromHexString = (hexString) =>
        new Uint8Array(
          hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
        );
      console.log("write");
      console.log(
        fromHexString(
          "02800000001E7E2BF0000000D063D90E0000001001000000010000000040000000101001000000000057100000014E61BC000000000000000000000000000000000000000A0000000050003800000C00000001500038E803000009000000265000380121000000000000330000000000000000000000000000000000000000000000000004"
        )
      );
      // Payment
      await writer.write(
        fromHexString(
          // Payment
          // "02800000001E7E2BF0000000D063D90E0000001001000000010000000040000000101001000000000057100000014E61BC000000000000000000000000000000000000000A0000000050003800000C00000001500038E803000009000000265000380121000000000000330000000000000000000000000000000000000000000000000004"
          
          //Reset Sequence
          "0240000000C9247244000091EA74D90E00000001000000010000000010100100002001000000000057100000014E61BC0000000000000000000000000000000000000004"
        )
      );
      console.log("read");
      // Allow the serial port to be closed later.
      writer.releaseLock();

      while (port.readable) {
        const reader = port.readable.getReader();

        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              // Allow the serial port to be closed later.
              reader.releaseLock();
              break;
            }
            if (value) {
              // console.log(value);
              console.log(toHexString(value));
            }
          }
        } catch (error) {
          // TODO: Handle non-fatal read error.
        }
      }
      console.log("Close");
      // Force reader.read() to resolve immediately and subsequently
      // call reader.releaseLock() in the loop example above.
      await reader.cancel();
      await port.close();
    } catch (e) {
      console.error("There was an error opening the serial port:", e);
    }
  });



  let button2 = document.getElementById("pay");
  button2.addEventListener("click", async () => {
    if ("serial" in navigator) {
      console.log("supported");
    } else {
      console.log("Not supported");
    }

    try {
      const ports = await navigator.serial.getPorts();
      console.log("ports List : ");
      console.log(ports);

      port = await navigator.serial.requestPort();
      // - Wait for the port to open.
      await port.open({ baudrate: 115200, baudRate: 115200 });
      console.log("port opened");
      console.log("port start write");
      const writer = port.writable.getWriter();

      // Reset Sequence
      // const data = new Uint8Array([2, 64, 0, 0, 0,51,181,131,153,0,0,126,67,108,215,14,0,0,0,255,255,255,255,1,0,0,0,0,16,16,1,0,0,32,1,0,0,0,0,0,87,16,0,0,1,78,97,188,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]); // hello
      // await writer.write(data);
      const fromHexString = (hexString) =>
        new Uint8Array(
          hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
        );
      console.log("write");
      console.log(
        fromHexString(
          "02800000001E7E2BF0000000D063D90E0000001001000000010000000040000000101001000000000057100000014E61BC000000000000000000000000000000000000000A0000000050003800000C00000001500038E803000009000000265000380121000000000000330000000000000000000000000000000000000000000000000004"
        )
      );
      // Payment
      await writer.write(
        fromHexString(
          // Payment
          "02800000001E7E2BF0000000D063D90E0000001001000000010000000040000000101001000000000057100000014E61BC000000000000000000000000000000000000000A0000000050003800000C00000001500038E803000009000000265000380121000000000000330000000000000000000000000000000000000000000000000004"
          
          //Reset Sequence
          // "0240000000C9247244000091EA74D90E00000001000000010000000010100100002001000000000057100000014E61BC0000000000000000000000000000000000000004"
        )
      );
      console.log("read");
      // Allow the serial port to be closed later.
      writer.releaseLock();

      while (port.readable) {
        const reader = port.readable.getReader();

        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              // Allow the serial port to be closed later.
              reader.releaseLock();
              break;
            }
            if (value) {
              // console.log(value);
              console.log(toHexString(value));
            }
          }
        } catch (error) {
          // TODO: Handle non-fatal read error.
        }
      }
      console.log("Close");
      // Force reader.read() to resolve immediately and subsequently
      // call reader.releaseLock() in the loop example above.
      await reader.cancel();
      await port.close();
    } catch (e) {
      console.error("There was an error opening the serial port:", e);
    }
  });
});

function toHexString(byteArray) {
  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}
