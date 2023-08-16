/**
 * 转球为全球数字格式，三位数一个逗号
 * @param num 
 */
var tool=
{
    getQueryString(name)
    { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return decodeURI(r[2]); return null; 
    },
    convertToGlobalStr(num)
    {
        if(!num)
        {
            return num+""
        }
        if(num < 1000)
        {
            return num+""
        }
        let str=""
        while(true)
        {
            let n = num%1000
            if(n>99)
            {
                str=","+n+str
            }
            else if(n>9)
            {
                str=",0"+n+str
            }
            else
            {
                str=",00"+n+str
            }
            num = Math.floor(num/1000)
            if(num<1000)
            {
                str=num+str
                break
            }
        }
        return str
    },
    format(src,formatStr)   
    {   
        if(typeof (src) === "string")
        {
            let args = Array.prototype.slice.call(arguments, 1)
            return src.replace(/\{(\d+)\}/g, function(m, i)
            {
                return args[i]
            })
        }
        else
        {
            if(!isNaN(src))
            {
                src = new Date(src)
            }
            let str = formatStr
            let Week = ['日','一','二','三','四','五','六']
        
            let month = src.getMonth()+1
            let year = src.getFullYear()
            let date = src.getDate()
            let hour = src.getHours()
            let min = src.getMinutes()
            let sec = src.getSeconds()
            let day = src.getDay()
            str=str.replace(/yyyy|YYYY/,year)
            str=str.replace(/yy|YY/,(year % 100)>9?(year % 100).toString():'0' + (year % 100))
        
            str=str.replace(/MM/,month>9?month.toString():'0' + month)
            str=str.replace(/M/g,month)
        
            str=str.replace(/w|W/g,Week[day])
        
            str=str.replace(/dd|DD/,date>9?date.toString():'0' + date)
            str=str.replace(/d|D/g,date)
        
            str=str.replace(/hh|HH/,hour>9?hour.toString():'0' + hour)
            str=str.replace(/h|H/g,hour)
            str=str.replace(/mm/,min>9?min.toString():'0' + min)
            str=str.replace(/m/g,min)
        
            str=str.replace(/ss|SS/,sec>9?sec.toString():'0' + sec)
            str=str.replace(/s|S/g,sec)
            return str
        }
    },
    getRootPath(strFullPath) {
        if(!strFullPath)
        {
            strFullPath = window.document.location.href
        }
        let pos = strFullPath.indexOf("/",10);//略过多一点https
        if(pos<0)
        {
            return strFullPath
        }
        let prePath = strFullPath.substring(0, pos)
        return prePath
    }
}