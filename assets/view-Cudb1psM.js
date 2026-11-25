import{a as e,c as t,d as n,f as r,l as i,n as a,o,r as s,s as c,t as l,u}from"./index-K4VWUW8C.js";var d=c.eye*u,f=[-450,9e3],p=[720,9e3],m=[.53,.4],h=[1.05,1.15],g=.72,_=[.12,.4,.45,.35],v=.6,y=46,b=[.12,.09,.24],ee=[.45,.4,.8],x=[.78,.7,1],S=[.8,.78,1],C={eye:64,hills:34,tile:[520,300],deep:1500,rows:112,cols:120},w=.66,te=[.72,.66,.95],ne=.55,re=12e-5,ie=9e-4,T={high:.012,air:.005},E=Math.acos(1/(1+T.high))*180/Math.PI,D=(e,t)=>{let[n,r]=[e,t].map(e=>e*Math.PI/180);return[-Math.sin(n)*Math.cos(r),Math.sin(r),-Math.cos(n)*Math.cos(r)]},O=D(-14,2.6),ae=.011,k=[1,.84,.62],oe=[.14,.28,.75],se=[.012,.008,.035],ce=[4e3,6e4],A=[.86,.75,.56],j=160,le=.025,M=e=>e.toFixed(5),N=([e,t,n])=>`vec3(${M(e)}, ${M(t)}, ${M(n)})`,P=`
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }
  float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
  float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
`,F=`
  uniform vec4 uView; // the far point (across and up the picture, 0 … 1), the tangent of half the view's height at rest, the picture's shape (wide / high)
  uniform float uFlown; // how far we have flown, in the world's units
  uniform float uFine; // 1 at the better tiers: the colours pulled apart, the floor's own glass
  uniform float uRush; // how fast we fly, 1 at cruise
`,I=`
  uniform vec4 uTear; // its bottom and top (0 … 1 up), how far along, and 1 while it lasts
  vec2 torn(vec2 uv) {
    if (uTear.w > 0.5 && uv.y > uTear.x && uv.y < uTear.y) uv.x += uTear.z * (0.5 + (uv.y - uTear.x) / (uTear.y - uTear.x));
    return uv;
  }
`,ue=`
  varying vec3 vRay;
  varying vec3 vAcross;
  vec3 look() { return vRay + vAcross * (torn(vUv).x - vUv.x); }
  vec2 rest(vec3 d) { return uView.xy + vec2(d.x / uView.w, d.y) / (2.0 * uView.z * max(-d.z, 1e-4)); }
`,de=`
  float ahead(float below) { return max(cameraPosition.y, 1.0) / max(below * 2.0 * uView.z, 1e-5); }
  float murk(float below) { return ${M(_[0])} + ${M(_[1])} * exp(-below * 7.0); }
  vec2 ripple(float z) { // how far it slips what it mirrors, and how much of it it mirrors
    float band = floor((z + uFlown) / ${M(y)});
    float close = smoothstep(2400.0, 300.0, z);
    float tear = floor(clamp(uRush - 0.6, 0.0, 1.5) * 4.0) / 4.0;
    float slip = (hash(vec2(band, 4.0)) - 0.5) * (0.02 + 0.035 * tear) * step(0.4 - 0.2 * min(tear, 1.0), hash(vec2(band, 9.0)));
    float dark = 0.65 * step(0.55, hash(vec2(band, 6.0)));
    return vec2(slip, 1.0 - dark) * close + vec2(0.0, 1.0 - close);
  }
  vec3 floorAir(vec3 c, float z, float below, vec2 px) {
    float fog = smoothstep(${M(p[1]*.06)}, ${M(p[1])}, z);
    fog = clamp(floor(fog * 8.0 + bayer4(px)) / 8.0, 0.0, 1.0);
    c = mix(c, ${N(b)}, fog * ${M(_[2])});
    float glow = floor(exp(-below * 40.0) * 5.0 + bayer4(px)) / 5.0;
    return c + ${N(x)} * glow * 0.6;
  }
`,fe=`
  uniform float uTick; // the glitch clock
  uniform float uBent; // the chance a piece goes wrong in a while of four steps (0: never)
  varying float vWrong;
  void bend(inout vec4 clip, float seed, vec3 own) {
    vWrong = 0.0;
    float slot = floor(uTick / 4.0);
    if (hash(vec2(seed * 91.7, slot)) >= uBent) return;
    if (mod(uTick, 4.0) > 1.0 + floor(hash(vec2(slot, seed * 3.1)) * 3.0)) return;
    float kind = hash(vec2(seed * 7.3, slot + 0.5));
    float each = hash(vec2(seed, uTick)); // drawn again at each step
    if (kind < 0.4) {
      float grid = 4.0 + floor(each * 20.0);
      clip.xy = floor(clip.xy / clip.w * grid + 0.5) / grid * clip.w;
    } else if (kind < 0.75) {
      vec3 pick = sign(vec3(hash(vec2(seed, slot + 1.0)), hash(vec2(seed, slot + 2.0)), hash(vec2(seed, slot + 3.0))) - 0.5) * abs(sign(own));
      if (dot(own, own) > 0.0 && all(equal(sign(own), pick))) {
        float a = hash(vec2(seed, slot + 4.0)) * 6.2831853;
        clip.xy += vec2(cos(a), sin(a)) * clip.w * (1.5 + 4.0 * each);
      }
    } else {
      vWrong = 1.0 + floor(each * 4.0);
    }
  }
`,L=`
  vec2 wrong(vec2 uv, float how) {
    float row = floor(uv.y * 48.0);
    uv.x = fract(uv.x + step(0.5, hash(vec2(row, how + 9.0))) * hash(vec2(row, how)) * 0.4);
    uv.y = fract(uv.y * (1.0 + how) + 0.37 * how);
    return uv;
  }
`,pe=`
  uniform float uOut;
  bool outside() { return bayer4(gl_FragCoord.xy) < uOut; }
`,me=`
  varying vec2 vUv;
  varying vec3 vRay;
  varying vec3 vAcross;
  vec3 ray(vec2 at) {
    vec4 near = inverse(projectionMatrix) * vec4(at, -1.0, 1.0);
    return transpose(mat3(viewMatrix)) * (near.xyz / near.w);
  }
  void main() {
    vUv = uv;
    vRay = ray(position.xy);
    vAcross = ray(vec2(1.0, 0.0)) - ray(vec2(-1.0, 0.0));
    gl_Position = vec4(position.xy, 0.99999, 1.0);
  }
`,R=`
  uniform sampler2D uMap;
  ${F}
  varying vec2 vUv;
  ${P}
  ${I}
  ${ue}
  ${de}
  ${pe}

  vec3 sky(vec2 p) {
    vec2 q = clamp(vec2(${M(m[0])}, ${M(m[1])}) + (p - uView.xy) * vec2(${M(h[0]*.75)} * uView.w, ${M(h[1])}), 0.0, 1.0);
    if (uFine < 0.5) return texture2D(uMap, q).rgb * ${M(g)};
    vec2 s = vec2(0.0025, 0.0);
    return vec3(texture2D(uMap, clamp(q + s, 0.0, 1.0)).r, texture2D(uMap, q).g, texture2D(uMap, clamp(q - s, 0.0, 1.0)).b) * ${M(g)};
  }

  void main() {
    if (outside()) discard;
    vec2 uv = rest(look());
    vec2 px = gl_FragCoord.xy;
    float d = uv.y - uView.y;
    vec3 c;
    if (d >= 0.0) {
      c = sky(uv);
      // The haze lies low; the light is a thin band on the horizon.
      float haze = floor(exp(-d * 9.0) * 6.0 + bayer4(px)) / 6.0;
      float glow = floor(exp(-d * 34.0) * 5.0 + bayer4(px)) / 5.0;
      c = mix(c, ${N(b)}, haze * ${M(_[3])}) + ${N(x)} * glow * 0.75;
    } else {
      float below = -d;
      float z = ahead(below);
      float x = cameraPosition.x + (uv.x - uView.x) * 2.0 * uView.z * uView.w * z;
      vec2 wave = ripple(z);
      c = sky(vec2(uv.x + wave.x, uView.y + below)) * murk(below) * wave.y;
      if (uFine > 0.5) {
        // Its own glass going by: the picture laid flat, dim, its bright shards
        // brighter, drawn out along the way as we speed up.
        float drawn = 1.0 + floor(clamp(uRush - 0.6, 0.0, 1.5) * 4.0) / 4.0 * 0.9;
        vec3 glass = texture2D(uMap, vec2(x, (z + uFlown) / drawn) / 170.0 + vec2(0.31, 0.12)).rgb;
        c += glass * (0.06 + smoothstep(0.35, 0.8, luma(glass)) * 0.25);
      }
      c = floorAir(c, z, below, px);
    }
    gl_FragColor = vec4(c, 1.0);
  }
`,he=`
  attribute vec3 aOwn;
  attribute vec4 aCrop;
  attribute vec4 aShape;
  attribute vec4 aLook;
  #ifdef FRAME
    uniform vec4 uPortal; // how far ahead, the hole's radius, how far it has turned
  #else
    attribute vec4 aAnchor;
    uniform float uWide; // the picture's shape against 4:3
  #endif
  #ifdef PANE
    attribute vec4 aSpin; // how fast it tumbles about two of its axes, and from where
  #endif
  uniform float uFlown;
  uniform float uRush;
  varying vec2 vUv;
  varying vec3 vWorld;
  varying vec3 vOwnNormal;
  varying vec4 vLook;
  varying float vKind;
  varying float vSeed;
  varying float vAppear;
  ${P}
  ${fe}

  mat2 turned(float a) { return mat2(cos(a), sin(a), -sin(a), cos(a)); }

  void main() {
    vec3 local = position;
    vAppear = 1.0;
    #ifdef FRAME
      local.xy = turned(uPortal.z) * local.xy;
      vec3 world = local * uPortal.y + vec3(0.0, ${M(d)}, -uPortal.x);
      float fog = 0.0;
    #else
      #ifdef PANE
        vec2 tumble = uFlown * aSpin.xy + aSpin.zw;
        local.yz = turned(tumble.x) * local.yz;
        local.xz = turned(tumble.y) * local.xz;
      #endif
      if (aShape.w > 0.5 && aShape.w < 1.5) local.x *= sqrt(min(1.0, uWide));
      vec3 at = vec3(aAnchor.x * uWide, aAnchor.y, -aAnchor.z);
      if (aAnchor.w > 0.0) {
        float span = aAnchor.w - ${M(f[0])};
        float way = fract(aAnchor.z - uFlown / span);
        at.z = -(${M(f[0])} + way * span);
        // Close by, drawn out along the way by the speed, in steps.
        local.z *= 1.0 + floor(clamp(uRush - 0.5, 0.0, 1.5) * 3.0) / 3.0 * 1.4 * (1.0 - smoothstep(150.0, 1000.0, -at.z));
        vAppear = smoothstep(1.0, 0.85, way) * smoothstep(0.0, 0.04, way); // it comes out of the distance in dithered steps, and goes behind us the same way
      } else if (aAnchor.w < 0.0) {
        local.xy = turned(uFlown * aAnchor.w) * local.xy * min(1.0, uWide); // narrower in a narrow picture
      }
      vec3 world = at + local;
      #ifdef MIRROR
        world.y = -world.y;
      #endif
      float fog = aLook.w >= 0.0 ? aLook.w : smoothstep(${M(p[0])}, ${M(p[1])}, distance(cameraPosition, world)) * (1.0 - 0.4 * smoothstep(0.0, 1400.0, abs(world.y)));
    #endif
    vUv = aCrop.xy + uv * aCrop.zw;
    vWorld = world;
    vOwnNormal = normal;
    vLook = vec4(aLook.xyz, fog);
    vKind = aShape.w;
    vSeed = aShape.z;
    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
    #ifdef FRAME
      vWrong = 0.0;
    #else
      bend(gl_Position, aShape.z, aOwn);
    #endif
  }
`,ge=`
  uniform sampler2D uMap;
  ${F}
  varying vec2 vUv;
  varying vec3 vWorld;
  varying vec3 vOwnNormal;
  varying vec4 vLook;
  varying float vKind;
  varying float vSeed;
  varying float vAppear;
  varying float vWrong;
  uniform vec4 uSlab; // the floor seen from outside (land.js: SLAB): its width at the camera, how much wider for each unit ahead, how far behind it ends
  ${P}
  ${de}
  ${L}
  ${pe}

  void main() {
    #ifndef FRAME
      #ifdef MIRROR
        if (vWorld.y > 0.0 || outside()) discard; // nothing over the floor in the mirror, and no mirror seen from outside
      #else
        if (vWorld.y < 0.0) discard; // nothing under it
      #endif
    #endif
    #ifdef PANE
      // A lane lies on the floor: never past its edges, as the turn sees them.
      float wide = vWorld.z > 0.0 ? uSlab.x * (1.0 - vWorld.z / uSlab.z) : uSlab.x - uSlab.y * vWorld.z;
      if (vWorld.y < 1.0 && abs(vWorld.x) > wide) discard;
    #endif
    if (vAppear <= bayer4(gl_FragCoord.xy)) discard;
    vec2 uv = vWrong > 0.5 ? wrong(vUv, vWrong) : vUv;
    vec3 c;
    if (uFine > 0.5) {
      float s = 0.004;
      c = vec3(texture2D(uMap, uv + vec2(s, 0.0)).r, texture2D(uMap, uv).g, texture2D(uMap, uv - vec2(s, 0.0)).b);
    } else c = texture2D(uMap, uv).rgb;
    if (luma(c) < vLook.z) discard;
    #ifdef PANE
      float side = 0.0;
    #else
      float side = 1.0 - step(0.5, abs(vOwnNormal.z));
    #endif
    c = mix(c, ${N(S)} * (0.55 + 0.45 * hash(vec2(vSeed, 3.0))), side * 0.8);
    c *= vLook.x * (0.55 + 0.45 * smoothstep(0.0, 60.0, abs(vWorld.y)));
    c += side * vLook.y * ${N(S)};
    float fog = clamp(floor(vLook.w * 8.0 + bayer4(gl_FragCoord.xy)) / 8.0, 0.0, 1.0);
    c = mix(c, vKind > 1.5 && vKind < 2.5 ? ${N(ee)} : ${N(b)}, fog * 0.88);
    #ifdef MIRROR
      // Broken by the ripples going by, as the sky's image is.
      vec3 ray = vWorld - cameraPosition;
      float below = max(-ray.y, 0.0) / (2.0 * uView.z * max(-ray.z, 1e-3));
      float z = ahead(below);
      c = floorAir(c * murk(below) * ripple(z).y * ${M(v)}, z, below, gl_FragCoord.xy);
    #endif
    gl_FragColor = vec4(c, 1.0);
  }
`,_e=`
  uniform vec4 uPortal;
  void main() {
    vec3 edge = position;
    float a = edge.x + uPortal.z;
    vec2 out2 = vec2(cos(a), sin(a));
    vec4 clip;
    if (edge.z < -0.5) {
      vec4 heart = projectionMatrix * viewMatrix * vec4(0.0, ${M(d)}, -uPortal.x, 1.0);
      clip = vec4(heart.xy / heart.w + out2 * 8.0, 0.0, 1.0);
    } else {
      clip = projectionMatrix * viewMatrix * vec4(vec3(out2 * edge.y * uPortal.y, 0.0) + vec3(0.0, ${M(d)}, -uPortal.x), 1.0);
    }
    bool inside = edge.z > 0.5;
    #if PASS == 0
      clip.z = (inside ? 0.999999 : -1.0) * clip.w;
    #else
      clip.z = inside ? mix(clip.z, -clip.w, uPortal.w) : 0.999999 * clip.w;
    #endif
    gl_Position = clip;
  }
`,ve=`
  void main() {
    gl_FragColor = vec4(0.0);
  }
`,z=`
  uniform sampler2D uMap;
  uniform sampler2D uOld;
  uniform float uSwap;
  vec3 read(vec2 uv) {
    if (uSwap < 1.0 && hash(vec2(floor(gl_FragCoord.y / 6.0), 3.0)) >= uSwap) return texture2D(uOld, uv).rgb;
    return texture2D(uMap, uv).rgb;
  }
`,ye=`
  ${F}
  varying vec2 vUv;
  ${P}
  ${z}
  ${I}
  ${ue}
  void main() {
    vec2 uv = rest(look());
    float up = max(0.0, uv.y - uView.y) / (1.0 - uView.y);
    vec3 curtain = read(vec2((uv.x - uView.x) * 0.6 * uView.w + 0.5 + uFlown * 0.00004, 0.31 + up * 0.05));
    float fade = 1.0 - up;
    fade = floor(fade * fade * 6.0 + bayer4(gl_FragCoord.xy / 2.0)) / 6.0;
    vec3 c = curtain * fade * 0.7 + vec3(0.04, 0.015, 0.1);
    c = mix(c, ${N(te)}, pow(1.0 - up, 9.0));
    gl_FragColor = vec4(c, 1.0);
  }
`,be=`
  ${F}
  varying vec2 vUv;
  varying vec3 vWorld;
  ${P}
  ${fe}
  uniform sampler2D uMap;
  uniform sampler2D uOld;
  uniform float uSwap;
  uniform float uRow; // how deep a row of the mesh is (the lightest tier's are twice as deep)
  float high(vec2 uv) {
    float h = luma(textureLod(uMap, uv, 5.0).rgb) * 0.75 + luma(textureLod(uMap, uv, 3.0).rgb) * 0.25;
    if (uSwap < 1.0) h = mix(luma(textureLod(uOld, uv, 5.0).rgb) * 0.75 + luma(textureLod(uOld, uv, 3.0).rgb) * 0.25, h, uSwap);
    return h;
  }
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    world.z += mod(uFlown, uRow);
    vec2 ground = vec2(world.x, world.z - uFlown);
    vUv = ground / vec2(${M(C.tile[0])}, ${M(C.tile[1])}) + vec2(0.5, 0.0);
    float h = high(vUv);
    world.y += h * h * ${M(C.hills)};
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
    bend(gl_Position, hash(floor(ground / 320.0)), vec3(0.0));
  }
`,xe=`
  ${F}
  varying vec2 vUv;
  varying vec3 vWorld;
  varying float vWrong;
  ${P}
  ${z}
  ${L}
  void main() {
    float far = distance(cameraPosition, vWorld);
    vec2 uv = vWrong > 0.5 ? wrong(fract(vUv), vWrong) : vUv;
    vec3 c = read(uv);
    if (uFine > 0.5) {
      float close = smoothstep(260.0, 60.0, far);
      for (int i = 1; i <= 3; i++) c = max(c, read(uv + vec2(0.0, float(i) * 0.012 * close)) * (1.0 - 0.22 * float(i)));
    }
    vec3 n = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
    if (n.y < 0.0) n = -n;
    c *= (0.5 + 0.75 * max(0.0, dot(n, normalize(vec3(0.45, 0.6, 0.55))))) * ${M(w)};
    float fog = smoothstep(${M(C.deep*.25)}, ${M(C.deep*.92)}, far);
    fog = clamp(floor(fog * 9.0 + bayer4(gl_FragCoord.xy / 2.0)) / 9.0, 0.0, 1.0);
    gl_FragColor = vec4(mix(c, ${N(te)}, fog), 1.0);
  }
`,Se=`
  ${F}
  varying vec2 vUv;
  ${P}
  ${z}
  ${I}
  ${ue}
  void main() {
    vec2 p = (rest(look()) - uView.xy) * vec2(uView.w, 1.0);
    float r = length(p);
    float a = atan(p.y, p.x);
    float deep = 0.3 / (r + 0.035);
    vec2 uv = vec2(a / 6.2831853 * 2.0 + deep * ${M(ne)} + uFlown * ${M(re)}, deep * 0.5 + uFlown * ${M(ie)});
    vec3 c = read(uv);
    if (uFine > 0.5) {
      float close = smoothstep(0.1, 0.9, r);
      for (int i = 1; i <= 4; i++) c = max(c, read(uv - vec2(0.0, float(i) * 0.014 * close)) * (1.0 - 0.2 * float(i)));
    }
    c += pow(luma(c), 2.2) * vec3(0.55, 0.45, 1.0) * 0.9;
    float rib = fract(log2(r + 0.02) * 2.6 - uFlown * ${M(ie*5)});
    float walls = smoothstep(0.03, 0.2, r);
    c *= 1.0 - step(0.8, rib) * 0.55 * walls;
    c += step(0.74, rib) * step(rib, 0.8) * vec3(0.5, 0.45, 0.85) * 0.5 * walls;
    c *= 0.42 + 0.6 * smoothstep(0.0, 0.85, r);
    float end = smoothstep(0.3, 0.0, r);
    end = floor(end * end * 7.0 + bayer4(gl_FragCoord.xy / 2.0)) / 7.0;
    c = mix(c, vec3(0.66, 0.62, 0.98), clamp(end, 0.0, 1.0));
    gl_FragColor = vec4(c, 1.0);
  }
`,Ce=`
  uniform sampler2D uMap;
  uniform float uTurn;
  ${F}
  varying vec2 vUv;
  varying vec3 vRay;
  varying vec3 vAcross;
  ${P}
  ${I}

  const vec3 SUN = ${N(O)};

  // The air seen edge-on, from the ground (0) to its top (1).
  vec3 air(float x) {
    vec3 c = mix(vec3(0.9, 1.0, 0.96), vec3(0.32, 0.86, 1.0), smoothstep(0.0, 0.18, x));
    c = mix(c, vec3(0.18, 0.34, 1.0), smoothstep(0.16, 0.45, x));
    return mix(c, vec3(0.44, 0.14, 0.74), smoothstep(0.42, 0.9, x));
  }

  // The sky is the faces of a cube cut into cells, and a cell may hold a star:
  // a point the size of a pixel (pixel: its size, in radians), most of them
  // faint. (A hash without a sine: the sine's lines would line the stars up.)
  vec3 cellHash(vec2 p) {
    vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.103, 0.0973));
    q += dot(q, q.yxz + 33.33);
    return fract((q.xxy + q.yzz) * q.zyx);
  }
  float star(vec3 d, float pixel) {
    vec3 a = abs(d);
    vec3 face = a.x > max(a.y, a.z) ? vec3(d.yz / a.x, sign(d.x)) : a.y > a.z ? vec3(d.xz / a.y, 2.0 * sign(d.y)) : vec3(d.xy / a.z, 3.0 * sign(d.z));
    vec2 cell = floor(face.xy * ${M(j)});
    vec3 seed = cellHash(cell + face.z * 1000.0);
    float here = seed.x;
    if (here >= ${M(le)}) return 0.0;
    vec2 at = (cell + 0.2 + 0.6 * seed.yz) / ${M(j)};
    float bright = pow(1.0 - here / ${M(le)}, 4.0);
    return step(length(face.xy - at), pixel * (0.55 + 0.5 * step(0.7, bright))) * (0.12 + 0.9 * bright);
  }

  void main() {
    float dither = bayer4(gl_FragCoord.xy);
    float pixel = length(fwidth(vRay)) / length(vRay);
    vec3 d = normalize(vRay + vAcross * (torn(vUv).x - vUv.x));
    vec3 o = vec3(0.0, ${M(1+T.high)}, 0.0);
    float b = dot(o, d);
    float disc = b * b - dot(o, o) + 1.0;
    float toSun = dot(d, SUN);
    float sunward = pow(max(toSun, 0.0), 10.0);
    vec3 c;
    bool ground = b < 0.0 && disc > 0.0;
    if (ground) {
      vec3 n = o + d * (-b - sqrt(disc));
      float side = dot(normalize(n.xz + 1e-4), normalize(SUN.xz)) * 0.5 + 0.5; // 1 on the side towards the sun
      vec3 glass = texture2D(uMap, n.xz * 2.4 + vec2(0.31, 0.47 + uTurn * 0.01)).rgb;
      c = glass * (0.03 + 0.32 * smoothstep(0.55, 0.9, luma(glass)));
      float dawn = floor(smoothstep(-0.1, 0.3, dot(n, SUN)) * 4.0 + dither) / 4.0;
      c += (glass * 0.5 + ${N(k)} * 0.12) * dawn;
      float mu = -dot(n, d); // 1 looking straight down … 0 at the rim
      float haze = floor(exp(-mu * 6.0) * 7.0 + dither) / 7.0;
      c = mix(c, air(0.1) * (0.12 + 0.55 * side * side) + vec3(1.0, 0.6, 0.32) * sunward * 0.9, haze);
    } else {
      vec3 low = o + d * max(-b, 0.0);
      float x = (length(low) - 1.0) / ${M(T.air)};
      float layer = floor(x * 9.0 + dither) / 9.0;
      float dense = x < 1.0 ? exp(-layer * 2.4) * (1.0 - layer) : 0.0;
      float lit = 0.6 + 0.6 * smoothstep(-0.5, 0.6, dot(normalize(low), SUN));
      c = air(layer) * dense * lit + vec3(1.0, 0.6, 0.32) * dense * sunward * 1.6;
      c += star(d, pixel) * (1.0 - dense);
    }
    // The sun, where the planet doesn't hide it, and its halo and rays over everything.
    float off = length(cross(d, SUN)) + step(toSun, 0.0);
    if (!ground && off < ${M(ae)}) c = vec3(1.0);
    float halo = 0.0006 / (off * off + 0.0006);
    c += ${N(k)} * floor(halo * 5.0 + dither) / 5.0 * 0.8;
    vec3 sun = mat3(viewMatrix) * SUN;
    if (sun.z < 0.0 && uFine > 0.5) {
      vec3 v = mat3(viewMatrix) * d;
      vec2 q = v.xy / -v.z - sun.xy / -sun.z;
      float rays = step(abs(q.y), pixel) * max(0.0, 1.0 - abs(q.x) / 0.45) + step(abs(q.x), pixel) * max(0.0, 1.0 - abs(q.y) / 0.25);
      c += ${N(k)} * floor(rays * 5.0 + dither) / 5.0;
    }
    gl_FragColor = vec4(c, 1.0);
  }
`,we=`
  attribute vec3 aOwn;
  attribute vec4 aAnchor;
  attribute vec4 aSpin;
  attribute vec4 aCrop;
  attribute vec4 aShape;
  attribute vec4 aLook;
  uniform float uTurn;
  varying vec2 vUv;
  varying vec3 vWorld;
  varying vec3 vOwn;
  varying vec3 vOwnNormal;
  varying vec4 vLook;
  varying float vKind;
  varying float vSeed;
  ${P}
  ${fe}
  void main() {
    vec3 axis = normalize(vec3(hash(vec2(aShape.z, 1.0)), hash(vec2(aShape.z, 2.0)), hash(vec2(aShape.z, 3.0))) - 0.499);
    float a = aAnchor.w * uTurn;
    vec3 local = position * cos(a) + cross(axis, position) * sin(a) + axis * dot(axis, position) * (1.0 - cos(a));
    vec3 world = aAnchor.xyz + aSpin.xyz * uTurn + local;
    vUv = aCrop.xy + uv * aCrop.zw;
    vWorld = world;
    vOwn = aOwn;
    vOwnNormal = normal;
    vLook = aLook;
    vKind = aShape.w;
    vSeed = aShape.z;
    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
    bend(gl_Position, aShape.z, aOwn);
  }
`,Te=`
  uniform sampler2D uMap;
  ${F}
  varying vec2 vUv;
  varying vec3 vWorld;
  varying vec3 vOwn;
  varying vec3 vOwnNormal;
  varying vec4 vLook;
  varying float vKind;
  varying float vSeed;
  varying float vWrong;
  ${P}
  ${L}
  ${pe}

  const vec3 SUN = ${N(O)};

  float lattice(vec2 p, vec2 w) {
    float f = fract(p.y);
    float rails = step(p.x, w.x) + step(1.0 - w.x, p.x);
    float rung = step(f, w.y);
    float brace = step(abs(mix(f, 1.0 - f, mod(floor(p.y), 2.0)) - p.x), w.x * 0.8);
    return min(1.0, rails + rung + brace);
  }

  void main() {
    if (!outside()) discard;
    vec3 V = normalize(cameraPosition - vWorld);
    vec3 N = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
    if (dot(N, V) < 0.0) N = -N;
    vec2 pixel = fwidth(vUv);
    vec3 c;
    float side = 0.0;
    if (vKind > 0.5 && vKind < 1.5) {
      if (abs(vOwnNormal.y) > 0.5) discard; // open at its ends
      vec2 w = max(vec2(0.07), pixel * 1.3);
      float s = pixel.x * 1.5;
      vec3 bars = vec3(lattice(vUv + vec2(s, 0.0), w), lattice(vUv, w), lattice(vUv - vec2(s, 0.0), w));
      if (bars.r + bars.g + bars.b < 0.5) discard;
      c = ${N(A)} * bars;
    } else {
      if (vKind < 0.5 && abs(vOwn.y) > 0.5 - vLook.w * hash(vec2(floor(vOwn.x * 7.0 + 3.5) + sign(vOwn.y) * 9.0, vSeed))) discard;
      vec2 uv = vWrong > 0.5 ? wrong(vUv, vWrong) : vUv;
      if (uFine > 0.5) {
        float s = 0.004;
        c = vec3(texture2D(uMap, uv + vec2(s, 0.0)).r, texture2D(uMap, uv).g, texture2D(uMap, uv - vec2(s, 0.0)).b);
      } else c = texture2D(uMap, uv).rgb;
      if (luma(c) < vLook.z) discard;
      // Holographic: its colours drawn out, and a film over them that shifts as we go round.
      float film = dot(reflect(-V, N), vec3(0.3, 0.8, 0.5)) * 1.4 + vSeed * 3.0;
      c = mix(vec3(luma(c)), c, 1.5) * mix(vec3(1.0), (0.5 + 0.5 * cos(6.2831853 * (film + vec3(0.0, 0.33, 0.67)))) * 1.4, 0.35);
      side = 1.0 - step(0.5, abs(vOwnNormal.z));
      c = mix(c, ${N(S)} * (0.55 + 0.45 * hash(vec2(vSeed, 3.0))), side * 0.45);
    }
    float lit = floor(max(dot(N, SUN), 0.0) * 4.0 + bayer4(gl_FragCoord.xy)) / 4.0;
    c *= vLook.x * (0.7 + 0.6 * lit);
    c += side * vLook.y * ${N(S)};
    c += ${N(k)} * pow(1.0 - abs(dot(N, V)), 3.0) * pow(max(dot(-V, SUN), 0.0), 4.0) * 1.2;
    c += ${N(oe)} * max(-N.y, 0.0) * 0.22;
    float far = smoothstep(${M(ce[0])}, ${M(ce[1])}, distance(cameraPosition, vWorld));
    far = floor(far * 6.0 + bayer4(gl_FragCoord.xy)) / 6.0;
    gl_FragColor = vec4(mix(c, ${N(se)}, far * 0.9), 1.0);
  }
`,Ee=`
  varying vec3 vWorld;
  varying vec3 vNormal;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vNormal = normal;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,De=`
  uniform sampler2D uMap;
  ${F}
  varying vec3 vWorld;
  varying vec3 vNormal;
  ${P}
  ${pe}

  const vec3 SUN = ${N(O)};

  void main() {
    if (!outside()) discard;
    vec2 px = gl_FragCoord.xy;
    vec3 V = normalize(cameraPosition - vWorld);
    float ahead = -vWorld.z;
    vec3 c;
    if (vNormal.y > 0.5) {
      vec3 glass = texture2D(uMap, vec2(vWorld.x, ahead + uFlown) / 170.0 + vec2(0.31, 0.12)).rgb;
      c = vec3(0.012, 0.01, 0.03) + glass * (0.015 + smoothstep(0.45, 0.85, luma(glass)) * 0.3);
      float band = floor((ahead + uFlown) / ${M(y)});
      c *= 0.7 + 0.5 * step(0.55, hash(vec2(band, 6.0)));
      float glint = pow(max(dot(reflect(-V, vec3(0.0, 1.0, 0.0)), SUN), 0.0), 400.0);
      c += ${N(k)} * floor(glint * 5.0 + bayer4(px)) / 5.0 * 0.7;
      c += ${N(x)} * floor(pow(1.0 - max(V.y, 0.0), 8.0) * 4.0 + bayer4(px)) / 4.0 * 0.25; // the air's light, grazing
    } else if (vNormal.y < -0.5) {
      c = ${N(se)} * 2.0;
    } else {
      float facet = hash(vec2(floor(vWorld.x / 60.0 + vWorld.z / 60.0), 3.0));
      float lit = floor(max(dot(normalize(vNormal), SUN), 0.0) * 4.0 + bayer4(px)) / 4.0;
      c = ${N(S)} * (0.5 + 0.3 * facet + 0.5 * lit);
    }
    float far = smoothstep(${M(ce[0]*.5)}, ${M(ce[1]*.5)}, distance(cameraPosition, vWorld));
    far = floor(far * 6.0 + bayer4(px)) / 6.0;
    gl_FragColor = vec4(mix(c, ${N(b)} * 0.6, far * 0.85), 1.0);
  }
