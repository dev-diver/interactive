class App{
    constructor() {
      this.canvas = document.createElement('canvas');
      document.body.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.t = 0;
  
      this.pixelRatio = window.devicePixelRatio > 1 ? 2 :1;
          //devicePixel참고
  
      window.addEventListener('resize', this.resize.bind(this), false);
          // window의 'resize'이벤트에 this.resize를 붙임. 
          // 이벤트 처리기로써의 함수 내부의 this는 이벤트를 발생시킨 것으로 처리하기 떄문에, 
          //this를 App객체로 확실히 하기 위해 bind(this)   ()=>this.resize() 도 가능
          // 마지막은 capture 옵션으로써, true면 다른 이벤트 적용보다 빨리 적용됨.
      this.resize();
  
      window.requestAnimationFrame(this.animate.bind(this));
        //window의 메소드 안 callback이라 this가 window인 듯.
    }
  
    resize() {
      this.stageWidth = document.body.clientWidth;
          //Element.clientWidth 참고
      this.stageHeight = document.body.clientHeight;
  
      this.canvas.width = this.stageWidth * this.pixelRatio;
      this.canvas.height = this.stageHeight * this.pixelRatio;
      this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }
  
    animate(){
      window.requestAnimationFrame(this.animate.bind(this));
          //자동으로 되는 것이 아니라 재귀적으로 반복 호출해줘야 함.
  
      this.ctx.clearRect(0,0, this.stageWidth, this.stageHeight);
      this.t+=0.05;
      var center = this.stageWidth/2;
      var moon = this.t%30;
      var tide = this.t%15;
      if(tide<=7.5){
        tide = tide;
      }else{
        tide = 15 - tide;  
      }

      this.drawCircle(center,this.stageHeight/4,100,'#cddb49');
      this.clearCircle(moon/30*500+center-250,this.stageHeight/4,150);

      this.drawRect(0, this.stageHeight/2+tide*3, this.stageWidth, this.stageHeight/2, '#1f7ecc');
    }

    drawCircle(x,y,r,color){
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2* Math.PI);
      this.ctx.fill();
    }

    clearCircle(x, y, radius){
      this.ctx.globalCompositeOperation = 'destination-out'
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
      this.ctx.fill();
      this.ctx.globalCompositeOperation = 'source-over'
    }

    drawRect(x,y,w,h, color){
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.rect(x,y,w,h);
      this.ctx.fill();
    }

  }
  
  window.onload = () => {
    new App();
  }