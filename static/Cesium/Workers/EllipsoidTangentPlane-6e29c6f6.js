/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./when-4ca4e419","./Check-430b3551","./Cartesian2-0cd32dae","./defineProperties-24e785e9","./Transforms-1f147cce","./IntersectionTests-9618f995","./Plane-6d029ea4"],function(e,p,n,C,t,a,i,r){"use strict";function x(e,n,t){this.minimum=C.Cartesian3.clone(p.defaultValue(e,C.Cartesian3.ZERO)),this.maximum=C.Cartesian3.clone(p.defaultValue(n,C.Cartesian3.ZERO)),t=p.defined(t)?C.Cartesian3.clone(t):C.Cartesian3.midpoint(this.minimum,this.maximum,new C.Cartesian3),this.center=t}x.fromPoints=function(e,n){if(p.defined(n)||(n=new x),!p.defined(e)||0===e.length)return n.minimum=C.Cartesian3.clone(C.Cartesian3.ZERO,n.minimum),n.maximum=C.Cartesian3.clone(C.Cartesian3.ZERO,n.maximum),n.center=C.Cartesian3.clone(C.Cartesian3.ZERO,n.center),n;for(var t=e[0].x,i=e[0].y,a=e[0].z,r=e[0].x,s=e[0].y,o=e[0].z,m=e.length,l=1;l<m;l++)var c=e[l],u=c.x,d=c.y,c=c.z,t=Math.min(u,t),r=Math.max(u,r),i=Math.min(d,i),s=Math.max(d,s),a=Math.min(c,a),o=Math.max(c,o);var f=n.minimum;f.x=t,f.y=i,f.z=a;var h=n.maximum;return h.x=r,h.y=s,h.z=o,n.center=C.Cartesian3.midpoint(f,h,n.center),n},x.clone=function(e,n){if(p.defined(e))return p.defined(n)?(n.minimum=C.Cartesian3.clone(e.minimum,n.minimum),n.maximum=C.Cartesian3.clone(e.maximum,n.maximum),n.center=C.Cartesian3.clone(e.center,n.center),n):new x(e.minimum,e.maximum,e.center)},x.equals=function(e,n){return e===n||p.defined(e)&&p.defined(n)&&C.Cartesian3.equals(e.center,n.center)&&C.Cartesian3.equals(e.minimum,n.minimum)&&C.Cartesian3.equals(e.maximum,n.maximum)};var s=new C.Cartesian3;x.intersectPlane=function(e,n){s=C.Cartesian3.subtract(e.maximum,e.minimum,s);var t=C.Cartesian3.multiplyByScalar(s,.5,s),i=n.normal,t=t.x*Math.abs(i.x)+t.y*Math.abs(i.y)+t.z*Math.abs(i.z),n=C.Cartesian3.dot(e.center,i)+n.distance;return 0<n-t?a.Intersect.INSIDE:n+t<0?a.Intersect.OUTSIDE:a.Intersect.INTERSECTING},x.prototype.clone=function(e){return x.clone(this,e)},x.prototype.intersectPlane=function(e){return x.intersectPlane(this,e)},x.prototype.equals=function(e){return x.equals(this,e)};var o=new a.Cartesian4;function m(e,n){e=(n=p.defaultValue(n,C.Ellipsoid.WGS84)).scaleToGeodeticSurface(e);var t=a.Transforms.eastNorthUpToFixedFrame(e,n);this._ellipsoid=n,this._origin=e,this._xAxis=C.Cartesian3.fromCartesian4(a.Matrix4.getColumn(t,0,o)),this._yAxis=C.Cartesian3.fromCartesian4(a.Matrix4.getColumn(t,1,o));t=C.Cartesian3.fromCartesian4(a.Matrix4.getColumn(t,2,o));this._plane=r.Plane.fromPointNormal(e,t)}t.defineProperties(m.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},origin:{get:function(){return this._origin}},plane:{get:function(){return this._plane}},xAxis:{get:function(){return this._xAxis}},yAxis:{get:function(){return this._yAxis}},zAxis:{get:function(){return this._plane.normal}}});var l=new x;m.fromPoints=function(e,n){return new m(x.fromPoints(e,l).center,n)};var c=new i.Ray,u=new C.Cartesian3;m.prototype.projectPointOntoPlane=function(e,n){var t=c;t.origin=e,C.Cartesian3.normalize(e,t.direction);e=i.IntersectionTests.rayPlane(t,this._plane,u);if(p.defined(e)||(C.Cartesian3.negate(t.direction,t.direction),e=i.IntersectionTests.rayPlane(t,this._plane,u)),p.defined(e)){t=C.Cartesian3.subtract(e,this._origin,e),e=C.Cartesian3.dot(this._xAxis,t),t=C.Cartesian3.dot(this._yAxis,t);return p.defined(n)?(n.x=e,n.y=t,n):new C.Cartesian2(e,t)}},m.prototype.projectPointsOntoPlane=function(e,n){p.defined(n)||(n=[]);for(var t=0,i=e.length,a=0;a<i;a++){var r=this.projectPointOntoPlane(e[a],n[t]);p.defined(r)&&(n[t]=r,t++)}return n.length=t,n},m.prototype.projectPointToNearestOnPlane=function(e,n){p.defined(n)||(n=new C.Cartesian2);var t=c;t.origin=e,C.Cartesian3.clone(this._plane.normal,t.direction);e=i.IntersectionTests.rayPlane(t,this._plane,u);p.defined(e)||(C.Cartesian3.negate(t.direction,t.direction),e=i.IntersectionTests.rayPlane(t,this._plane,u));t=C.Cartesian3.subtract(e,this._origin,e),e=C.Cartesian3.dot(this._xAxis,t),t=C.Cartesian3.dot(this._yAxis,t);return n.x=e,n.y=t,n},m.prototype.projectPointsToNearestOnPlane=function(e,n){p.defined(n)||(n=[]);var t=e.length;n.length=t;for(var i=0;i<t;i++)n[i]=this.projectPointToNearestOnPlane(e[i],n[i]);return n};var d=new C.Cartesian3;m.prototype.projectPointOntoEllipsoid=function(e,n){p.defined(n)||(n=new C.Cartesian3);var t=this._ellipsoid,i=this._origin,a=this._xAxis,r=this._yAxis,s=d;return C.Cartesian3.multiplyByScalar(a,e.x,s),n=C.Cartesian3.add(i,s,n),C.Cartesian3.multiplyByScalar(r,e.y,s),C.Cartesian3.add(n,s,n),t.scaleToGeocentricSurface(n,n),n},m.prototype.projectPointsOntoEllipsoid=function(e,n){var t=e.length;p.defined(n)?n.length=t:n=new Array(t);for(var i=0;i<t;++i)n[i]=this.projectPointOntoEllipsoid(e[i],n[i]);return n},e.AxisAlignedBoundingBox=x,e.EllipsoidTangentPlane=m});