`,Oe=c.lens,ke=[5,15e4],Ae=[{far:15e3,high:.62,wide:.07,lean:.05,turn:.35,top:.3,haze:.35},{far:17e3,high:.36,wide:.05,lean:-.03,turn:.3,top:.55,haze:.3},{far:19e3,high:.42,wide:.06,lean:-.06,turn:-.35,top:.3,haze:.45},{far:16e3,high:.7,wide:.08,lean:.08,turn:-.45,top:.8,haze:.4}],je={far:38e3,panes:40,high:.1,turn:.02},Me=40,Ne=240,Pe=110,Fe=3e3,Ie=[1,.6,.3],B=[15e-5,.02],Le=[.03,.4],Re={far:1e4,close:100,radius:300,shards:28,turn:1.6},ze=.5,V={wide:40,spread:1.15,behind:700,ahead:22e3,thick:80,broken:.14,lengths:30},Be={from:[80,-4,1100],to:[128,1.5-E,16e3],lengths:6,thick:70},H={at:[192,14-E,7500],panes:44,reach:3400},Ve={at:[262,22-E,2100],columns:8,rows:6,panel:[220,170],hole:[3.6,2.6,1.9],curve:3e-4},He={at:[-20,4,7e3]},U={at:[200,-14,6e3],radius:13e3,tilt:[24,300],lengths:44,thick:130,glass:700},Ue={near:330,splinters:260,slabs:70,fallen:44};function We(e,{picture:t,worlds:n,load:a,keep:o,still:s}){let c=(t=0,n=0,r=0)=>new e.Vector3(t,n,r),l=(t,n,r,i)=>new e.Quaternion().setFromEuler(new e.Euler(t,n,r,i)),u=r(91),p=Math.tan(Oe/2*Math.PI/180),m=Ie.length-1,h=new e.Scene,g=new e.PerspectiveCamera;g.position.set(0,d,0);let _={uView:{value:new e.Vector4(.5,.5,p,4/3)},uFlown:{value:0},uFine:{value:1},uWide:{value:1},uTick:{value:0},uBent:{value:0},uTear:{value:new e.Vector4},uTurn:{value:0},uOut:{value:0},uRush:{value:1},uSlab:{value:new e.Vector4(V.wide,V.spread,V.behind,0)}},v=(t,n,r,i={},a={})=>o(new e.ShaderMaterial({vertexShader:t,fragmentShader:n,uniforms:{..._,...r},defines:i,...a})),y=(t,n)=>{let r=new e.Mesh(t,n);return r.frustumCulled=!1,r},b=o(new e.PlaneGeometry(2,2)),ee=(e,t)=>y(b,v(me,e,t,{},{depthWrite:!1}));function x(t,n){n.sort((e,t)=>e.rank-t.rank);let r=t.attributes,i=r.position.count,a=t.index.array,s={position:3,normal:3,uv:2,aOwn:3,aAnchor:4,aCrop:4,aShape:4,aLook:4,aSpin:4},l={aAnchor:`anchor`,aCrop:`crop`,aShape:`shape`,aLook:`look`,aSpin:`spin`},u={};for(let[e,t]of Object.entries(s))(!l[e]||n[0][l[e]])&&(u[e]=new Float32Array(n.length*i*t));let d=new Uint16Array(n.length*a.length),f=c();n.forEach((e,t)=>{let[n,o]=e.shape;for(let a=0;a<i;a++){let s=t*i+a;f.fromBufferAttribute(r.position,a),u.aOwn.set([f.x,f.y,f.z],s*3);let c=Math.min(1,Math.max(0,f.y+.5));f.x*=1+(n-1)*c,f.y+=o*f.x*c,f.applyMatrix4(e.matrix),u.position.set([f.x,f.y,f.z],s*3),u.normal.set([r.normal.getX(a),r.normal.getY(a),r.normal.getZ(a)],s*3),u.uv.set([r.uv.getX(a),r.uv.getY(a)],s*2);for(let[t,n]of Object.entries(l))u[t]?.set(e[n],s*4)}a.forEach((e,n)=>d[t*a.length+n]=t*i+e)});let p=new e.BufferGeometry;for(let[t,n]of Object.entries(u))p.setAttribute(t,new e.BufferAttribute(n,s[t]));return p.setIndex(new e.BufferAttribute(d,1)),p.userData.counts=Ie.map(e=>n.filter(t=>t.rank<e).length*a.length),t.dispose(),o(p)}let S=(e,t,n)=>{let r=Math.min(.85,n*1.5*(t/e));return[.02+u()*(.96-n),.04+u()*Math.max(.01,.92-r),n,r]},w=(t,n,r,i,a)=>new e.Matrix4().compose(c(0,n*.5*Math.cos(i)-4,0),l(0,a,i,`YXZ`),c(t,n,r)),te=ee(R,{uMap:{value:t}}),ne=[];Ae.forEach(({far:e,high:t,wide:n,lean:r,turn:a,top:o,haze:s},c)=>{let l=(d+t*2*p*e+4)/Math.cos(r),f=(i.monoliths[c]-i.far[0])*2*p*(4/3)*e;ne.push({matrix:w(n*2*p*e,l,e*.027,r,Math.atan2(-f,e)+a),anchor:[f,0,e,0],crop:[.15+u()*.6,.1+u()*.5,.028,.21],shape:[o,.3,u(),1],look:[.5,.65,0,s],rank:-1})});let re=je.far/9500;for(let t=0;t<je.panes;t++){let n=u()*2*Math.PI,r=c(Math.cos(n),Math.sin(n)*.85+.15,(u()-.5)*1.2).normalize(),i=(t%3?300+u()*900:900+u()**1.3*1900)*re,a=(120+u()*520)*re,o=c(-r.y,r.x,0).normalize().applyAxisAngle(r,(u()-.5)*2.4),s=c().crossVectors(o,r).normalize();ne.push({matrix:new e.Matrix4().makeBasis(o.multiplyScalar(a),r.clone().multiplyScalar(i),s.multiplyScalar(24*re)).setPosition(r.multiplyScalar((150+u()*500)*re+i*.5)),anchor:[0,d+je.high*2*p*je.far,je.far,-je.turn/260],crop:S(a,i,.035),shape:[.05+u()*.5,(u()-.5)*.8,u(),2],look:[.95,.3,.07,.12],rank:[.05,.45,.75][t%3]})}for(let e=0;e<104;e++){let t=e<Me,n=(u()<.5?-1:1)*(t?150+u()**1.4*700:900+u()**1.2*8e3),r=t?40+u()*220:(200+u()*600)*(.4+Math.min(1,Math.abs(n)/6e3)*1.3),i=t?16+u()*54:80+u()*260;ne.push({matrix:w(i,r,t?4+u()*8:20+u()*30,(u()-.5)*.6,Math.atan2(-n,2500)+(u()-.5)*1.1),anchor:[n,0,u(),t?Fe:f[1]],crop:S(i,r,t?.06+u()*.12:.02+u()*.03),shape:[.1+u()*.9,(u()-.5)*.8,u(),0],look:[t?1:.9,0,0,-1],rank:u()})}let ie=x(new e.BoxGeometry(1,1,1),ne),T=y(ie,v(he,ge,{uMap:{value:t}},{},{side:e.DoubleSide})),O=y(ie,v(he,ge,{uMap:{value:t}},{MIRROR:``},{side:e.DoubleSide})),ae=[];for(;ae.length<Ne;){let t=ae.length%3>0,n=3+u()**2.5*(t?30:46),r=(u()<.5?-1:1)*(20+u()**1.3*(t?1e3:3600)),i=n+u()**1.8*(t?350:1100);if(Math.hypot(r*.42,i-d)<50+n)continue;let a=.035+u()*.09;ae.push({matrix:new e.Matrix4().compose(c(),l(u()*6.3,u()*6.3,u()*6.3),c(n*(.4+u()*.9),n*(.6+u()*1.6),1)),anchor:[r,i,u(),t?Fe:f[1]],crop:[.03+u()*.8,.05+u()*.75,a,a*(.6+u()*.8)],shape:[1,0,u(),0],look:[.85,0,.22,-1],spin:[(u()-.5)*2.4/260,(u()-.5)*2.4/260,u()*6.3,u()*6.3],rank:u()})}for(let t=0;t<Pe;t++){let t=60+u()*700;ae.push({matrix:new e.Matrix4().compose(c(),l(-Math.PI/2,0,0),c(.4+u()**2*3,t,1)),anchor:[(u()<.5?-1:1)*(6+u()**1.5*700),.3,u(),Fe],crop:[.03+u()*.9,.08+u()*.5,.0015,.2+u()*.3],shape:[1,0,u(),0],look:[.9,0,.12,-1],spin:[0,0,0,0],rank:u()})}let k=y(x(new e.PlaneGeometry(1,1),ae),v(he,ge,{uMap:{value:t}},{PANE:``},{side:e.DoubleSide})),oe={uMap:{value:t},uOld:{value:t},uSwap:{value:1}},se=ee(ye,oe),ce=[1,2].map(t=>{let n=C.deep/C.rows*t,r=o(new e.PlaneGeometry(2,C.deep,C.cols/t,C.rows/t).rotateX(-Math.PI/2).translate(0,0,n-C.deep/2)),i=r.attributes.position;for(let e=0;e<i.count;e++){let t=i.getX(e);i.setX(e,t*(.25+.75*Math.abs(t)))}let a=r.index.array,s=new a.constructor(a.length);for(let e=0;e<a.length;e+=3)s.set(a.subarray(a.length-e-3,a.length-e),e);return r.setIndex(new e.BufferAttribute(s,1)),r.userData.row=n,r}),A={value:ce[0].userData.row},j=y(ce[0],v(be,xe,{...oe,uRow:A}));j.position.y=d-C.eye;let le={uMap:{value:t},uOld:{value:t},uSwap:{value:1}},M=ee(Se,le),N={value:new e.Vector4(Re.far,Re.radius,0,0)},P=Array.from({length:Re.shards},(e,t)=>[(t+(u()-.5)*.4)/Re.shards*2*Math.PI,.8+u()*.4]),F=[];P.forEach(([e,t],n)=>{let[r,i]=P[(n+1)%P.length];F.push(0,0,1,e,t,1,r,i,1),F.push(e,t,0,r,i,0,r,0,-1,e,t,0,r,0,-1,e,0,-1)});let I=o(new e.BufferGeometry);I.setAttribute(`position`,new e.Float32BufferAttribute(F,3));let ue=t=>y(I,v(_e,ve,{uPortal:N},{PASS:t},{depthFunc:e.AlwaysDepth,colorWrite:!1,side:e.DoubleSide})),[de,fe]=[ue(0),ue(1)],L={value:t},pe=y(x(new e.BoxGeometry(1,1,1),P.map(([t,n],r)=>{let i=.35+u()**1.4*.9,a=c(Math.cos(t),Math.sin(t),0).applyAxisAngle(c(-Math.sin(t),Math.cos(t),0),(u()-.5)*.6),o=c(-Math.sin(t),Math.cos(t),0).applyAxisAngle(a,(u()-.5)*1.3),s=c().crossVectors(o,a).normalize();return{matrix:new e.Matrix4().makeBasis(o.multiplyScalar(.12+u()*.2),a.clone().multiplyScalar(i),s.multiplyScalar(.04)).setPosition(a.multiplyScalar(n+i*.5-.06).add(c(0,0,.03))),crop:S(1,4,.05+u()*.1),shape:[.2+u()*.6,(u()-.5)*.5,u(),0],look:[1,.5,0,0],rank:r%2?.5:0}})),v(he,ge,{uMap:L,uPortal:N},{FRAME:``},{side:e.DoubleSide})),z=(e,t,n)=>c(...D(e,t)).multiplyScalar(n),We=()=>c(u()-.5,u()-.5,u()-.5).normalize(),Ge=()=>l(u()*6.3,u()*6.3,u()*6.3,`XYZ`),Ke=(t,n)=>{let r=t.clone().normalize(),i=n.clone().addScaledVector(r,-n.dot(r)).normalize();return new e.Quaternion().setFromRotationMatrix(new e.Matrix4().makeBasis(c().crossVectors(r,i),r,i))},qe=[];function W(t,n,r,i,{crop:a,look:o,top:s=1,slant:l=0,tumble:d=0,drift:f=c(),rank:p=u()}){let[m,h,g]=[c(r[0],0,0),c(0,r[1],0),c(0,0,r[2])].map(e=>e.applyQuaternion(i));qe.push({matrix:new e.Matrix4().makeBasis(m,h,g),anchor:[n.x,n.y,n.z,d],spin:[f.x,f.y,f.z,0],crop:a,shape:[s,l,u(),t],look:o,rank:p})}let G=(e,t)=>{let n=.1+u()*.16,r=Math.min(.6,n*1.5*(t/e));return[.3+u()*(.55-n),.32+u()*(.62-r),n,r]},K=(e,t,n,r,i={})=>W(0,e,[t,n,Math.max(3,t*.02)],r,{crop:G(t,n),look:[1,.35,.24,.08+u()*.3],top:.35+u()*.65,slant:(u()-.5)*.6,...i}),q=(e,t,n,r,i={})=>W(1,e,[n,t,n],r,{crop:[0,0,1,Math.max(1,Math.round(t/n))],look:[1,0,0,0],...i}),J=(e,t,n={})=>{let r=.035+u()*.09;W(2,e,[t*(.4+u()*.9),t*(.6+u()*1.6),Math.max(.6,t*.05)],Ge(),{crop:[.03+u()*.8,.05+u()*.75,r,r*(.6+u()*.8)],look:[.9,.3,.22,0],top:u()*.6,slant:(u()-.5)*1.2,...n})};{let e=z(...Be.from),t=z(...Be.to).clone().sub(e).divideScalar(Be.lengths);for(let n=0;n<Be.lengths;n++){let r=e.clone().addScaledVector(t,n+.5).addScaledVector(We(),t.length()*.06),i=t.clone().normalize().applyAxisAngle(We(),(u()-.5)*.22),a=t.length()*(.72+u()*.14),o=r.clone().negate();q(r,a,Be.thick,Ke(i,o),{tumble:(u()-.5)*.05,rank:0});let s=c().crossVectors(i,o).normalize();s.y<0&&s.negate();for(let e=0;e<3;e++){if(u()<.25)continue;let t=a/3*(.8+u()*.15),n=Be.thick*(4+u()*5),c=(u()-.3)*.9;K(r.clone().addScaledVector(i,(e-1)*(a/3)).addScaledVector(s.clone().applyAxisAngle(i,c),n/2+Be.thick*.6),t,n,Ke(s.clone().applyAxisAngle(i,c),o),{top:1,slant:0,tumble:(u()-.5)*.08,rank:e===1?0:u()*.5})}if(n<Be.lengths-1){let r=e.clone().addScaledVector(t,n+1);for(let e=0;e<10;e++)J(r.clone().addScaledVector(We(),Be.thick*(2+u()*6)),Be.thick*(.4+u()*1.4),{tumble:(u()-.5)*3,drift:We().multiplyScalar(Be.thick*2)})}}}{let e=z(...H.at);for(let t=0;t<H.panes;t++){let n=c(u()-.5,(u()-.5)*.8,u()-.5).normalize(),r=(t%3?.12+u()*.35:.35+u()**1.3*.65)*H.reach,i=e.clone().addScaledVector(n,H.reach*(.1+u()*.2)+r*.5),a={tumble:(u()-.5)*.25,drift:n.clone().multiplyScalar(H.reach*(.03+u()*.05)),rank:t<14?0:u()},o=e.clone().negate().applyAxisAngle(n,(u()-.5)*1.4);t%11==5?q(i,r,40,Ke(n,o),a):K(i,90+u()*260,r,Ke(n,o),{...a,top:.05+u()*.5,look:[1,.35,.1,.1]})}}{let{columns:t,rows:n,panel:[r,i],hole:a,curve:o}=Ve,s=z(...Ve.at),d=s.clone().negate().normalize().applyAxisAngle(c(0,1,0),.65),f=c().crossVectors(c(0,1,0).applyAxisAngle(d,.12),d).normalize(),p=c().crossVectors(d,f),m=t-2,h=new e.Quaternion().setFromAxisAngle(p.clone().addScaledVector(d,.4).normalize(),-.35),g=s.clone().addScaledVector(f,(m-t/2)*r),_=d.clone().multiplyScalar(-r*.6).addScaledVector(f,r*.5),v=(e,a)=>{let c=(e-t/2)*r,l=s.clone().addScaledVector(f,c).addScaledVector(p,(a-n/2)*i).addScaledVector(d,-c*c*o);return e<m?l:l.sub(g).applyQuaternion(h).add(g).add(_)},y=n=>{let i=new e.Quaternion().setFromAxisAngle(p,Math.atan(2*o*(n+.5-t/2)*r)).multiply(Ke(p,d));return n<m?i:h.clone().multiply(i)},b=(e,t)=>Math.hypot(e-a[0],(t-a[1])*1.2)-a[2]+(u()-.5)*.9;for(let a=0;a<n;a++)for(let n=0;n<t;n++){let t=v(n+.5,a+.5),o=b(n+.5,a+.5);if(o<0){u()<.35&&K(t.addScaledVector(d,r*(.4+u()*1.5)),r*.8,i*.8,Ge(),{tumble:(u()-.5)*1.5,drift:d.clone().multiplyScalar(r*(.3+u()*.6)).addScaledVector(We(),r*.3),rank:u()*.6});continue}let s=o<.9?l((u()-.5)*1.1,(u()-.5)*1.1,0,`XYZ`):new e.Quaternion;K(o<.9?t.addScaledVector(d,r*.25):t,r*.97,i*.95,y(n).multiply(s),{top:1,slant:0,look:[1,.35,.24,o<.9?.35:.04],rank:0})}for(let e=0;e<=n;e++)for(let n=0;n<t;n++)b(n+.5,e)>-.3&&q(v(n+.5,e),r,30,y(n).multiply(l(0,0,Math.PI/2,`XYZ`)),{rank:0})}{let e=z(...U.at),t=c(...D(U.tilt[1],90-U.tilt[0])),n=c().crossVectors(t,c(0,0,1)).normalize(),r=c().crossVectors(t,n),i=Array.from({length:4},()=>({shift:We().multiplyScalar(U.radius*.03),turn:l((u()-.5)*.06,(u()-.5)*.06,(u()-.5)*.06,`XYZ`)}));for(let a=0;a<U.lengths;a++){let o=Math.floor(a/U.lengths*4);if(a%(U.lengths/4)<1.5)continue;let s=(a+(u()-.5)*.3)/U.lengths*2*Math.PI,d=n.clone().multiplyScalar(Math.cos(s)).addScaledVector(r,Math.sin(s)),f=c().crossVectors(t,d).applyQuaternion(i[o].turn),p=e.clone().addScaledVector(d,U.radius).add(i[o].shift),m=2*Math.PI*U.radius/U.lengths*(.75+u()*.2),h=t.clone().applyQuaternion(i[o].turn),g=Ke(f.clone().applyAxisAngle(We(),(u()-.5)*.08),d);q(p,m,U.thick,g,{tumble:(u()-.5)*.02,rank:u()*.3}),u()<.8&&K(p.clone().addScaledVector(d,-U.glass*.5-U.thick*.5),m*(.85+u()*.15),U.glass*(.6+u()*.5),Ke(d,h).multiply(l(0,0,Math.PI/2,`XYZ`)),{top:1,slant:0,tumble:(u()-.5)*.03,rank:u()*.5})}}{let e=z(...He.at);q(e,3200,60,Ke(c(1,.45,.25),e.clone().negate()),{tumble:.03,rank:0});for(let t=0;t<6;t++)K(e.clone().addScaledVector(We(),400+u()*900),150+u()*300,300+u()*700,Ge(),{tumble:(u()-.5)*.2,rank:t<3?0:u()})}for(let e=0;e<Ue.slabs;e++){let e=Ue.near*2+u()**1.6*6e3,t=e*(.05+u()*.12);K(z(u()*360,4-E+u()*44,e),t*(.35+u()*.6),t,Ge(),{tumble:(u()-.5)*.6,drift:We().multiplyScalar(e*.02)})}for(let e=0;e<Ue.splinters;e++){let e=Ue.near+u()**2*5e3;J(z(u()*360,3-E+u()*46,e),6+e*(.01+u()*.03),{tumble:(u()-.5)*5,drift:We().multiplyScalar(10+u()*40)})}for(let e=0;e<Ue.fallen;e++){let e=z(u()*360,.3-E+u()**1.5*3.5,12e3+u()*26e3);u()<.3?q(e,800+u()*2400,40+u()*30,Ge(),{tumble:(u()-.5)*.06,rank:u()*.6}):K(e,150+u()*500,300+u()*900,Ge(),{tumble:(u()-.5)*.06,rank:u()*.6})}let Je=y(b,v(me,Ce,{uMap:{value:t}},{},{depthWrite:!1})),Ye=y(x(new e.BoxGeometry(1,1,1),qe),v(we,Te,{uMap:{value:t}},{},{side:e.DoubleSide})),Xe=e=>e>0?V.wide*(1-e/V.behind):V.wide-V.spread*e,Ze=[new e.Vector2(0,V.behind)],Y=e=>V.behind-(V.behind+V.ahead)*(e/V.lengths)**1.7;for(let t=1;t<=V.lengths;t++)Ze.push(new e.Vector2(-Xe(Y(t))*(1+V.broken*u()),Y(t)));let Qe=Xe(-V.ahead);for(let t=1;t<12;t++)Ze.push(new e.Vector2(-Qe+2*Qe*t/12,-V.ahead*(1+(u()-.3)*.12)));for(let t=V.lengths;t>=1;t--)Ze.push(new e.Vector2(Xe(Y(t))*(1+V.broken*u()),Y(t)));let $e=new e.Shape(Ze),et=y(o(new e.ExtrudeGeometry($e,{depth:V.thick,bevelEnabled:!1}).rotateX(Math.PI/2)),v(Ee,De,{uMap:{value:t}})),tt={ending:[te,O,T,k],terrain:[se,j],vortex:[M],turn:[Ye,et,Je]};h.add(de,fe,pe,...Object.values(tt).flat());let nt={terrain:oe,vortex:le},rt=new Set([`ending`]),it=new Set,at=0;function ot(t){!rt.has(t)&&nt[t]&&(rt.add(t),a(n[t]).then(n=>{o(n),n.colorSpace=e.NoColorSpace,n.wrapS=n.wrapT=e.MirroredRepeatWrapping,nt[t].uMap.value=n,nt[t].uSwap.value=s||!it.has(t)?1:0,at=0},()=>{}))}let st=-1,ct=null,lt=null,ut=!1,dt=4/3,ft=Oe;function pt(e){ft=e;let t=Math.tan(e/2*(Math.PI/180)),n=-2*t*dt*i.far[0],r=2*t*i.horizon,[a,o]=ke;g.projectionMatrix.makePerspective(n*a,(n+2*t*dt)*a,r*a,(r-2*t)*a,a,o),g.projectionMatrixInverse.copy(g.projectionMatrix).invert()}function mt(){it=new Set(ut?[`ending`,`turn`]:[ct,lt]);for(let[e,t]of Object.entries(tt))t.forEach((t,n)=>{t.visible=it.has(e),t.renderOrder=(e===lt?10:30)+n});ut&&[Ye,et,O,T,k,Je,te].forEach((e,t)=>e.renderOrder=30+t),st===m&&(O.visible=!1),de.visible=fe.visible=pe.visible=!!lt&&!ut,de.renderOrder=0,fe.renderOrder=20,pe.renderOrder=40}let ht=0;return{scene:h,camera:g,portal:()=>lt&&!ut?{far:N.value.x,radius:N.value.y,near:ht}:null,resize(e){dt=e,pt(ft),_.uView.value.set(i.far[0],1-i.horizon,p,dt),_.uWide.value=dt/(4/3),j.scale.x=C.deep*2*p*dt*Math.max(i.far[0],1-i.far[0])*1.15},update({now:e,dt:n,travelled:i,rush:a=1,tier:o,bend:c,world:l,portal:u,lens:d=Oe,turn:f}){_.uFlown.value=i*260,_.uRush.value=a;let p=u&&u.to!==l?u.to:null;if(o!==st||l!==ct||p!==lt||!!f!==ut){st=o,ct=l,lt=p,ut=!!f,_.uFine.value=+(st<m);for(let{geometry:e}of[T,k,pe,Ye])e.setDrawRange(0,e.userData.counts[st]);j.geometry=ce[st<m?0:1],A.value=j.geometry.userData.row,mt()}if(d!==ft&&pt(d),_.uTurn.value=f?.u??0,_.uOut.value=f?.out??0,ot(ct),lt){ot(lt);let e=Math.min(1,Math.max(0,u.near)),n=ct===`ending`;N.value.set(Re.far*(Re.close/Re.far)**(e*e),Re.radius,e*Re.turn,+!n),ht=e,pe.material.depthTest=n,L.value=nt[lt]?.uMap.value??t}for(let e of Object.keys(nt))nt[e].uSwap.value>=1||(at+=n,nt[e].uSwap.value=Math.min(1,Math.floor(at*12)/(ze*12)));let h=Math.floor(e*12);_.uTick.value=h,_.uBent.value=s?0:B[0]+(B[1]-B[0])*c;let g=r(Math.floor(h/4)*7+3),v=_.uTear.value;if(v.w=0,!s&&g()<Le[0]+(Le[1]-Le[0])*c&&h%4<2+Math.floor(g()*3)){let e=g()*.9;v.set(e,e+.01+g()**2*.08,(g()-.5)*.3,1)}}}}var Ge=[{name:`dither`,length:.5,steps:[1],on:[`hit`,`lost`]},{name:`riceboy`,length:.66,steps:[1,1,1,.5],on:[`big`,`world`]},{name:`aberration`,length:.45,steps:[1,1,.5],on:[`big`,`combo`,`step`,`armed`]},{name:`colorama`,length:.6,steps:[1],on:[`combo`,`step`,`world`,`armed`]},{name:`ascii`,length:.5,steps:[1,.5],on:[`step`,`combo`,`world`,`armed`]},{name:`plastic`,length:.6,steps:[1],on:[`combo`,`big`],costly:!0},{name:`threshold`,length:.4,steps:[1],on:[`hit`,`lost`,`big`]},{name:`datamosh`,length:.6,steps:[1,1,.5],on:[`hit`,`world`,`lost`]},{name:`turbulence`,length:.5,steps:[1,1,.5],on:[`world`,`combo`,`step`],costly:!0},{name:`sort`,length:.5,steps:[1,1,.5],on:[`big`,`step`],costly:!0}],Ke=[[`hit`,e=>e.type===`hit`&&1],[`world`,e=>e.type===`world`&&1],[`step`,e=>e.type===`step`&&1],[`armed`,e=>e.type===`armed`&&1],[`lost`,e=>e.type===`lost`&&(e.mult>=4?1:.7)],[`big`,e=>e.type===`kill`&&e.family!==`swarm`&&1],[`combo`,e=>e.type===`combo`&&(e.mult===4||e.mult===8?1:.6)]],qe=[[`#14063a`,`#8ea72c`],[`#04161f`,`#2f93ad`],[`#1c0a16`,`#a0587c`]],W=[[`#ff0000`,`#ffff00`,`#00ff00`,`#00ffff`,`#0000ff`,`#ff00ff`],[`#05000a`,`#5a00c8`,`#ff00a0`,`#101010`,`#a0ff00`,`#f0ffb0`],[`#000000`,`#6a0000`,`#e02400`,`#ff9000`,`#ffe860`,`#ffffff`]],G=3,K=e=>e.every(t=>e.filter(e=>e>=t&&e<t+1).length<=G);function q(e){let t=0,n=null,r=-1,i=[];function a(e){for(let[t,n]of Ke)for(let r of e){let e=n(r);if(e)return[t,e,r]}return null}function o([a,o,s],c){let l=Ge.flatMap((e,t)=>e.on.includes(a)&&t!==r&&!(e.costly&&c>=2)?[t]:[]);if(!l.length)return;let u=l[Math.floor(e()*l.length)],{length:d,steps:f}=Ge[u],p=[t,t+d];f.forEach((e,n)=>n&&e!==f[n-1]&&p.push(t+d*n/f.length)),i=i.filter(e=>e>t-1),K([...i,...p])&&(i.push(...p),n={index:u,power:o,from:t,seed:e(),cause:s},r=u)}return{update(e,r,i){if(t+=e,n&&t-n.from>=Ge[n.index].length&&(n=null),!n&&r.length){let e=a(r);e&&o(e,i)}if(!n)return null;let{index:s,power:c,from:l,seed:u,cause:d}=n,{length:f,steps:p}=Ge[s],m=t-l;return{index:s,amount:p[Math.min(p.length-1,Math.floor(m/f*p.length))]*c,since:m,seed:u,cause:d}},stop(){n=null}}}var J=[[`....`,`....`,`....`,`....`,`....`,`....`,`....`],[`....`,`....`,`....`,`....`,`....`,`.XX.`,`.XX.`],[`....`,`.XX.`,`.XX.`,`....`,`.XX.`,`.XX.`,`....`],[`....`,`....`,`....`,`XXXX`,`....`,`....`,`....`],[`....`,`....`,`XXXX`,`....`,`XXXX`,`....`,`....`],[`....`,`.X..`,`.X..`,`XXX.`,`.X..`,`.X..`,`....`],[`....`,`X.X.`,`.X..`,`XXX.`,`.X..`,`X.X.`,`....`],[`....`,`.X.X`,`XXXX`,`.X.X`,`XXXX`,`.X.X`,`....`],[`X..X`,`...X`,`..X.`,`.X..`,`X...`,`X..X`,`....`],[`.XX.`,`X..X`,`X.XX`,`X.XX`,`X.X.`,`X...`,`.XXX`]],Je=e=>[...e.join(``)].reduce((e,t,n)=>e|(t===`X`?1<<n:0),0),Ye=Ge.map(({name:e,costly:t},n)=>`#define FX_${e.toUpperCase()} ${n+1}\n  #define HAS_${e.toUpperCase()} (PROGRAM == ${t?3:2})`).join(`
  `),Xe=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,Ze=`
  ${Ye}

  uniform sampler2D uScene;
  uniform sampler2D uHud;
  uniform vec2 uSize; // the screen, in its pixels
  uniform vec2 uShake; // in the screen's pixels
  uniform vec2 uFar; // the far point, in the screen's pixels
  uniform float uSpeed; // how hard the speed pulls the picture out from the far point (under 0: in, as speed is lost)
  uniform float uGrain; // the grain's frame
  uniform float uTime; // the screen's own clock, seconds (it stops with the game)
  uniform float uHeat; // the combo, 0 … 1
  uniform int uWires; // the bent machine: wires touching now (0: none),
  uniform float uPatch; // how they are soldered,
  uniform float uReach; // and the share of the rows they touch
  uniform int uFx; // the effect showing (FX_…), or 0
  uniform float uAmount; // how strong it is now, 0 … 1
  uniform float uSince; // seconds since it was set off
  uniform float uSeed; // drawn when it was set off, 0 … 1
  uniform vec2 uAt; // where it was set off, in the screen's pixels
  uniform vec3 uInks[2]; // the total dithering's dark and mid inks
  uniform vec3 uWheel[6]; // Colorama's wheel of colours
  varying vec2 vUv;

  // --- What the artist may tune ---
  const float GRAIN = 0.08; // how strong the grain is at rest
  const float CORNERS = 0.3; // how much darker the corners are
  const float UNDER_SCORE = 0.4; // how much darker the top of the scene is, under the score
  const vec3 SPLIT = vec3(0.016, 0.02, 0.045); // the colours apart towards the edges: at rest, then added by the middle of the combo and by its top
  const float SPEED_SPLIT = 0.012; // and added by the speed
  const vec2 PULL = vec2(0.05, 0.2); // how far the speed pulls the edges out from the far point: everywhere, and more in the sectors that streak
  const float STREAKS = 18.0; // the sectors round the far point, each way of the four
  const float STREAKING = 0.42; // the share of them that streak, changing twelve times a second
  const float HUD_SPLIT = 0.5; // the share of it the interface takes
  const float SHADOW_CYCLES = 3.0; // how far round Colorama's wheel the shadows' light goes
  const float SLIP_RATE = 3.0; // how often a band that slips moves again, a second (each band on its own beat)
  const float DITHER_MID = 0.3; // the total dithering: the light that comes out half one ink, half the other,
  const float DITHER_CONTRAST = 3.2; // and how hard it cuts around it
  const float SORT_REACH = 70.0; // how far the pixel sort drips, pixels
  const float ASCII_BACKDROP = 0.25; // the picture under the characters

  // Dave Hoskins' hash, without sine: the same on every graphics card.
  float hash(vec2 p) {
    vec3 q = fract(vec3(p.xyx) * 0.1031);
    q += dot(q, q.yzx + 33.33);
    return fract((q.x + q.y) * q.z);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }
  float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
  float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }

  // Where on the wheel: 0 … 1 goes round once.
  vec3 wheel(float t) {
    float at = fract(t) * 6.0;
    int i = int(at);
    return mix(uWheel[i], uWheel[(i + 1) % 6], fract(at));
  }

  // The scene and the interface at a place, in the screen's pixels.
  vec3 scene(vec2 p) { return texture2D(uScene, (p + uShake) / uSize).rgb; }
  vec4 hud(vec2 p) { return texture2D(uHud, p / uSize); }
  vec3 both(vec2 p) { vec4 h = hud(p); return mix(scene(p), h.rgb, h.a); }

  // A number drawn for one of the bent machine's wires (its n-th): \`count\`
  // whole numbers from \`from\`. As in camWeb's circuit-bend.js.
  int drawn(int wire, float n, int from, int count) {
    return from + int(hash(vec2(uPatch * 7.31 + float(wire) * 1.37, n)) * float(count));
  }

  // The bent machine: the picture is read from its memory (two of the
  // screen's pixels a place, 240 lines) through address lines with wires
  // soldered between them. In the rows a wire touches, a strip comes again,
  // every other strip is read lower, the lines start later, rows are read
  // later; or one of the colour lines sticks (\`stuck\`: which), or two are
  // crossed (\`crossed\`: how).
  vec2 bent(vec2 p, inout int stuck, inout int crossed) {
    ivec2 size = ivec2(uSize / 2.0);
    ivec2 pixel = ivec2(p / 2.0);
    ivec2 at = pixel;
    for (int wire = 0; wire < 2; wire++) {
      if (wire >= uWires) break;
      float band = floor(float(pixel.y) / float(drawn(wire, 9.0, 2, 12)));
      if (hash(vec2(band, float(wire) + uPatch * 3.1)) > uReach) continue;
      int kind = drawn(wire, 1.0, 0, 7);
      int high = drawn(wire, 2.0, 3, 5); // one of the lines that count for much
      int low = drawn(wire, 3.0, 0, high); // and one under it
      if (kind == 0) at.x = (at.x & ~(1 << high)) | (((at.x >> low) & 1) << high); // a column line follows a lower one: strips come again
      else if (kind == 1) at.y ^= ((at.x >> low) & 1) << high; // a column line on a row line: every other strip is read lower
      else if (kind == 2) at.x ^= ((at.y >> low) & 1) << high; // and the other way: every other band is read further along
      else if (kind == 3) at.x += int(float(pixel.y * drawn(wire, 4.0, 1, 6) * (drawn(wire, 4.5, 0, 2) * 2 - 1)) / 8.0); // the clock slips
      else if (kind == 4) at.y -= drawn(wire, 5.0, 2, 30); // the rows are read later
      else if (kind == 5) stuck = drawn(wire, 6.0, 0, 3); // a colour line sticks
      else crossed = drawn(wire, 7.0, 1, 2); // two colour lines crossed
    }
    at = (at + size * 8) % size;
    return vec2(at * 2) + (p - vec2(pixel * 2));
  }

  // RiceBoy Dreams' ending, its \`amount\` 0 … 1: the edges stretched to the
  // frame in streaks of pixels. Drawn again \`f\`.
  vec2 riceboy(vec2 p, float amount, float f, float wide) {
    vec2 q = gl_FragCoord.xy;
    float row = floor(q.y / 6.0);
    float column = floor(q.x / 6.0);
    float left = floor(amount * (6.0 + 46.0 * pow(hash(vec2(row, f)), 2.0)) * wide) * 2.0;
    float right = floor(amount * (6.0 + 46.0 * pow(hash(vec2(row, f + 50.0)), 2.0)) * wide) * 2.0;
    float bottom = floor(amount * (4.0 + 34.0 * pow(hash(vec2(column + 300.0, f)), 2.0))) * 2.0;
    float top = floor(amount * (4.0 + 34.0 * pow(hash(vec2(column + 200.0, f)), 2.0))) * 2.0;
    return clamp(p, vec2(left, bottom), uSize - 1.0 - vec2(right, top));
  }
  // And how far a band of rows slides aside.
  float slide(float y, float amount, float f, float wide) {
    float band = floor(y / 22.0);
    return step(0.7, hash(vec2(band, f + 9.0))) * floor((hash(vec2(band, f + 4.0)) - 0.5) * 80.0 * amount * wide) * 2.0;
  }

  #if HAS_ASCII
  const int GLYPHS[10] = int[10](${J.map(Je).join(`, `)});
  #endif

  void main() {
    vec2 q = gl_FragCoord.xy; // this pixel
    vec2 p = q; // where the scene is read from
    vec2 s = q; // where the interface is read from
    float medium = smoothstep(0.15, 0.55, uHeat);
    float heavy = smoothstep(0.6, 1.0, uHeat);
    float wide = uSize.x / 640.0; // distances across are written for a screen 640 wide
    vec2 split = vec2(0.0);
    int stuck = -1;
    int crossed = 0;

    // The speed: the picture pulled out from the far point towards its edges
    // (read from nearer it), in hard steps, harder in thin sectors that
    // streak; the interface stays where it is.
    vec2 off = q - uFar;
    #if LIGHT
    float streak = 0.0; // the lightest tier: no streaks
    #else
    float round4 = off.y / (abs(off.x) + abs(off.y) + 1e-3) + 2.0 * step(off.x, 0.0); // a cheap angle: 0 … 4 round the far point
    float streak = step(1.0 - STREAKING, hash(vec2(floor(round4 * STREAKS), floor(uTime * 12.0))));
    #endif
    float pull = uSpeed * smoothstep(0.2, 0.75, length(off) / uSize.y) * (PULL.x + PULL.y * streak);
    p = uFar + off * (1.0 - floor(pull * 48.0 + 0.5) / 48.0);

    #if HAS_DITHER
    if (uFx == FX_DITHER) p = s = floor(q / 2.0) * 2.0 + 0.5; // the total dithering reads the picture in cells of two pixels
    #endif
    #if PROGRAM >= 2
    if (uWires > 0) p = s = bent(p, stuck, crossed);
    #endif

    #if PROGRAM >= 1
    // The middle of the combo: bands slip, thick ones and thin ones, each on
    // its own beat. The interface slips with the thick ones only: the score
    // stays readable.
    if (medium > 0.0) {
      float thick = floor(q.y / 27.0 + 0.37);
      float thin = floor(q.y / 3.0);
      vec2 a = fract(hash(vec2(thick, floor(uTime * SLIP_RATE + hash(vec2(thick, 6.0))))) * vec2(1.0, 7.13));
      vec2 b = fract(hash(vec2(thin, floor(uTime * SLIP_RATE + hash(vec2(thin, 5.0))))) * vec2(1.0, 7.13));
      p.x += step(1.0 - 0.2 * medium - 0.06 * heavy, a.x) * floor((a.y - 0.5) * (8.0 + 8.0 * heavy) * wide) * 2.0;
      s = p;
      p.x += step(1.0 - 0.06 * medium - 0.04 * heavy, b.x) * floor((b.y - 0.5) * (16.0 + 13.0 * heavy) * wide) * 2.0;
    }

    // The top of the combo, as in RiceBoy's ending: in patches towards the
    // sides, blocks of the scene left behind (what was a block or two
    // higher), and its edges stretched to the frame, row by row and column
    // by column. Each changes on its own beat.
    if (heavy > 0.0) {
      // (Several numbers are drawn from one hash, multiplied up: cheaper without a graphics card.)
      vec2 block = floor(q / 32.0);
      vec2 group = floor(block / vec2(3.0, 2.0));
      float beat = floor(uTime * 1.5 + hash(group + 1.0));
      float zone = step(0.62, hash(group + 9.0 + beat)) * smoothstep(0.12, 0.3, abs(q.x / uSize.x - 0.52));
      vec4 picks = fract(hash(block + 0.5 + beat) * vec4(1.0, 7.13, 13.7, 23.3));
      if (picks.x < 0.7 * zone * heavy) {
        p.y += (1.0 + floor(picks.y * 2.0)) * 32.0;
        p.x += step(0.6, picks.z) * floor((picks.w - 0.5) * 32.0 * wide) * 2.0;
      }
      float row = floor(q.y / 7.0);
      float column = floor(q.x / (7.0 * wide));
      vec4 sides = fract(hash(vec2(row, floor(uTime * 2.0 + hash(vec2(row, 8.0))))) * vec4(1.0, 7.13, 13.7, 23.3));
      vec2 ends = fract(hash(vec2(column, 3.0)) * vec2(1.0, 7.13));
      vec2 low = 0.2 * heavy * step(0.5, sides.xy) * sides.zw * sqrt(sides.zw);
      vec2 high = vec2(0.1, 0.025) * heavy * vec2(ends.x * ends.x * ends.x, ends.y);
      p = clamp(p, (vec2(0.012, 0.01) + vec2(low.x, high.x)) * uSize, (1.0 - vec2(0.012 + low.y, 0.004 + high.y)) * uSize);
    }
    #endif

    // Where the effect showing reads from.
    #if HAS_RICEBOY
    if (uFx == FX_RICEBOY) {
      // The interface slides half as far, and isn't stretched: the score and the nanobots stay readable.
      float f = floor(uSince * 8.0) + floor(uSeed * 97.0);
      float amount = uAmount * (0.72 + 0.28 * hash(vec2(f, 1.0)));
      p = riceboy(p, amount, f, wide);
      p.x += slide(p.y, amount, f, wide);
      s.x += floor(slide(s.y, amount, f, wide) / 4.0) * 2.0;
      split.x += floor(7.0 * amount) * 2.0;
    }
    #endif
    #if HAS_ABERRATION
    if (uFx == FX_ABERRATION) split -= (q - uAt) * 0.085 * uAmount + vec2(floor(uAmount * 3.0) * 2.0, 0.0);
    #endif
    #if HAS_DATAMOSH
    if (uFx == FX_DATAMOSH) {
      // Solid blocks of 16 pixels: some repeat the one above, others show
      // the scene from a few blocks higher, carried down as if by the ground.
      vec2 block = floor(q / 16.0);
      float beat = floor(uSince * 6.0 + hash(block + 3.0));
      float pick = hash(block + floor(uSeed * 31.0) + beat * 7.0);
      if (pick < uAmount * 0.12) p.y += 16.0;
      else if (pick < uAmount * 0.45) {
        p.y += (1.0 + floor(hash(block + 5.0) * 4.0)) * 16.0 + floor(uSince * 190.0 * (0.4 + hash(block + 7.0)) / 4.0) * 4.0;
        p.x += step(0.7, hash(block + 9.0 + beat)) * floor((hash(block + 11.0 + beat) - 0.5) * 3.0) * 16.0;
      }
    }
    #endif
    #if HAS_TURBULENCE
    if (uFx == FX_TURBULENCE) {
      // Value noise in two octaves, drifting: cells of about 64 pixels.
      vec2 n = q / 64.0;
      float drift = uSince * 3.6;
      vec2 move = vec2(noise(n + vec2(drift, 0.0)) + 0.5 * noise(n * 2.0 + 11.0), noise(n + vec2(37.1, -drift)) + 0.5 * noise(n * 2.0 + 23.0)) / 1.5 - 0.5;
      p += floor(move * 42.0 * uAmount * wide) * 2.0;
    }
    #endif
    #if HAS_ASCII
    vec2 cell = vec2(5.0, 8.0) * (uAmount > 0.75 ? 2.0 : 1.0); // big characters, then small ones
    if (uFx == FX_ASCII) p += floor(q / cell) * cell + floor(cell / 2.0) + 0.5 - q; // the scene is read at the middle of each
    #endif

    // The colours a little apart towards the edges, more with the combo.
    vec2 d = (q - uFar) / uSize;
    vec2 even = d * vec2(uSize.x / uSize.y * 0.75, 1.0); // as on a screen 4:3
    float r2 = dot(even, even);
    split += d * uSize * r2 * (SPLIT.x + SPLIT.y * medium + SPLIT.z * heavy + SPEED_SPLIT * max(uSpeed, 0.0)) + vec2(1.2 * heavy, 0.0);
    vec3 c = vec3(scene(p + split).r, scene(p).g, scene(p - split).b);

    #if HAS_SORT
    if (uFx == FX_SORT) {
      // Down each column, the bright pixels drip over what is under them,
      // as far as the column's own reach.
      float reach = uAmount * (0.35 + 0.65 * hash(vec2(floor(q.x / 2.0), floor(uSeed * 53.0)))) * SORT_REACH;
      float best = max(luma(c), 0.3);
      for (int i = 1; i <= 8; i++) {
        vec3 above = scene(p + vec2(0.0, floor(reach * float(i) / 8.0)));
        float l = luma(above);
        if (l > best) {
          best = l;
          c = above;
        }
      }
    }
    #endif
    c *= 1.0 - UNDER_SCORE * smoothstep(0.8, 0.98, q.y / uSize.y);

    #if PROGRAM >= 1
    // The middle of the combo: Colorama turning in the shadows. How light a
    // place is picks its colour on the wheel; the shadow keeps its own
    // detail and darkness. The light is taken broadly, so the colours flow
    // along the big shapes, except on the lightest tier. Not under an
    // effect that paints the picture again anyway.
    if (medium > 0.0 && uFx != FX_DITHER && uFx != FX_COLORAMA && uFx != FX_THRESHOLD && uFx != FX_ASCII) {
      float l = luma(c);
      #if !LIGHT
      l = (l + luma(scene(p + vec2(6.0, 5.0))) + luma(scene(p + vec2(-6.0, -5.0))) + luma(scene(p + vec2(-11.0, 7.0))) + luma(scene(p + vec2(11.0, -7.0)))) / 5.0;
      #endif
      float limit = 0.3 * medium;
      float shadow = (1.0 - smoothstep(limit - 0.2, limit, l)) * (0.75 + 0.1 * heavy);
      c = mix(c, wheel(l * SHADOW_CYCLES + uTime * 0.1) * (0.05 + luma(c) * 1.7), shadow);
    }
    #endif

    #if HAS_ASCII
    if (uFx == FX_ASCII) {
      // One character a cell, its brightness stretched and the dark tones
      // lifted, in the cell's colour lifted to match, over a dim copy of the
      // scene. The interface stays sharp over it.
      float l = luma(c);
      float lum = pow(clamp((l - 0.03) / 0.55, 0.0, 1.0), 0.6);
      vec2 spot = floor(mod(q, cell) / (cell / vec2(5.0, 8.0))); // in the character's own pixels
      int column = int(spot.x);
      int row = 7 - int(spot.y);
      bool ink = column < 4 && row < 7 && ((GLYPHS[min(9, int(lum * 10.0))] >> (row * 4 + column)) & 1) == 1;
      c = ink ? c * min(16.0, (lum + 0.004) / (l + 0.004)) : scene(q) * ASCII_BACKDROP;
    }
    #endif

    // The interface over it, its colours pulled apart with the rest, if less.
    vec2 hudSplit = split * HUD_SPLIT;
    vec4 hr = hud(s + hudSplit);
    vec4 hg = hud(s);
    vec4 hb = hud(s - hudSplit);
    c = vec3(mix(c.r, hr.r, hr.a), mix(c.g, hg.g, hg.a), mix(c.b, hb.b, hb.a));

    // What the effect showing does to the colours.
    #if HAS_DITHER
    if (uFx == FX_DITHER) {
      // Two inks and nothing else: no grain, no tones.
      float level = (luma(c) - DITHER_MID) * DITHER_CONTRAST + 0.5;
      gl_FragColor = vec4(level > bayer4(q / 2.0) + 0.03 ? uInks[1] : uInks[0], 1.0);
      return;
    }
    #endif
    #if HAS_COLORAMA
    // Once round the wheel from black to the brightest, turning on a little,
    // never past its end: the dark stays dark, and what is brightest (our
    // ship, the shots) stays brightest.
    if (uFx == FX_COLORAMA) c = wheel(min(0.8, luma(c) * 1.4) + uSince * 0.25);
    #endif
    #if HAS_THRESHOLD
    // Each colour on or off at its own limit, high enough that only the bright things light up.
    if (uFx == FX_THRESHOLD) c = step(vec3(0.42) + 0.2 * fract(uSeed * vec3(1.0, 7.13, 13.7)), c);
    #endif
    #if HAS_PLASTIC
    if (uFx == FX_PLASTIC) {
      // The picture's light as a relief, lit like moulded plastic from a light going round.
      float gx = luma(both(s + vec2(5.0, 0.0))) - luma(both(s - vec2(5.0, 0.0)));
      float gy = luma(both(s + vec2(0.0, 5.0))) - luma(both(s - vec2(0.0, 5.0)));
      vec3 normal = normalize(vec3(-gx, -gy, 0.2 / (0.5 + uAmount)));
      float angle = 3.93 + uSeed * 6.28 + uSince * 3.0;
      vec3 light = normalize(vec3(cos(angle), sin(angle), 1.0));
      float shine = pow(max(0.0, dot(normal, normalize(light + vec3(0.0, 0.0, 1.0)))), 40.0) * 0.8;
      c = c * (0.35 + 0.8 * max(0.0, dot(normal, light))) + shine;
    }
    #endif

    #if PROGRAM >= 2
    // The bent machine's colour lines, in the rows its wires touch.
    if (crossed == 1) c = c.brg;
    else if (crossed == 2) c = c.gbr;
    if (stuck >= 0) {
      ivec3 data = ivec3(clamp(c, 0.0, 1.0) * 255.0);
      data[stuck] |= 64; // one of its lines held up: never under a quarter
      c = vec3(data) / 255.0;
    }
    #endif

    // The corners a little darker; grain, clumped (every pixel its own, and
    // pairs of pixels together), with a little colour in it; then dithered
    // tones (the wallpaper's 4×4 matrix), fewer as the combo rises.
    c *= 1.0 - CORNERS * r2;
    float n = hash(q + uGrain * 17.0) + 0.7 * hash(floor(q / 2.0) + uGrain * 7.0 + 3.0) - 0.85;
    c += n * (GRAIN + 0.02 * medium + 0.012 * heavy) * (0.55 + 0.6 * luma(c));
    c += (fract(n * vec3(7.31, 13.7, 19.3)) - 0.5) * 0.02 * (1.0 + medium);
    float steps = 6.0 - floor(medium + 0.5) - floor(heavy + 0.5);
    vec3 tone = floor(sqrt(clamp(c, 0.0, 1.0)) * steps + bayer4(q)) / steps;
    gl_FragColor = vec4(tone * tone, 1.0);
  }
