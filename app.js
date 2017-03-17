function PolyGroup()
{
    Object.getPrototypeOf(PolyGroup.prototype).constructor.call(this)
    this.lstPolygon = [].slice.call(arguments,0);
    this.Init = function()
    {
        this.lstGrid = this.Fill(15, 15);
        this.lstPoint = [];
        for(var i = 0; i < this.lstPolygon.length; i++)
        {
            var lstPolygonsPoint = this.lstPolygon[i].lstPoint;
            for(var j = 0; j < lstPolygonsPoint.length; j++)
            {
                this.lstPoint.push(lstPolygonsPoint[j]);
            }
        }
    }
}
// PolyGroup derives from Polygon
PolyGroup.prototype = Object.create(Polygon.prototype);

//polygon class
function Polygon()
{
	this.lstPoint = [];
    this.lstGrid = [];
    
    this.Init = function()
    {
        this.lstGrid = this.Fill(15, 15);
    }

    this.Fill = function(iColumns, iRows)
    {
        this.lstGrid = [];
        for(var i = 0; i < iColumns; i++)
        {
            this.lstGrid.push([]);
            for(var j = 0; j < iRows; j++)
            {
                this.lstGrid[i].push("-");
            }
        }
        return this.lstGrid;
    }

    this.toString = function()
    {
        var lstTempGrid = JSON.parse(JSON.stringify(this.lstGrid));
        for(var i = 0; i < this.lstPoint.length; i++)
        {
            var point = this.lstPoint[i];

            //x is the column (horizontal), y is the row (vertical)
            lstTempGrid[point.y][point.x] = "0";
        }

        var sOutput = "";
        for(var i = 0; i < lstTempGrid.length; i++)
        {
            sOutput = "["
            for(var j = 0; j < lstTempGrid[i].length; j++)
                sOutput += "  " + lstTempGrid[i][j];
            sOutput += "  ]"
            l(sOutput);
        }
    }
}

Polygon.YFlip = function(lstPoint)
{
    var lstPointNew = JSON.parse(JSON.stringify(lstPoint));

    //get height
    var iYStart = 99;
    var iYEnd = 0;
    for(var i = 0; i < lstPointNew.length; i++)
    {
        var point = lstPointNew[i];
        iYEnd = point.y > iYEnd ? point.y : iYEnd;
        iYStart = point.y < iYStart ? point.y : iYStart;
    }

    //the middle point
    var iHeight = iYEnd - iYStart;
    var iMiddle = iYStart + iHeight / 2;

    for(var i = 0; i < lstPointNew.length; i++)
    {
        var point = lstPointNew[i];
        if(point.y < iMiddle)
            point.y = iMiddle + (iMiddle - point.y);
        else if(point.y > iMiddle)
            point.y = iMiddle - (point.y - iMiddle);
        else
            point.y = point.y;
    }

    return lstPointNew;
}

Polygon.XFlip = function(lstPoint)
{
    var lstPointNew = JSON.parse(JSON.stringify(lstPoint));
    var iXStart = 99;
    var iXEnd = 0;
    for(var i = 0; i < lstPointNew.length; i++)
    {
        var point = lstPointNew[i];
        iXStart = point.x < iXStart ? point.x : iXStart;
        iXEnd = point.x > iXEnd ? point.x : iXEnd;
    }

    var iHeight = iXEnd - iXStart;
    var iMiddle = iXStart + iHeight / 2;

    for(var i = 0; i < lstPointNew.length; i++)
    {
        var point = lstPointNew[i];
        if(point.x < iMiddle)
            point.x = iMiddle + (iMiddle - point.x);
        else if(point.x > iMiddle)
            point.x = iMiddle - (point.x - iMiddle);
        else
            point.x = point.x;
    }

    return lstPointNew;
}

//point class
function Point(x,y)
{
    this.x = x;
    this.y = y;
}


function l(s){console.log(s)};
function dd(){
    return [
        new Point(3,3),new Point(3,8),new Point(5,8),new Point(5,5),new Point(10,5), new Point(10,3), new Point(6, 3)
    ]
}
function dd2(){
    return [
        new Point(10,10),new Point(5,13), new Point(3,8), new Point(2,10)
    ]
}

var p = new Polygon();
p.Init();
p.lstPoint = dd();
p.toString();
l("");

var p2 = new Polygon();
p2.Init();
p2.lstPoint = dd2();
p2.toString();
l("");

var pg = new PolyGroup(p, p2);
pg.Init();
pg.toString();
l("");

pg.lstPoint = Polygon.XFlip(pg.lstPoint);
pg.toString();