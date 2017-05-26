define("vendor/ane/components/ms-calendar/ms-calendar.ts",function(e){"use strict";var a=e("node_modules/avalon2/dist/avalon"),t=e("node_modules/moment/moment");e("node_modules/moment/locale/zh-cn"),e("vendor/ane/components/ms-select/index.ts"),e("vendor/ane/components/ms-calendar/ms-calendar-year-view.ts"),t.locale("zh-cn"),a.component("ms-calendar",{template:'\n<div class="ane-calendar">\n    <div class="row" ms-if="@showHeader">\n        <div class="col-md-2 col-md-offset-4">\n            <ms-select :widget="{value:[@currentYear],options:@currentYearOptions,onChange:@handleYearChange}"></ms-select>\n        </div>\n        <div class="col-md-2">\n            <ms-select :widget="{value:[@currentMonth],options:@monthOptions,onChange:@handleMonthChange}"></ms-select>\n        </div>\n    </div>\n    <table>\n        <thead>\n            <tr>\n                <th class="ane-calendar-column-header" :for="day in @weekdays">{{day}}</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr :for="week in @table">\n                <td class="ane-calendar-cell" :class="el.className" :for="el in week">\n                    <div class="ane-calendar-date" :click="@handleDateClick(el) | stop">{{el.date}}</div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n',defaults:{value:"",$value:null,$selected:null,weekStart:0,showHeader:!0,disabledDate:function(){return!1},currentMonth:"",currentYear:0,weekdays:[],currentYearOptions:[],monthOptions:[],table:[],handleYearChange:function(e){this.$value.year(e.target.value),this.calcTable(this.$value.clone())},handleMonthChange:function(e){this.$value.month(e.target.value),this.calcTable(this.$value.clone())},handleDateClick:function(e){return e.disabled?!1:(this.$selected.year(this.currentYear).month(this.currentMonth).date(e.date),e.prevMonth&&this.$selected.subtract(1,"months"),e.nextMonth&&this.$selected.add(1,"months"),this.$value=this.$selected,this.onChange({target:{value:this.$selected.clone()},type:"calendar-changed"}),void this.calcTable(this.$value.clone()))},onChange:a.noop,calcTable:function(e){var n,l,s=e.clone().startOf("month"),c=e.clone().endOf("month"),d=s.clone().subtract(1,"days"),o=(s.day()-this.weekStart+7)%7,r=d.date(),h=c.date(),i=[],u=0;for(n=0;6>n;n++){var m=[];for(l=0;7>l;l++){var v=[],p=!1,b=!1,f=!1;0===n&&o>l?(v.push("ane-calendar-prev-month-cell"),b=!0,this.disabledDate(+e.clone().subtract(1,"months").date(r-o+l+1))&&(p=!0,v.push("ane-calendar-disabled-cell")),m.push({className:v,disabled:p,prevMonth:b,nextMonth:f,date:r-o+l+1})):u+1>h?(v.push("ane-calendar-next-month-cell"),f=!0,this.disabledDate(+e.clone().add(1,"months").date(u+1-h))&&(p=!0,v.push("ane-calendar-disabled-cell")),m.push({className:v,disabled:p,prevMonth:b,nextMonth:f,date:++u-h})):(t().isSame(e.clone().date(u+1),"day")&&v.push("ane-calendar-today"),this.$selected.isSame(e.clone().date(u+1),"day")&&v.push("ane-calendar-selected-day"),this.disabledDate(+e.clone().date(u+1))&&(p=!0,v.push("ane-calendar-disabled-cell")),m.push({className:v,disabled:p,prevMonth:b,nextMonth:f,date:++u}))}i.push(m)}this.table=i,this.currentMonth=e.format("MMM"),this.currentYear=e.year(),this.currentYearOptions=a.range(this.currentYear-10,this.currentYear+9).map(function(e){return{label:e,value:e}})},onInit:function(){var e=this;this.$value=t(),this.$selected=t();var n=t.localeData().weekdaysMin();a.range(this.weekStart).forEach(function(){n.push(n.shift())}),this.weekdays=n;var l=t.localeData().monthsShort();this.monthOptions=l.map(function(e){return{label:e,value:e}}),this.calcTable(this.$value.clone()),this.value=this.$value.toArray().toString(),this.$watch("value",function(a){e.$value=e.$selected=t(a.split(",")),e.calcTable(e.$value.clone())})}}})});