`,Y=8,Qe={speed:1,surge:.8},$e=.6,et=[.02,.45],tt=3,nt=[`#0b0b12`,`#f6f4ea`],rt=Ge.findIndex(({name:e})=>e===`dither`),it=e=>[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)/255);function at(e,{picture:t,hud:n,keep:a,still:o}){let s=t=>t.map(t=>new e.Vector3(...it(t))),c=qe.map(s),l=s(nt),u=W.map(s),d={uScene:{value:t},uHud:{value:n},uSize:{value:new e.Vector2(640,480)},uShake:{value:new e.Vector2},uFar:{value:new e.Vector2},uSpeed:{value:0},uGrain:{value:0},uTime:{value:0},uHeat:{value:0},uWires:{value:0},uPatch:{value:0},uReach:{value:0},uFx:{value:0},uAmount:{value:0},uSince:{value:0},uSeed:{value:0},uAt:{value:new e.Vector2},uInks:{value:c[0]},uWheel:{value:u[0]}},f=[0,1].map(t=>[0,1,2,3].map(n=>a(new e.ShaderMaterial({defines:{PROGRAM:n,LIGHT:t},vertexShader:Xe,fragmentShader:Ze,uniforms:d,depthTest:!1,depthWrite:!1})))),p=new e.Mesh(a(new e.PlaneGeometry(2,2)),f[0][0]),m=a(new e.PlaneGeometry(0,0)),h=new e.Scene;h.add(p);let g=-1,_=[],v=r(29),y=q(v),b=0,ee=-1,x=0;return{scene:h,update({now:t,dt:a,tier:s,heat:S,bend:C,jolt:w,events:te,paused:ne,at:re,speed:ie,surge:T,dither:E}){let D=d.uSize.value.set(n.image.width,n.image.height);if(d.uFar.value.set(i.far[0]*D.x,(1-i.horizon)*D.y),d.uSpeed.value=o?0:Math.max(-.6,Math.min(1.6,Qe.speed*(ie-$e)+Qe.surge*T)),d.uGrain.value=o?0:Math.floor(t*24)%240,o)return;let O=+(s>=2);_.length&&h.remove(..._),_=[],O!==g&&(g=O,_=f[O].slice(+!O,O?3:4).map(t=>Object.assign(new e.Mesh(m,t),{frustumCulled:!1})),h.add(..._)),b+=a,d.uTime.value=b,d.uHeat.value=S;let ae=r(Math.floor(t*30)+1);d.uShake.value.set(Math.round((ae()-.5)*w*Y)*2,Math.round((ae()-.5)*w*Y)*2),ne&&y.stop();let k=ne?null:y.update(a,te,s);if(d.uFx.value=k?k.index+1:0,k){let{amount:e,since:t,seed:n,cause:r}=k;d.uAmount.value=e,d.uSince.value=t,d.uSeed.value=n;let[i,a]=r.x===void 0?[D.x/2,D.y/2]:re(r);d.uAt.value.set(i,D.y-a),d.uInks.value=c[Math.floor(n*c.length)],d.uWheel.value=u[1+Math.floor(n*(u.length-1))]}else d.uWheel.value=u[0];let oe=Math.floor(b*12);ne?x=0:oe!==ee&&(ee=oe,x>0?x--:v()<et[0]+et[1]*C*C&&(x=1+Math.floor(v()*tt),d.uWires.value=1+Math.floor(v()*(1+C)),d.uPatch.value=Math.floor(v()*64),d.uReach.value=.08+.17*C)),x||(d.uWires.value=0),E&&(d.uFx.value=rt+1,d.uAmount.value=1,d.uInks.value=l),p.material=f[O][E?2:k?Ge[k.index].costly?3:2:x?2:+(S>0)]}}}var ot=`
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }
  float hash3(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
  float noise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash3(i), hash3(i + vec3(1, 0, 0)), f.x), mix(hash3(i + vec3(0, 1, 0)), hash3(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash3(i + vec3(0, 0, 1)), hash3(i + vec3(1, 0, 1)), f.x), mix(hash3(i + vec3(0, 1, 1)), hash3(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
  float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
  float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
`,st=`
  attribute vec4 aSeed;
  #if PLACE == 0
    uniform float uHave;
    uniform float uFresh;
    uniform float uRogue;
  #elif PLACE == 1 || PLACE == 3
    attribute vec4 aAt;
    uniform float uTime;
    uniform float uMotion;
  #else
    attribute vec3 aFrom;
    attribute vec3 aTo;
    attribute vec2 aWhen;
    uniform float uTime;
    uniform vec3 uShip;
    uniform float uSize;
  #endif
  varying vec3 vNormal;
  varying vec3 vOwnNormal;
  varying vec3 vWorld;
  varying vec3 vOwn;
  varying vec4 vLook; // its own number, how rogue (0 … 1), how hot, another number
  varying float vLime; // burning acid lime while it changes sides

  mat2 turned(float a) {
    return mat2(cos(a), -sin(a), sin(a), cos(a));
  }

  void main() {
    vOwn = position;
    vOwnNormal = normal;
    vLime = 0.0;
    vec3 world;
    vec3 n;
    #if PLACE == 0
      float there = step(aSeed.y, uHave);
      mat4 m = modelMatrix * instanceMatrix;
      world = (m * vec4(position * there, 1.0)).xyz;
      n = mat3(m) * normal;
      vLook = vec4(aSeed.x, uRogue, uFresh * smoothstep(uHave - 0.1, uHave, aSeed.y), aSeed.w);
    #elif PLACE == 1
      vec3 local = (instanceMatrix * vec4(position, 1.0)).xyz;
      n = mat3(instanceMatrix) * normal;
      mat2 churn = turned((uTime * (0.7 + aSeed.w) + aSeed.z * 6.2831853) * uMotion);
      local.xz = churn * local.xz;
      n.xz = churn * n.xz;
      float loot = step(aAt.w, -1e-6);
      float stolen = loot * aSeed.y; // one of ours, held at a thief's heart
      float size = abs(aAt.w);
      world = local * size * (1.0 - 0.35 * stolen) + aAt.xyz + vec3(0.0, stolen * size * 0.2, 0.0);
      vLook = vec4(aSeed.x, 1.0 - stolen, stolen * 0.5, aSeed.w);
    #elif PLACE == 3
      vec3 local = (instanceMatrix * vec4(position, 1.0)).xyz;
      n = mat3(instanceMatrix) * normal;
      mat2 churn = turned((uTime * (2.6 + aSeed.w) + aSeed.z * 6.2831853) * uMotion);
      local.xz = churn * local.xz;
      n.xz = churn * n.xz;
      world = local * aAt.w + aAt.xyz;
      vLook = vec4(aSeed.x, 0.0, 0.35 + 0.65 * step(0.5, fract(uTime * 5.0 * uMotion + aSeed.w)), aSeed.w);
    #else
      float t = (uTime - aWhen.x) / aWhen.y;
      float live = step(0.0, t) * step(t, 1.0);
      t = clamp(t, 0.0, 1.0);
      float joins = step(0.5, aSeed.z);
      float eased = mix(1.0 - pow(1.0 - t, 3.0), t * t * (3.0 - 2.0 * t), joins);
      vec3 at = mix(aFrom, aTo + uShip * aSeed.z, eased);
      at.y += sin(t * 3.14159) * (3.0 + 7.0 * aSeed.w);
      vec3 local = position * uSize * (0.7 + 0.6 * aSeed.x) * live;
      mat2 flip = turned(t * (5.0 + 9.0 * aSeed.w) + aSeed.x * 6.0);
      mat2 spin = turned(t * 4.0 + aSeed.w * 6.0);
      n = normal;
      local.yz = flip * local.yz;
      n.yz = flip * n.yz;
      local.xz = spin * local.xz;
      n.xz = spin * n.xz;
      world = at + local;
      float rogue = aSeed.y < 0.5 ? 0.0 : aSeed.y < 1.5 ? 1.0 - smoothstep(0.2, 0.3, t) : aSeed.y < 2.5 ? smoothstep(0.25, 0.6, t) : 1.0;
      float hot = aSeed.y < 0.5 ? 1.0 - t * 0.6 : 0.0;
      vLook = vec4(aSeed.x, rogue, hot, aSeed.w);
      vLime = aSeed.y > 0.5 && aSeed.y < 1.5 ? smoothstep(0.2, 0.3, t) * (1.0 - smoothstep(0.55, 0.8, t)) : 0.0;
    #endif
    vWorld = world;
    vNormal = normalize(n);
    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
  }
`,ct=`
  uniform sampler2D uEnv;
  varying vec3 vNormal;
  varying vec3 vOwnNormal;
  varying vec3 vWorld;
  varying vec3 vOwn;
  varying vec4 vLook;
  varying float vLime;
  ${ot}

  vec3 foil(float t) {
    t = fract(t) * 3.0;
    vec3 cyan = vec3(0.4, 0.9, 1.0);
    vec3 lavender = vec3(0.74, 0.64, 1.0);
    vec3 pink = vec3(1.0, 0.5, 0.86);
    return t < 1.0 ? mix(cyan, lavender, t) : t < 2.0 ? mix(lavender, pink, t - 1.0) : mix(pink, cyan, t - 2.0);
  }

  void main() {
    vec3 V = normalize(cameraPosition - vWorld);
    vec3 N = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
    if (dot(N, V) < 0.0) N = -N;
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.0);
    vec3 R = reflect(-V, N);

    vec2 corner = vec2(0.05, 0.16) + vec2(hash(vec2(vLook.x, 1.7)), hash(vec2(vLook.x, 9.2))) * vec2(0.36, 0.52);
    float turn = vLook.w * 6.2831853;
    vec2 own = mat2(cos(turn), -sin(turn), sin(turn), cos(turn)) * vOwn.zy;
    vec3 holo = texture2D(uEnv, corner + own * 0.045, 0.6).rgb;
    vec3 film = foil(fres * 0.8 + vLook.x * 1.3 + R.y * 0.4 + R.x * 0.2);
    float gleam = pow(max(dot(R, normalize(vec3(-0.25, 0.9, 0.35))), 0.0), 9.0);
    float cut = 1.0 - step(0.5, abs(vOwnNormal.x)); // its cut edge

    vec3 ours = mix(film * 0.7, holo * 1.2, smoothstep(0.08, 0.4, luma(holo)) * 0.85);
    ours *= mix(vec3(1.0), foil(vLook.x * 3.0 + 0.2) * 1.25, 0.22); // each its own cast
    ours = mix(vec3(luma(ours)), ours, 1.4);
    ours = pow(max(ours, 0.0), vec3(1.25)) * (0.72 + 0.6 * vLook.w);
    ours += film * fres * 0.35 + gleam * (0.2 + 0.45 * vLook.x);
    ours *= mix(0.45, 1.05, smoothstep(-0.5, 0.0, vOwn.y)); // tucked under its neighbours at the root
    ours = mix(ours, mix(vec3(1.0), film, 0.5), cut * 0.5);
    ours += vLook.z * vec3(0.4, 0.6, 1.0) * 0.3 + pow(vLook.z, 4.0) * vec3(0.7, 0.86, 1.0) * 0.5; // just landed, or torn off

    // Gone rogue: dark red glass, burning where it was cut. Red enough to be seen over the black of the world.
    vec3 theirs = vec3(0.3, 0.0, 0.07) + vec3(0.55, 0.02, 0.14) * (0.3 + luma(holo)) * smoothstep(-0.5, 0.3, vOwn.y);
    theirs += vec3(1.0, 0.07, 0.16) * (pow(fres, 1.6) * 1.1 + gleam * 0.9);
    theirs = mix(theirs, vec3(1.0, 0.25, 0.28), cut);

    vec3 colour = mix(ours, theirs, vLook.y);
    colour = mix(colour, vec3(0.85, 1.0, 0.23) * (0.7 + 0.5 * fres), vLime);
    gl_FragColor = vec4(colour, 1.0);
  }
`,lt=`
  varying vec3 vWorld;
  varying vec3 vOwn;
  void main() {
    vOwn = position;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,ut=`
  uniform vec3 uTint;
  uniform vec3 uGlow;
  uniform float uWhole;
  varying vec3 vWorld;
  varying vec3 vOwn;
  ${ot}
  void main() {
    if (length(vOwn.xz) > uWhole + (bayer4(gl_FragCoord.xy) - 0.5) * 0.8) discard;
    vec3 V = normalize(cameraPosition - vWorld);
    vec3 facet = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
    if (dot(facet, V) < 0.0) facet = -facet;
    vec3 N = normalize(facet + (vec3(noise3(vOwn * 2.6), noise3(vOwn * 2.6 + 7.0), noise3(vOwn * 2.6 + 13.0)) - 0.5) * 1.1);
    float lit = 0.18 + 0.8 * max(dot(N, normalize(vec3(-0.35, 0.9, 0.4))), 0.0);
    lit += (noise3(vOwn * 8.0) - 0.5) * 0.22;
    lit = floor(lit * 4.0 + bayer4(gl_FragCoord.xy)) / 4.0;
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.5);
    gl_FragColor = vec4(uTint * (0.3 + lit) + uGlow * fres * 0.5, 1.0);
  }
`,dt=`
  varying vec3 vWorld;
  varying vec3 vOwn;
  varying vec2 vUv;
  void main() {
    vOwn = position;
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,ft=`
  uniform sampler2D uMap;
  varying vec3 vWorld;
  varying vec3 vOwn;
  varying vec2 vUv;
  ${ot}
  void main() {
    vec3 V = normalize(cameraPosition - vWorld);
    vec3 N = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
    if (dot(N, V) < 0.0) N = -N;
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.2);
    float lit = 0.4 + 0.65 * max(dot(N, normalize(vec3(-0.3, 0.8, 0.5))), 0.0);
    lit = floor(lit * 5.0 + bayer4(gl_FragCoord.xy)) / 5.0;
    vec3 colour = texture2D(uMap, vUv).rgb * vec3(0.8, 0.62, 1.0) * lit;
    float rot = smoothstep(0.4, 0.58, noise3(vOwn * 6.0)) * (0.5 + 0.5 * noise3(vOwn * 19.0));
    colour = mix(colour, vec3(0.5, 0.02, 0.1) * (0.5 + lit), rot);
    colour += vec3(1.0, 0.12, 0.25) * fres * 0.7;
    gl_FragColor = vec4(colour, 1.0);
  }
`,pt=`vec3[4](vec3(0.62, 0.86, 1.0), vec3(1.0, 0.18, 0.3), vec3(0.85, 1.0, 0.23), vec3(1.0, 0.8, 0.42))`,mt=.42,ht=`
  attribute vec4 aAt;
  attribute vec4 aLook;
  uniform float uTime;
  varying vec2 vUv;
  varying vec4 vLook;
  varying float vAge;
  void main() {
    vUv = uv;
    vLook = aLook;
    vAge = uTime - aLook.y;
    bool sight = aLook.x > 6.5;
    bool blast = aLook.x > 4.5 && !sight;
    bool lying = aLook.x > 5.5 && !sight;
    bool lasts = blast || (aLook.x > 0.5 && aLook.x < 1.5) || (aLook.x > 2.5 && aLook.x < 3.5); // what burns out
    if (lasts && (vAge < 0.0 || vAge > (blast ? ${mt.toFixed(2)} : 0.32))) {
      gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
      return;
    }
    bool facing = (lasts && !lying) || sight;
    float grow = aLook.x > 0.5 && aLook.x < 1.5 ? 0.35 + min(1.0, floor(vAge * 24.0) / 7.0) * 0.65 : 1.0; // a burst opens in steps
    vec3 along = facing ? vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]) : vec3(0.0, 0.0, -1.0);
    vec3 across = facing ? vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]) : lying ? vec3(1.0, 0.0, 0.0) : normalize(cross(along, cameraPosition - aAt.xyz));
    // A shot (and its light on the floor) seen from behind flies almost
    // straight away from us: never thinner on the picture than a few of its
    // pixels, and drawn longer the further it is, so it stays a needle.
    float far = (projectionMatrix * viewMatrix * vec4(aAt.xyz, 1.0)).w;
    bool shot = aLook.x < 0.5 || (aLook.x > 3.5 && aLook.x < 4.5);
    float thin = aLook.x < 0.5 ? max(1.0, 0.03 * far / (aAt.w * projectionMatrix[1][1])) : 1.0;
    float drawn = shot ? 1.0 + far / 120.0 : 1.0;
    // A blast is seen however far it is: its size is the one it has 150
    // away, and it shrinks with the distance only half as fast as the rest.
    float size = blast ? aAt.w * sqrt(max(far, 40.0) / 150.0) : sight ? max(aAt.w, far * 0.075 / projectionMatrix[1][1]) : aAt.w;
    vec3 world = aAt.xyz + (across * position.x * thin + along * position.y * (blast ? 1.0 : aLook.w) * drawn) * size * grow;
    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
  }
