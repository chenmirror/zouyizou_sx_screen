var Select={//下拉框
	selector:{
		sel:$(".select"),
		selRequire:$(".select p"),
		selList:$(".select li")
	},
	init:function(){
		var self=this;
		self.selector.sel.hover(function(){
			$(this).find('i').html('&#xe619;');
			$(this).find('.select-pull').filter(':not(:animated)').fadeIn();
		},function(){
			$(this).find('i').html('&#xe618;');
			$(this).find('.select-pull').fadeOut();
		})
		self.selector.selList.click(function(){
			var index=$(this).index();
			var txt=$(this).text();
			var str=txt+"<i class='icon iconfont'>&#xe618;</i>";
			$(this).parent().parent().parent().find('p').html(str);
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$(this).parent().parent().fadeOut();
		})
	}
}
Select.init();