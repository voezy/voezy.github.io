//$(document).ready(function () {});

$(document).ready(function () {
    var indicData = {
        indic: [{
                src: 'assets/img/sbanner_00.png', // 背景图片
                indicPrcBg: '#7b5596', // 进度条背景色
                indicPrc: '#49047a' // 进度条颜色
            },
            {
                src: 'assets/img/sbanner_01.png',
                indicPrcBg: '#83a2cc',
                indicPrc: '#13478f'
            },
            {
                src: 'assets/img/sbanner_02.png',
                indicPrcBg: '#e18e40',
                indicPrc: '#b94e00'
            },
            {
                src: 'assets/img/sbanner_03.png',
                indicPrcBg: '#47acab',
                indicPrc: '#00605f'
            },
            {
                src: 'assets/img/sbanner_04.png',
                indicPrcBg: '#c86c8c',
                indicPrc: '#a41a4a'
            },
            {
                src: 'assets/img/sbanner_05.png',
                indicPrcBg: '#9089d6',
                indicPrc: '#4a419e'
            }
        ]
    }
    var carouselImgsData = {
        carouselImgs: [{
                src: 'assets/img/banner_00.jpg'
            },
            {
                src: 'assets/img/banner_01.jpg'
            },
            {
                src: 'assets/img/banner_02.jpg'
            },
            {
                src: 'assets/img/banner_03.jpg'
            },
            {
                src: 'assets/img/banner_04.jpg'
            },
            {
                src: 'assets/img/banner_05.jpg'
            }
        ]
    }

    var app = {
        init: function () {
            this.render();
            // 初始化第一个指示器
            this.activeIndex = 0;
            $('.carousel-indicator').children().eq(this.activeIndex).find('.indicator-prc-i').addClass('play');

            // 设置播放计时器，以及动画等
            this.playTimer = setInterval(this.play.bind(this), 5000);

            this.bindEvents();
        },
        render: function () {
            var indicImgTpl = Handlebars.compile($('#indic-tpl').html());
            var carouselImgTpl = Handlebars.compile($('#carousel-tpl').html());
            $('.carousel-indicator').html(indicImgTpl(indicData));
            $('.carousel-i-container').html(carouselImgTpl(carouselImgsData));
        },
        bindEvents: function () {
            // 设置指示器点击事件
            $('.indicator-container').click(this.locCas.bind(this));
        },
        play: function () {
            if ($('.carousel-i-container').is(':animated')) return false;
            if (this.activeIndex === 5) {
                $('.carousel-i-container').animate({
                    left: '0',
                });

                $('.carousel-indicator').children().eq(this.activeIndex).find('.indicator-prc-i').removeClass('play');
                this.activeIndex = 0;
                $('.carousel-indicator').children().eq(this.activeIndex).find('.indicator-prc-i').addClass('play');
            } else {
                $('.carousel-i-container').animate({
                    left: '-=1224px',
                });

                $('.carousel-indicator').children().eq(this.activeIndex).find('.indicator-prc-i').removeClass('play');
                this.activeIndex++;
                $('.carousel-indicator').children().eq(this.activeIndex).find('.indicator-prc-i').addClass('play');
            }
        },
        locCas: function (e) {
            if ($('.carousel-i-container').is(':animated')) return false;
            clearInterval(this.playTimer); // 移除计时器, 以免点击切换和自动切换相冲突
            var index = $(e.target).closest('.indicator-container').index(); // 点击到的可能是图片或者进度条，寻找父容器，再确定索引

            $('.carousel-indicator').children().eq(this.activeIndex).find('.indicator-prc-i').removeClass('play');
            this.activeIndex = index;
            $('.carousel-indicator').children().eq(this.activeIndex).find('.indicator-prc-i').addClass('play')
            $('.carousel-i-container').animate({
                left: '-' + index * 1224 + 'px',
            });

            this.playTimer = setInterval(this.play.bind(this), 5000); // 重新加入计时器
        }
    }

    app.init();
})