`,gt=`
  uniform float uTime;
  varying vec2 vUv;
  varying vec4 vLook;
  varying float vAge;
  const vec3 TINTS[4] = ${pt};
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    vec3 c = vec3(0.0);
    if (vLook.x > 6.5) {
      bool aimed = vLook.y > 0.5;
      vec2 a = abs(p) / (aimed ? 0.76 : 1.0);
      float most = max(a.x, a.y);
      float least = min(a.x, a.y);
      float heart = step(most, 0.1) * step(vLook.z, 0.5);
      float mark = vLook.z < 0.5 ? step(0.74, most) * step(most, 1.0) * step(0.4, least) : step(abs(a.x + a.y - 0.86), 0.14) * step(0.2, least);
      c = (aimed ? vec3(0.85, 1.0, 0.23) : vec3(0.45, 0.8, 0.95)) * mark + (aimed ? vec3(1.0) : vec3(0.45, 0.8, 0.95)) * heart;
    } else if (vLook.x > 4.5) {
      vec3 tint = TINTS[int(vLook.z + 0.5)];
      float own = vLook.w;
      float frame = floor(vAge * 24.0);
      float t = frame / ${(mt*24).toFixed(1)}; // 0 … 1 through its life, in steps
      float r = length(p);
      float turn = atan(p.y, p.x) / 6.2831853 + own;
      float opened = 1.0 - (1.0 - t) * (1.0 - t); // how far open its ring is: fast, then slowing
      if (vLook.x > 5.5) {
        // On the floor: one thin broken ring going out, and a second after it.
        float gaps = step(0.3 + 0.5 * t, hash(vec2(floor(turn * 40.0), own * 31.0)));
        float ring = step(abs(r - (0.12 + 0.86 * opened)), 0.08 * (1.0 - t) + 0.015) * gaps;
        float second = step(abs(r - 0.7 * opened), 0.02) * step(0.2, t) * step(0.5, hash(vec2(floor(turn * 24.0), own * 7.0)));
        float bands = step(0.4, fract(p.y * 9.0 + uTime * 9.0));
        c = mix(tint, vec3(1.0), step(t, 0.2)) * max(ring, second * 0.6) * bands * (0.75 - 0.4 * t);
      } else {
        // A ball of fire with a jagged outline, each of its sectors its own
        // reach, with finer teeth; it hollows from its heart and breaks up
        // in pieces; shards of light fly out of the sectors that reach far.
        float sector = floor(turn * 14.0);
        float within = abs(fract(turn * 14.0) - 0.5) * 2.0; // 0 along a sector's middle … 1 at its edge
        float reach = hash(vec2(sector, own * 91.0));
        float jag = (0.6 + 0.4 * reach - 0.2 * within) * (0.86 + 0.14 * hash(vec2(floor(turn * 41.0), own * 13.0)));
        float outer = (0.2 + 0.5 * opened) * jag;
        float hollow = clamp((t - 0.2) / 0.6, 0.0, 1.0);
        float inner = outer * sqrt(hollow);
        float piece = hash(vec2(floor(turn * 23.0), floor(r * 9.0) + own * 5.0));
        float ball = step(r, outer) * step(inner, r) * step(max(0.0, t - 0.3) * 1.35, piece);
        float depth = (r - inner) / max(outer - inner, 1e-3); // 0 at its hot inside … 1 at its rim
        vec3 fire = t < 0.2 ? vec3(1.0) : depth < 0.35 && t < 0.6 ? vec3(1.0) : depth < 0.75 ? mix(tint, vec3(1.0), 0.3 * step(t, 0.5)) : tint * vec3(0.6, 0.45, 0.8);
        float shards = step(0.62, reach) * step(within, 0.3 * (1.0 - (r - outer) / 0.3)) * step(outer, r) * step(r, outer + 0.3 * opened) * step(t, 0.6);
        c = fire * ball + mix(tint, vec3(1.0), 0.5) * shards;
      }
    } else if (vLook.x < 0.5 || vLook.x > 3.5) {
      float heat = vLook.z;
      vec3 left = mix(vec3(1.0, 0.18, 0.43), vec3(0.72, 0.6, 1.0), step(0.3, heat));
      vec3 right = mix(vec3(0.22, 0.9, 1.0), vec3(0.85, 1.0, 0.23), step(0.6, heat));
      float s = (p.y + 0.2) / 1.2; // along the shard: 0 at its back … 1 at its tip
      float w = (s < 0.78 ? s / 0.78 : (1.0 - s) / 0.22) * 0.5;
      if (s > 0.0 && abs(p.x) < w) c = abs(p.x) < w * 0.45 ? vec3(1.0) : p.x < 0.0 ? left : right;
      else if (heat >= 0.45 && abs(s - 0.74) < 0.035 && abs(p.x) < 0.95) c = right; // the cross at its shoulder
      else if (s <= 0.0) {
        // The trail: flakes in rows behind it, fewer and smaller further back.
        float row = floor((p.y + 1.0) * 7.0);
        float beat = floor(uTime * 24.0);
        float x = hash(vec2(row, beat)) * 1.4 - 0.7;
        float big = 0.22 * (row + 1.0) / 6.0;
        if (hash(vec2(row, beat + 7.0)) < 0.25 + row * 0.1 && abs(p.x - x) < big && abs(fract((p.y + 1.0) * 7.0) - 0.5) < 0.35) c = mix(left, right, step(0.5, hash(vec2(row, 3.0)))) * 0.8;
      }
      if (vLook.x > 3.5) c *= 0.3 * step(0.45, fract(p.y * 2.5 + uTime * 9.0)); // on the floor: dim, broken in bands
    } else {
      vec3 tint = TINTS[int(vLook.z + 0.5)];
      float a = 0.0;
      if (vLook.x < 1.5) {
        float age = floor(vAge * 24.0) / 24.0; // on twos and threes, never a fade
        float ring = step(abs(length(p) - 0.82), 0.12) * step(age, 0.3);
        float flash = step(length(p), 0.5) * step(age, 0.09);
        float spokes = step(abs(p.x * p.y), 0.012) * step(length(p), 0.95) * step(age, 0.2);
        a = max(max(ring, flash), spokes);
      } else if (vLook.x < 2.5) {
        float k = min(1.0, floor((0.5 + p.y * 0.5) * 5.0 + 0.999) / 5.0); // a flame, narrowing in steps
        a = step(abs(p.x), 0.16 + 0.84 * k * k) * k * 0.8;
      } else {
        // A muzzle's flash: a hard four-pointed star, two frames.
        float star = max(step(abs(p.x), 0.1) * step(abs(p.y), 1.0), step(abs(p.y), 0.1) * step(abs(p.x), 1.0));
        a = max(star, step(length(p), 0.4)) * step(vAge, 0.05);
      }
      c = tint * a + vec3(1.0) * a * a * 0.5;
    }
    gl_FragColor = vec4(c, 1.0);
  }
