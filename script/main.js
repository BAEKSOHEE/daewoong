$(document).ready(function(){

      // 1. 변수선언
      let gnb = $('header .gnb > ul > li > a');

      // 2.  gnb메뉴 클릭시 해당 서브메뉴 보이게 하기
      gnb.click(function(){
        $(this).next().toggle();//클릭한 서브 보이게 하고

        //선택한 메뉴 외 다른 서브는 모두 숨김
        $(this).next().parent().siblings().find('.sub').hide();

      });

      // 메인클릭시 서브숨기기
      $('main').click(function(){
        $('.sub').hide();
      });

      // 모바일 토글버튼 모양 변경
      $('#toggle').click(function(){
        $('#toggle span:nth-child(2)').toggle();
        $('#toggle span:first-child').toggleClass('rotate1');
        $('#toggle span:last-child').toggleClass('rotate2');
        $(this).toggleClass('bgcolor');
        $('header nav').toggle();
      }); 

      const l_btn = $('.visual .s_btn li:first-child');//좌측버튼
      const r_btn = $('.visual .s_btn li:last-child');//우측버튼
      const c_btn = $('.visual .ctrl_btn li'); //콘트롤 버튼
      let v_slide_img = $('.visual > div');//슬라이드 이미지

      let i = $('.visual .ctrl_btn li').index(); //0값

      //2. 움직이는 함수 = 서서히 사라지고 나타나는 효과
      function fadeInOut(){
        //console.log('시간함수호출');
        v_slide_img.stop().fadeOut(); //보이는 이미지 숨기고
        $('.visual .ctrl_btn li').removeClass('on'); //콘트롤버튼 서식 모두 제거

        if(i==2){  //만약에 마지막 이미지라면
          i=0; //처음이미지가 보이게하고
        }else{ //그렇지 않으면
          i++; //다음 이미지가 보이도록 한다.
        }
        $('.visual .ctrl_btn li').eq(i).addClass('on'); //선택한 콘트롤 버튼에 서식적용
        v_slide_img.eq(i).stop().fadeIn(); //해당 이미지가 보이게 한다.
      }

      function fadeInOut2(){
        v_slide_img.stop().fadeOut();
        $('.visual .ctrl_btn li').removeClass('on'); //콘트롤버튼 서식 모두 제거
        if(i==0){
          i=2;
        }else{
          i--;
        }
        $('.visual .ctrl_btn li').eq(i).addClass('on'); //선택한 콘트롤 버튼에 서식적용
        v_slide_img.eq(i).stop().fadeIn();
      }

      //3. 매 5초마다 함수를 반복호출하여 슬라이드가 변하게한다.
      let Timer = setInterval(fadeInOut,5000);

      //좌, 우 버튼 클릭시 해당하는 방향으로 슬라이드 이미지가 나오게하기
      l_btn.click(function(){
        fadeInOut2();
      });
      r_btn.click(function(){
        fadeInOut();
      });

      //좌, 우버튼에 마우스 오버시 시간을 제거하고
      $('.s_btn > li').hover(function(){
        clearInterval(Timer);
      },function(){//다시 마우스 아웃시 시간을 생성하여 다시 움직이게 한다.
        Timer = setInterval(fadeInOut, 5000);
      });

      //pagenation(콘트롤 버튼)
      //1. 현재이미지 번호를 체크
      //2. 이미지 전체 개수

      /*
        구현순서
        1. 콘트롤 버튼 변수 선언
        2. 콘트롤 버튼(li) 클릭시 인덱스값 0,1,2값을 출력
        3. 인덱스값을 fadeInOut함수의 매개변수값으로 넘김 => 슬라이드가 변함
        4. 사용자가 클릭한 콘트롤버튼(li)에 act서식을 적용하여 어둡게함.
      */

      c_btn.click(function(){
        clearInterval(Timer); //기존 자동슬라이드 제거

        let idx = $(this).index();

        v_slide_img.stop().fadeOut(); //보이는 이미지 숨기고
        $('.visual .ctrl_btn li').removeClass('on'); //콘트롤버튼 서식 모두 제거

        $('.visual .ctrl_btn li').eq(idx).addClass('on'); //선택한 콘트롤 버튼에 서식적용
        v_slide_img.eq(idx).stop().fadeIn(); //해당 이미지가 보이게 한다.

        i = idx; //원래 i값에 idx값을 일치시켜서 다음 순서가 제대로 나오게
      });
      //콘트롤버튼에 마우스 오버시 시간을 제거(Timer)하여 슬라이드 멈추게
      $('.ctrl_btn').mouseenter(function(){
        clearInterval(Timer);
      });
      //콘트롤버튼에 마우스 아웃시 다시 시간을 넣어서 다시 슬라이드 움직이게
      c_btn.mouseleave(function(){
        Timer = setInterval(fadeInOut, 5000);
      });

      //윈도우창의 너비값  = $(window).width();  or $(window).height();
      //$(window).innerWidth();

      let w_width;

      //브라우저의 크기가 변하면 함수내용을 실행한다.
      $(window).resize(function(){

        w_width = $(window).innerWidth();
        console.log(w_width);

        //pc버전 해상도일 경우 배경색 노랑
        // if(w_width>=1025){
        //   $('body').css('background','#ff0');
        //   $('header h1 img').attr('src','./images/logo2.png');
          //tablet버전 해상도일 경우 초록색 
        //}else if(w_width>767&&w_width<=1024){ // 또는 >=768  이렇게 작성해도 같음
         // $('body').css('background','#0f0');
          //상단로고 변경하기
        //  $('header h1 img').attr('src','./images/logo.png');

          //mobile버전 해상도일 경우 회색
       // }else{
       //   $('body').css('background','#ccc');
          //상단로고 변경하기
         // $('header h1 img').attr('src','./images/logo.png');
       // }
    }).resize();


      //탭메뉴 콘텐츠 구현
      $('.cont').eq(0).show();
      let tab_mnu = $('.tab_con_wrap > li > a');

      tab_mnu.click(function(){
        $(this).next().show().parent().siblings().find('.cont').hide();
        $(this).addClass('act').parent().siblings().find('a').removeClass('act');

        // //li태그의 인덱스 번호를 구하여
        // const i = $(this).parent().index();
        // console.log(i);
        // //만약 인덱스가 2라면(3번째 li태그)
        // if(i==2){
        //   //부모박스 높이를 키우고
        //   $('.tab_con article').height(800);
        // }else{
        //   //그렇지 않으면(0,1일때) 원래높이로 설정함.
        //   $('.tab_con article').height(600);
        // }

        return false;
      });

      //이벤트 슬라이드 구현
      const eslide = $('.es_wrap');
      const es_lbtn = $('.event i.fa-angle-left');
      const es_rbtn = $('.event i.fa-angle-right');

      //1번 슬라이드의 앞에 3번을 배치한다.
      $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');

      //왼쪽으로 1200픽셀 이동하여 1번이 가운데 배치가 되게 한다.
      eslide.css('margin-left','-100%');

      //moveleft함수
      function moveLeft(){
        eslide.animate({'margin-left':'-200%'},500, function(){
          $('.es_wrap > div:first-child').insertAfter('.es_wrap > div:last-child');
          eslide.css('margin-left','-100%');
        });
      }
      //시간객체를 사용하여 4초마다 움직이도록 한다.
      //let Timer2 = setInterval(moveLeft, 5000);

      //moveright함수
      function moveRight(){
        eslide.animate({'margin-left':'0px'},500, function(){
          $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');
          eslide.css('margin-left','-100%');
        });
      }

      // 좌측버튼 클릭시 
      es_lbtn.click(function(){
        clearInterval(Timer2);
        moveLeft();
      });

      //우측버튼 클릭시
      es_rbtn.click(function(){
        clearInterval(Timer2);
        moveRight();
      });

      //좌, 우 버튼 마우스 아웃시 다시 시간을 생성해서 움직이게
      $('.event i.fas').mouseleave(function(){
        Timer2 = setInterval(moveLeft, 4000);
      });

      //갤러리 구현
      //1. 변수생성
      let g_list = $('.girl figure a');

      //2. 이미지목록 a요소 클릭시 href값 변수에 담아 modal윈도 띄우기
  g_list.click(function(){
    let img_src = $(this).attr('href');
    // let title = $(this).attr('title');
    let title = $(this).next().find('h6').text();
    let i = $(this).parent().index()+1;

    console.log(i); //li태그의 인덱스값 출력
    console.log(img_src); //href값 출력하기
    console.log(title); //title제목 출력하기

    let modal=`
      <div class="modal">
        <div class="center">
          <h3>${title}</h3>
          <img src=${img_src} alt="">
          <i class="fas fa-times"></i>
          <i class="fas fa-angle-left"></i>
          <i class="fas fa-angle-right"></i>
          <span class="p_num">${i}/8</span>
        </div>
      </div>
    `;

    //body태그의 맨뒤에 modal변수값 출력하기
    $('body').append(modal);

    //닫기 버튼 클릭시 모달윈도 숨기기
    $('.modal i.fa-times').click(function(){
      $('.modal').fadeOut();
    });

    //좌,우 버튼 클릭시 각각 함수 작성하기
    $('.modal i.fa-angle-left').click(function(){
      if(i == 1){
        i=8;
      }else{
        i--;
      }
      console.log(i); //1,8,7,6,5,4,3,2,1...
      dataChange(i);
    });

    $('.modal i.fa-angle-right').click(function(){
      if(i == 8){
        i=1;
      }else{
        i++;
      }
      console.log(i);//1,2,3,4,5,6,7,8,1....
      dataChange(i);
    });

    //좌, 우버튼 클릭시 받아온 i값을가지고
    //제목, 이미지, 페이지번호 변경하기
    function dataChange(i){

      //1. 페이지번호 <span class="p_num">${i}/12</span>
      $('.modal .p_num').text(i+'/8');

      //2. 인덱스번호에 맞는 제목 변경되어야....
      $('.modal h3').text($('.g_list li').eq(i-1).find('.caption').text());

      //3. 인덱스번호에 맞는 이미지 출력하기
      if(i==1||i==2||i==3){
        $('.modal img').attr('src','./images/mcon5_'+i+'.png');
      }else{
        $('.modal img').attr('src','./images/mcon5_'+i+'.jpg');
      }   
    };
    return false;
  });
      
    //윈도우 세로 스크롤값을 구하여 
    $(window).scroll(function(){
      let s_pos = $(this).scrollTop();
      console.log(s_pos);//세로스크롤값 체크~

      if(s_pos>=800){//얼마이상일때 top버튼 보이게하고
        $('.t_btn').fadeIn();
      }else{//그렇지 않으면 top버튼 숨기게 한다.
        $('.t_btn').fadeOut();
      }
    });
    
    //.t_btn클릭시 페이지 상단으로 올라감.
    $('.t_btn').click(function(){
      $('html, body').animate({'scrollTop':'0px'},500);
      return false;
    });

    


  });


  // 랜덤배너
  let ran_n = Math.ceil(Math.random()*4);
  document.getElementById('banner_img').src="./images/back"+ran_n+".jpg";
