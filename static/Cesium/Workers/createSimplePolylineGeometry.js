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
define(["./when-4ca4e419","./Check-430b3551","./Math-c0afb7aa","./Cartesian2-0cd32dae","./defineProperties-24e785e9","./Transforms-1f147cce","./RuntimeError-443472b0","./WebGLConstants-2ddfa2f9","./ComponentDatatype-adb4702b","./GeometryAttribute-ebf6a4c7","./GeometryAttributes-614c63f8","./IndexDatatype-a78bfe07","./IntersectionTests-9618f995","./Plane-6d029ea4","./ArcType-51c149e1","./EllipsoidRhumbLine-aeb03c9a","./EllipsoidGeodesic-f0d5153e","./PolylinePipeline-1211a424","./Color-37005ea1"],function(L,e,V,x,o,S,t,r,I,R,O,M,a,l,U,i,n,N,F){"use strict";function c(e){var o=(e=L.defaultValue(e,L.defaultValue.EMPTY_OBJECT)).positions,t=e.colors,r=L.defaultValue(e.colorsPerVertex,!1);this._positions=o,this._colors=t,this._colorsPerVertex=r,this._arcType=L.defaultValue(e.arcType,U.ArcType.GEODESIC),this._granularity=L.defaultValue(e.granularity,V.CesiumMath.RADIANS_PER_DEGREE),this._ellipsoid=L.defaultValue(e.ellipsoid,x.Ellipsoid.WGS84),this._workerName="createSimplePolylineGeometry";o=1+o.length*x.Cartesian3.packedLength;o+=L.defined(t)?1+t.length*F.Color.packedLength:1,this.packedLength=o+x.Ellipsoid.packedLength+3}c.pack=function(e,o,t){var r;t=L.defaultValue(t,0);var a=e._positions,l=a.length;for(o[t++]=l,r=0;r<l;++r,t+=x.Cartesian3.packedLength)x.Cartesian3.pack(a[r],o,t);var i=e._colors,l=L.defined(i)?i.length:0;for(o[t++]=l,r=0;r<l;++r,t+=F.Color.packedLength)F.Color.pack(i[r],o,t);return x.Ellipsoid.pack(e._ellipsoid,o,t),t+=x.Ellipsoid.packedLength,o[t++]=e._colorsPerVertex?1:0,o[t++]=e._arcType,o[t]=e._granularity,o},c.unpack=function(e,o,t){o=L.defaultValue(o,0);for(var r=e[o++],a=new Array(r),l=0;l<r;++l,o+=x.Cartesian3.packedLength)a[l]=x.Cartesian3.unpack(e,o);var i=0<(r=e[o++])?new Array(r):void 0;for(l=0;l<r;++l,o+=F.Color.packedLength)i[l]=F.Color.unpack(e,o);var n=x.Ellipsoid.unpack(e,o);o+=x.Ellipsoid.packedLength;var s=1===e[o++],p=e[o++],d=e[o];return L.defined(t)?(t._positions=a,t._colors=i,t._ellipsoid=n,t._colorsPerVertex=s,t._arcType=p,t._granularity=d,t):new c({positions:a,colors:i,ellipsoid:n,colorsPerVertex:s,arcType:p,granularity:d})};var H=new Array(2),W=new Array(2),Y={positions:H,height:W,ellipsoid:void 0,minDistance:void 0,granularity:void 0};return c.createGeometry=function(e){var o=e._positions,t=e._colors,r=e._colorsPerVertex,a=e._arcType,l=e._granularity,e=e._ellipsoid,i=V.CesiumMath.chordLength(l,e.maximumRadius),n=L.defined(t)&&!r,s=o.length,p=0;if(a===U.ArcType.GEODESIC||a===U.ArcType.RHUMB){var d,c,f=a===U.ArcType.GEODESIC?(d=V.CesiumMath.chordLength(l,e.maximumRadius),c=N.PolylinePipeline.numberOfPoints,N.PolylinePipeline.generateArc):(d=l,c=N.PolylinePipeline.numberOfPointsRhumbLine,N.PolylinePipeline.generateRhumbArc),y=N.PolylinePipeline.extractHeights(o,e),u=Y;if(a===U.ArcType.GEODESIC?u.minDistance=i:u.granularity=l,u.ellipsoid=e,n){for(var h=0,C=0;C<s-1;C++)h+=c(o[C],o[C+1],d)+1;B=new Float64Array(3*h),A=new Uint8Array(4*h),u.positions=H,u.height=W;var T=0;for(C=0;C<s-1;++C){H[0]=o[C],H[1]=o[C+1],W[0]=y[C],W[1]=y[C+1];var g=f(u);if(L.defined(t))for(var m=g.length/3,P=t[C],b=0;b<m;++b)A[T++]=F.Color.floatToByte(P.red),A[T++]=F.Color.floatToByte(P.green),A[T++]=F.Color.floatToByte(P.blue),A[T++]=F.Color.floatToByte(P.alpha);B.set(g,p),p+=g.length}}else if(u.positions=o,u.height=y,B=new Float64Array(f(u)),L.defined(t)){for(A=new Uint8Array(B.length/3*4),C=0;C<s-1;++C)p=function(e,o,t,r,a,l,i){var n=N.PolylinePipeline.numberOfPoints(e,o,a),s=t.red,p=t.green,d=t.blue,c=t.alpha,f=r.red,e=r.green,o=r.blue,a=r.alpha;if(F.Color.equals(t,r)){for(g=0;g<n;g++)l[i++]=F.Color.floatToByte(s),l[i++]=F.Color.floatToByte(p),l[i++]=F.Color.floatToByte(d),l[i++]=F.Color.floatToByte(c);return i}for(var y=(f-s)/n,u=(e-p)/n,h=(o-d)/n,C=(a-c)/n,T=i,g=0;g<n;g++)l[T++]=F.Color.floatToByte(s+g*y),l[T++]=F.Color.floatToByte(p+g*u),l[T++]=F.Color.floatToByte(d+g*h),l[T++]=F.Color.floatToByte(c+g*C);return T}(o[C],o[C+1],t[C],t[C+1],i,A,p);var _=t[s-1];A[p++]=F.Color.floatToByte(_.red),A[p++]=F.Color.floatToByte(_.green),A[p++]=F.Color.floatToByte(_.blue),A[p++]=F.Color.floatToByte(_.alpha)}}else{var v=n?2*s-2:s,B=new Float64Array(3*v),A=L.defined(t)?new Uint8Array(4*v):void 0,E=0,k=0;for(C=0;C<s;++C){var G=o[C];if(n&&0<C&&(x.Cartesian3.pack(G,B,E),E+=3,P=t[C-1],A[k++]=F.Color.floatToByte(P.red),A[k++]=F.Color.floatToByte(P.green),A[k++]=F.Color.floatToByte(P.blue),A[k++]=F.Color.floatToByte(P.alpha)),n&&C===s-1)break;x.Cartesian3.pack(G,B,E),E+=3,L.defined(t)&&(P=t[C],A[k++]=F.Color.floatToByte(P.red),A[k++]=F.Color.floatToByte(P.green),A[k++]=F.Color.floatToByte(P.blue),A[k++]=F.Color.floatToByte(P.alpha))}}e=new O.GeometryAttributes;e.position=new R.GeometryAttribute({componentDatatype:I.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:B}),L.defined(t)&&(e.color=new R.GeometryAttribute({componentDatatype:I.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:4,values:A,normalize:!0}));var _=2*((v=B.length/3)-1),w=M.IndexDatatype.createTypedArray(v,_),D=0;for(C=0;C<v-1;++C)w[D++]=C,w[D++]=C+1;return new R.Geometry({attributes:e,indices:w,primitiveType:R.PrimitiveType.LINES,boundingSphere:S.BoundingSphere.fromPoints(o)})},function(e,o){return(e=L.defined(o)?c.unpack(e,o):e)._ellipsoid=x.Ellipsoid.clone(e._ellipsoid),c.createGeometry(e)}});