`,X=`vec3[3](vec3(0.5, 0.93, 1.0), vec3(1.0, 0.34, 0.7), vec3(0.74, 0.6, 1.0))`,_t=`
  attribute vec4 aAt;
  attribute vec4 aLook;
  uniform float uTime;
  varying vec2 vUv;
  varying vec4 vLook;
  varying float vAge;
  void main() {
    vUv = uv;
    vLook = aLook;
    vAge = uTime - aLook.y;
    float kind = aLook.x;
    vec4 clip = projectionMatrix * viewMatrix * vec4(aAt.xyz, 1.0);
    float line = clip.w / (240.0 * projectionMatrix[1][1]); // one of the picture's lines, at its distance
    vec3 across = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
    vec3 along = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
    float wide = aAt.w;
    float tall = aAt.w * aLook.w;
    if (kind < 0.5 || (kind > 1.5 && kind < 2.5)) {
      // Along its flight, turned about it to face us: never thinner than a
      // few lines (a fan's shard drawn longer the further it is, so it stays a blade).
      along = normalize(vec3(kind > 1.5 ? aLook.y : 0.0, 0.0, -1.0));
      across = normalize(cross(along, cameraPosition - aAt.xyz));
      wide = max(wide, line * (kind < 0.5 ? 10.0 : 4.0));
      if (kind > 1.5) tall *= 1.0 + clip.w / 140.0;
    } else if (kind < 1.5) {
      along = vec3(0.0, 0.0, -1.0);
      across = vec3(1.0, 0.0, 0.0);
    } else {
      // Facing us: never smaller than a few lines; a ring opens in steps.
      wide = tall = max(wide, line * (kind > 5.5 ? 12.0 : kind < 4.5 ? 7.0 : 0.0));
      if (kind > 4.5 && kind < 5.5) wide = tall *= 0.3 + 0.7 * min(1.0, floor(vAge * 24.0) / 5.0);
    }
    vec3 world = aAt.xyz + across * position.x * wide + along * position.y * tall;
    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
  }
