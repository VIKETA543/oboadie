import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'scanner-payment',
  imports: [],
  templateUrl: './scanner-payment.html',
  styleUrl: './scanner-payment.scss',
})
export class ScannerPayment implements OnInit {
private buffer: string = '';
  private timeoutGuid: any = null;
  public lastScannedCode: string = '';
ngOnInit(): void {
  this. processScan()
}



  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // 1. Filter out non-character keys (Shift, Ctrl, etc.)
    if (event.key.length > 1 && event.key !== 'Enter') {
      return;
    }

    // 2. If 'Enter' is detected, process immediately
    if (event.key === 'Enter') {
      this.processScan();
      return;
    }

    // 3. Add character to buffer
    this.buffer += event.key;

    // 4. Reset the timeout
    // If no new key is pressed within 50ms, we assume the scan is done
    clearTimeout(this.timeoutGuid);
    this.timeoutGuid = setTimeout(() => {
      this.processScan();
    }, 50); 
}

  private processScan() {
    if (this.buffer.trim().length > 0) {
      this.lastScannedCode = this.buffer;
      console.log('Scanned Result:', this.lastScannedCode);
      
      // Execute your logic here (e.g., API call)
      this.handleAutoSubmit(this.lastScannedCode);

      // 5. Clear buffer for next scan
      this.buffer = '';
    }
  }

  private handleAutoSubmit(code: string) {
    // Your submission logic
  }
}

