import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})

export class CanvasDrawComponent {

  @ViewChild('myCanvas') canvas: any;
 
  canvasElement: any;
  lastX: number;
  lastY: number;
   
  currentColour: string = '#1abc9c';
  
  availableColours: any;
  
  brushSize: number = 10;

  constructor(public platform: Platform, public renderer: Renderer) {
    console.log('Hello CanvasDrawComponent Component');
  
    this.availableColours = [
        '#1abc9c',
        '#3498db',
        '#9b59b6',
        '#e67e22',
        '#e74c3c'
    ];
    
  }

  // create a reference to the nativeElement for the canvas
  // and set the width and height of the canvas 
  // to equal whatever the current width and height of the device is.
  ngAfterViewInit() {

    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');
  }

  changeColour(colour){
    console.log('color ' + colour);
    this.currentColour = colour;
  }

  changeSize(size){
     
    this.brushSize = size;
  }

  // recording where the user has tapped on the screen
  // where we want to draw the line from and where we want to draw the line to
  onHandleStart(ev) {

    // lastX & lastY store the coordinates of the users 
    // last touch on the screen
    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
  }

  // interact with canvas by using its context for drawing a line.
  onHandleMove(ev) {
   
    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;

    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = this.currentColour;
    ctx.lineWidth = this.brushSize;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;

  }

  clearCanvas(){
  
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);  
  }
}