`,vt=`
  uniform float uTime;
  varying vec2 vUv;
  varying vec4 vLook;
  varying float vAge;
  const vec3 TINTS[3] = ${X};
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    int kind = int(vLook.x + 0.5);
    vec3 tint = TINTS[int(vLook.z + 0.5)];
    float beat = floor(uTime * 24.0);
    vec3 c = vec3(0.0);
    if (kind == 0) {
      float s = (p.y + 1.0) * 0.5; // 0 at its back … 1 at its tip
      float w = s < 0.84 ? 0.5 + 0.3 * s : (1.0 - s) / 0.16 * 0.75;
      w *= 1.0 - 0.2 * step(0.6, fract(s * 16.0));
      if (abs(p.x) < w && s > 0.08 * hash(vec2(floor(p.x * 5.0), 1.0))) c = abs(p.x) < w * 0.45 ? vec3(1.0) : mix(tint, vec3(1.0), 0.4 * step(0.5, hash(vec2(beat, floor(s * 8.0)))));
      if (abs(fract(s * 4.0 + uTime * 12.0) - 0.5) < 0.04 && abs(p.x) < 0.98) c = max(c, tint);
    } else if (kind == 1) {
      float band = step(0.35, fract(p.y * vLook.w * 0.25 + uTime * 9.0));
      c = (tint * 0.35 + step(abs(p.x), 0.3) * mix(tint, vec3(1.0), 0.3) * 0.5) * band;
    } else if (kind == 2) {
      float s = (p.y + 0.4) / 1.4;
      float w = (s < 0.6 ? s / 0.6 : (1.0 - s) / 0.4) * 0.9;
      if (s > 0.0 && abs(p.x) < w) c = abs(p.x) < w * 0.35 ? vec3(1.0) : tint;
      else if (s <= 0.0 && abs(p.x) < 0.2 && fract(p.y * 3.0 + uTime * 30.0) < 0.5) c = tint * 0.8;
    } else if (kind == 3) {
      for (int i = 0; i < 5; i++) {
        vec2 at = (vec2(hash(vec2(float(i), beat + vLook.y)), hash(vec2(float(i) + 7.0, beat + vLook.y))) - 0.5) * (i == 0 ? 0.2 : 1.1);
        vec2 d = abs(p - at);
        if (d.x + d.y < (i == 0 ? 0.42 : 0.28)) c = i == 0 ? vec3(1.0) : tint * 1.2;
      }
    } else if (kind == 4) {
      if (abs(p.x) + abs(p.y) < 1.0) c = tint * (1.2 - 0.3 * vLook.y);
    } else if (kind == 5) {
      float r = length(p);
      c = tint * step(abs(r - 0.86), 0.09) * step(vAge, 0.25) + vec3(1.0) * step(abs(r - 0.86), 0.035) * step(vAge, 0.12);
    } else {
      float r = length(p);
      float a = atan(p.y, p.x) / 6.2831853 + floor(uTime * 8.0) / 64.0;
      float blades = step(abs(fract(a * 8.0) - 0.5), 0.2 * (1.0 - r) + 0.03) * step(0.55, r) * step(r, 0.98);
      float ring = step(abs(r - 0.5), 0.035);
      c = blades * mix(tint, vec3(1.0), step(0.86, r)) + ring * mix(tint, vec3(1.0), step(0.5, fract(uTime * 6.0))) * 0.8;
    }
    gl_FragColor = vec4(c, 1.0);
  }
`,Z={inner:22,outer:300,high:170,deep:1100,behind:60},yt=`
  attribute vec4 aMote;
  uniform float uFlown;
  uniform float uLong;
  uniform float uThick;
  varying vec2 vUv;
  varying float vSeed;
  varying float vNear;
  varying float vAppear;
  void main() {
    vUv = uv;
    vSeed = aMote.w;
    float span = ${Z.deep.toFixed(1)} + ${Z.behind.toFixed(1)};
    vec3 at = vec3(aMote.x, aMote.y, -${Z.deep.toFixed(1)} + mod(aMote.z * span + uFlown, span));
    vec3 eye = cameraPosition - at;
    float far = length(eye);
    vNear = 1.0 - smoothstep(40.0, ${Z.deep.toFixed(1)}, far);
    vAppear = smoothstep(${Z.deep.toFixed(1)}, ${(Z.deep*.8).toFixed(1)}, -at.z);
    bool splinter = aMote.w > 0.7;
    vec3 along = vec3(0.0, 0.0, 1.0);
    vec3 across = normalize(cross(along, eye));
    float wide = splinter ? 1.3 : 0.35 + 0.35 * fract(aMote.w * 7.0);
    wide = max(wide, far * 0.0042 / projectionMatrix[1][1]); // never thinner than a line of the picture: the far ones are dashes round the far point
    wide *= step(16.0, far) * step(fract(aMote.w * 31.0), uThick); // none right at the camera
    float drawn = splinter ? 1.3 + uLong * 0.25 : uLong * (0.5 + fract(aMote.w * 13.0));
    vec3 world = at + across * position.x * wide + along * position.y * drawn;
    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
  }
`,bt=`
  varying vec2 vUv;
  varying float vSeed;
  varying float vNear;
  varying float vAppear;
  ${ot}
  void main() {
    if (vAppear <= bayer4(gl_FragCoord.xy)) discard;
    vec2 p = vUv * 2.0 - 1.0;
    if (vSeed > 0.7 && abs(p.x) + abs(p.y) > 1.0) discard;
    float k = fract(vSeed * 5.0);
    vec3 glass = k < 0.4 ? vec3(0.86, 0.85, 0.95) : k < 0.65 ? vec3(0.4, 0.9, 1.0) : k < 0.85 ? vec3(0.74, 0.64, 1.0) : vec3(1.0, 0.5, 0.86);
    float lit = floor((0.18 + 0.82 * vNear * vNear) * 4.0 + bayer4(gl_FragCoord.xy)) / 4.0;
    gl_FragColor = vec4(glass * lit, 1.0);
  }
`,xt=`
  attribute vec4 aFrom;
  attribute vec4 aMove;
  attribute vec4 aLook;
  uniform float uTime;
  varying vec2 vUv;
  varying vec4 vLook;
  varying float vLife;
  void main() {
    vUv = uv;
    vLook = aLook;
    float age = uTime - aFrom.w;
    vLife = age / aMove.w;
    if (vLife < 0.0 || vLife >= 1.0) {
      gl_Position = vec4(0.0, 0.0, 2.0, 1.0); // not thrown yet, or burnt out: nothing
      return;
    }
    vec3 velocity = aMove.xyz - vec3(0.0, aLook.w * age, 0.0);
    vec3 at = aFrom.xyz + aMove.xyz * age - vec3(0.0, 0.5 * aLook.w * age * age, 0.0);
    vec4 head = projectionMatrix * viewMatrix * vec4(at, 1.0);
    vec4 tail = projectionMatrix * viewMatrix * vec4(at - velocity * (aLook.x > 4.5 && aLook.x < 5.5 ? 0.008 : 0.03), 1.0); // exhaust hardly drawn out: it is hot glass, not a trail
    if (head.w < 1.0 || tail.w < 1.0) {
      gl_Position = vec4(0.0, 0.0, 2.0, 1.0); // at or behind the camera
      return;
    }
    float aspect = projectionMatrix[1][1] / projectionMatrix[0][0];
    vec2 a = head.xy / head.w * vec2(aspect, 1.0);
    vec2 b = tail.xy / tail.w * vec2(aspect, 1.0);
    bool flake = aLook.x > 1.5 && aLook.x < 3.5;
    float size = clamp(aLook.y * projectionMatrix[1][1] / head.w, 0.008, flake ? 0.09 : 0.026) * (1.0 - floor(vLife * 3.0) * 0.25);
    vec2 way = a - b;
    float drawn = length(way);
    float spin = aLook.z * 6.2831853 + age * (6.0 + 10.0 * aLook.z);
    vec2 dir = flake || drawn < 1e-5 ? vec2(cos(spin), sin(spin)) : way / drawn;
    vec2 side = vec2(-dir.y, dir.x);
    vec2 corner = flake ? a + (side * position.x * 0.6 + dir * position.y) * size : a + side * position.x * size + dir * (position.y - 0.5) * max(size, drawn);
    gl_Position = vec4(corner / vec2(aspect, 1.0) * head.w, head.z, head.w);
  }
`,St=`
  varying vec2 vUv;
  varying vec4 vLook;
  varying float vLife;
  vec3 foil(float t) {
    t = fract(t) * 3.0;
    return t < 1.0 ? mix(vec3(0.4, 0.9, 1.0), vec3(0.74, 0.64, 1.0), t) : t < 2.0 ? mix(vec3(0.74, 0.64, 1.0), vec3(1.0, 0.5, 0.86), t - 1.0) : mix(vec3(1.0, 0.5, 0.86), vec3(0.4, 0.9, 1.0), t - 2.0);
  }
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    int kind = int(vLook.x + 0.5);
    int age = int(vLife * 3.0);
    if ((kind == 2 || kind == 3) && abs(p.x) + abs(p.y) > 1.0) discard; // a flake: a diamond of glass
    vec3 c;
    if (kind == 0) c = age == 0 ? vec3(1.0) : age == 1 ? vec3(0.4, 0.9, 1.0) : vec3(0.5, 0.45, 0.9);
    else if (kind == 1) c = age == 0 ? vec3(1.0, 0.8, 0.85) : age == 1 ? vec3(1.0, 0.18, 0.32) : vec3(0.45, 0.02, 0.1);
    else if (kind == 2) c = foil(vLook.z * 3.0 + p.y * 0.3) * (1.1 - 0.3 * float(age));
    else if (kind == 3) c = mix(vec3(0.3, 0.0, 0.07), vec3(1.0, 0.1, 0.2), step(0.6, abs(p.x) + abs(p.y))) * (1.0 - 0.25 * float(age));
    else if (kind == 4) c = age == 0 ? vec3(0.72, 0.68, 0.84) : age == 1 ? vec3(0.42, 0.4, 0.52) : vec3(0.2, 0.18, 0.28);
    else if (kind == 5) c = age == 0 ? vec3(1.0) : age == 1 ? vec3(0.75, 0.7, 1.0) : vec3(0.42, 0.3, 0.86);
    else if (kind == 6) c = age == 0 ? vec3(0.95, 1.0, 0.6) : age == 1 ? vec3(0.85, 1.0, 0.23) : vec3(0.45, 0.6, 0.1);
    else if (kind == 7) c = age == 0 ? vec3(1.0, 0.95, 0.75) : age == 1 ? vec3(0.95, 0.78, 0.45) : vec3(0.55, 0.4, 0.2);
    else c = age == 0 ? vec3(1.0, 0.88, 0.96) : age == 1 ? vec3(1.0, 0.3, 0.66) : vec3(0.55, 0.08, 0.5);
    gl_FragColor = vec4(c, 1.0);
  }
