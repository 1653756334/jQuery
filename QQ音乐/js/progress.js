(function (window) {
    function Progress($progressBar, $progressLine, $progressDot) {
        return new Progress.prototype.init($progressBar, $progressLine, $progressDot);
    }
    Progress.prototype = {
        constructor: Progress,
        musicList: [],
        init: function ($progressBar, $progressLine, $progressDot) {
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        isMove:false,
        progressClick: function (callBack) {
            let $this = this; //此时的this是 progress
            //监听背景点击
            this.$progressBar.click(function (event) { //这里面的this是 $progressBar
                //获取背景距离窗口的默认位置
                let normalLeft = $(this).offset().left;
                //获取点击位置距离窗口的默认位置
                let eventLeft = event.pageX;
                console.log(eventLeft);
                //设置前景宽度
                $this.$progressLine.css("width", eventLeft-normalLeft);
                //设置点的移动
                $this.$progressDot.css("left", eventLeft-normalLeft);
                //计算进度条比列
                let value = (eventLeft-normalLeft) / $(this).width();
                // console.log("v:"+value);
                callBack(value);
            })
        },
        progressMove: function (callBack) {
            let $this = this;
            //获取点击位置距离窗口的默认位置
            let eventLeft;
            //获取背景距离窗口的默认位置
            let normalLeft = this.$progressBar.offset().left;
            //1.监听鼠标按下事件
            this.$progressBar.mousedown(function () {
                $this.isMove = true;
                //2.监听鼠标的移动事件
                $(document).mousemove(function (event) {
                    eventLeft = event.pageX;
                    // console.log(eventLeft);
                    //设置前景宽度
                    $this.$progressLine.css("width", eventLeft-normalLeft);
                    //设置点的移动
                    $this.$progressDot.css("left", eventLeft-normalLeft);
                    let value = (eventLeft-normalLeft) / $this.$progressBar.width();
                    // console.log(value);
                    callBack(value);
                });
            });
            //3.监听鼠标的抬起事件
            $(document).mouseup(function () {
                $(document).off("mousemove");
                $this.isMove = false;
                //计算进度条比列
                let value = (eventLeft-normalLeft) / $this.$progressBar.width();
                // console.log(value);
                callBack(value);
            });
        },
        setProgress: function (value) {
            if(this.isMove == true) return;
            if(value < 0 || value > 100) return;
            this.$progressLine.css({
                width: value+"%"
            });
            this.$progressDot.css({
                left: value+"%"
            });
        }
    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);

