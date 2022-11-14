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
define(["./when-4ca4e419","./Check-430b3551","./Math-c0afb7aa","./Cartesian2-0cd32dae","./defineProperties-24e785e9","./Transforms-1f147cce","./RuntimeError-443472b0","./WebGLConstants-2ddfa2f9","./ComponentDatatype-adb4702b","./GeometryAttribute-ebf6a4c7","./GeometryAttributes-614c63f8","./AttributeCompression-424ccc06","./GeometryPipeline-27b4178f","./EncodedCartesian3-17533efe","./IndexDatatype-a78bfe07","./IntersectionTests-9618f995","./Plane-6d029ea4","./VertexFormat-95f25802","./GeometryInstance-50734731","./arrayRemoveDuplicates-0e267e0f","./BoundingRectangle-4654555a","./EllipsoidTangentPlane-6e29c6f6","./OrientedBoundingBox-963ed09f","./CoplanarPolygonGeometryLibrary-baedaca3","./ArcType-51c149e1","./EllipsoidRhumbLine-aeb03c9a","./PolygonPipeline-d378df2d","./PolygonGeometryLibrary-189cbefa"],function(l,e,L,E,t,T,a,n,D,_,k,r,h,o,V,i,s,p,f,C,y,c,m,v,u,d,R,x){"use strict";var I=new E.Cartesian3,P=new y.BoundingRectangle,M=new E.Cartesian2,H=new E.Cartesian2,w=new E.Cartesian3,A=new E.Cartesian3,F=new E.Cartesian3,G=new E.Cartesian3,B=new E.Cartesian3,O=new E.Cartesian3,z=new T.Quaternion,S=new T.Matrix3,N=new T.Matrix3,Q=new E.Cartesian3;function g(e){var t=(e=l.defaultValue(e,l.defaultValue.EMPTY_OBJECT)).polygonHierarchy,a=l.defaultValue(e.vertexFormat,p.VertexFormat.DEFAULT);this._vertexFormat=p.VertexFormat.clone(a),this._polygonHierarchy=t,this._stRotation=l.defaultValue(e.stRotation,0),this._ellipsoid=E.Ellipsoid.clone(l.defaultValue(e.ellipsoid,E.Ellipsoid.WGS84)),this._workerName="createCoplanarPolygonGeometry",this.packedLength=x.PolygonGeometryLibrary.computeHierarchyPackedLength(t)+p.VertexFormat.packedLength+E.Ellipsoid.packedLength+2}g.fromPositions=function(e){return new g({polygonHierarchy:{positions:(e=l.defaultValue(e,l.defaultValue.EMPTY_OBJECT)).positions},vertexFormat:e.vertexFormat,stRotation:e.stRotation,ellipsoid:e.ellipsoid})},g.pack=function(e,t,a){return a=l.defaultValue(a,0),a=x.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,a),E.Ellipsoid.pack(e._ellipsoid,t,a),a+=E.Ellipsoid.packedLength,p.VertexFormat.pack(e._vertexFormat,t,a),a+=p.VertexFormat.packedLength,t[a++]=e._stRotation,t[a]=e.packedLength,t};var b=E.Ellipsoid.clone(E.Ellipsoid.UNIT_SPHERE),j=new p.VertexFormat,U={polygonHierarchy:{}};return g.unpack=function(e,t,a){t=l.defaultValue(t,0);var n=x.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=n.startingIndex,delete n.startingIndex;var r=E.Ellipsoid.unpack(e,t,b);t+=E.Ellipsoid.packedLength;var o=p.VertexFormat.unpack(e,t,j);t+=p.VertexFormat.packedLength;var i=e[t++],t=e[t];return(a=!l.defined(a)?new g(U):a)._polygonHierarchy=n,a._ellipsoid=E.Ellipsoid.clone(r,a._ellipsoid),a._vertexFormat=p.VertexFormat.clone(o,a._vertexFormat),a._stRotation=i,a.packedLength=t,a},g.createGeometry=function(e){var t=e._vertexFormat,a=e._polygonHierarchy,n=e._stRotation,r=a.positions;if(!((r=C.arrayRemoveDuplicates(r,E.Cartesian3.equalsEpsilon,!0)).length<3)){var o=w,i=A,l=F,s=B,p=O;if(v.CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments(r,G,s,p)){o=E.Cartesian3.cross(s,p,o);o=E.Cartesian3.normalize(o,o),E.Cartesian3.equalsEpsilon(G,E.Cartesian3.ZERO,L.CesiumMath.EPSILON6)||(y=e._ellipsoid.geodeticSurfaceNormal(G,Q),E.Cartesian3.dot(o,y)<0&&(o=E.Cartesian3.negate(o,o),s=E.Cartesian3.negate(s,s)));var y=v.CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction(G,s,p),c=v.CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction(G,s,p);t.tangent&&(i=E.Cartesian3.clone(s,i)),t.bitangent&&(l=E.Cartesian3.clone(p,l));var a=x.PolygonGeometryLibrary.polygonsFromHierarchy(a,y,!1),y=a.hierarchy,m=a.polygons;if(0!==y.length){for(var r=y[0].outerRing,a=T.BoundingSphere.fromPoints(r),u=x.PolygonGeometryLibrary.computeBoundingRectangle(o,c,r,n,P),d=[],g=0;g<m.length;g++){var b=new f.GeometryInstance({geometry:function(e,t,a,n,r,o,i,l){var s=e.positions,p=R.PolygonPipeline.triangulate(e.positions2D,e.holes);p.length<3&&(p=[0,1,2]),(e=V.IndexDatatype.createTypedArray(s.length,p.length)).set(p);var y=S;0!==n?(p=T.Quaternion.fromAxisAngle(o,n,z),y=T.Matrix3.fromQuaternion(p,y),(t.tangent||t.bitangent)&&(p=T.Quaternion.fromAxisAngle(o,-n,z),u=T.Matrix3.fromQuaternion(p,N),i=E.Cartesian3.normalize(T.Matrix3.multiplyByVector(u,i,i),i),t.bitangent&&(l=E.Cartesian3.normalize(E.Cartesian3.cross(o,i,l),l)))):y=T.Matrix3.clone(T.Matrix3.IDENTITY,y);var c=H;t.st&&(c.x=a.x,c.y=a.y);for(var m=s.length,u=3*m,d=new Float64Array(u),g=t.normal?new Float32Array(u):void 0,b=t.tangent?new Float32Array(u):void 0,h=t.bitangent?new Float32Array(u):void 0,f=t.st?new Float32Array(2*m):void 0,C=0,v=0,x=0,P=0,w=0,A=0;A<m;A++){var F,G=s[A];d[C++]=G.x,d[C++]=G.y,d[C++]=G.z,t.st&&(F=r(T.Matrix3.multiplyByVector(y,G,I),M),E.Cartesian2.subtract(F,c,F),G=L.CesiumMath.clamp(F.x/a.width,0,1),F=L.CesiumMath.clamp(F.y/a.height,0,1),f[w++]=G,f[w++]=F),t.normal&&(g[v++]=o.x,g[v++]=o.y,g[v++]=o.z),t.tangent&&(b[P++]=i.x,b[P++]=i.y,b[P++]=i.z),t.bitangent&&(h[x++]=l.x,h[x++]=l.y,h[x++]=l.z)}return u=new k.GeometryAttributes,t.position&&(u.position=new _.GeometryAttribute({componentDatatype:D.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:d})),t.normal&&(u.normal=new _.GeometryAttribute({componentDatatype:D.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:g})),t.tangent&&(u.tangent=new _.GeometryAttribute({componentDatatype:D.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:b})),t.bitangent&&(u.bitangent=new _.GeometryAttribute({componentDatatype:D.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:h})),t.st&&(u.st=new _.GeometryAttribute({componentDatatype:D.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:f})),new _.Geometry({attributes:u,indices:e,primitiveType:_.PrimitiveType.TRIANGLES})}(m[g],t,u,n,c,o,i,l)});d.push(b)}y=h.GeometryPipeline.combineInstances(d)[0];y.attributes.position.values=new Float64Array(y.attributes.position.values),y.indices=V.IndexDatatype.createTypedArray(y.attributes.position.values.length/3,y.indices);r=y.attributes;return t.position||delete r.position,new _.Geometry({attributes:r,indices:y.indices,primitiveType:y.primitiveType,boundingSphere:a})}}}},function(e,t){return l.defined(t)&&(e=g.unpack(e,t)),g.createGeometry(e)}});