`,Ct=720,wt=3e3,Tt=[1,.6,.07],Et=[3,22],Dt=[.3,.7];function Ot(e,{keep:t,time:n}){let i=r(61),a={value:0},o={value:Et[0]},s={value:Dt[0]},c=t(new e.PlaneGeometry(1,1)),l=new e.InstancedBufferAttribute(new Float32Array(Ct*4),4);for(let e=0;e<Ct;e++){let t=(i()<.5?-1:1)*(Z.inner+i()**1.5*(Z.outer-Z.inner)),n=i()<.25?.4+i()*3:4+i()**2*Z.high;l.setXYZW(e,t,n,i(),i())}c.setAttribute(`aMote`,l);let u=new e.InstancedMesh(c,t(new e.ShaderMaterial({uniforms:{uFlown:a,uLong:o,uThick:s},vertexShader:yt,fragmentShader:bt,side:e.DoubleSide})),Ct);u.frustumCulled=!1,t(u);let d=t(new e.PlaneGeometry(1,1)),f=new e.InstancedBufferAttribute(new Float32Array(wt*4).fill(-100),4),p=new e.InstancedBufferAttribute(new Float32Array(wt*4),4),m=new e.InstancedBufferAttribute(new Float32Array(wt*4),4);for(let t of[f,p,m])t.setUsage(e.DynamicDrawUsage);d.setAttribute(`aFrom`,f),d.setAttribute(`aMove`,p),d.setAttribute(`aLook`,m);let h=new e.InstancedMesh(d,t(new e.ShaderMaterial({uniforms:{uTime:n},vertexShader:xt,fragmentShader:St,side:e.DoubleSide,depthWrite:!1})),wt);h.frustumCulled=!1,h.renderOrder=4,t(h);let g=wt,_=0,v=-1,y=0,b=0;return{motes:u,sparks:h,share:()=>Tt[b],spark(e,t,r,a,o,s=0,c=0){let l=_;_=(_+1)%g,v<0&&(v=l),y++,f.setXYZW(l,t.x,t.y,t.z,n.value+c),p.setXYZW(l,r.x,r.y,r.z,a),m.setXYZW(l,e,o,i(),s)},update({flown:e,rush:t,tier:n}){if(n!==b&&(b=n,u.count=Math.round(Ct*Tt[b]),g=h.count=Math.round(wt*Tt[b]),_%=g,[v,y]=[0,g]),a.value=e,o.value=Et[0]+Et[1]*t*t,s.value=Math.min(1,Dt[0]+Dt[1]*Math.max(0,t-$e)),v<0)return;let r=Math.min(y,g);for(let e of[f,p,m])e.clearUpdateRanges(),v+r<=g?e.addUpdateRange(v*4,r*4):(e.addUpdateRange(v*4,(g-v)*4),e.addUpdateRange(0,(v+r-g)*4)),e.needsUpdate=!0;v=-1,y=0}}}var kt=`/draco/`,At=[{lines:480,ship:1,knot:8,cache:26},{lines:360,ship:.6,knot:8,cache:26},{lines:240,ship:.3,knot:4,cache:10}],Q=10,jt=1500,Mt=160,Nt=320,Pt=64,Ft=2,It=56,Lt=[{ahead:260,size:1.1},{ahead:620,size:.8}],Rt=3,zt=2,Bt=2,Vt=At[0].cache,Ht={lance:{index:0,sparks:0,kick:9,jolt:.55,lens:-8,surge:0},fan:{index:1,sparks:8,kick:1.5,jolt:0,lens:1.5,surge:.35},seekers:{index:2,sparks:2,kick:.8,jolt:0,lens:1,surge:0}},Ut=360,Wt=4,Gt=4,Kt=96,qt=4,Jt=[[[-.2,-.5],[.22,-.42],[.03,.5]],[[-.24,-.5],[.18,-.38],[.27,.3],[-.08,.5]],[[-.22,-.45],[.22,-.5],[.32,.05],[0,.5],[-.3,.15]],[[-.12,-.5],[.2,-.46],[.12,.08],[.3,.2],[-.02,.5],[-.24,.02]]],Yt=At[0].knot/Jt.length,Xt=[.4,.3],Zt=6,Qt=.1,$t=40,en=.7,tn=.32,nn=.16,rn=[260,13],an=1.4,on=15,sn=9,cn=[110,10],ln=.7,un=.6,dn=2,fn=.4,pn=70,mn=[42,110],hn=[.55,40],gn=[.85,150],_n=34,vn=4,yn=26,bn={knot:{blast:14,glass:[14,100],sparks:[12,150],gold:[3,110],shrapnel:[7,80,360],chain:0},big:{blast:26,glass:[44,170],sparks:[30,230],gold:[22,200],shrapnel:[26,140,480],chain:4}},xn=.35,Sn={far:150,out:.17,lens:54,back:.75,high:[15,11,19,9],lean:[0,6,-2,-9]},Cn=.45,wn=Math.PI/180,Tn=Math.tan(c.lens/2*wn),En=([e,t,n,r],i)=>(e+t+n+r)/4+(e-n)/2*Math.cos(i)+(t-r)/2*Math.sin(i)+(e-t+n-r)/4*Math.cos(2*i),Dn=(e,t,n,r)=>.5+(Math.sin(e*r*1.3+1.7)*Math.cos(n*r*1.1-.4)+Math.sin(t*r*2.1+n*r*.7+2.3)+Math.sin((e+n)*r*.6+4.1))/6;async function On(d,{GLTFLoader:f,DRACOLoader:p,MeshSurfaceSampler:m,mergeGeometries:h},{canvas:g,hud:_,land:v,worlds:y,hull:b,crystals:ee,still:x}){let S=new d.WebGLRenderer({canvas:g,antialias:!1,powerPreference:`high-performance`});S.setPixelRatio(1),S.autoClear=!1;let C=[],w=e=>(C.push(e),e),te=!1,ne=()=>{te=!0;for(let e of C)e.dispose();S.dispose(),S.forceContextLoss()},re,ie,T=new p().setDecoderPath(kt);try{[re,ie]=await Promise.all([new d.TextureLoader().loadAsync(v),new f().setDRACOLoader(T).loadAsync(b)])}catch(e){throw ne(),e}finally{T.dispose()}w(re),re.colorSpace=d.NoColorSpace,re.wrapS=re.wrapT=d.MirroredRepeatWrapping;let E=(e=0,t=0,n=0)=>new d.Vector3(e,t,n),D=r(47),O=()=>E(D()-.5,D()-.5,D()-.5).normalize(),ae=new d.OrthographicCamera(-1,1,1,-1,0,1),k=w(new d.WebGLRenderTarget(4,4,{minFilter:d.NearestFilter,magFilter:d.NearestFilter})),oe=w(new d.CanvasTexture(_));oe.colorSpace=d.NoColorSpace,oe.minFilter=oe.magFilter=d.NearestFilter,oe.generateMipmaps=!1;let se=We(d,{picture:re,worlds:y,load:e=>new d.TextureLoader().loadAsync(e),keep:w,still:x}),ce=at(d,{picture:k.texture,hud:oe,keep:w,still:x}),A=se.camera,j={x:0,y:c.eye,roll:0};A.updateMatrixWorld();let le=new d.Scene;function M(e,t,n,r){return r.set(e*u,t*u,-(c.back+n)*u),u}function N({x:e,y:t,z:n},r){if(n<0){let[r,i]=[e-j.x,t-j.y],a=Math.hypot(r,i),o=$t*Math.min(1,-n/c.back);a<o&&([e,t]=a>1?[j.x+r*o/a,j.y+i*o/a]:[e,j.y-o])}return M(e,t,n,r)}let P=kn(d,h,ie.scene);P.computeBoundingBox();let F=P.boundingBox,I={value:0},ue={value:+!x},de={value:1},fe={value:0},L=(e,t)=>w(new d.ShaderMaterial({defines:{PLACE:e},uniforms:{uEnv:{value:re},...t},vertexShader:st,fragmentShader:ct,side:d.DoubleSide})),pe=Jt.map(e=>{let t=new d.Shape(e.map(([e,t])=>new d.Vector2(e,t)));return w(new d.ExtrudeGeometry(t,{depth:.1,bevelEnabled:!1}).translate(0,0,-.05).rotateY(Math.PI/2))});function me(e,t,n){let r=w(pe[e].clone()),i=new d.InstancedMesh(r,t,n);return r.setAttribute(`aSeed`,new d.InstancedBufferAttribute(new Float32Array(n*4),4)),i.frustumCulled=!1,w(i),i}let R=new d.Group;le.add(R);let he=w(An(d,P,Q/26)),ge=(e,t,n={value:99})=>w(new d.ShaderMaterial({uniforms:{uTint:{value:E(...e)},uGlow:{value:E(...t)},uWhole:n},vertexShader:lt,fragmentShader:ut,side:d.DoubleSide})),_e={value:99};R.add(new d.Mesh(he,ge([.4,.25,.42],[.5,.35,.9],_e)));let ve=[],z=[],ye=(()=>{let e=new m(new d.Mesh(P)).setRandomGenerator(D).build(),t=E(),n=E(),r=[];for(let i=0;r.length<jt&&i<jt*16;i++){if(e.sample(t,n),n.y<-.25)continue;let i=Dn(t.x,t.y,t.z,5.5/Q);if(D()>.3+i)continue;let a=(.6+.9*D()**2.2)*(.7+.7*i),o=E(Math.sign(t.x)*Math.min(1,Math.abs(t.x)/(Q*.5))*.75,0,1),s=o.addScaledVector(n,-o.dot(n));s.lengthSq()<.02&&s.set(1,0,0).addScaledVector(n,-n.x),s.normalize().applyAxisAngle(n,(D()-.5)*1+(i-.5)*1.1);let c=D()<.08?.8+D()*.6:.12+D()*.4,l=s.clone().multiplyScalar(Math.cos(c)).addScaledVector(n,Math.sin(c)),u=E().crossVectors(n,s).normalize(),f=E().crossVectors(l,u).normalize(),p=t.clone().addScaledVector(s,a*.2).addScaledVector(n,a*(.05+D()*.1));r.push({matrix:new d.Matrix4().makeBasis(f.multiplyScalar(a),l.multiplyScalar(a),u.multiplyScalar(a*(.8+D()*.5))).setPosition(p),at:p,far:Math.hypot(t.x,t.z)/Q+D()*.18,seed:D(),other:D()})}[...r].sort((e,t)=>e.far-t.far).forEach((e,t)=>{e.order=t/(r.length-1),z.push(e.far)}),r.forEach((e,t)=>t%4||ve.push([e.at,e.order]));let i=L(0,{uHave:de,uFresh:fe,uRogue:{value:0}});return Jt.map((e,t)=>{let n=r.filter((e,n)=>n%Jt.length===t),a=me(t,i,n.length),o=a.geometry.attributes.aSeed;return n.forEach((e,t)=>{a.setMatrixAt(t,e.matrix),o.setXYZW(t,e.seed,e.order,0,e.other)}),a.userData.all=n.length,R.add(a),a})})(),be=[],xe=Array.from({length:Rt},()=>{let e=new d.Group;e.add(new d.Mesh(he,ge([.16,.03,.07],[1,.1,.2])));let t=L(0,{uHave:{value:.72},uFresh:{value:0},uRogue:{value:1}});for(let n of ye){let r=new d.InstancedMesh(n.geometry,t,n.userData.all);r.instanceMatrix=n.instanceMatrix,r.frustumCulled=!1,be.push(r),e.add(r)}return e.visible=!1,le.add(e),e}),Se=null,Ce=!1;function we(){Ce=!0;let e=new p().setDecoderPath(kt);new f().setDRACOLoader(e).loadAsync(ee).then(e=>{let t=[];if(e.scene.traverse(e=>{if(!e.isMesh)return;let n=e.geometry;n.computeBoundingBox();let r=n.boundingBox.getCenter(E()),i=n.boundingBox.getSize(E());n.translate(-r.x,-r.y,-r.z),n.scale(1/i.y,1/i.y,1/i.y),e.material.map.colorSpace=d.NoColorSpace,t.push({geometry:n,map:e.material.map})}),te)return t.forEach(({geometry:e,map:t})=>(e.dispose(),t.dispose()));t.forEach(({geometry:e,map:t})=>(w(e),w(t))),Se=t}).catch(()=>{}).finally(()=>e.dispose())}let Te=Array.from({length:zt},()=>{let e=new d.Mesh(he,w(new d.ShaderMaterial({uniforms:{uMap:{value:null}},vertexShader:dt,fragmentShader:ft,side:d.DoubleSide})));return e.visible=!1,le.add(e),e}),Ee=Jt.map((e,t)=>{let n=me(t,L(1,{uTime:I,uMotion:ue}),Mt*Yt),r=n.geometry.attributes.aSeed,i=new d.InstancedBufferAttribute(new Float32Array(Mt*Yt*4),4).setUsage(d.DynamicDrawUsage);n.geometry.setAttribute(`aAt`,i);let a=new d.Quaternion;for(let e=0;e<Mt*Yt;e++){let t=e%Yt===0,i=t?Math.sqrt(D())*.3:.4+D()*.45;a.setFromUnitVectors(E(0,1,0),O()),n.setMatrixAt(e,new d.Matrix4().compose(O().multiplyScalar(i),a,E().setScalar(1+D()*.6))),r.setXYZW(e,D(),+!!t,D(),D())}return le.add(n),i}),De=new Map,Oe=Array.from({length:Mt},(e,t)=>159-t),ke=new Set,Ae={value:E()},je=me(1,L(2,{uTime:I,uShip:Ae,uSize:{value:1.6}}),Nt),Me={from:new d.InstancedBufferAttribute(new Float32Array(Nt*3),3),to:new d.InstancedBufferAttribute(new Float32Array(Nt*3),3),when:new d.InstancedBufferAttribute(new Float32Array(Nt*2).fill(-100),2)};je.geometry.setAttribute(`aFrom`,Me.from),je.geometry.setAttribute(`aTo`,Me.to),je.geometry.setAttribute(`aWhen`,Me.when),le.add(je);let Ne=0;function Pe(e,t,n,r,i=0,a=0){let o=Ne;Ne=(Ne+1)%Nt,Me.from.setXYZ(o,e.x,e.y,e.z),Me.to.setXYZ(o,t.x,t.y,t.z),Me.when.setXY(o,I.value+a,r),je.geometry.attributes.aSeed.setXYZW(o,D(),n,i,D());for(let e of[Me.from,Me.to,Me.when,je.geometry.attributes.aSeed])e.needsUpdate=!0}let Fe=186+Lt.length,Ie=w(new d.PlaneGeometry(1,1)),B={at:new d.InstancedBufferAttribute(new Float32Array(Fe*4),4).setUsage(d.DynamicDrawUsage),look:new d.InstancedBufferAttribute(new Float32Array(Fe*4),4).setUsage(d.DynamicDrawUsage)};Ie.setAttribute(`aAt`,B.at),Ie.setAttribute(`aLook`,B.look);let Le=new d.InstancedMesh(Ie,w(new d.ShaderMaterial({uniforms:{uTime:I},vertexShader:ht,fragmentShader:gt,blending:d.AdditiveBlending,transparent:!0,depthWrite:!1})),Fe);Le.frustumCulled=!1,Le.renderOrder=5,w(Le),le.add(Le);let Re=0;function ze(e,t,n,r=1){let i=130+Re;Re=(Re+1)%It,B.at.setXYZW(i,e.x,e.y,e.z,t),B.look.setXYZW(i,r,I.value,n,1)}function V(e,t,n,r=0,i=!1){let a=130+Re;Re=(Re+1)%It,B.at.setXYZW(a,e.x,i?.35:e.y,e.z,t),B.look.setXYZW(a,i?6:5,I.value+r,n,D())}let Be=w(new d.PlaneGeometry(1,1)),H={at:new d.InstancedBufferAttribute(new Float32Array(680),4).setUsage(d.DynamicDrawUsage),look:new d.InstancedBufferAttribute(new Float32Array(680),4).setUsage(d.DynamicDrawUsage)};Be.setAttribute(`aAt`,H.at),Be.setAttribute(`aLook`,H.look);let Ve=new d.InstancedMesh(Be,w(new d.ShaderMaterial({uniforms:{uTime:I},vertexShader:_t,fragmentShader:vt,blending:d.AdditiveBlending,transparent:!0,depthWrite:!1,side:d.DoubleSide})),170);Ve.frustumCulled=!1,Ve.renderOrder=5,w(Ve),le.add(Ve);let He=Array(qt).fill(-9),U=0;function Ue(e,t,n){let r=2+U;He[U]=I.value,U=(U+1)%qt,H.at.setXYZW(r,e.x,e.y,e.z,t),H.look.setXYZW(r,5,I.value,n,1)}let Ge=new WeakMap,Ke=new d.InstancedBufferAttribute(new Float32Array(Bt*Vt*4),4).setUsage(d.DynamicDrawUsage),qe=me(2,L(3,{uTime:I,uMotion:ue}),Bt*Vt);{let e=qe.geometry.attributes.aSeed;qe.geometry.setAttribute(`aAt`,Ke);let t=new d.Quaternion;for(let n=0;n<Bt*Vt;n++)t.setFromUnitVectors(E(0,1,0),O()),qe.setMatrixAt(n,new d.Matrix4().compose(O().multiplyScalar(.5+D()*.4),t,E().setScalar(.45+D()*.35))),e.setXYZW(n,D(),0,D(),D());le.add(qe)}let W=Ot(d,{keep:w,time:I});le.add(W.motes,W.sparks);let G=E(),K=260;function q(e,t,n,r,i,a,{push:o=null,flow:s=1,fall:c=0,wait:l=0}={}){let u=Math.max(1,Math.round(t*W.share()));for(let t=0;t<u;t++)G.copy(O()).multiplyScalar(r*(.35+.65*D())),o&&G.add(o),G.z+=K*s,W.spark(e,n,G,i*(.6+.6*D()),a*(.7+.6*D()),c,l)}let J={exhaust:0,dust:0,shed:0,portal:0,wake:0},Je=E(),Ye=E();function Xe(e,t,r,i){let{blast:a,glass:o,sparks:s,gold:c,shrapnel:l,chain:u}=r?bn.big:bn.knot,d=9*t*a;V(e,d,i===6?2:1),q(3,o[0],e,o[1],.8,r?2.4:1.8,{fall:40}),q(i,s[0],e,s[1],.4,1.1),q(7,c[0],e,c[1],.6,1.2),Ye.set(0,0,l[2]);let f=n(-e.z/(l[2]+K),.35,1.3);q(i,l[0]*.7,e,l[1],f,1.3,{push:Ye}),q(3,l[0]*.3,e,l[1],f,2,{push:Ye,fall:20});for(let t=1;t<=u;t++){let n=t*.07;Je.copy(O()).multiplyScalar(d*(.35+.35*D())).add(e),Je.y=Math.max(Je.y,4),Je.z=e.z+(Je.z-e.z)*.4+K*n,V(Je,d*(.4+.3*D()),t%2?3:0,n),q(t%2?7:0,9,Je,150,.4,1.1,{wait:n})}r&&(V(e,d*2,0,0,!0),Tt=Math.max(Tt,xn),x||($.speed+=81))}function Ze(e){for(let t=0;t<e*W.share();t++){let e=D()*2*Math.PI,t=30+D()*70;X.set(Math.cos(e)*t,Math.max(2-A.position.y,Math.sin(e)*t*.6),-(180+D()*600)).add(A.position),W.spark(D()<.75?0:6,X,G.set(0,0,K*(2.6+D())),.3+D()*.35,.45+D()*.5)}}let Y=+!!matchMedia(`(pointer: coarse)`).matches;jn(S.getContext())&&(Y=At.length-1);let Qe=4/3;function et(){let{lines:e,ship:t}=At[Y];k.setSize(Math.round(e*Qe),e);for(let e of ye)e.count=Math.max(1,Math.floor(e.userData.all*t));be.forEach((e,t)=>e.count=Math.max(1,Math.floor(ye[t%Jt.length].count*.6)))}function tt(e){Qe=e/480,S.setSize(e,480,!1),oe.dispose(),oe.needsUpdate=!0,se.resize(Qe),et()}tt(640),S.compile(le,A),S.compile(se.scene,A);let nt=E(),rt=()=>[(nt.x+1)/2*Math.round(480*Qe),(1-nt.y)/2*480];function it(e,t,n){return M(e,t,n,nt),nt.project(A),rt()}let ot=new d.Matrix4;function pt(){let n=E();return M(0,t.rest,0,n),ot.compose(n,new d.Quaternion,E().setScalar(2*e.w*u/(F.max.x-F.min.x))),ve.map(([e,t])=>(nt.copy(e).applyMatrix4(ot).project(A),[...rt(),t]))}function mt(e,n){let r=(e-i.far[0])*2*Tn*Qe,a=(i.horizon-n)*2*Tn;return{x:r*c.back/(1-Xt[0]),y:(a*c.back+c.eye-Xt[1]*t.rest)/(1-Xt[1])}}let X=E(),Z=E(),yt=new d.Euler,bt=E(),xt=new d.Matrix4,St=new d.Quaternion,Ct=e=>e<=0?0:e>=1?1:e*e*(3-2*e),wt=0,Tt=0,Et=0,Dt=0,On=0,Mn=0,Nn=!1,Pn=0,Fn={at:0,speed:0},In={at:0,speed:0},$={at:c.lens,speed:0},Ln=0,Rn=0,zn=1,Bn=new Map,Vn=1,Hn=1,Un=(e,t,[n,r],i)=>{for(let a=i;a>1e-4;a-=1/60){let i=Math.min(a,1/60);e.speed+=((t-e.at)*n-e.speed*r)*i,e.at+=e.speed*i}return e.at},Wn=0,Gn=0,Kn=0,qn=(e,t,n,r)=>r.set(e,t,n).applyMatrix4(R.matrixWorld);function Jn(e,n){let r=R.scale.x;for(let i of n){let n=Ht[i.weapon];if(i.type===`shot`&&n){if(Dt=1,On=Math.max(On,n.kick),Tt=Math.max(Tt,n.jolt),x||([$.speed,Rn]=[$.speed+sn*n.lens,Math.max(Rn,n.surge)]),qn(0,0,F.min.z*.95,X),i.weapon===`lance`)ze(X,7,0,3),Ue(X,9*r,n.index),q(0,26,X,150,.35,.9,{push:E(0,0,-420),flow:.3}),qn(0,0,F.max.z*.85,Z),q(5,14,Z,50,.25,.6,{push:E(0,0,160),flow:.4});else if(i.weapon===`fan`){ze(X,3.4,0,3);for(let e=0;e<2;e++)q(8,7,X,90,.3,.8,{push:E((e?1:-1)*220,0,-260),flow:.4})}else for(let e of[-1,1])qn(e*Q*.45,0,0,Z),q(2,4,Z,50,.4,.8,{push:E(e*60,20,-60),flow:.3})}else if(i.type===`shot`)Dt=1,qn(0,0,F.min.z*.95,X),ze(X,2.2,0,3),q(0,6,X,75,.22,.5,{push:Ye.set(0,0,-230)}),q(0,2,X,60,.3,.5,{flow:.9}),Vn=-Vn,qn(Vn*Q*.3,.2,0,Z),W.spark(2,Z,G.set(Vn*(50+D()*60),20+D()*40,K*.8),.45+D()*.3,.7+D()*.5,90);else if(i.type===`miss`)M(i.x,i.y,i.z,X),q(n?.sparks??0,i.weapon===`lance`?16:4,X,i.weapon===`lance`?80:25,.28,2.6,{flow:.4});else if(i.type===`dent`){let e=M(i.x,i.y,i.z,X);ze(X,9*e,1),Bn.set(i.id,I.value),q(1,12,X,110,.3,1.1),q(3,4,X,60,.6,1.8,{fall:40}),q(0,5,X,90,.5,.9,{push:Ye.set(0,0,260)}),n&&q(n.sparks,8,X,90,.3,1.2)}else if(i.type===`kill`){let t=M(i.x,i.y,i.z,X),a=i.family!==`swarm`;Xe(X,t,a,e.mult>1?6:1),!a&&!x&&($.speed+=sn*1.5),n&&q(i.weapon===`seekers`?6:n.sparks,8,X,110,.35,1.2),fe.value=1;let o=At[Y].knot/2*(a?3:1);for(let e=0;e<o;e++)Z.copy(O()).multiplyScalar(2.5).add(X),Pe(Z,E((D()-.5)*Q*.5,.5,(D()-.5)*Q*.6).multiplyScalar(r),1,.38+D()*.22,1);for(let e=0;e<(a?12:3);e++)Z.copy(O()).multiplyScalar((4+D()*6)*(a?2.2:1)).add(X),Pe(X,Z,3,a?.55:.32)}else if(i.type===`leak`){M(i.x,i.y,0,X),ze(X,8,1),q(2,8,Ae.value,30,.6,1.3,{flow:.8}),q(1,6,X,50,.4,1),M(i.x,i.y*.4,-c.back*.8,Z);for(let e=0;e<5;e++)Pe(E().copy(O()).multiplyScalar(2*r).add(Ae.value),E().copy(O()).multiplyScalar(4).add(Z),2,.5+D()*.25)}else if(i.type===`hit`){M(i.x,i.y,0,X),ze(X,20,1),V(X,22,1),V(X,70,1,0,!0);for(let e=0;e<18;e++)Z.copy(O()).multiplyScalar(8+D()*18).add(X),Pe(E().copy(O()).multiplyScalar(2*r).add(X),Z,0,.45+D()*.3),e<10&&Pe(Z,E((D()-.5)*Q*.5,.5,(D()-.5)*Q*.6).multiplyScalar(r),0,.3+D()*.2,1,.55+e*.07);Et=1,Tt=1,q(0,30,X,100,.5,1,{flow:.25}),q(2,12,X,70,.8,1.4,{fall:30,flow:.25}),Xn()}else if(i.type===`lost`)Xn();else if(i.type===`combo`)x||([Ln,$.speed,Rn]=[Ln+ln,$.speed+126,1]),q(6,10+e.mult*2,Ae.value,60,.45,.8,{flow:.3}),x||Ze(yn+e.mult*3);else if(i.type===`danger`)x||([Ln,$.speed,Rn]=[Ln+ln,$.speed+90,1]),x||Ze(yn);else if(i.type===`step`)q(6,28,Ae.value,80,.7,1,{flow:.3});else if(i.type===`cache`)M(0,t.rest,t.far,X),ze(X,160,0);else if(i.type===`armed`){M(i.x,i.y,0,X),ze(X,22,0),fe.value=1;for(let e=0;e<16;e++)Z.copy(O()).multiplyScalar(3+D()*5).add(X),Pe(Z,E((D()-.5)*Q*.6,.5,(D()-.5)*Q*.6).multiplyScalar(r),0,.25+D()*.25,1,e*.012);x||([Ln,$.speed,Rn]=[Ln+ln*.6,$.speed+108,1]),x||Ze(yn),Tt=Math.max(Tt,.4),q(n.sparks,36,Ae.value,110,.5,1,{flow:.3}),q(0,16,Ae.value,160,.3,.7,{flow:.3})}else if(i.type===`spent`)q(2,14,Ae.value,40,.6,1,{flow:.7,fall:20});else if(i.type===`world`){Tt=1,x||([Ln,$.speed,Rn]=[Ln+ln*1.4,$.speed+144,1]);for(let e=0;e<40*W.share();e++){let e=D()*2*Math.PI;X.set(Math.cos(e)*(20+D()*30),Math.sin(e)*(14+D()*20),-40-D()*60).add(A.position),G.set(Math.cos(e)*90,Math.sin(e)*70,K*1.2),W.spark(D()<.5?2:7,X,G,.4+D()*.3,1+D()*1.5)}}}n.length&&(B.at.needsUpdate=B.look.needsUpdate=!0)}function Yn(){Mn=1,x||([Ln,$.speed,Rn]=[Ln+ln,$.speed+108,1]),qn(0,0,F.max.z*.85,X),q(5,30,X,60,.3,.5,{push:E(0,0,120),flow:.5}),q(2,14,Ae.value,45,.5,1,{flow:.3}),x||Ze(yn*1.5)}function Xn(){x||(Rn=-1,Ln-=un,$.speed-=108)}function Zn(e,r){let i=W.share(),a=R.scale.x;for(J.exhaust+=pn*i*r*(.6+.6*Mn+.4*zn);J.exhaust>=1;J.exhaust--)qn((D()<.5?-1:1)*Q*.08,0,F.max.z*.85,X),W.spark(5,X,G.set((D()-.5)*24,(D()-.5)*24,40+K*.5),.08+D()*.1,.3*a);let o=n(1-(e.ship.y-t.low)/(mn[0]-t.low),0,1);for(J.dust+=mn[1]*i*r*o*zn;J.dust>=1;J.dust--){M(e.ship.x+(D()-.5)*20,0,(D()-.5)*10,X),X.y=.3;let t=D()<.5?-1:1;W.spark(4,X,G.set(t*(20+D()*40),15+D()*30,K*(.9+.2*D())),.35+D()*.3,1+D()*1.4,60)}let s=Math.max(0,Math.abs(e.ship.lean)-hn[0])/(1-hn[0]);for(J.shed+=hn[1]*i*r*s;J.shed>=1;J.shed--){let e=D()<.5?-1:1;qn(e*Q*.42,0,Q*.1,X),W.spark(2,X,G.set(e*25,-10+D()*20,K*.7),.5+D()*.3,.6+D()*.6,20)}for(J.wake=Math.min(2,J.wake+gn[1]*i*r*Math.max(0,zn-gn[0]));J.wake>=1;J.wake--)Hn=-Hn,qn(Hn*Q*.44,0,Q*.12,X),W.spark(0,X,G.set(0,0,K),.14+D()*.1,.26*a);let l=se.portal();if(l)for(J.portal+=90*i*r*Math.min(1,l.near*1.5);J.portal>=1;J.portal--){let e=D()*2*Math.PI,t=l.radius*(.9+D()*.5);X.set(Math.cos(e)*t,c.eye*u+Math.sin(e)*t,-l.far),G.set(Math.cos(e)*80,Math.sin(e)*80,K*1.5),W.spark(D()<.6?7:2,X,G,1.2+D()*.8,3+D()*5)}}function Qn(r,i,f,p,m,{formed:h=1,dither:g=!1}={}){I.value=i,Ln*=Math.exp(-f*dn),Rn*=Math.exp(-f*5);let _=r?r.over?fn:$e+(r.pace-$e)*h:$e;zn=Math.max(.15,_+Ln),K=260*zn,wt+=f*zn;let v=r&&!r.over?(r.mult-1)/7:0;Tt=Math.max(0,Tt-f*3.5);let y=x?0:n(.04+v*.4+Tt*.5,0,1);fe.value=Math.max(0,fe.value-f*3);let b=!!r&&!r.over;R.visible=b&&(x||r.ship.safe<=0||Math.floor(i*12)%2==0);let ee=0;if(b){let t=2*e.w*o(r.nanobots)*u/(F.max.x-F.min.x);Et=Math.max(0,Et-f*3.2),Dt=Math.max(0,Dt-f*14),On*=Math.exp(-f*8),M(r.ship.x,r.ship.y,x?0:-Math.sin(Et*Et*Math.PI)*30,R.position),x||(R.position.z+=Dt*an+On),R.scale.setScalar(t);let{lean:a,climb:s,vx:c,vy:d}=r.ship,p=Math.hypot(c,d);f>0&&(p-Pn)/f>900&&(Mn=1),Mn=Math.max(0,Mn-f*4),Pn=p;let m=x?-a*en:Un(Fn,-a*en,rn,f),g=x?s*tn:Un(In,s*tn+Dt*.08+On*.025,rn,f);R.rotation.set(g,nn/en*m,m,`YXZ`),R.updateMatrixWorld(),Ae.value.copy(R.position),de.value=n(r.nanobots/l,0,1)*h,_e.value=h<1?(z[Math.floor(h*(z.length-1))]-.09)*Q:99,h<1?fe.value=1:Nn&&Yn(),Nn=h<1;let _=x?1:1+.12*(Math.floor(i*24)%3-1),v=(1+.5*Math.min(1,p/300)+.9*Mn+.9*Math.max(0,zn-1))*_;for(let e of Nn?[]:[-1,1]){let n=Q*.75*t*v;qn(e*Q*.08,0,F.max.z*.8,X),X.z+=n/2;let r=Q*.13*t*(1+.3*Mn);B.at.setXYZW(128+ee,X.x,X.y,X.z,r),B.look.setXYZW(128+ee,2,0,0,n/r),ee++}}for(let e=ee;e<Ft;e++)B.at.setW(128+e,0);if(r){let e=1-Math.exp(-f*Zt);j.x+=(Xt[0]*r.ship.x-j.x)*e,j.y+=(c.eye+Xt[1]*(r.ship.y-t.rest)-j.y)*e,j.roll+=((x?0:-r.ship.lean*Qt)-j.roll)*e}A.position.set(j.x*u,j.y*u,0),A.quaternion.setFromEuler(yt.set(0,0,j.roll));let C=b&&!x&&r.calm>0?Math.min(1,(s-r.calm)/(s-Sn.back)):1,w=C<1,te=0;if(w){te=Ct(C/Sn.out)*Ct((1-C)/Sn.out);let e=2*Math.PI*C-Cn*Math.sin(2*Math.PI*C),t=En(Sn.high,e)*wn;bt.set(Math.sin(e)*Math.cos(t),Math.sin(t),Math.cos(e)*Math.cos(t)).multiplyScalar(Sn.far).add(R.position),A.position.lerp(bt,te),St.setFromRotationMatrix(xt.lookAt(A.position,R.position,A.up)),St.multiply(new d.Quaternion().setFromEuler(yt.set(0,0,En(Sn.lean,e)*wn))),A.quaternion.slerp(St,te)}A.updateMatrixWorld();let ne=b&&!Nn&&!w,re=ne&&r.foes.some(e=>e.here&&!e.past&&e.z>0&&e.z<1100&&Math.abs(e.x-r.ship.x)<e.r+7&&Math.abs(e.y-r.ship.y)<e.r+7);Lt.forEach(({ahead:t,size:n},i)=>{ne&&M(r.ship.x,r.ship.y,t,X),B.at.setXYZW(186+i,X.x,X.y,X.z,ne?2*e.w*u*o(r.nanobots)*n*(1+.3*Dt):0),B.look.setXYZW(186+i,7,+!!re,i,1)});let ie=x?c.lens:Un($,c.lens+on*v,cn,f);r&&Jn(r,p),b&&f>0&&!r.calm&&!Nn&&Zn(r,f),ce.update({now:i,dt:f,tier:Y,heat:v,bend:y,jolt:Tt,events:p,paused:f===0,over:!!r?.over,at:e=>it(e.x,e.y,e.z??0),speed:b||!r?zn*(1-te):0,surge:Rn*(1-te),dither:g}),se.update({now:i,dt:f,travelled:wt,rush:zn,tier:Y,bend:y,world:r?.world??`ending`,portal:r?.portal??null,lens:ie+(Sn.lens-ie)*te,turn:w?{u:C,out:te}:null}),W.update({flown:wt*260,rush:zn,tier:Y});let T=b?3*(.75+.25*o(r.nanobots)):0,E=b?e.l*o(r.nanobots)*.8:0,[O,P,ue,L]=[0,0,0,0],pe=b&&f>0&&!x?_n*W.share()*f:0;for(let e of b?r.shots:[]){M(e.x,e.y,e.z,X);let t=Ht[e.weapon],n=e.weapon===`lance`;for(let r=pe*(n?vn:1);D()<r;r--){let r=n?Math.max(E,e.z-Ut):Math.max(E,e.was);M(e.x+(D()-.5)*5,e.y+(D()-.5)*5,r+D()*Math.max(0,e.z-r),Z);let i=t?t.sparks:v>=.45&&D()<.5?6:D()<.3?8:0;W.spark(i,Z,G.set((D()-.5)*110,(D()-.5)*110,K*.75),.2+D()*.3,.3+D()*.4)}if(!t){if(O>=Pt)continue;B.at.setXYZW(O,X.x,X.y,X.z,T),B.look.setXYZW(O,0,0,v,16+8*v),B.at.setXYZW(Pt+O,X.x,-X.y,X.z,T*1.4),B.look.setXYZW(Pt+O++,4,0,v,12)}else if(!(P>=Pt)){if(e.weapon===`lance`){let n=Math.max(E,e.z-Ut);if(M(e.x,e.y,(n+e.z)/2,Z),H.at.setXYZW(10+P,Z.x,Z.y,Z.z,T*7),H.look.setXYZW(10+P++,0,0,t.index,(e.z-n)*u/(T*7)),ue<Wt){M(e.x,0,(E+e.z)/2,Z);let n=T*4;H.at.setXYZW(6+ue,Z.x,.35,Z.z,n),H.look.setXYZW(6+ue++,1,0,t.index,(e.z-E)*u/n)}}else if(e.weapon===`fan`)H.at.setXYZW(10+P,X.x,X.y,X.z,T*1.5),H.look.setXYZW(10+P++,2,e.vx/e.vz,t.index,3);else{H.at.setXYZW(10+P,X.x,X.y,X.z,T*2.6),H.look.setXYZW(10+P,3,P++,t.index,1);let n=Ge.get(e);n||Ge.set(e,n=[]),f>0&&n.unshift([X.x,X.y,X.z]),n.length=Math.min(n.length,9);for(let e=1;e<=Gt&&n[2*e]&&L<Kt;e++)H.at.setXYZW(74+L,...n[2*e],T*(1.6-.3*e)),H.look.setXYZW(74+L++,4,e-1,t.index,1)}}}for(let e=O;e<Pt;e++)B.at.setW(e,0),B.at.setW(Pt+e,0);B.at.needsUpdate=B.look.needsUpdate=!0,ke.clear();let me=At[Y].knot/Jt.length,he=0,ge=0;if(r){for(let e of r.foes){if(!e.here)continue;let t=De.get(e.id);if(t===void 0){if(!Oe.length)continue;t=Oe.pop(),De.set(e.id,t)}ke.add(e.id);let a=N(e,X),o=I.value-(Bn.get(e.id)??-9);o>.15&&Bn.delete(e.id);let s=x||o>.15?0:1-Math.floor(o*24)/4;X.z-=s*4;let c=e.r*a*(1+.3*s),l=e.family===`mimic`?0:e.family===`hive`?1.1:e.family===`thief`?-1.5:2;for(let n of Ee)for(let r=0;r<Yt;r++)n.setXYZW(t*Yt+r,X.x,X.y,X.z,r<me||e.family===`thief`?c*l:0);if(e.family===`mimic`&&he<Rt){let t=xe[he++];t.visible=!0,t.position.copy(X),t.scale.setScalar(2.6*c/(F.max.x-F.min.x)),t.rotation.set(-.2,Math.PI,n((r.ship.x-e.x)/r.reach,-1,1)*.8,`YXZ`)}else if(e.family===`hive`&&Se&&ge<zt){let t=Te[ge++],n=Se[e.id%Se.length];t.geometry=n.geometry,t.material.uniforms.uMap.value=n.map,t.visible=!0,t.position.copy(X),t.scale.setScalar(c*3.2),t.rotation.set(.3,(x?0:i*.35)+e.id,.4)}}!Ce&&r.foes.some(e=>e.family===`hive`)&&we()}for(let e=he;e<Rt;e++)xe[e].visible=!1;for(let e=ge;e<zt;e++)Te[e].visible=!1;for(let[e,t]of De)if(!ke.has(e)){for(let e of Ee)for(let n=0;n<Yt;n++)e.setW(t*Yt+n,0);De.delete(e),Oe.push(t)}for(let e of Ee)e.needsUpdate=!0;let ve=0;for(let e of r?.caches??[]){if(!e.here||ve>=Bt)continue;let t=a.r*N(e,X);for(let e=0;e<Vt;e++)Ke.setXYZW(ve*Vt+e,X.x,X.y,X.z,e<At[Y].cache?t*1.5:0);H.at.setXYZW(0+ve,X.x,X.y,X.z,t*5),H.look.setXYZW(0+ve++,6,0,Ht[e.weapon].index,1)}qe.visible=ve>0,qe.count=Math.max(1,(ve-1)*Vt+At[Y].cache),ve&&(Ke.needsUpdate=!0);let ye=He.some(e=>I.value-e<.3);if(Ve.visible=!!(P||ue||L||ye||ve),Ve.visible){Ve.count=L?74+L:10+P;for(let e=ve;e<Bt;e++)H.at.setW(0+e,0);He.forEach((e,t)=>I.value-e>=.3&&H.at.setW(2+t,0));for(let e=ue;e<Wt;e++)H.at.setW(6+e,0);for(let e=P;e<Pt;e++)H.at.setW(10+e,0);H.at.needsUpdate=H.look.needsUpdate=!0}m&&(oe.needsUpdate=!0),S.setRenderTarget(k),S.clear(),S.render(se.scene,A),w||S.clearDepth(),S.render(le,A),S.setRenderTarget(null),S.render(ce.scene,ae);let be=performance.now();be-Kn<250&&(Gn+=be-Kn,++Wn===90&&(Gn/Wn>24&&Y<At.length-1&&(Y++,et()),Wn=Gn=0)),Kn=be}return{resize:tt,draw:Qn,dispose:ne,picture:it,under:mt,shipDots:pt,tier:()=>Y,rush:()=>zn}}function kn(e,t,n){n.updateMatrixWorld(!0);let r=[],i=new e.Vector3,a=0;n.traverse(t=>{if(!t.isMesh)return;let n=t.material.name;if(/lices|glass|LAMP/.test(n))return;let o=t.geometry.clone().applyMatrix4(t.matrixWorld);o.index&&(o=o.toNonIndexed());for(let e of Object.keys(o.attributes))e!==`position`&&e!==`normal`&&o.deleteAttribute(e);r.push(o),/rouge/.test(n)&&(o.computeBoundingBox(),i.add(o.boundingBox.getCenter(new e.Vector3)),a++)});let o=t(r);for(let e of r)e.dispose();o.computeBoundingBox();let s=o.boundingBox.getCenter(new e.Vector3),c=o.boundingBox.getSize(new e.Vector3),l=i.divideScalar(a||1).sub(s);o.translate(-s.x,-s.y,-s.z),o.rotateY(Math.atan2(l.x,-l.z));let u=Q/Math.max(c.x,c.z);o.scale(u,u,u);let d=o.attributes.position,f=Q/2;for(let e=0;e<d.count;e++){let t=d.getX(e),n=d.getY(e),r=d.getZ(e),i=Math.min(1,Math.max(0,(-r/f-.3)/.4));t*=.8-.2*Math.tanh(r/(.08*Q));let a=Math.min(1,Math.abs(t)/f);r=r*1.05+(a*a*.26+a*.1)*Q,r-=Math.exp(-((t/(.085*Q))**2))*i*Q*.3,n=n*1.9+(1-a)**2*Q*.04,d.setXYZ(e,t+(Dn(t,n,r,.5)-.5)*Q*.06,n+(Dn(r,t,n,.62)-.5)*Q*.06,r+(Dn(n,r,t,.45)-.5)*Q*.06)}o.scale(.95,.95,.95),o.computeBoundingBox();let p=o.boundingBox.getCenter(new e.Vector3);return o.translate(-p.x,-p.y,-p.z),o.computeVertexNormals(),o}function An(e,t,n){let r=t.attributes.position,i=new Map,a=new Uint32Array(r.count);for(let e=0;e<r.count;e++){let t=`${Math.round(r.getX(e)/n)},${Math.round(r.getY(e)/n)},${Math.round(r.getZ(e)/n)}`,o=i.get(t);o||i.set(t,o=[0,0,0,0,i.size]),o[0]+=r.getX(e),o[1]+=r.getY(e),o[2]+=r.getZ(e),o[3]++,a[e]=o[4]}let o=[...i.values()].map(([e,t,n,r])=>[e/r,t/r,n/r]),s=[];for(let e=0;e<r.count;e+=3){let[t,n,r]=[a[e],a[e+1],a[e+2]];t!==n&&n!==r&&t!==r&&s.push(...o[t],...o[n],...o[r])}let c=new e.BufferGeometry;return c.setAttribute(`position`,new e.Float32BufferAttribute(s,3)),c}function jn(e){let t=e.getExtension(`WEBGL_debug_renderer_info`),n=t?String(e.getParameter(t.UNMASKED_RENDERER_WEBGL)):``;return/swiftshader|llvmpipe|software|basic render/i.test(n)}export{On as startView};