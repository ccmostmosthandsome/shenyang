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
define(["exports","./when-4ca4e419","./Check-430b3551","./Math-c0afb7aa","./Cartesian2-0cd32dae","./Transforms-1f147cce","./ComponentDatatype-adb4702b","./GeometryAttribute-ebf6a4c7","./GeometryAttributes-614c63f8","./IndexDatatype-a78bfe07","./GeometryOffsetAttribute-daefb9ce","./EllipseGeometryLibrary-13db6b5e"],function(e,c,t,f,m,h,y,b,A,_,g,x){"use strict";var E=new m.Cartesian3,s=new m.Cartesian3;var v=new h.BoundingSphere,M=new h.BoundingSphere;function C(e){var t=(e=c.defaultValue(e,c.defaultValue.EMPTY_OBJECT)).center,i=c.defaultValue(e.ellipsoid,m.Ellipsoid.WGS84),r=e.semiMajorAxis,a=e.semiMinorAxis,n=c.defaultValue(e.granularity,f.CesiumMath.RADIANS_PER_DEGREE),o=c.defaultValue(e.height,0),s=c.defaultValue(e.extrudedHeight,o);this._center=m.Cartesian3.clone(t),this._semiMajorAxis=r,this._semiMinorAxis=a,this._ellipsoid=m.Ellipsoid.clone(i),this._rotation=c.defaultValue(e.rotation,0),this._height=Math.max(s,o),this._granularity=n,this._extrudedHeight=Math.min(s,o),this._numberOfVerticalLines=Math.max(c.defaultValue(e.numberOfVerticalLines,16),0),this._offsetAttribute=e.offsetAttribute,this._workerName="createEllipseOutlineGeometry"}C.packedLength=m.Cartesian3.packedLength+m.Ellipsoid.packedLength+8,C.pack=function(e,t,i){return i=c.defaultValue(i,0),m.Cartesian3.pack(e._center,t,i),i+=m.Cartesian3.packedLength,m.Ellipsoid.pack(e._ellipsoid,t,i),i+=m.Ellipsoid.packedLength,t[i++]=e._semiMajorAxis,t[i++]=e._semiMinorAxis,t[i++]=e._rotation,t[i++]=e._height,t[i++]=e._granularity,t[i++]=e._extrudedHeight,t[i++]=e._numberOfVerticalLines,t[i]=c.defaultValue(e._offsetAttribute,-1),t};var G=new m.Cartesian3,L=new m.Ellipsoid,O={center:G,ellipsoid:L,semiMajorAxis:void 0,semiMinorAxis:void 0,rotation:void 0,height:void 0,granularity:void 0,extrudedHeight:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};C.unpack=function(e,t,i){t=c.defaultValue(t,0);var r=m.Cartesian3.unpack(e,t,G);t+=m.Cartesian3.packedLength;var a=m.Ellipsoid.unpack(e,t,L);t+=m.Ellipsoid.packedLength;var n=e[t++],o=e[t++],s=e[t++],u=e[t++],l=e[t++],d=e[t++],p=e[t++],t=e[t];return c.defined(i)?(i._center=m.Cartesian3.clone(r,i._center),i._ellipsoid=m.Ellipsoid.clone(a,i._ellipsoid),i._semiMajorAxis=n,i._semiMinorAxis=o,i._rotation=s,i._height=u,i._granularity=l,i._extrudedHeight=d,i._numberOfVerticalLines=p,i._offsetAttribute=-1===t?void 0:t,i):(O.height=u,O.extrudedHeight=d,O.granularity=l,O.rotation=s,O.semiMajorAxis=n,O.semiMinorAxis=o,O.numberOfVerticalLines=p,O.offsetAttribute=-1===t?void 0:t,new C(O))},C.createGeometry=function(e){if(!(e._semiMajorAxis<=0||e._semiMinorAxis<=0)){var t=e._height,i=e._extrudedHeight,r=!f.CesiumMath.equalsEpsilon(t,i,0,f.CesiumMath.EPSILON2);e._center=e._ellipsoid.scaleToGeodeticSurface(e._center,e._center);var a,t={center:e._center,semiMajorAxis:e._semiMajorAxis,semiMinorAxis:e._semiMinorAxis,ellipsoid:e._ellipsoid,rotation:e._rotation,height:t,granularity:e._granularity,numberOfVerticalLines:e._numberOfVerticalLines};return r?(t.extrudedHeight=i,t.offsetAttribute=e._offsetAttribute,a=function(e){var t=e.center,i=e.ellipsoid,r=e.semiMajorAxis,a=m.Cartesian3.multiplyByScalar(i.geodeticSurfaceNormal(t,E),e.height,E);v.center=m.Cartesian3.add(t,a,v.center),v.radius=r,a=m.Cartesian3.multiplyByScalar(i.geodeticSurfaceNormal(t,a),e.extrudedHeight,a),M.center=m.Cartesian3.add(t,a,M.center),M.radius=r;var t=x.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,t=(a=new A.GeometryAttributes({position:new b.GeometryAttribute({componentDatatype:y.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:x.EllipseGeometryLibrary.raisePositionsToHeight(t,e,!0)})})).position.values,r=h.BoundingSphere.union(v,M),n=t.length/3;c.defined(e.offsetAttribute)&&(o=new Uint8Array(n),o=e.offsetAttribute===g.GeometryOffsetAttribute.TOP?g.arrayFill(o,1,0,n/2):(t=e.offsetAttribute===g.GeometryOffsetAttribute.NONE?0:1,g.arrayFill(o,t)),a.applyOffset=new b.GeometryAttribute({componentDatatype:y.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:o}));var o=c.defaultValue(e.numberOfVerticalLines,16),o=f.CesiumMath.clamp(o,0,n/2),s=_.IndexDatatype.createTypedArray(n,2*n+2*o);n/=2;var u=0;for(p=0;p<n;++p)s[u++]=p,s[u++]=(p+1)%n,s[u++]=p+n,s[u++]=(p+1)%n+n;if(0<o)for(var e=Math.min(o,n),l=Math.round(n/e),d=Math.min(l*o,n),p=0;p<d;p+=l)s[u++]=p,s[u++]=p+n;return{boundingSphere:r,attributes:a,indices:s}}(t)):(a=function(e){var t=e.center;s=m.Cartesian3.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(t,s),e.height,s),s=m.Cartesian3.add(t,s,s);for(var i=new h.BoundingSphere(s,e.semiMajorAxis),t=x.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,e=new A.GeometryAttributes({position:new b.GeometryAttribute({componentDatatype:y.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:x.EllipseGeometryLibrary.raisePositionsToHeight(t,e,!1)})}),r=t.length/3,a=_.IndexDatatype.createTypedArray(r,2*r),n=0,o=0;o<r;++o)a[n++]=o,a[n++]=(o+1)%r;return{boundingSphere:i,attributes:e,indices:a}}(t),c.defined(e._offsetAttribute)&&(i=a.attributes.position.values.length,t=new Uint8Array(i/3),i=e._offsetAttribute===g.GeometryOffsetAttribute.NONE?0:1,g.arrayFill(t,i),a.attributes.applyOffset=new b.GeometryAttribute({componentDatatype:y.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:t}))),new b.Geometry({attributes:a.attributes,indices:a.indices,primitiveType:b.PrimitiveType.LINES,boundingSphere:a.boundingSphere,offsetAttribute:e._offsetAttribute})}},e.EllipseOutlineGeometry=C});
