define("vendor/ane/components/ms-timepicker/ms-timepicker-view.ts",function(e){"use strict";var n=e("node_modules/avalon2/dist/avalon"),t=e("node_modules/moment/moment"),i=24;n.component("ms-timepicker-view",{template:'\n<div class="ane-timepicker-view">\n    <div class="ane-timepicker-view-combobox">\n        <div class="ane-timepicker-view-select" name="hour-options">\n            <ul>\n                <li :for="hour in @hourOptions"\n                    :class="[(hour==@currentHour?\'ane-timepicker-view-select-option-selected\':\'\')]"\n                    :click="@select(hour, \'hour\')">{{hour}}</li>\n            </ul>\n        </div>\n        <div class="ane-timepicker-view-select" name="minute-options">\n            <ul>\n                <li :for="minute in @minuteOptions"\n                    :class="[(minute==@currentMinute?\'ane-timepicker-view-select-option-selected\':\'\')]"\n                    :click="@select(minute, \'minute\')">{{minute}}</li>\n            </ul>\n        </div>\n        <div class="ane-timepicker-view-select" name="second-options">\n            <ul>\n                <li :for="second in @secondOptions"\n                    :class="[(second==@currentSecond?\'ane-timepicker-view-select-option-selected\':\'\')]"\n                    :click="@select(second, \'second\')">{{second}}</li>\n            </ul>\n        </div>\n    </div>\n</div>\n',defaults:{value:"",currentHour:0,currentMinute:0,currentSecond:0,hourOptions:n.range(24).map(function(e){return("0"+e).substr(-2)}),minuteOptions:n.range(60).map(function(e){return("0"+e).substr(-2)}),secondOptions:n.range(60).map(function(e){return("0"+e).substr(-2)}),onChange:n.noop,select:function(e,n){this.$element.getElementsByClassName("ane-timepicker-view-select")[n+"-options"].scrollTop=24*e,"hour"===n?this.currentHour=e:"minute"===n?this.currentMinute=e:this.currentSecond=e,this.onChange({target:{hour:this.currentHour,minute:this.currentMinute,second:this.currentSecond},type:"timepicker-view-changed"})},onInit:function(){var e=this;this.$watch("value",function(n){var o=t(n.split(","));e.currentHour=o.hour(),e.currentMinute=o.minute(),e.currentSecond=o.second();var c=e.$element.getElementsByClassName("ane-timepicker-view-select");c["hour-options"].scrollTop=e.currentHour*i,c["minute-options"].scrollTop=e.currentMinute*i,c["second-options"].scrollTop=e.currentSecond*i}),this.$fire("value",this.value)}}})});