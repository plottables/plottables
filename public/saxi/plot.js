!(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var i = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          n.d(
            r,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 36));
})([
  function (e, t, n) {
    "use strict";
    e.exports = n(17);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e.x * e.x + e.y * e.y;
    }
    function i(e) {
      return Math.sqrt(r(e));
    }
    function a(e, t) {
      return { x: e.x - t.x, y: e.y - t.y };
    }
    function o(e, t) {
      return { x: e.x * t, y: e.y * t };
    }
    function l(e) {
      return o(e, 1 / i(e));
    }
    function u(e, t) {
      return { x: e.x + t.x, y: e.y + t.y };
    }
    function s(e, t) {
      return e.x * t.x + e.y * t.y;
    }
    n.d(t, "d", function () {
      return r;
    }),
      n.d(t, "c", function () {
        return i;
      }),
      n.d(t, "g", function () {
        return a;
      }),
      n.d(t, "e", function () {
        return o;
      }),
      n.d(t, "f", function () {
        return l;
      }),
      n.d(t, "a", function () {
        return u;
      }),
      n.d(t, "b", function () {
        return s;
      });
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "e", function () {
      return o;
    }),
      n.d(t, "a", function () {
        return l;
      }),
      n.d(t, "b", function () {
        return s;
      }),
      n.d(t, "d", function () {
        return d;
      }),
      n.d(t, "c", function () {
        return p;
      });
    var r = n(3),
      i = n(1);
    const a = 1e-9,
      o = {
        penUpHeight: 50,
        penDownHeight: 60,
        pointJoinRadius: 0,
        pathJoinRadius: 0.5,
        paperSize: r.a.standard.ArchA.landscape,
        marginMm: 20,
        selectedGroupLayers: new Set(),
        selectedStrokeLayers: new Set(),
        layerMode: "stroke",
        penDownAcceleration: 200,
        penDownMaxVelocity: 50,
        penDownCorneringFactor: 0.127,
        penUpAcceleration: 400,
        penUpMaxVelocity: 200,
        penDropDuration: 0.12,
        penLiftDuration: 0.12,
        sortPaths: !0,
        rotateDrawing: 0,
        fitPage: !0,
        cropToMargins: !0,
        minimumPathLength: 0,
      },
      l = {
        Axidraw: {
          stepsPerMm: 5,
          penServoMin: 7500,
          penServoMax: 28e3,
          penPctToPos(e) {
            const t = e / 100;
            return Math.round(
              this.penServoMin * t + this.penServoMax * (1 - t)
            );
          },
        },
      };
    l.Axidraw.stepsPerMm,
      l.Axidraw.stepsPerMm,
      l.Axidraw.stepsPerMm,
      l.Axidraw.stepsPerMm,
      l.Axidraw.stepsPerMm,
      l.Axidraw.penPctToPos(50),
      l.Axidraw.penPctToPos(60);
    class u {
      constructor(e, t, n, r, o) {
        if (!(n >= 0)) throw new Error(`vInitial must be >= 0, but was ${n}`);
        if (!(n + e * t >= -a))
          throw new Error(
            `vFinal must be >= 0, but vInitial=${n}, duration=${t}, accel=${e}`
          );
        (this.accel = e),
          (this.duration = t),
          (this.vInitial = n),
          (this.p1 = r),
          (this.p2 = o),
          (this.distance = Object(i.c)(Object(i.g)(r, o)));
      }
      static deserialize(e) {
        return new u(e.accel, e.duration, e.vInitial, e.p1, e.p2);
      }
      get vFinal() {
        return Math.max(0, this.vInitial + this.accel * this.duration);
      }
      instant(e, t = 0, n = 0) {
        const r = Math.max(0, Math.min(this.duration, e)),
          a = this.accel,
          o = this.vInitial + this.accel * r,
          l = Math.max(
            0,
            Math.min(this.distance, this.vInitial * r + (a * r * r) / 2)
          );
        return {
          t: r + t,
          p: Object(i.a)(
            this.p1,
            Object(i.e)(Object(i.f)(Object(i.g)(this.p2, this.p1)), l)
          ),
          s: l + n,
          v: o,
          a: a,
        };
      }
      serialize() {
        return {
          accel: this.accel,
          duration: this.duration,
          vInitial: this.vInitial,
          p1: this.p1,
          p2: this.p2,
        };
      }
    }
    class s {
      constructor(e, t, n) {
        (this.initialPos = e), (this.finalPos = t), (this.pDuration = n);
      }
      static deserialize(e) {
        return new s(e.initialPos, e.finalPos, e.duration);
      }
      duration() {
        return this.pDuration;
      }
      serialize() {
        return {
          t: "PenMotion",
          initialPos: this.initialPos,
          finalPos: this.finalPos,
          duration: this.pDuration,
        };
      }
    }
    function c(e, t, n) {
      const r = [];
      let i = t;
      r.push(i);
      for (const t of e) (i = n(i, t)), r.push(i);
      return r;
    }
    class d {
      constructor(e) {
        (this.blocks = e),
          (this.ts = c(
            e.map((e) => e.duration),
            0,
            (e, t) => e + t
          ).slice(0, -1)),
          (this.ss = c(
            e.map((e) => e.distance),
            0,
            (e, t) => e + t
          ).slice(0, -1));
      }
      static deserialize(e) {
        return new d(e.blocks.map(u.deserialize));
      }
      get p1() {
        return this.blocks[0].p1;
      }
      get p2() {
        return this.blocks[this.blocks.length - 1].p2;
      }
      duration() {
        return this.blocks.map((e) => e.duration).reduce((e, t) => e + t, 0);
      }
      instant(e) {
        const t = (function (e, t) {
            let n = 0,
              r = e.length;
            for (; n < r; ) {
              const i = Math.floor((n + r) / 2);
              e[i] < t ? (n = i + 1) : (r = i);
            }
            return n;
          })(this.ts, e),
          n = this.ts[t] === e ? t : t - 1;
        return this.blocks[n].instant(e - this.ts[n], this.ts[n], this.ss[n]);
      }
      serialize() {
        return { t: "XYMotion", blocks: this.blocks.map((e) => e.serialize()) };
      }
    }
    class p {
      constructor(e) {
        this.motions = e;
      }
      static deserialize(e) {
        return new p(
          e.motions.map((e) => {
            switch (e.t) {
              case "XYMotion":
                return d.deserialize(e);
              case "PenMotion":
                return s.deserialize(e);
            }
          })
        );
      }
      duration() {
        return this.motions.map((e) => e.duration()).reduce((e, t) => e + t, 0);
      }
      motion(e) {
        return this.motions[e];
      }
      withPenHeights(e, t) {
        let n = 0;
        return new p(
          this.motions.map((r, i) =>
            r instanceof d
              ? r
              : r instanceof s
              ? i === this.motions.length - 3
                ? new s(t, l.Axidraw.penPctToPos(0), r.duration())
                : i === this.motions.length - 1
                ? new s(l.Axidraw.penPctToPos(0), e, r.duration())
                : n++ % 2 == 0
                ? new s(e, t, r.duration())
                : new s(t, e, r.duration())
              : void 0
          )
        );
      }
      serialize() {
        return { motions: this.motions.map((e) => e.serialize()) };
      }
    }
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "a", function () {
      return a;
    });
    var r = n(1);
    function i(e, t = 2) {
      return { x: Number(e.x.toFixed(t)), y: Number(e.y.toFixed(t)) };
    }
    class a {
      constructor(e) {
        this.size = e;
      }
      get landscape() {
        return new a({
          x: Math.max(this.size.x, this.size.y),
          y: Math.min(this.size.x, this.size.y),
        });
      }
      get portrait() {
        return new a({
          x: Math.min(this.size.x, this.size.y),
          y: Math.max(this.size.x, this.size.y),
        });
      }
      get isLandscape() {
        return this.size.x === Math.max(this.size.x, this.size.y);
      }
    }
    a.standard = {
      USLetter: new a(i(Object(r.e)({ x: 8.5, y: 11 }, 25.4))),
      USLegal: new a(i(Object(r.e)({ x: 8.5, y: 14 }, 25.4))),
      ArchA: new a(i(Object(r.e)({ x: 9, y: 12 }, 25.4))),
      A3: new a({ x: 297, y: 420 }),
      A4: new a({ x: 210, y: 297 }),
      A5: new a({ x: 148, y: 210 }),
      A6: new a({ x: 105, y: 148 }),
      "6x8": new a(i(Object(r.e)({ x: 6, y: 8 }, 25.4))),
      "5x7": new a(i(Object(r.e)({ x: 5, y: 7 }, 25.4))),
      "11x14": new a(i(Object(r.e)({ x: 11, y: 14 }, 25.4))),
    };
  },
  function (e, t, n) {
    "use strict";
    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */ var r = Object.getOwnPropertySymbols,
      i = Object.prototype.hasOwnProperty,
      a = Object.prototype.propertyIsEnumerable;
    function o(e) {
      if (null == e)
        throw new TypeError(
          "Object.assign cannot be called with null or undefined"
        );
      return Object(e);
    }
    e.exports = (function () {
      try {
        if (!Object.assign) return !1;
        var e = new String("abc");
        if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
          return !1;
        for (var t = {}, n = 0; n < 10; n++)
          t["_" + String.fromCharCode(n)] = n;
        if (
          "0123456789" !==
          Object.getOwnPropertyNames(t)
            .map(function (e) {
              return t[e];
            })
            .join("")
        )
          return !1;
        var r = {};
        return (
          "abcdefghijklmnopqrst".split("").forEach(function (e) {
            r[e] = e;
          }),
          "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        );
      } catch (e) {
        return !1;
      }
    })()
      ? Object.assign
      : function (e, t) {
          for (var n, l, u = o(e), s = 1; s < arguments.length; s++) {
            for (var c in (n = Object(arguments[s])))
              i.call(n, c) && (u[c] = n[c]);
            if (r) {
              l = r(n);
              for (var d = 0; d < l.length; d++)
                a.call(n, l[d]) && (u[l[d]] = n[l[d]]);
            }
          }
          return u;
        };
  },
  function (e, t) {
    e.exports = function (e, t, n) {
      return e * (1 - n) + t * n;
    };
  },
  function (e, t, n) {
    "use strict";
    let { useCallback: r, useState: i, useLayoutEffect: a } = n(0);
    function o(e) {
      return e
        ? { width: e.offsetWidth, height: e.offsetHeight }
        : { width: 0, height: 0 };
    }
    e.exports = function (e) {
      let [t, n] = i(o(e ? e.current : {}));
      const l = r(
        function () {
          e.current && n(o(e.current));
        },
        [e]
      );
      return (
        a(() => {
          if (e.current) {
            if ((l(), "function" == typeof ResizeObserver)) {
              let t = new ResizeObserver(() => l());
              return (
                t.observe(e.current),
                () => {
                  t.disconnect(e.current), (t = null);
                }
              );
            }
            return (
              window.addEventListener("resize", l),
              () => {
                window.removeEventListener("resize", l);
              }
            );
          }
        }, [e.current]),
        t
      );
    };
  },
  function (e, t, n) {
    "use strict";
    !(function e() {
      if (
        "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
        "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
      ) {
        0;
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
        } catch (e) {
          console.error(e);
        }
      }
    })(),
      (e.exports = n(18));
  },
  function (e, t, n) {
    "use strict";
    const r = n(22),
      i = n(24),
      a = n(5),
      o = n(26);
    e.exports = function (e) {
      return (
        (e = e.map(function (e) {
          if ("rgb" != (e = r(e)).space) {
            if ("hsl" != e.space) throw "c.spacespace is not supported.";
            e.values = i.rgb(e.values);
          }
          return e.values.push(e.alpha), e.values;
        })),
        function (t, n) {
          (n = n || a), (t = o(t, 0, 1));
          var r = (e.length - 1) * t,
            i = Math.floor(r),
            l = Math.ceil(r);
          t = r - i;
          var u = e[i],
            s = e[l],
            c = u.map(function (e, r) {
              return (e = n(e, s[r], t)), r < 3 && (e = Math.round(e)), e;
            });
          return 1 === c[3] ? "rgb(" + c.slice(0, 3) + ")" : "rgba(" + c + ")";
        }
      );
    };
  },
  function (e, t, n) {
    "use strict";
    var r = n(27),
      i = n(5);
    function a(e) {
      return [e[0] / 255, e[1] / 255, e[2] / 255, e[3]];
    }
    function o(e) {
      for (var t, n = "#", r = 0; r < 3; ++r)
        n += ("00" + (t = (t = e[r]).toString(16))).substr(t.length);
      return n;
    }
    function l(e) {
      return "rgba(" + e.join(",") + ")";
    }
    e.exports = function (e) {
      var t, n, u, s, c, d, p, f, h, m;
      e || (e = {});
      (f = (e.nshades || 72) - 1),
        (p = e.format || "hex"),
        (d = e.colormap) || (d = "jet");
      if ("string" == typeof d) {
        if (((d = d.toLowerCase()), !r[d]))
          throw Error(d + " not a supported colorscale");
        c = r[d];
      } else {
        if (!Array.isArray(d)) throw Error("unsupported colormap option", d);
        c = d.slice();
      }
      if (c.length > f + 1)
        throw new Error(
          d + " map requires nshades to be at least size " + c.length
        );
      h = Array.isArray(e.alpha)
        ? 2 !== e.alpha.length
          ? [1, 1]
          : e.alpha.slice()
        : "number" == typeof e.alpha
        ? [e.alpha, e.alpha]
        : [1, 1];
      (t = c.map(function (e) {
        return Math.round(e.index * f);
      })),
        (h[0] = Math.min(Math.max(h[0], 0), 1)),
        (h[1] = Math.min(Math.max(h[1], 0), 1));
      var g = c.map(function (e, t) {
          var n = c[t].index,
            r = c[t].rgb.slice();
          return 4 === r.length && r[3] >= 0 && r[3] <= 1
            ? r
            : ((r[3] = h[0] + (h[1] - h[0]) * n), r);
        }),
        v = [];
      for (m = 0; m < t.length - 1; ++m) {
        (s = t[m + 1] - t[m]), (n = g[m]), (u = g[m + 1]);
        for (var b = 0; b < s; b++) {
          var y = b / s;
          v.push([
            Math.round(i(n[0], u[0], y)),
            Math.round(i(n[1], u[1], y)),
            Math.round(i(n[2], u[2], y)),
            i(n[3], u[3], y),
          ]);
        }
      }
      v.push(c[c.length - 1].rgb.concat(h[1])),
        "hex" === p
          ? (v = v.map(o))
          : "rgbaString" === p
          ? (v = v.map(l))
          : "float" === p && (v = v.map(a));
      return v;
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(28);
    t.flattenSVG = r.flattenSVG;
  },
  function (e, t, n) {
    e.exports = function () {
      return new Worker("/saxi/f394c669e1d38be8cfe1.worker.js");
    };
  },
  function (e, t, n) {
    e.exports = "/saxi/f8d3d043e0cf0b597bbc071f3979f6dc.svg";
  },
  function (e, t, n) {
    e.exports = "/saxi/b5d9aa44dd5b186d461d6138d1efa22a.svg";
  },
  function (e, t, n) {
    e.exports = "/saxi/a429882141b5f9e82388c4ca12190898.svg";
  },
  function (e, t, n) {
    "use strict";
    (function (e) {
      n.d(t, "a", function () {
        return u;
      });
      var r = n(2),
        i = n(16),
        a = n(1),
        o = function (e, t, n, r) {
          return new (n || (n = Promise))(function (i, a) {
            function o(e) {
              try {
                u(r.next(e));
              } catch (e) {
                a(e);
              }
            }
            function l(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                a(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t);
                      })).then(o, l);
            }
            u((r = r.apply(e, t || [])).next());
          });
        };
      function l(e) {
        const t = Math.floor(e);
        return [e - t, t];
      }
      class u {
        constructor(e) {
          (this.microsteppingMode = 0),
            (this.error = { x: 0, y: 0 }),
            (this.cachedFirmwareVersion = void 0),
            (this.port = e),
            (this.writer = this.port.writable.getWriter()),
            (this.commandQueue = []),
            (this.readableClosed = e.readable
              .pipeThrough(new i.a({ regex: /[\r\n]+/ }))
              .pipeTo(
                new WritableStream({
                  write: (e) => {
                    if (!/^[\r\n]*$/.test(e))
                      if (this.commandQueue.length) {
                        if (e[0] === "!".charCodeAt(0))
                          return void this.commandQueue
                            .shift()
                            .reject(new Error(e.toString("ascii")));
                        try {
                          const t = this.commandQueue[0].next(e);
                          if (t.done)
                            return void this.commandQueue
                              .shift()
                              .resolve(t.value);
                        } catch (e) {
                          return void this.commandQueue.shift().reject(e);
                        }
                      } else console.log(`unexpected data: ${e}`);
                  },
                })
              ));
        }
        get stepMultiplier() {
          switch (this.microsteppingMode) {
            case 5:
              return 1;
            case 4:
              return 2;
            case 3:
              return 4;
            case 2:
              return 8;
            case 1:
              return 16;
            default:
              throw new Error(
                `Invalid microstepping mode: ${this.microsteppingMode}`
              );
          }
        }
        close() {
          return o(this, void 0, void 0, function* () {
            throw new Error("TODO");
          });
        }
        write(t) {
          e.env.DEBUG_SAXI_COMMANDS && console.log(`writing: ${t}`);
          const n = new TextEncoder();
          return this.writer.write(n.encode(t));
        }
        query(e) {
          return o(this, void 0, void 0, function* () {
            try {
              return yield this.run(function* () {
                return this.write(`${e}\r`), (yield).toString("ascii");
              });
            } catch (t) {
              throw new Error(
                `Error in response to query '${e}': ${t.message}`
              );
            }
          });
        }
        queryM(e) {
          return o(this, void 0, void 0, function* () {
            try {
              return yield this.run(function* () {
                this.write(`${e}\r`);
                const t = [];
                for (;;) {
                  const e = (yield).toString("ascii");
                  if ("OK" === e) break;
                  t.push(e);
                }
                return t;
              });
            } catch (t) {
              throw new Error(
                `Error in response to queryM '${e}': ${t.message}`
              );
            }
          });
        }
        command(e) {
          return o(this, void 0, void 0, function* () {
            try {
              return yield this.run(function* () {
                this.write(`${e}\r`);
                const t = (yield).toString("ascii");
                if ("OK" !== t) throw new Error(`Expected OK, got ${t}`);
              });
            } catch (t) {
              throw new Error(
                `Error in response to command '${e}': ${t.message}`
              );
            }
          });
        }
        enableMotors(e) {
          return o(this, void 0, void 0, function* () {
            if (!(1 <= e && e <= 5))
              throw new Error(
                `Microstepping mode must be between 1 and 5, but was ${e}`
              );
            (this.microsteppingMode = e),
              yield this.command(`EM,${e},${e}`),
              (yield this.supportsSR()) &&
                (yield this.setServoPowerTimeout(0, !0));
          });
        }
        disableMotors() {
          return o(this, void 0, void 0, function* () {
            yield this.command("EM,0,0"),
              (yield this.supportsSR()) &&
                (yield this.setServoPowerTimeout(6e4, !1));
          });
        }
        setServoPowerTimeout(e, t) {
          return o(this, void 0, void 0, function* () {
            yield this.command(
              `SR,${(1e3 * e) | 0}${null != t ? `,${t ? 1 : 0}` : ""}`
            );
          });
        }
        setPenHeight(e, t, n = 0) {
          return this.command(`S2,${e},4,${t},${n}`);
        }
        lowlevelMove(e, t, n, r, i, a) {
          const [o, l] = this.axisRate(e, t, n),
            [u, s] = this.axisRate(r, i, a);
          return this.command(`LM,${o},${e},${l},${u},${r},${s}`);
        }
        moveWithAcceleration(e, t, n, r) {
          if (0 === e && 0 === t)
            throw new Error("Must move on at least one axis");
          if (!(n >= 0 && r >= 0))
            throw new Error(`Rates must be positive, were ${n},${r}`);
          if (!(n > 0 || r > 0))
            throw new Error("Must have non-zero velocity during motion");
          const i = e + t,
            a = e - t,
            o = Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2)),
            l = e / o,
            u = t / o,
            s = n * l,
            c = n * u,
            d = r * l,
            p = r * u,
            f = Math.abs(s + c),
            h = Math.abs(s - c),
            m = Math.abs(d + p),
            g = Math.abs(d - p);
          return this.lowlevelMove(i, f, m, a, h, g);
        }
        moveAtConstantRate(e, t, n) {
          return this.command(`XM,${Math.floor(1e3 * e)},${t},${n}`);
        }
        waitUntilMotorsIdle() {
          return o(this, void 0, void 0, function* () {
            for (;;) {
              const [, e, t, n, r] = (yield this.query("QM")).split(",");
              if ("0" === e && "0" === r) break;
            }
          });
        }
        executeBlockWithLM(e) {
          return o(this, void 0, void 0, function* () {
            const [t, n] = l(
                (e.p2.x - e.p1.x) * this.stepMultiplier + this.error.x
              ),
              [r, i] = l(
                (e.p2.y - e.p1.y) * this.stepMultiplier + this.error.y
              );
            (this.error.x = t),
              (this.error.y = r),
              (0 === n && 0 === i) ||
                (yield this.moveWithAcceleration(
                  n,
                  i,
                  e.vInitial * this.stepMultiplier,
                  e.vFinal * this.stepMultiplier
                ));
          });
        }
        executeXYMotionWithLM(e) {
          return o(this, void 0, void 0, function* () {
            for (const t of e.blocks) yield this.executeBlockWithLM(t);
          });
        }
        executeXYMotionWithXM(e, t = 15) {
          return o(this, void 0, void 0, function* () {
            const n = t / 1e3;
            let r = 0;
            for (; r < e.duration(); ) {
              const t = e.instant(r),
                i = e.instant(r + n),
                o = Object(a.g)(i.p, t.p),
                [u, s] = l(o.x * this.stepMultiplier + this.error.x),
                [c, d] = l(o.y * this.stepMultiplier + this.error.y);
              (this.error.x = u),
                (this.error.y = c),
                yield this.moveAtConstantRate(n, s, d),
                (r += n);
            }
          });
        }
        executeXYMotion(e) {
          return o(this, void 0, void 0, function* () {
            (yield this.supportsLM())
              ? yield this.executeXYMotionWithLM(e)
              : yield this.executeXYMotionWithXM(e);
          });
        }
        executePenMotion(e) {
          return this.setPenHeight(
            e.finalPos,
            0,
            Math.round(1e3 * e.duration() + 0)
          );
        }
        executeMotion(e) {
          if (e instanceof r.d) return this.executeXYMotion(e);
          if (e instanceof r.b) return this.executePenMotion(e);
          throw new Error(`Unknown motion type: ${e.constructor.name}`);
        }
        executePlan(e, t = 2) {
          return o(this, void 0, void 0, function* () {
            yield this.enableMotors(t);
            for (const t of e.motions) yield this.executeMotion(t);
            yield this.waitUntilMotorsIdle(), yield this.disableMotors();
          });
        }
        queryVoltages() {
          return o(this, void 0, void 0, function* () {
            const [e, t] = (yield this.queryM("QC"))[0].split(/,/).map(Number);
            return [
              (e / 1023) * 3.3,
              (t / 1023) * 3.3,
              (t / 1023) * 3.3 * 9.2 + 0.3,
            ];
          });
        }
        firmwareVersion() {
          return o(this, void 0, void 0, function* () {
            return yield this.query("V");
          });
        }
        firmwareVersionNumber() {
          return o(this, void 0, void 0, function* () {
            if (void 0 === this.cachedFirmwareVersion) {
              const e = (yield this.firmwareVersion()).split(" "),
                [t, n, r] = e[e.length - 1].split(".").map(Number);
              this.cachedFirmwareVersion = [t, n, r];
            }
            return this.cachedFirmwareVersion;
          });
        }
        firmwareVersionCompare(e, t, n) {
          return o(this, void 0, void 0, function* () {
            const [r, i, a] = yield this.firmwareVersionNumber();
            return r < e
              ? -1
              : r > e
              ? 1
              : i < t
              ? -1
              : i > t
              ? 1
              : a < n
              ? -1
              : a > n
              ? 1
              : 0;
          });
        }
        areSteppersPowered() {
          return o(this, void 0, void 0, function* () {
            const [, , e] = yield this.queryVoltages();
            return e > 6;
          });
        }
        queryButton() {
          return o(this, void 0, void 0, function* () {
            return "1" === (yield this.queryM("QB"))[0];
          });
        }
        supportsLM() {
          return o(this, void 0, void 0, function* () {
            return (yield this.firmwareVersionCompare(2, 5, 3)) >= 0;
          });
        }
        supportsSR() {
          return o(this, void 0, void 0, function* () {
            return (yield this.firmwareVersionCompare(2, 6, 0)) >= 0;
          });
        }
        axisRate(e, t, n) {
          if (0 === e) return [0, 0];
          const r = Math.round(85899.34592 * t),
            i = Math.round(85899.34592 * n),
            a = (2 * Math.abs(e)) / (t + n);
          return [r, Math.round((i - r) / (25e3 * a))];
        }
        run(e) {
          const t = e.call(this),
            n = t.next();
          return n.done
            ? Promise.resolve(n.value)
            : (this.commandQueue.push(t),
              new Promise((e, n) => {
                (t.resolve = e), (t.reject = n);
              }));
        }
      }
    }.call(this, n(35)));
  },
  function (e, t, n) {
    "use strict";
    n.d(t, "a", function () {
      return r;
    });
    class r extends TransformStream {
      constructor(e) {
        if (void 0 === e.regex)
          throw new TypeError(
            '"options.regex" must be a regular expression pattern or object'
          );
        e.regex instanceof RegExp || (e.regex = new RegExp(e.regex));
        const t = e.regex;
        let n = "";
        const r = new TextDecoder();
        super({
          transform(e, i) {
            const a = (n + r.decode(e)).split(t);
            (n = a.pop()),
              a.forEach((e) => {
                i.enqueue(e);
              });
          },
          flush(e) {
            e.enqueue(n), (n = "");
          },
        });
      }
    }
  },
  function (e, t, n) {
    "use strict";
    /** @license React v16.8.0-alpha.1
     * react.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = n(4),
      i = "function" == typeof Symbol && Symbol.for,
      a = i ? Symbol.for("react.element") : 60103,
      o = i ? Symbol.for("react.portal") : 60106,
      l = i ? Symbol.for("react.fragment") : 60107,
      u = i ? Symbol.for("react.strict_mode") : 60108,
      s = i ? Symbol.for("react.profiler") : 60114,
      c = i ? Symbol.for("react.provider") : 60109,
      d = i ? Symbol.for("react.context") : 60110,
      p = i ? Symbol.for("react.concurrent_mode") : 60111,
      f = i ? Symbol.for("react.forward_ref") : 60112,
      h = i ? Symbol.for("react.suspense") : 60113,
      m = i ? Symbol.for("react.memo") : 60115,
      g = i ? Symbol.for("react.lazy") : 60116,
      v = "function" == typeof Symbol && Symbol.iterator;
    function b(e) {
      for (
        var t = arguments.length - 1,
          n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          r = 0;
        r < t;
        r++
      )
        n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
      !(function (e, t, n, r, i, a, o, l) {
        if (!e) {
          if (((e = void 0), void 0 === t))
            e = Error(
              "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
            );
          else {
            var u = [n, r, i, a, o, l],
              s = 0;
            (e = Error(
              t.replace(/%s/g, function () {
                return u[s++];
              })
            )).name = "Invariant Violation";
          }
          throw ((e.framesToPop = 1), e);
        }
      })(
        !1,
        "Minified React error #" +
          e +
          "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",
        n
      );
    }
    var y = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      x = {};
    function w(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = x),
        (this.updater = n || y);
    }
    function k() {}
    function _(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = x),
        (this.updater = n || y);
    }
    (w.prototype.isReactComponent = {}),
      (w.prototype.setState = function (e, t) {
        "object" != typeof e && "function" != typeof e && null != e && b("85"),
          this.updater.enqueueSetState(this, e, t, "setState");
      }),
      (w.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      }),
      (k.prototype = w.prototype);
    var E = (_.prototype = new k());
    (E.constructor = _), r(E, w.prototype), (E.isPureReactComponent = !0);
    var T = { current: null },
      S = { current: null },
      C = Object.prototype.hasOwnProperty,
      P = { key: !0, ref: !0, __self: !0, __source: !0 };
    function O(e, t, n) {
      var r = void 0,
        i = {},
        o = null,
        l = null;
      if (null != t)
        for (r in (void 0 !== t.ref && (l = t.ref),
        void 0 !== t.key && (o = "" + t.key),
        t))
          C.call(t, r) && !P.hasOwnProperty(r) && (i[r] = t[r]);
      var u = arguments.length - 2;
      if (1 === u) i.children = n;
      else if (1 < u) {
        for (var s = Array(u), c = 0; c < u; c++) s[c] = arguments[c + 2];
        i.children = s;
      }
      if (e && e.defaultProps)
        for (r in (u = e.defaultProps)) void 0 === i[r] && (i[r] = u[r]);
      return {
        $$typeof: a,
        type: e,
        key: o,
        ref: l,
        props: i,
        _owner: S.current,
      };
    }
    function N(e) {
      return "object" == typeof e && null !== e && e.$$typeof === a;
    }
    var M = /\/+/g,
      I = [];
    function z(e, t, n, r) {
      if (I.length) {
        var i = I.pop();
        return (
          (i.result = e),
          (i.keyPrefix = t),
          (i.func = n),
          (i.context = r),
          (i.count = 0),
          i
        );
      }
      return { result: e, keyPrefix: t, func: n, context: r, count: 0 };
    }
    function L(e) {
      (e.result = null),
        (e.keyPrefix = null),
        (e.func = null),
        (e.context = null),
        (e.count = 0),
        10 > I.length && I.push(e);
    }
    function A(e, t, n) {
      return null == e
        ? 0
        : (function e(t, n, r, i) {
            var l = typeof t;
            ("undefined" !== l && "boolean" !== l) || (t = null);
            var u = !1;
            if (null === t) u = !0;
            else
              switch (l) {
                case "string":
                case "number":
                  u = !0;
                  break;
                case "object":
                  switch (t.$$typeof) {
                    case a:
                    case o:
                      u = !0;
                  }
              }
            if (u) return r(i, t, "" === n ? "." + D(t, 0) : n), 1;
            if (((u = 0), (n = "" === n ? "." : n + ":"), Array.isArray(t)))
              for (var s = 0; s < t.length; s++) {
                var c = n + D((l = t[s]), s);
                u += e(l, c, r, i);
              }
            else if (
              (null === t || "object" != typeof t
                ? (c = null)
                : (c =
                    "function" == typeof (c = (v && t[v]) || t["@@iterator"])
                      ? c
                      : null),
              "function" == typeof c)
            )
              for (t = c.call(t), s = 0; !(l = t.next()).done; )
                u += e((l = l.value), (c = n + D(l, s++)), r, i);
            else
              "object" === l &&
                b(
                  "31",
                  "[object Object]" === (r = "" + t)
                    ? "object with keys {" + Object.keys(t).join(", ") + "}"
                    : r,
                  ""
                );
            return u;
          })(e, "", t, n);
    }
    function D(e, t) {
      return "object" == typeof e && null !== e && null != e.key
        ? (function (e) {
            var t = { "=": "=0", ":": "=2" };
            return (
              "$" +
              ("" + e).replace(/[=:]/g, function (e) {
                return t[e];
              })
            );
          })(e.key)
        : t.toString(36);
    }
    function j(e, t) {
      e.func.call(e.context, t, e.count++);
    }
    function R(e, t, n) {
      var r = e.result,
        i = e.keyPrefix;
      (e = e.func.call(e.context, t, e.count++)),
        Array.isArray(e)
          ? U(e, r, n, function (e) {
              return e;
            })
          : null != e &&
            (N(e) &&
              (e = (function (e, t) {
                return {
                  $$typeof: a,
                  type: e.type,
                  key: t,
                  ref: e.ref,
                  props: e.props,
                  _owner: e._owner,
                };
              })(
                e,
                i +
                  (!e.key || (t && t.key === e.key)
                    ? ""
                    : ("" + e.key).replace(M, "$&/") + "/") +
                  n
              )),
            r.push(e));
    }
    function U(e, t, n, r, i) {
      var a = "";
      null != n && (a = ("" + n).replace(M, "$&/") + "/"),
        A(e, R, (t = z(t, a, r, i))),
        L(t);
    }
    function F() {
      var e = T.current;
      return null === e && b("298"), e;
    }
    var $ = {
      Children: {
        map: function (e, t, n) {
          if (null == e) return e;
          var r = [];
          return U(e, r, null, t, n), r;
        },
        forEach: function (e, t, n) {
          if (null == e) return e;
          A(e, j, (t = z(null, null, t, n))), L(t);
        },
        count: function (e) {
          return A(
            e,
            function () {
              return null;
            },
            null
          );
        },
        toArray: function (e) {
          var t = [];
          return (
            U(e, t, null, function (e) {
              return e;
            }),
            t
          );
        },
        only: function (e) {
          return N(e) || b("143"), e;
        },
      },
      createRef: function () {
        return { current: null };
      },
      Component: w,
      PureComponent: _,
      createContext: function (e, t) {
        return (
          void 0 === t && (t = null),
          ((e = {
            $$typeof: d,
            _calculateChangedBits: t,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }).Provider = { $$typeof: c, _context: e }),
          (e.Consumer = e)
        );
      },
      forwardRef: function (e) {
        return { $$typeof: f, render: e };
      },
      lazy: function (e) {
        return { $$typeof: g, _ctor: e, _status: -1, _result: null };
      },
      memo: function (e, t) {
        return { $$typeof: m, type: e, compare: void 0 === t ? null : t };
      },
      Fragment: l,
      StrictMode: u,
      Suspense: h,
      createElement: O,
      cloneElement: function (e, t, n) {
        null == e && b("267", e);
        var i = void 0,
          o = r({}, e.props),
          l = e.key,
          u = e.ref,
          s = e._owner;
        if (null != t) {
          void 0 !== t.ref && ((u = t.ref), (s = S.current)),
            void 0 !== t.key && (l = "" + t.key);
          var c = void 0;
          for (i in (e.type && e.type.defaultProps && (c = e.type.defaultProps),
          t))
            C.call(t, i) &&
              !P.hasOwnProperty(i) &&
              (o[i] = void 0 === t[i] && void 0 !== c ? c[i] : t[i]);
        }
        if (1 === (i = arguments.length - 2)) o.children = n;
        else if (1 < i) {
          c = Array(i);
          for (var d = 0; d < i; d++) c[d] = arguments[d + 2];
          o.children = c;
        }
        return {
          $$typeof: a,
          type: e.type,
          key: l,
          ref: u,
          props: o,
          _owner: s,
        };
      },
      createFactory: function (e) {
        var t = O.bind(null, e);
        return (t.type = e), t;
      },
      isValidElement: N,
      version: "16.8.0-alpha.1",
      unstable_ConcurrentMode: p,
      unstable_Profiler: s,
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        ReactCurrentDispatcher: T,
        ReactCurrentOwner: S,
        assign: r,
      },
    };
    ($.ConcurrentMode = p),
      ($.Profiler = s),
      ($.unstable_ConcurrentMode = void 0),
      ($.unstable_Profiler = void 0),
      ($.useCallback = function (e, t) {
        return F().useCallback(e, t);
      }),
      ($.useContext = function (e, t) {
        return F().useContext(e, t);
      }),
      ($.useEffect = function (e, t) {
        return F().useEffect(e, t);
      }),
      ($.useImperativeHandle = function (e, t, n) {
        return F().useImperativeHandle(e, t, n);
      }),
      ($.useDebugValue = function () {}),
      ($.useLayoutEffect = function (e, t) {
        return F().useLayoutEffect(e, t);
      }),
      ($.useMemo = function (e, t) {
        return F().useMemo(e, t);
      }),
      ($.useReducer = function (e, t, n) {
        return F().useReducer(e, t, n);
      }),
      ($.useRef = function (e) {
        return F().useRef(e);
      }),
      ($.useState = function (e) {
        return F().useState(e);
      });
    var V = { default: $ },
      W = (V && $) || V;
    e.exports = W.default || W;
  },
  function (e, t, n) {
    "use strict";
    /** @license React v16.8.0-alpha.1
     * react-dom.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = n(0),
      i = n(4),
      a = n(19);
    function o(e) {
      for (
        var t = arguments.length - 1,
          n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          r = 0;
        r < t;
        r++
      )
        n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
      !(function (e, t, n, r, i, a, o, l) {
        if (!e) {
          if (((e = void 0), void 0 === t))
            e = Error(
              "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
            );
          else {
            var u = [n, r, i, a, o, l],
              s = 0;
            (e = Error(
              t.replace(/%s/g, function () {
                return u[s++];
              })
            )).name = "Invariant Violation";
          }
          throw ((e.framesToPop = 1), e);
        }
      })(
        !1,
        "Minified React error #" +
          e +
          "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",
        n
      );
    }
    function l(e, t, n, r, i, a, o, l, u) {
      var s = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(n, s);
      } catch (e) {
        this.onError(e);
      }
    }
    r || o("227");
    var u = !1,
      s = null,
      c = !1,
      d = null,
      p = {
        onError: function (e) {
          (u = !0), (s = e);
        },
      };
    function f(e, t, n, r, i, a, o, c, d) {
      (u = !1), (s = null), l.apply(p, arguments);
    }
    var h = null,
      m = {};
    function g() {
      if (h)
        for (var e in m) {
          var t = m[e],
            n = h.indexOf(e);
          if ((-1 < n || o("96", e), !b[n]))
            for (var r in (t.extractEvents || o("97", e),
            (b[n] = t),
            (n = t.eventTypes))) {
              var i = void 0,
                a = n[r],
                l = t,
                u = r;
              y.hasOwnProperty(u) && o("99", u), (y[u] = a);
              var s = a.phasedRegistrationNames;
              if (s) {
                for (i in s) s.hasOwnProperty(i) && v(s[i], l, u);
                i = !0;
              } else
                a.registrationName
                  ? (v(a.registrationName, l, u), (i = !0))
                  : (i = !1);
              i || o("98", r, e);
            }
        }
    }
    function v(e, t, n) {
      x[e] && o("100", e), (x[e] = t), (w[e] = t.eventTypes[n].dependencies);
    }
    var b = [],
      y = {},
      x = {},
      w = {},
      k = null,
      _ = null,
      E = null;
    function T(e, t, n) {
      var r = e.type || "unknown-event";
      (e.currentTarget = E(n)),
        (function (e, t, n, r, i, a, l, p, h) {
          if ((f.apply(this, arguments), u)) {
            if (u) {
              var m = s;
              (u = !1), (s = null);
            } else o("198"), (m = void 0);
            c || ((c = !0), (d = m));
          }
        })(r, t, void 0, e),
        (e.currentTarget = null);
    }
    function S(e, t) {
      return (
        null == t && o("30"),
        null == e
          ? t
          : Array.isArray(e)
          ? Array.isArray(t)
            ? (e.push.apply(e, t), e)
            : (e.push(t), e)
          : Array.isArray(t)
          ? [e].concat(t)
          : [e, t]
      );
    }
    function C(e, t, n) {
      Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
    }
    var P = null;
    function O(e) {
      if (e) {
        var t = e._dispatchListeners,
          n = e._dispatchInstances;
        if (Array.isArray(t))
          for (var r = 0; r < t.length && !e.isPropagationStopped(); r++)
            T(e, t[r], n[r]);
        else t && T(e, t, n);
        (e._dispatchListeners = null),
          (e._dispatchInstances = null),
          e.isPersistent() || e.constructor.release(e);
      }
    }
    var N = {
      injectEventPluginOrder: function (e) {
        h && o("101"), (h = Array.prototype.slice.call(e)), g();
      },
      injectEventPluginsByName: function (e) {
        var t,
          n = !1;
        for (t in e)
          if (e.hasOwnProperty(t)) {
            var r = e[t];
            (m.hasOwnProperty(t) && m[t] === r) ||
              (m[t] && o("102", t), (m[t] = r), (n = !0));
          }
        n && g();
      },
    };
    function M(e, t) {
      var n = e.stateNode;
      if (!n) return null;
      var r = k(n);
      if (!r) return null;
      n = r[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
          (r = !r.disabled) ||
            (r = !(
              "button" === (e = e.type) ||
              "input" === e ||
              "select" === e ||
              "textarea" === e
            )),
            (e = !r);
          break e;
        default:
          e = !1;
      }
      return e
        ? null
        : (n && "function" != typeof n && o("231", t, typeof n), n);
    }
    function I(e) {
      if (
        (null !== e && (P = S(P, e)),
        (e = P),
        (P = null),
        e && (C(e, O), P && o("95"), c))
      )
        throw ((e = d), (c = !1), (d = null), e);
    }
    var z = Math.random().toString(36).slice(2),
      L = "__reactInternalInstance$" + z,
      A = "__reactEventHandlers$" + z;
    function D(e) {
      if (e[L]) return e[L];
      for (; !e[L]; ) {
        if (!e.parentNode) return null;
        e = e.parentNode;
      }
      return 5 === (e = e[L]).tag || 6 === e.tag ? e : null;
    }
    function j(e) {
      return !(e = e[L]) || (5 !== e.tag && 6 !== e.tag) ? null : e;
    }
    function R(e) {
      if (5 === e.tag || 6 === e.tag) return e.stateNode;
      o("33");
    }
    function U(e) {
      return e[A] || null;
    }
    function F(e) {
      do {
        e = e.return;
      } while (e && 5 !== e.tag);
      return e || null;
    }
    function $(e, t, n) {
      (t = M(e, n.dispatchConfig.phasedRegistrationNames[t])) &&
        ((n._dispatchListeners = S(n._dispatchListeners, t)),
        (n._dispatchInstances = S(n._dispatchInstances, e)));
    }
    function V(e) {
      if (e && e.dispatchConfig.phasedRegistrationNames) {
        for (var t = e._targetInst, n = []; t; ) n.push(t), (t = F(t));
        for (t = n.length; 0 < t--; ) $(n[t], "captured", e);
        for (t = 0; t < n.length; t++) $(n[t], "bubbled", e);
      }
    }
    function W(e, t, n) {
      e &&
        n &&
        n.dispatchConfig.registrationName &&
        (t = M(e, n.dispatchConfig.registrationName)) &&
        ((n._dispatchListeners = S(n._dispatchListeners, t)),
        (n._dispatchInstances = S(n._dispatchInstances, e)));
    }
    function H(e) {
      e && e.dispatchConfig.registrationName && W(e._targetInst, null, e);
    }
    function B(e) {
      C(e, V);
    }
    var q = !(
      "undefined" == typeof window ||
      !window.document ||
      !window.document.createElement
    );
    function Q(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n["Webkit" + e] = "webkit" + t),
        (n["Moz" + e] = "moz" + t),
        n
      );
    }
    var G = {
        animationend: Q("Animation", "AnimationEnd"),
        animationiteration: Q("Animation", "AnimationIteration"),
        animationstart: Q("Animation", "AnimationStart"),
        transitionend: Q("Transition", "TransitionEnd"),
      },
      K = {},
      Y = {};
    function X(e) {
      if (K[e]) return K[e];
      if (!G[e]) return e;
      var t,
        n = G[e];
      for (t in n) if (n.hasOwnProperty(t) && t in Y) return (K[e] = n[t]);
      return e;
    }
    q &&
      ((Y = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete G.animationend.animation,
        delete G.animationiteration.animation,
        delete G.animationstart.animation),
      "TransitionEvent" in window || delete G.transitionend.transition);
    var Z = X("animationend"),
      J = X("animationiteration"),
      ee = X("animationstart"),
      te = X("transitionend"),
      ne =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " "
        ),
      re = null,
      ie = null,
      ae = null;
    function oe() {
      if (ae) return ae;
      var e,
        t,
        n = ie,
        r = n.length,
        i = "value" in re ? re.value : re.textContent,
        a = i.length;
      for (e = 0; e < r && n[e] === i[e]; e++);
      var o = r - e;
      for (t = 1; t <= o && n[r - t] === i[a - t]; t++);
      return (ae = i.slice(e, 1 < t ? 1 - t : void 0));
    }
    function le() {
      return !0;
    }
    function ue() {
      return !1;
    }
    function se(e, t, n, r) {
      for (var i in ((this.dispatchConfig = e),
      (this._targetInst = t),
      (this.nativeEvent = n),
      (e = this.constructor.Interface)))
        e.hasOwnProperty(i) &&
          ((t = e[i])
            ? (this[i] = t(n))
            : "target" === i
            ? (this.target = r)
            : (this[i] = n[i]));
      return (
        (this.isDefaultPrevented = (
          null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue
        )
          ? le
          : ue),
        (this.isPropagationStopped = ue),
        this
      );
    }
    function ce(e, t, n, r) {
      if (this.eventPool.length) {
        var i = this.eventPool.pop();
        return this.call(i, e, t, n, r), i;
      }
      return new this(e, t, n, r);
    }
    function de(e) {
      e instanceof this || o("279"),
        e.destructor(),
        10 > this.eventPool.length && this.eventPool.push(e);
    }
    function pe(e) {
      (e.eventPool = []), (e.getPooled = ce), (e.release = de);
    }
    i(se.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e &&
          (e.preventDefault
            ? e.preventDefault()
            : "unknown" != typeof e.returnValue && (e.returnValue = !1),
          (this.isDefaultPrevented = le));
      },
      stopPropagation: function () {
        var e = this.nativeEvent;
        e &&
          (e.stopPropagation
            ? e.stopPropagation()
            : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0),
          (this.isPropagationStopped = le));
      },
      persist: function () {
        this.isPersistent = le;
      },
      isPersistent: ue,
      destructor: function () {
        var e,
          t = this.constructor.Interface;
        for (e in t) this[e] = null;
        (this.nativeEvent = this._targetInst = this.dispatchConfig = null),
          (this.isPropagationStopped = this.isDefaultPrevented = ue),
          (this._dispatchInstances = this._dispatchListeners = null);
      },
    }),
      (se.Interface = {
        type: null,
        target: null,
        currentTarget: function () {
          return null;
        },
        eventPhase: null,
        bubbles: null,
        cancelable: null,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: null,
        isTrusted: null,
      }),
      (se.extend = function (e) {
        function t() {}
        function n() {
          return r.apply(this, arguments);
        }
        var r = this;
        t.prototype = r.prototype;
        var a = new t();
        return (
          i(a, n.prototype),
          (n.prototype = a),
          (n.prototype.constructor = n),
          (n.Interface = i({}, r.Interface, e)),
          (n.extend = r.extend),
          pe(n),
          n
        );
      }),
      pe(se);
    var fe = se.extend({ data: null }),
      he = se.extend({ data: null }),
      me = [9, 13, 27, 32],
      ge = q && "CompositionEvent" in window,
      ve = null;
    q && "documentMode" in document && (ve = document.documentMode);
    var be = q && "TextEvent" in window && !ve,
      ye = q && (!ge || (ve && 8 < ve && 11 >= ve)),
      xe = String.fromCharCode(32),
      we = {
        beforeInput: {
          phasedRegistrationNames: {
            bubbled: "onBeforeInput",
            captured: "onBeforeInputCapture",
          },
          dependencies: ["compositionend", "keypress", "textInput", "paste"],
        },
        compositionEnd: {
          phasedRegistrationNames: {
            bubbled: "onCompositionEnd",
            captured: "onCompositionEndCapture",
          },
          dependencies:
            "blur compositionend keydown keypress keyup mousedown".split(" "),
        },
        compositionStart: {
          phasedRegistrationNames: {
            bubbled: "onCompositionStart",
            captured: "onCompositionStartCapture",
          },
          dependencies:
            "blur compositionstart keydown keypress keyup mousedown".split(" "),
        },
        compositionUpdate: {
          phasedRegistrationNames: {
            bubbled: "onCompositionUpdate",
            captured: "onCompositionUpdateCapture",
          },
          dependencies:
            "blur compositionupdate keydown keypress keyup mousedown".split(
              " "
            ),
        },
      },
      ke = !1;
    function _e(e, t) {
      switch (e) {
        case "keyup":
          return -1 !== me.indexOf(t.keyCode);
        case "keydown":
          return 229 !== t.keyCode;
        case "keypress":
        case "mousedown":
        case "blur":
          return !0;
        default:
          return !1;
      }
    }
    function Ee(e) {
      return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
    }
    var Te = !1;
    var Se = {
        eventTypes: we,
        extractEvents: function (e, t, n, r) {
          var i = void 0,
            a = void 0;
          if (ge)
            e: {
              switch (e) {
                case "compositionstart":
                  i = we.compositionStart;
                  break e;
                case "compositionend":
                  i = we.compositionEnd;
                  break e;
                case "compositionupdate":
                  i = we.compositionUpdate;
                  break e;
              }
              i = void 0;
            }
          else
            Te
              ? _e(e, n) && (i = we.compositionEnd)
              : "keydown" === e &&
                229 === n.keyCode &&
                (i = we.compositionStart);
          return (
            i
              ? (ye &&
                  "ko" !== n.locale &&
                  (Te || i !== we.compositionStart
                    ? i === we.compositionEnd && Te && (a = oe())
                    : ((ie = "value" in (re = r) ? re.value : re.textContent),
                      (Te = !0))),
                (i = fe.getPooled(i, t, n, r)),
                a ? (i.data = a) : null !== (a = Ee(n)) && (i.data = a),
                B(i),
                (a = i))
              : (a = null),
            (e = be
              ? (function (e, t) {
                  switch (e) {
                    case "compositionend":
                      return Ee(t);
                    case "keypress":
                      return 32 !== t.which ? null : ((ke = !0), xe);
                    case "textInput":
                      return (e = t.data) === xe && ke ? null : e;
                    default:
                      return null;
                  }
                })(e, n)
              : (function (e, t) {
                  if (Te)
                    return "compositionend" === e || (!ge && _e(e, t))
                      ? ((e = oe()), (ae = ie = re = null), (Te = !1), e)
                      : null;
                  switch (e) {
                    case "paste":
                      return null;
                    case "keypress":
                      if (
                        !(t.ctrlKey || t.altKey || t.metaKey) ||
                        (t.ctrlKey && t.altKey)
                      ) {
                        if (t.char && 1 < t.char.length) return t.char;
                        if (t.which) return String.fromCharCode(t.which);
                      }
                      return null;
                    case "compositionend":
                      return ye && "ko" !== t.locale ? null : t.data;
                    default:
                      return null;
                  }
                })(e, n))
              ? (((t = he.getPooled(we.beforeInput, t, n, r)).data = e), B(t))
              : (t = null),
            null === a ? t : null === t ? a : [a, t]
          );
        },
      },
      Ce = null,
      Pe = null,
      Oe = null;
    function Ne(e) {
      if ((e = _(e))) {
        "function" != typeof Ce && o("280");
        var t = k(e.stateNode);
        Ce(e.stateNode, e.type, t);
      }
    }
    function Me(e) {
      Pe ? (Oe ? Oe.push(e) : (Oe = [e])) : (Pe = e);
    }
    function Ie() {
      if (Pe) {
        var e = Pe,
          t = Oe;
        if (((Oe = Pe = null), Ne(e), t))
          for (e = 0; e < t.length; e++) Ne(t[e]);
      }
    }
    function ze(e, t) {
      return e(t);
    }
    function Le(e, t, n) {
      return e(t, n);
    }
    function Ae() {}
    var De = !1;
    function je(e, t) {
      if (De) return e(t);
      De = !0;
      try {
        return ze(e, t);
      } finally {
        (De = !1), (null !== Pe || null !== Oe) && (Ae(), Ie());
      }
    }
    var Re = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function Ue(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return "input" === t ? !!Re[e.type] : "textarea" === t;
    }
    function Fe(e) {
      return (
        (e = e.target || e.srcElement || window).correspondingUseElement &&
          (e = e.correspondingUseElement),
        3 === e.nodeType ? e.parentNode : e
      );
    }
    function $e(e) {
      if (!q) return !1;
      var t = (e = "on" + e) in document;
      return (
        t ||
          ((t = document.createElement("div")).setAttribute(e, "return;"),
          (t = "function" == typeof t[e])),
        t
      );
    }
    function Ve(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        "input" === e.toLowerCase() &&
        ("checkbox" === t || "radio" === t)
      );
    }
    function We(e) {
      e._valueTracker ||
        (e._valueTracker = (function (e) {
          var t = Ve(e) ? "checked" : "value",
            n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
            r = "" + e[t];
          if (
            !e.hasOwnProperty(t) &&
            void 0 !== n &&
            "function" == typeof n.get &&
            "function" == typeof n.set
          ) {
            var i = n.get,
              a = n.set;
            return (
              Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                  return i.call(this);
                },
                set: function (e) {
                  (r = "" + e), a.call(this, e);
                },
              }),
              Object.defineProperty(e, t, { enumerable: n.enumerable }),
              {
                getValue: function () {
                  return r;
                },
                setValue: function (e) {
                  r = "" + e;
                },
                stopTracking: function () {
                  (e._valueTracker = null), delete e[t];
                },
              }
            );
          }
        })(e));
    }
    function He(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = "";
      return (
        e && (r = Ve(e) ? (e.checked ? "true" : "false") : e.value),
        (e = r) !== n && (t.setValue(e), !0)
      );
    }
    var Be = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      qe = /^(.*)[\\\/]/,
      Qe = "function" == typeof Symbol && Symbol.for,
      Ge = Qe ? Symbol.for("react.element") : 60103,
      Ke = Qe ? Symbol.for("react.portal") : 60106,
      Ye = Qe ? Symbol.for("react.fragment") : 60107,
      Xe = Qe ? Symbol.for("react.strict_mode") : 60108,
      Ze = Qe ? Symbol.for("react.profiler") : 60114,
      Je = Qe ? Symbol.for("react.provider") : 60109,
      et = Qe ? Symbol.for("react.context") : 60110,
      tt = Qe ? Symbol.for("react.concurrent_mode") : 60111,
      nt = Qe ? Symbol.for("react.forward_ref") : 60112,
      rt = Qe ? Symbol.for("react.suspense") : 60113,
      it = Qe ? Symbol.for("react.memo") : 60115,
      at = Qe ? Symbol.for("react.lazy") : 60116,
      ot = "function" == typeof Symbol && Symbol.iterator;
    function lt(e) {
      return null === e || "object" != typeof e
        ? null
        : "function" == typeof (e = (ot && e[ot]) || e["@@iterator"])
        ? e
        : null;
    }
    function ut(e) {
      if (null == e) return null;
      if ("function" == typeof e) return e.displayName || e.name || null;
      if ("string" == typeof e) return e;
      switch (e) {
        case tt:
          return "ConcurrentMode";
        case Ye:
          return "Fragment";
        case Ke:
          return "Portal";
        case Ze:
          return "Profiler";
        case Xe:
          return "StrictMode";
        case rt:
          return "Suspense";
      }
      if ("object" == typeof e)
        switch (e.$$typeof) {
          case et:
            return "Context.Consumer";
          case Je:
            return "Context.Provider";
          case nt:
            var t = e.render;
            return (
              (t = t.displayName || t.name || ""),
              e.displayName ||
                ("" !== t ? "ForwardRef(" + t + ")" : "ForwardRef")
            );
          case it:
            return ut(e.type);
          case at:
            if ((e = 1 === e._status ? e._result : null)) return ut(e);
        }
      return null;
    }
    function st(e) {
      var t = "";
      do {
        e: switch (e.tag) {
          case 3:
          case 4:
          case 6:
          case 7:
          case 10:
          case 9:
            var n = "";
            break e;
          default:
            var r = e._debugOwner,
              i = e._debugSource,
              a = ut(e.type);
            (n = null),
              r && (n = ut(r.type)),
              (r = a),
              (a = ""),
              i
                ? (a =
                    " (at " +
                    i.fileName.replace(qe, "") +
                    ":" +
                    i.lineNumber +
                    ")")
                : n && (a = " (created by " + n + ")"),
              (n = "\n    in " + (r || "Unknown") + a);
        }
        (t += n), (e = e.return);
      } while (e);
      return t;
    }
    var ct =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      dt = Object.prototype.hasOwnProperty,
      pt = {},
      ft = {};
    function ht(e, t, n, r, i) {
      (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
        (this.attributeName = r),
        (this.attributeNamespace = i),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t);
    }
    var mt = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
      .split(" ")
      .forEach(function (e) {
        mt[e] = new ht(e, 0, !1, e, null);
      }),
      [
        ["acceptCharset", "accept-charset"],
        ["className", "class"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
      ].forEach(function (e) {
        var t = e[0];
        mt[t] = new ht(t, 1, !1, e[1], null);
      }),
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
        e
      ) {
        mt[e] = new ht(e, 2, !1, e.toLowerCase(), null);
      }),
      [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha",
      ].forEach(function (e) {
        mt[e] = new ht(e, 2, !1, e, null);
      }),
      "allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
        .split(" ")
        .forEach(function (e) {
          mt[e] = new ht(e, 3, !1, e.toLowerCase(), null);
        }),
      ["checked", "multiple", "muted", "selected"].forEach(function (e) {
        mt[e] = new ht(e, 3, !0, e, null);
      }),
      ["capture", "download"].forEach(function (e) {
        mt[e] = new ht(e, 4, !1, e, null);
      }),
      ["cols", "rows", "size", "span"].forEach(function (e) {
        mt[e] = new ht(e, 6, !1, e, null);
      }),
      ["rowSpan", "start"].forEach(function (e) {
        mt[e] = new ht(e, 5, !1, e.toLowerCase(), null);
      });
    var gt = /[\-:]([a-z])/g;
    function vt(e) {
      return e[1].toUpperCase();
    }
    function bt(e, t, n, r) {
      var i = mt.hasOwnProperty(t) ? mt[t] : null;
      (null !== i
        ? 0 === i.type
        : !r &&
          2 < t.length &&
          ("o" === t[0] || "O" === t[0]) &&
          ("n" === t[1] || "N" === t[1])) ||
        ((function (e, t, n, r) {
          if (
            null == t ||
            (function (e, t, n, r) {
              if (null !== n && 0 === n.type) return !1;
              switch (typeof t) {
                case "function":
                case "symbol":
                  return !0;
                case "boolean":
                  return (
                    !r &&
                    (null !== n
                      ? !n.acceptsBooleans
                      : "data-" !== (e = e.toLowerCase().slice(0, 5)) &&
                        "aria-" !== e)
                  );
                default:
                  return !1;
              }
            })(e, t, n, r)
          )
            return !0;
          if (r) return !1;
          if (null !== n)
            switch (n.type) {
              case 3:
                return !t;
              case 4:
                return !1 === t;
              case 5:
                return isNaN(t);
              case 6:
                return isNaN(t) || 1 > t;
            }
          return !1;
        })(t, n, i, r) && (n = null),
        r || null === i
          ? (function (e) {
              return (
                !!dt.call(ft, e) ||
                (!dt.call(pt, e) &&
                  (ct.test(e) ? (ft[e] = !0) : ((pt[e] = !0), !1)))
              );
            })(t) &&
            (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
          : i.mustUseProperty
          ? (e[i.propertyName] = null === n ? 3 !== i.type && "" : n)
          : ((t = i.attributeName),
            (r = i.attributeNamespace),
            null === n
              ? e.removeAttribute(t)
              : ((n =
                  3 === (i = i.type) || (4 === i && !0 === n) ? "" : "" + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
    }
    function yt(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "object":
        case "string":
        case "undefined":
          return e;
        default:
          return "";
      }
    }
    function xt(e, t) {
      var n = t.checked;
      return i({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: null != n ? n : e._wrapperState.initialChecked,
      });
    }
    function wt(e, t) {
      var n = null == t.defaultValue ? "" : t.defaultValue,
        r = null != t.checked ? t.checked : t.defaultChecked;
      (n = yt(null != t.value ? t.value : n)),
        (e._wrapperState = {
          initialChecked: r,
          initialValue: n,
          controlled:
            "checkbox" === t.type || "radio" === t.type
              ? null != t.checked
              : null != t.value,
        });
    }
    function kt(e, t) {
      null != (t = t.checked) && bt(e, "checked", t, !1);
    }
    function _t(e, t) {
      kt(e, t);
      var n = yt(t.value),
        r = t.type;
      if (null != n)
        "number" === r
          ? ((0 === n && "" === e.value) || e.value != n) && (e.value = "" + n)
          : e.value !== "" + n && (e.value = "" + n);
      else if ("submit" === r || "reset" === r)
        return void e.removeAttribute("value");
      t.hasOwnProperty("value")
        ? Tt(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && Tt(e, t.type, yt(t.defaultValue)),
        null == t.checked &&
          null != t.defaultChecked &&
          (e.defaultChecked = !!t.defaultChecked);
    }
    function Et(e, t, n) {
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (
          !(
            ("submit" !== r && "reset" !== r) ||
            (void 0 !== t.value && null !== t.value)
          )
        )
          return;
        (t = "" + e._wrapperState.initialValue),
          n || t === e.value || (e.value = t),
          (e.defaultValue = t);
      }
      "" !== (n = e.name) && (e.name = ""),
        (e.defaultChecked = !e.defaultChecked),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        "" !== n && (e.name = n);
    }
    function Tt(e, t, n) {
      ("number" === t && e.ownerDocument.activeElement === e) ||
        (null == n
          ? (e.defaultValue = "" + e._wrapperState.initialValue)
          : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(gt, vt);
        mt[t] = new ht(t, 1, !1, e, null);
      }),
      "xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type"
        .split(" ")
        .forEach(function (e) {
          var t = e.replace(gt, vt);
          mt[t] = new ht(t, 1, !1, e, "http://www.w3.org/1999/xlink");
        }),
      ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
        var t = e.replace(gt, vt);
        mt[t] = new ht(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace");
      }),
      (mt.tabIndex = new ht("tabIndex", 1, !1, "tabindex", null));
    var St = {
      change: {
        phasedRegistrationNames: {
          bubbled: "onChange",
          captured: "onChangeCapture",
        },
        dependencies:
          "blur change click focus input keydown keyup selectionchange".split(
            " "
          ),
      },
    };
    function Ct(e, t, n) {
      return (
        ((e = se.getPooled(St.change, e, t, n)).type = "change"), Me(n), B(e), e
      );
    }
    var Pt = null,
      Ot = null;
    function Nt(e) {
      I(e);
    }
    function Mt(e) {
      if (He(R(e))) return e;
    }
    function It(e, t) {
      if ("change" === e) return t;
    }
    var zt = !1;
    function Lt() {
      Pt && (Pt.detachEvent("onpropertychange", At), (Ot = Pt = null));
    }
    function At(e) {
      "value" === e.propertyName && Mt(Ot) && je(Nt, (e = Ct(Ot, e, Fe(e))));
    }
    function Dt(e, t, n) {
      "focus" === e
        ? (Lt(), (Ot = n), (Pt = t).attachEvent("onpropertychange", At))
        : "blur" === e && Lt();
    }
    function jt(e) {
      if ("selectionchange" === e || "keyup" === e || "keydown" === e)
        return Mt(Ot);
    }
    function Rt(e, t) {
      if ("click" === e) return Mt(t);
    }
    function Ut(e, t) {
      if ("input" === e || "change" === e) return Mt(t);
    }
    q &&
      (zt =
        $e("input") && (!document.documentMode || 9 < document.documentMode));
    var Ft = {
        eventTypes: St,
        _isInputEventSupported: zt,
        extractEvents: function (e, t, n, r) {
          var i = t ? R(t) : window,
            a = void 0,
            o = void 0,
            l = i.nodeName && i.nodeName.toLowerCase();
          if (
            ("select" === l || ("input" === l && "file" === i.type)
              ? (a = It)
              : Ue(i)
              ? zt
                ? (a = Ut)
                : ((a = jt), (o = Dt))
              : (l = i.nodeName) &&
                "input" === l.toLowerCase() &&
                ("checkbox" === i.type || "radio" === i.type) &&
                (a = Rt),
            a && (a = a(e, t)))
          )
            return Ct(a, n, r);
          o && o(e, i, t),
            "blur" === e &&
              (e = i._wrapperState) &&
              e.controlled &&
              "number" === i.type &&
              Tt(i, "number", i.value);
        },
      },
      $t = se.extend({ view: null, detail: null }),
      Vt = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      };
    function Wt(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : !!(e = Vt[e]) && !!t[e];
    }
    function Ht() {
      return Wt;
    }
    var Bt = 0,
      qt = 0,
      Qt = !1,
      Gt = !1,
      Kt = $t.extend({
        screenX: null,
        screenY: null,
        clientX: null,
        clientY: null,
        pageX: null,
        pageY: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        getModifierState: Ht,
        button: null,
        buttons: null,
        relatedTarget: function (e) {
          return (
            e.relatedTarget ||
            (e.fromElement === e.srcElement ? e.toElement : e.fromElement)
          );
        },
        movementX: function (e) {
          if ("movementX" in e) return e.movementX;
          var t = Bt;
          return (
            (Bt = e.screenX),
            Qt ? ("mousemove" === e.type ? e.screenX - t : 0) : ((Qt = !0), 0)
          );
        },
        movementY: function (e) {
          if ("movementY" in e) return e.movementY;
          var t = qt;
          return (
            (qt = e.screenY),
            Gt ? ("mousemove" === e.type ? e.screenY - t : 0) : ((Gt = !0), 0)
          );
        },
      }),
      Yt = Kt.extend({
        pointerId: null,
        width: null,
        height: null,
        pressure: null,
        tangentialPressure: null,
        tiltX: null,
        tiltY: null,
        twist: null,
        pointerType: null,
        isPrimary: null,
      }),
      Xt = {
        mouseEnter: {
          registrationName: "onMouseEnter",
          dependencies: ["mouseout", "mouseover"],
        },
        mouseLeave: {
          registrationName: "onMouseLeave",
          dependencies: ["mouseout", "mouseover"],
        },
        pointerEnter: {
          registrationName: "onPointerEnter",
          dependencies: ["pointerout", "pointerover"],
        },
        pointerLeave: {
          registrationName: "onPointerLeave",
          dependencies: ["pointerout", "pointerover"],
        },
      },
      Zt = {
        eventTypes: Xt,
        extractEvents: function (e, t, n, r) {
          var i = "mouseover" === e || "pointerover" === e,
            a = "mouseout" === e || "pointerout" === e;
          if ((i && (n.relatedTarget || n.fromElement)) || (!a && !i))
            return null;
          if (
            ((i =
              r.window === r
                ? r
                : (i = r.ownerDocument)
                ? i.defaultView || i.parentWindow
                : window),
            a
              ? ((a = t),
                (t = (t = n.relatedTarget || n.toElement) ? D(t) : null))
              : (a = null),
            a === t)
          )
            return null;
          var o = void 0,
            l = void 0,
            u = void 0,
            s = void 0;
          "mouseout" === e || "mouseover" === e
            ? ((o = Kt),
              (l = Xt.mouseLeave),
              (u = Xt.mouseEnter),
              (s = "mouse"))
            : ("pointerout" !== e && "pointerover" !== e) ||
              ((o = Yt),
              (l = Xt.pointerLeave),
              (u = Xt.pointerEnter),
              (s = "pointer"));
          var c = null == a ? i : R(a);
          if (
            ((i = null == t ? i : R(t)),
            ((e = o.getPooled(l, a, n, r)).type = s + "leave"),
            (e.target = c),
            (e.relatedTarget = i),
            ((n = o.getPooled(u, t, n, r)).type = s + "enter"),
            (n.target = i),
            (n.relatedTarget = c),
            (r = t),
            a && r)
          )
            e: {
              for (i = r, s = 0, o = t = a; o; o = F(o)) s++;
              for (o = 0, u = i; u; u = F(u)) o++;
              for (; 0 < s - o; ) (t = F(t)), s--;
              for (; 0 < o - s; ) (i = F(i)), o--;
              for (; s--; ) {
                if (t === i || t === i.alternate) break e;
                (t = F(t)), (i = F(i));
              }
              t = null;
            }
          else t = null;
          for (
            i = t, t = [];
            a && a !== i && (null === (s = a.alternate) || s !== i);

          )
            t.push(a), (a = F(a));
          for (
            a = [];
            r && r !== i && (null === (s = r.alternate) || s !== i);

          )
            a.push(r), (r = F(r));
          for (r = 0; r < t.length; r++) W(t[r], "bubbled", e);
          for (r = a.length; 0 < r--; ) W(a[r], "captured", n);
          return [e, n];
        },
      };
    function Jt(e, t) {
      return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
    }
    var en = Object.prototype.hasOwnProperty;
    function tn(e, t) {
      if (Jt(e, t)) return !0;
      if (
        "object" != typeof e ||
        null === e ||
        "object" != typeof t ||
        null === t
      )
        return !1;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++)
        if (!en.call(t, n[r]) || !Jt(e[n[r]], t[n[r]])) return !1;
      return !0;
    }
    function nn(e) {
      var t = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        if (0 != (2 & t.effectTag)) return 1;
        for (; t.return; ) if (0 != (2 & (t = t.return).effectTag)) return 1;
      }
      return 3 === t.tag ? 2 : 3;
    }
    function rn(e) {
      2 !== nn(e) && o("188");
    }
    function an(e) {
      if (
        !(e = (function (e) {
          var t = e.alternate;
          if (!t) return 3 === (t = nn(e)) && o("188"), 1 === t ? null : e;
          for (var n = e, r = t; ; ) {
            var i = n.return,
              a = i ? i.alternate : null;
            if (!i || !a) break;
            if (i.child === a.child) {
              for (var l = i.child; l; ) {
                if (l === n) return rn(i), e;
                if (l === r) return rn(i), t;
                l = l.sibling;
              }
              o("188");
            }
            if (n.return !== r.return) (n = i), (r = a);
            else {
              l = !1;
              for (var u = i.child; u; ) {
                if (u === n) {
                  (l = !0), (n = i), (r = a);
                  break;
                }
                if (u === r) {
                  (l = !0), (r = i), (n = a);
                  break;
                }
                u = u.sibling;
              }
              if (!l) {
                for (u = a.child; u; ) {
                  if (u === n) {
                    (l = !0), (n = a), (r = i);
                    break;
                  }
                  if (u === r) {
                    (l = !0), (r = a), (n = i);
                    break;
                  }
                  u = u.sibling;
                }
                l || o("189");
              }
            }
            n.alternate !== r && o("190");
          }
          return 3 !== n.tag && o("188"), n.stateNode.current === n ? e : t;
        })(e))
      )
        return null;
      for (var t = e; ; ) {
        if (5 === t.tag || 6 === t.tag) return t;
        if (t.child) (t.child.return = t), (t = t.child);
        else {
          if (t === e) break;
          for (; !t.sibling; ) {
            if (!t.return || t.return === e) return null;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      }
      return null;
    }
    var on = se.extend({
        animationName: null,
        elapsedTime: null,
        pseudoElement: null,
      }),
      ln = se.extend({
        clipboardData: function (e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
      }),
      un = $t.extend({ relatedTarget: null });
    function sn(e) {
      var t = e.keyCode;
      return (
        "charCode" in e
          ? 0 === (e = e.charCode) && 13 === t && (e = 13)
          : (e = t),
        10 === e && (e = 13),
        32 <= e || 13 === e ? e : 0
      );
    }
    var cn = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
      },
      dn = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
      },
      pn = $t.extend({
        key: function (e) {
          if (e.key) {
            var t = cn[e.key] || e.key;
            if ("Unidentified" !== t) return t;
          }
          return "keypress" === e.type
            ? 13 === (e = sn(e))
              ? "Enter"
              : String.fromCharCode(e)
            : "keydown" === e.type || "keyup" === e.type
            ? dn[e.keyCode] || "Unidentified"
            : "";
        },
        location: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        repeat: null,
        locale: null,
        getModifierState: Ht,
        charCode: function (e) {
          return "keypress" === e.type ? sn(e) : 0;
        },
        keyCode: function (e) {
          return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
        },
        which: function (e) {
          return "keypress" === e.type
            ? sn(e)
            : "keydown" === e.type || "keyup" === e.type
            ? e.keyCode
            : 0;
        },
      }),
      fn = Kt.extend({ dataTransfer: null }),
      hn = $t.extend({
        touches: null,
        targetTouches: null,
        changedTouches: null,
        altKey: null,
        metaKey: null,
        ctrlKey: null,
        shiftKey: null,
        getModifierState: Ht,
      }),
      mn = se.extend({
        propertyName: null,
        elapsedTime: null,
        pseudoElement: null,
      }),
      gn = Kt.extend({
        deltaX: function (e) {
          return "deltaX" in e
            ? e.deltaX
            : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
        },
        deltaY: function (e) {
          return "deltaY" in e
            ? e.deltaY
            : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
        },
        deltaZ: null,
        deltaMode: null,
      }),
      vn = [
        ["abort", "abort"],
        [Z, "animationEnd"],
        [J, "animationIteration"],
        [ee, "animationStart"],
        ["canplay", "canPlay"],
        ["canplaythrough", "canPlayThrough"],
        ["drag", "drag"],
        ["dragenter", "dragEnter"],
        ["dragexit", "dragExit"],
        ["dragleave", "dragLeave"],
        ["dragover", "dragOver"],
        ["durationchange", "durationChange"],
        ["emptied", "emptied"],
        ["encrypted", "encrypted"],
        ["ended", "ended"],
        ["error", "error"],
        ["gotpointercapture", "gotPointerCapture"],
        ["load", "load"],
        ["loadeddata", "loadedData"],
        ["loadedmetadata", "loadedMetadata"],
        ["loadstart", "loadStart"],
        ["lostpointercapture", "lostPointerCapture"],
        ["mousemove", "mouseMove"],
        ["mouseout", "mouseOut"],
        ["mouseover", "mouseOver"],
        ["playing", "playing"],
        ["pointermove", "pointerMove"],
        ["pointerout", "pointerOut"],
        ["pointerover", "pointerOver"],
        ["progress", "progress"],
        ["scroll", "scroll"],
        ["seeking", "seeking"],
        ["stalled", "stalled"],
        ["suspend", "suspend"],
        ["timeupdate", "timeUpdate"],
        ["toggle", "toggle"],
        ["touchmove", "touchMove"],
        [te, "transitionEnd"],
        ["waiting", "waiting"],
        ["wheel", "wheel"],
      ],
      bn = {},
      yn = {};
    function xn(e, t) {
      var n = e[0],
        r = "on" + ((e = e[1])[0].toUpperCase() + e.slice(1));
      (t = {
        phasedRegistrationNames: { bubbled: r, captured: r + "Capture" },
        dependencies: [n],
        isInteractive: t,
      }),
        (bn[e] = t),
        (yn[n] = t);
    }
    [
      ["blur", "blur"],
      ["cancel", "cancel"],
      ["click", "click"],
      ["close", "close"],
      ["contextmenu", "contextMenu"],
      ["copy", "copy"],
      ["cut", "cut"],
      ["auxclick", "auxClick"],
      ["dblclick", "doubleClick"],
      ["dragend", "dragEnd"],
      ["dragstart", "dragStart"],
      ["drop", "drop"],
      ["focus", "focus"],
      ["input", "input"],
      ["invalid", "invalid"],
      ["keydown", "keyDown"],
      ["keypress", "keyPress"],
      ["keyup", "keyUp"],
      ["mousedown", "mouseDown"],
      ["mouseup", "mouseUp"],
      ["paste", "paste"],
      ["pause", "pause"],
      ["play", "play"],
      ["pointercancel", "pointerCancel"],
      ["pointerdown", "pointerDown"],
      ["pointerup", "pointerUp"],
      ["ratechange", "rateChange"],
      ["reset", "reset"],
      ["seeked", "seeked"],
      ["submit", "submit"],
      ["touchcancel", "touchCancel"],
      ["touchend", "touchEnd"],
      ["touchstart", "touchStart"],
      ["volumechange", "volumeChange"],
    ].forEach(function (e) {
      xn(e, !0);
    }),
      vn.forEach(function (e) {
        xn(e, !1);
      });
    var wn = {
        eventTypes: bn,
        isInteractiveTopLevelEventType: function (e) {
          return void 0 !== (e = yn[e]) && !0 === e.isInteractive;
        },
        extractEvents: function (e, t, n, r) {
          var i = yn[e];
          if (!i) return null;
          switch (e) {
            case "keypress":
              if (0 === sn(n)) return null;
            case "keydown":
            case "keyup":
              e = pn;
              break;
            case "blur":
            case "focus":
              e = un;
              break;
            case "click":
              if (2 === n.button) return null;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              e = Kt;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              e = fn;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              e = hn;
              break;
            case Z:
            case J:
            case ee:
              e = on;
              break;
            case te:
              e = mn;
              break;
            case "scroll":
              e = $t;
              break;
            case "wheel":
              e = gn;
              break;
            case "copy":
            case "cut":
            case "paste":
              e = ln;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              e = Yt;
              break;
            default:
              e = se;
          }
          return B((t = e.getPooled(i, t, n, r))), t;
        },
      },
      kn = wn.isInteractiveTopLevelEventType,
      _n = [];
    function En(e) {
      var t = e.targetInst,
        n = t;
      do {
        if (!n) {
          e.ancestors.push(n);
          break;
        }
        var r;
        for (r = n; r.return; ) r = r.return;
        if (!(r = 3 !== r.tag ? null : r.stateNode.containerInfo)) break;
        e.ancestors.push(n), (n = D(r));
      } while (n);
      for (n = 0; n < e.ancestors.length; n++) {
        t = e.ancestors[n];
        var i = Fe(e.nativeEvent);
        r = e.topLevelType;
        for (var a = e.nativeEvent, o = null, l = 0; l < b.length; l++) {
          var u = b[l];
          u && (u = u.extractEvents(r, t, a, i)) && (o = S(o, u));
        }
        I(o);
      }
    }
    var Tn = !0;
    function Sn(e, t) {
      if (!t) return null;
      var n = (kn(e) ? Pn : On).bind(null, e);
      t.addEventListener(e, n, !1);
    }
    function Cn(e, t) {
      if (!t) return null;
      var n = (kn(e) ? Pn : On).bind(null, e);
      t.addEventListener(e, n, !0);
    }
    function Pn(e, t) {
      Le(On, e, t);
    }
    function On(e, t) {
      if (Tn) {
        var n = Fe(t);
        if (
          (null === (n = D(n)) ||
            "number" != typeof n.tag ||
            2 === nn(n) ||
            (n = null),
          _n.length)
        ) {
          var r = _n.pop();
          (r.topLevelType = e),
            (r.nativeEvent = t),
            (r.targetInst = n),
            (e = r);
        } else
          e = { topLevelType: e, nativeEvent: t, targetInst: n, ancestors: [] };
        try {
          je(En, e);
        } finally {
          (e.topLevelType = null),
            (e.nativeEvent = null),
            (e.targetInst = null),
            (e.ancestors.length = 0),
            10 > _n.length && _n.push(e);
        }
      }
    }
    var Nn = {},
      Mn = 0,
      In = "_reactListenersID" + ("" + Math.random()).slice(2);
    function zn(e) {
      return (
        Object.prototype.hasOwnProperty.call(e, In) ||
          ((e[In] = Mn++), (Nn[e[In]] = {})),
        Nn[e[In]]
      );
    }
    function Ln(e) {
      if (
        void 0 ===
        (e = e || ("undefined" != typeof document ? document : void 0))
      )
        return null;
      try {
        return e.activeElement || e.body;
      } catch (t) {
        return e.body;
      }
    }
    function An(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Dn(e, t) {
      var n,
        r = An(e);
      for (e = 0; r; ) {
        if (3 === r.nodeType) {
          if (((n = e + r.textContent.length), e <= t && n >= t))
            return { node: r, offset: t - e };
          e = n;
        }
        e: {
          for (; r; ) {
            if (r.nextSibling) {
              r = r.nextSibling;
              break e;
            }
            r = r.parentNode;
          }
          r = void 0;
        }
        r = An(r);
      }
    }
    function jn() {
      for (var e = window, t = Ln(); t instanceof e.HTMLIFrameElement; ) {
        try {
          e = t.contentDocument.defaultView;
        } catch (e) {
          break;
        }
        t = Ln(e.document);
      }
      return t;
    }
    function Rn(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        (("input" === t &&
          ("text" === e.type ||
            "search" === e.type ||
            "tel" === e.type ||
            "url" === e.type ||
            "password" === e.type)) ||
          "textarea" === t ||
          "true" === e.contentEditable)
      );
    }
    var Un = q && "documentMode" in document && 11 >= document.documentMode,
      Fn = {
        select: {
          phasedRegistrationNames: {
            bubbled: "onSelect",
            captured: "onSelectCapture",
          },
          dependencies:
            "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(
              " "
            ),
        },
      },
      $n = null,
      Vn = null,
      Wn = null,
      Hn = !1;
    function Bn(e, t) {
      var n =
        t.window === t ? t.document : 9 === t.nodeType ? t : t.ownerDocument;
      return Hn || null == $n || $n !== Ln(n)
        ? null
        : ("selectionStart" in (n = $n) && Rn(n)
            ? (n = { start: n.selectionStart, end: n.selectionEnd })
            : (n = {
                anchorNode: (n = (
                  (n.ownerDocument && n.ownerDocument.defaultView) ||
                  window
                ).getSelection()).anchorNode,
                anchorOffset: n.anchorOffset,
                focusNode: n.focusNode,
                focusOffset: n.focusOffset,
              }),
          Wn && tn(Wn, n)
            ? null
            : ((Wn = n),
              ((e = se.getPooled(Fn.select, Vn, e, t)).type = "select"),
              (e.target = $n),
              B(e),
              e));
    }
    var qn = {
      eventTypes: Fn,
      extractEvents: function (e, t, n, r) {
        var i,
          a =
            r.window === r
              ? r.document
              : 9 === r.nodeType
              ? r
              : r.ownerDocument;
        if (!(i = !a)) {
          e: {
            (a = zn(a)), (i = w.onSelect);
            for (var o = 0; o < i.length; o++) {
              var l = i[o];
              if (!a.hasOwnProperty(l) || !a[l]) {
                a = !1;
                break e;
              }
            }
            a = !0;
          }
          i = !a;
        }
        if (i) return null;
        switch (((a = t ? R(t) : window), e)) {
          case "focus":
            (Ue(a) || "true" === a.contentEditable) &&
              (($n = a), (Vn = t), (Wn = null));
            break;
          case "blur":
            Wn = Vn = $n = null;
            break;
          case "mousedown":
            Hn = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            return (Hn = !1), Bn(n, r);
          case "selectionchange":
            if (Un) break;
          case "keydown":
          case "keyup":
            return Bn(n, r);
        }
        return null;
      },
    };
    function Qn(e, t) {
      return (
        (e = i({ children: void 0 }, t)),
        (t = (function (e) {
          var t = "";
          return (
            r.Children.forEach(e, function (e) {
              null != e && (t += e);
            }),
            t
          );
        })(t.children)) && (e.children = t),
        e
      );
    }
    function Gn(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++)
          (i = t.hasOwnProperty("$" + e[n].value)),
            e[n].selected !== i && (e[n].selected = i),
            i && r && (e[n].defaultSelected = !0);
      } else {
        for (n = "" + yt(n), t = null, i = 0; i < e.length; i++) {
          if (e[i].value === n)
            return (
              (e[i].selected = !0), void (r && (e[i].defaultSelected = !0))
            );
          null !== t || e[i].disabled || (t = e[i]);
        }
        null !== t && (t.selected = !0);
      }
    }
    function Kn(e, t) {
      return (
        null != t.dangerouslySetInnerHTML && o("91"),
        i({}, t, {
          value: void 0,
          defaultValue: void 0,
          children: "" + e._wrapperState.initialValue,
        })
      );
    }
    function Yn(e, t) {
      var n = t.value;
      null == n &&
        ((n = t.defaultValue),
        null != (t = t.children) &&
          (null != n && o("92"),
          Array.isArray(t) && (1 >= t.length || o("93"), (t = t[0])),
          (n = t)),
        null == n && (n = "")),
        (e._wrapperState = { initialValue: yt(n) });
    }
    function Xn(e, t) {
      var n = yt(t.value),
        r = yt(t.defaultValue);
      null != n &&
        ((n = "" + n) !== e.value && (e.value = n),
        null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)),
        null != r && (e.defaultValue = "" + r);
    }
    function Zn(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue && (e.value = t);
    }
    N.injectEventPluginOrder(
      "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
        " "
      )
    ),
      (k = U),
      (_ = j),
      (E = R),
      N.injectEventPluginsByName({
        SimpleEventPlugin: wn,
        EnterLeaveEventPlugin: Zt,
        ChangeEventPlugin: Ft,
        SelectEventPlugin: qn,
        BeforeInputEventPlugin: Se,
      });
    var Jn = {
      html: "http://www.w3.org/1999/xhtml",
      mathml: "http://www.w3.org/1998/Math/MathML",
      svg: "http://www.w3.org/2000/svg",
    };
    function er(e) {
      switch (e) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function tr(e, t) {
      return null == e || "http://www.w3.org/1999/xhtml" === e
        ? er(t)
        : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
        ? "http://www.w3.org/1999/xhtml"
        : e;
    }
    var nr = void 0,
      rr = (function (e) {
        return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction
          ? function (t, n, r, i) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n);
              });
            }
          : e;
      })(function (e, t) {
        if (e.namespaceURI !== Jn.svg || "innerHTML" in e) e.innerHTML = t;
        else {
          for (
            (nr = nr || document.createElement("div")).innerHTML =
              "<svg>" + t + "</svg>",
              t = nr.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      });
    function ir(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && 3 === n.nodeType)
          return void (n.nodeValue = t);
      }
      e.textContent = t;
    }
    var ar = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      },
      or = ["Webkit", "ms", "Moz", "O"];
    function lr(e, t, n) {
      return null == t || "boolean" == typeof t || "" === t
        ? ""
        : n ||
          "number" != typeof t ||
          0 === t ||
          (ar.hasOwnProperty(e) && ar[e])
        ? ("" + t).trim()
        : t + "px";
    }
    function ur(e, t) {
      for (var n in ((e = e.style), t))
        if (t.hasOwnProperty(n)) {
          var r = 0 === n.indexOf("--"),
            i = lr(n, t[n], r);
          "float" === n && (n = "cssFloat"),
            r ? e.setProperty(n, i) : (e[n] = i);
        }
    }
    Object.keys(ar).forEach(function (e) {
      or.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ar[t] = ar[e]);
      });
    });
    var sr = i(
      { menuitem: !0 },
      {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
      }
    );
    function cr(e, t) {
      t &&
        (sr[e] &&
          (null != t.children || null != t.dangerouslySetInnerHTML) &&
          o("137", e, ""),
        null != t.dangerouslySetInnerHTML &&
          (null != t.children && o("60"),
          ("object" == typeof t.dangerouslySetInnerHTML &&
            "__html" in t.dangerouslySetInnerHTML) ||
            o("61")),
        null != t.style && "object" != typeof t.style && o("62", ""));
    }
    function dr(e, t) {
      if (-1 === e.indexOf("-")) return "string" == typeof t.is;
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    function pr(e, t) {
      var n = zn(
        (e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument)
      );
      t = w[t];
      for (var r = 0; r < t.length; r++) {
        var i = t[r];
        if (!n.hasOwnProperty(i) || !n[i]) {
          switch (i) {
            case "scroll":
              Cn("scroll", e);
              break;
            case "focus":
            case "blur":
              Cn("focus", e), Cn("blur", e), (n.blur = !0), (n.focus = !0);
              break;
            case "cancel":
            case "close":
              $e(i) && Cn(i, e);
              break;
            case "invalid":
            case "submit":
            case "reset":
              break;
            default:
              -1 === ne.indexOf(i) && Sn(i, e);
          }
          n[i] = !0;
        }
      }
    }
    function fr() {}
    var hr = null,
      mr = null;
    function gr(e, t) {
      switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!t.autoFocus;
      }
      return !1;
    }
    function vr(e, t) {
      return (
        "textarea" === e ||
        "option" === e ||
        "noscript" === e ||
        "string" == typeof t.children ||
        "number" == typeof t.children ||
        ("object" == typeof t.dangerouslySetInnerHTML &&
          null !== t.dangerouslySetInnerHTML &&
          null != t.dangerouslySetInnerHTML.__html)
      );
    }
    var br = "function" == typeof setTimeout ? setTimeout : void 0,
      yr = "function" == typeof clearTimeout ? clearTimeout : void 0;
    function xr(e) {
      for (e = e.nextSibling; e && 1 !== e.nodeType && 3 !== e.nodeType; )
        e = e.nextSibling;
      return e;
    }
    function wr(e) {
      for (e = e.firstChild; e && 1 !== e.nodeType && 3 !== e.nodeType; )
        e = e.nextSibling;
      return e;
    }
    new Set();
    var kr = [],
      _r = -1;
    function Er(e) {
      0 > _r || ((e.current = kr[_r]), (kr[_r] = null), _r--);
    }
    function Tr(e, t) {
      _r++, (kr[_r] = e.current), (e.current = t);
    }
    var Sr = {},
      Cr = { current: Sr },
      Pr = { current: !1 },
      Or = Sr;
    function Nr(e, t) {
      var n = e.type.contextTypes;
      if (!n) return Sr;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i,
        a = {};
      for (i in n) a[i] = t[i];
      return (
        r &&
          (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t),
          (e.__reactInternalMemoizedMaskedChildContext = a)),
        a
      );
    }
    function Mr(e) {
      return null != (e = e.childContextTypes);
    }
    function Ir(e) {
      Er(Pr), Er(Cr);
    }
    function zr(e) {
      Er(Pr), Er(Cr);
    }
    function Lr(e, t, n) {
      Cr.current !== Sr && o("168"), Tr(Cr, t), Tr(Pr, n);
    }
    function Ar(e, t, n) {
      var r = e.stateNode;
      if (((e = t.childContextTypes), "function" != typeof r.getChildContext))
        return n;
      for (var a in (r = r.getChildContext()))
        a in e || o("108", ut(t) || "Unknown", a);
      return i({}, n, r);
    }
    function Dr(e) {
      var t = e.stateNode;
      return (
        (t = (t && t.__reactInternalMemoizedMergedChildContext) || Sr),
        (Or = Cr.current),
        Tr(Cr, t),
        Tr(Pr, Pr.current),
        !0
      );
    }
    function jr(e, t, n) {
      var r = e.stateNode;
      r || o("169"),
        n
          ? ((t = Ar(e, t, Or)),
            (r.__reactInternalMemoizedMergedChildContext = t),
            Er(Pr),
            Er(Cr),
            Tr(Cr, t))
          : Er(Pr),
        Tr(Pr, n);
    }
    var Rr = null,
      Ur = null;
    function Fr(e) {
      return function (t) {
        try {
          return e(t);
        } catch (e) {}
      };
    }
    function $r(e, t, n, r) {
      (this.tag = e),
        (this.key = n),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.firstContextDependency =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = r),
        (this.effectTag = 0),
        (this.lastEffect = this.firstEffect = this.nextEffect = null),
        (this.childExpirationTime = this.expirationTime = 0),
        (this.alternate = null);
    }
    function Vr(e, t, n, r) {
      return new $r(e, t, n, r);
    }
    function Wr(e) {
      return !(!(e = e.prototype) || !e.isReactComponent);
    }
    function Hr(e, t) {
      var n = e.alternate;
      return (
        null === n
          ? (((n = Vr(e.tag, t, e.key, e.mode)).elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.effectTag = 0),
            (n.nextEffect = null),
            (n.firstEffect = null),
            (n.lastEffect = null)),
        (n.childExpirationTime = e.childExpirationTime),
        (n.expirationTime = e.expirationTime),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (n.firstContextDependency = e.firstContextDependency),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
      );
    }
    function Br(e, t, n, r, i, a) {
      var l = 2;
      if (((r = e), "function" == typeof e)) Wr(e) && (l = 1);
      else if ("string" == typeof e) l = 5;
      else
        e: switch (e) {
          case Ye:
            return qr(n.children, i, a, t);
          case tt:
            return Qr(n, 3 | i, a, t);
          case Xe:
            return Qr(n, 2 | i, a, t);
          case Ze:
            return (
              ((e = Vr(12, n, t, 4 | i)).elementType = Ze),
              (e.type = Ze),
              (e.expirationTime = a),
              e
            );
          case rt:
            return (
              ((e = Vr(13, n, t, i)).elementType = rt),
              (e.type = rt),
              (e.expirationTime = a),
              e
            );
          default:
            if ("object" == typeof e && null !== e)
              switch (e.$$typeof) {
                case Je:
                  l = 10;
                  break e;
                case et:
                  l = 9;
                  break e;
                case nt:
                  l = 11;
                  break e;
                case it:
                  l = 14;
                  break e;
                case at:
                  (l = 16), (r = null);
                  break e;
              }
            o("130", null == e ? e : typeof e, "");
        }
      return (
        ((t = Vr(l, n, t, i)).elementType = e),
        (t.type = r),
        (t.expirationTime = a),
        t
      );
    }
    function qr(e, t, n, r) {
      return ((e = Vr(7, e, r, t)).expirationTime = n), e;
    }
    function Qr(e, t, n, r) {
      return (
        (e = Vr(8, e, r, t)),
        (t = 0 == (1 & t) ? Xe : tt),
        (e.elementType = t),
        (e.type = t),
        (e.expirationTime = n),
        e
      );
    }
    function Gr(e, t, n) {
      return ((e = Vr(6, e, null, t)).expirationTime = n), e;
    }
    function Kr(e, t, n) {
      return (
        ((t = Vr(
          4,
          null !== e.children ? e.children : [],
          e.key,
          t
        )).expirationTime = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    function Yr(e, t) {
      e.didError = !1;
      var n = e.earliestPendingTime;
      0 === n
        ? (e.earliestPendingTime = e.latestPendingTime = t)
        : n < t
        ? (e.earliestPendingTime = t)
        : e.latestPendingTime > t && (e.latestPendingTime = t),
        Jr(t, e);
    }
    function Xr(e, t) {
      (e.didError = !1), e.latestPingedTime >= t && (e.latestPingedTime = 0);
      var n = e.earliestPendingTime,
        r = e.latestPendingTime;
      n === t
        ? (e.earliestPendingTime = r === t ? (e.latestPendingTime = 0) : r)
        : r === t && (e.latestPendingTime = n),
        (n = e.earliestSuspendedTime),
        (r = e.latestSuspendedTime),
        0 === n
          ? (e.earliestSuspendedTime = e.latestSuspendedTime = t)
          : n < t
          ? (e.earliestSuspendedTime = t)
          : r > t && (e.latestSuspendedTime = t),
        Jr(t, e);
    }
    function Zr(e, t) {
      var n = e.earliestPendingTime;
      return n > t && (t = n), (e = e.earliestSuspendedTime) > t && (t = e), t;
    }
    function Jr(e, t) {
      var n = t.earliestSuspendedTime,
        r = t.latestSuspendedTime,
        i = t.earliestPendingTime,
        a = t.latestPingedTime;
      0 === (i = 0 !== i ? i : a) && (0 === e || r < e) && (i = r),
        0 !== (e = i) && n > e && (e = n),
        (t.nextExpirationTimeToWorkOn = i),
        (t.expirationTime = e);
    }
    var ei = !1;
    function ti(e) {
      return {
        baseState: e,
        firstUpdate: null,
        lastUpdate: null,
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,
        firstEffect: null,
        lastEffect: null,
        firstCapturedEffect: null,
        lastCapturedEffect: null,
      };
    }
    function ni(e) {
      return {
        baseState: e.baseState,
        firstUpdate: e.firstUpdate,
        lastUpdate: e.lastUpdate,
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,
        firstEffect: null,
        lastEffect: null,
        firstCapturedEffect: null,
        lastCapturedEffect: null,
      };
    }
    function ri(e) {
      return {
        expirationTime: e,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
        nextEffect: null,
      };
    }
    function ii(e, t) {
      null === e.lastUpdate
        ? (e.firstUpdate = e.lastUpdate = t)
        : ((e.lastUpdate.next = t), (e.lastUpdate = t));
    }
    function ai(e, t) {
      var n = e.alternate;
      if (null === n) {
        var r = e.updateQueue,
          i = null;
        null === r && (r = e.updateQueue = ti(e.memoizedState));
      } else
        (r = e.updateQueue),
          (i = n.updateQueue),
          null === r
            ? null === i
              ? ((r = e.updateQueue = ti(e.memoizedState)),
                (i = n.updateQueue = ti(n.memoizedState)))
              : (r = e.updateQueue = ni(i))
            : null === i && (i = n.updateQueue = ni(r));
      null === i || r === i
        ? ii(r, t)
        : null === r.lastUpdate || null === i.lastUpdate
        ? (ii(r, t), ii(i, t))
        : (ii(r, t), (i.lastUpdate = t));
    }
    function oi(e, t) {
      var n = e.updateQueue;
      null ===
      (n = null === n ? (e.updateQueue = ti(e.memoizedState)) : li(e, n))
        .lastCapturedUpdate
        ? (n.firstCapturedUpdate = n.lastCapturedUpdate = t)
        : ((n.lastCapturedUpdate.next = t), (n.lastCapturedUpdate = t));
    }
    function li(e, t) {
      var n = e.alternate;
      return (
        null !== n && t === n.updateQueue && (t = e.updateQueue = ni(t)), t
      );
    }
    function ui(e, t, n, r, a, o) {
      switch (n.tag) {
        case 1:
          return "function" == typeof (e = n.payload) ? e.call(o, r, a) : e;
        case 3:
          e.effectTag = (-2049 & e.effectTag) | 64;
        case 0:
          if (
            null ==
            (a = "function" == typeof (e = n.payload) ? e.call(o, r, a) : e)
          )
            break;
          return i({}, r, a);
        case 2:
          ei = !0;
      }
      return r;
    }
    function si(e, t, n, r, i) {
      ei = !1;
      for (
        var a = (t = li(e, t)).baseState,
          o = null,
          l = 0,
          u = t.firstUpdate,
          s = a;
        null !== u;

      ) {
        var c = u.expirationTime;
        c < i
          ? (null === o && ((o = u), (a = s)), l < c && (l = c))
          : ((s = ui(e, 0, u, s, n, r)),
            null !== u.callback &&
              ((e.effectTag |= 32),
              (u.nextEffect = null),
              null === t.lastEffect
                ? (t.firstEffect = t.lastEffect = u)
                : ((t.lastEffect.nextEffect = u), (t.lastEffect = u)))),
          (u = u.next);
      }
      for (c = null, u = t.firstCapturedUpdate; null !== u; ) {
        var d = u.expirationTime;
        d < i
          ? (null === c && ((c = u), null === o && (a = s)), l < d && (l = d))
          : ((s = ui(e, 0, u, s, n, r)),
            null !== u.callback &&
              ((e.effectTag |= 32),
              (u.nextEffect = null),
              null === t.lastCapturedEffect
                ? (t.firstCapturedEffect = t.lastCapturedEffect = u)
                : ((t.lastCapturedEffect.nextEffect = u),
                  (t.lastCapturedEffect = u)))),
          (u = u.next);
      }
      null === o && (t.lastUpdate = null),
        null === c ? (t.lastCapturedUpdate = null) : (e.effectTag |= 32),
        null === o && null === c && (a = s),
        (t.baseState = a),
        (t.firstUpdate = o),
        (t.firstCapturedUpdate = c),
        (e.expirationTime = l),
        (e.memoizedState = s);
    }
    function ci(e, t, n) {
      null !== t.firstCapturedUpdate &&
        (null !== t.lastUpdate &&
          ((t.lastUpdate.next = t.firstCapturedUpdate),
          (t.lastUpdate = t.lastCapturedUpdate)),
        (t.firstCapturedUpdate = t.lastCapturedUpdate = null)),
        di(t.firstEffect, n),
        (t.firstEffect = t.lastEffect = null),
        di(t.firstCapturedEffect, n),
        (t.firstCapturedEffect = t.lastCapturedEffect = null);
    }
    function di(e, t) {
      for (; null !== e; ) {
        var n = e.callback;
        if (null !== n) {
          e.callback = null;
          var r = t;
          "function" != typeof n && o("191", n), n.call(r);
        }
        e = e.nextEffect;
      }
    }
    function pi(e, t) {
      return { value: e, source: t, stack: st(t) };
    }
    var fi = { current: null },
      hi = null,
      mi = null,
      gi = null;
    function vi(e, t) {
      var n = e.type._context;
      Tr(fi, n._currentValue), (n._currentValue = t);
    }
    function bi(e) {
      var t = fi.current;
      Er(fi), (e.type._context._currentValue = t);
    }
    function yi(e) {
      (hi = e), (gi = mi = null), (e.firstContextDependency = null);
    }
    function xi(e, t) {
      return (
        gi !== e &&
          !1 !== t &&
          0 !== t &&
          (("number" == typeof t && 1073741823 !== t) ||
            ((gi = e), (t = 1073741823)),
          (t = { context: e, observedBits: t, next: null }),
          null === mi
            ? (null === hi && o("293"), (hi.firstContextDependency = mi = t))
            : (mi = mi.next = t)),
        e._currentValue
      );
    }
    function wi(e, t) {
      for (var n = 0; n < e.length; n++) if (!Jt(e[n], t[n])) return !1;
      return !0;
    }
    var ki = 0,
      _i = null,
      Ei = null,
      Ti = null,
      Si = null,
      Ci = null,
      Pi = 0,
      Oi = null,
      Ni = !1,
      Mi = !1,
      Ii = null,
      zi = 0;
    function Li() {
      return null === _i && o("298"), _i;
    }
    function Ai(e, t, n, r) {
      for (; Mi; ) (Mi = !1), (zi += 1), (Oi = Ci = Ti = null), (n = e(t, r));
      return (
        (Ii = null),
        (zi = 0),
        ((e = _i).memoizedState = Si),
        (e.expirationTime = Pi),
        (e.updateQueue = Oi),
        (e = null !== Ti && null !== Ti.next),
        (ki = 0),
        (Ci = Si = Ti = Ei = _i = null),
        (Pi = 0),
        (Oi = null),
        e && o("300"),
        n
      );
    }
    function Di() {
      (ki = 0),
        (Ci = Si = Ti = Ei = _i = null),
        (Pi = 0),
        (Oi = null),
        (Mi = !1),
        (Ii = null),
        (zi = 0);
    }
    function ji(e) {
      return {
        memoizedState: e.memoizedState,
        baseState: e.baseState,
        queue: e.queue,
        baseUpdate: e.baseUpdate,
        next: null,
      };
    }
    function Ri() {
      if (null === Ci)
        null === Si
          ? ((Ni = !1),
            (Si = Ci =
              null === (Ti = Ei)
                ? {
                    memoizedState: null,
                    baseState: null,
                    queue: null,
                    baseUpdate: null,
                    next: null,
                  }
                : ji(Ti)))
          : ((Ni = !0), (Ti = Ei), (Ci = Si));
      else if (null === Ci.next) {
        if (((Ni = !1), null === Ti))
          var e = {
            memoizedState: null,
            baseState: null,
            queue: null,
            baseUpdate: null,
            next: null,
          };
        else
          e =
            null === (Ti = Ti.next)
              ? {
                  memoizedState: null,
                  baseState: null,
                  queue: null,
                  baseUpdate: null,
                  next: null,
                }
              : ji(Ti);
        Ci = Ci.next = e;
      } else (Ni = !0), (Ci = Ci.next), (Ti = null !== Ti ? Ti.next : null);
      return Ci;
    }
    function Ui(e, t) {
      return "function" == typeof t ? t(e) : t;
    }
    function Fi(e, t, n) {
      _i = Li();
      var r = (Ci = Ri()).queue;
      if (null !== r) {
        if (Ni) {
          if (((t = r.dispatch), null !== Ii)) {
            var i = Ii.get(r);
            if (void 0 !== i) {
              Ii.delete(r), (n = Ci.memoizedState);
              do {
                (n = e(n, i.action)), (i = i.next);
              } while (null !== i);
              return (
                (Ci.memoizedState = n),
                Ci.baseUpdate === r.last && (Ci.baseState = n),
                [n, t]
              );
            }
          }
          return [Ci.memoizedState, t];
        }
        t = r.last;
        var a = Ci.baseUpdate;
        if (
          (null !== a
            ? (null !== t && (t.next = null), (t = a.next))
            : (t = null !== t ? t.next : null),
          null !== t)
        ) {
          n = Ci.baseState;
          var o = (i = null),
            l = t,
            u = !1;
          do {
            var s = l.expirationTime;
            s < ki
              ? (u || ((u = !0), (o = a), (i = n)), s > Pi && (Pi = s))
              : (n = e(n, l.action)),
              (a = l),
              (l = l.next);
          } while (null !== l && l !== t);
          u || ((o = a), (i = n)),
            (Ci.memoizedState = n),
            (Ci.baseUpdate = o),
            (Ci.baseState = i);
        }
        return [Ci.memoizedState, r.dispatch];
      }
      return (
        e === Ui
          ? "function" == typeof t && (t = t())
          : null != n && (t = e(t, n)),
        (Ci.memoizedState = Ci.baseState = t),
        (e = (r = Ci.queue = { last: null, dispatch: null }).dispatch =
          Hi.bind(null, _i, r)),
        [Ci.memoizedState, e]
      );
    }
    function $i(e, t, n, r) {
      return (
        (e = { tag: e, create: t, destroy: n, inputs: r, next: null }),
        null === Oi
          ? ((Oi = { lastEffect: null }).lastEffect = e.next = e)
          : null === (t = Oi.lastEffect)
          ? (Oi.lastEffect = e.next = e)
          : ((n = t.next), (t.next = e), (e.next = n), (Oi.lastEffect = e)),
        e
      );
    }
    function Vi(e, t) {
      Wi(4, 36, e, t);
    }
    function Wi(e, t, n, r) {
      (_i = Li()), (Ci = Ri()), (r = null != r ? r : [n]);
      var i = null;
      if (null !== Ti) {
        var a = Ti.memoizedState;
        if (((i = a.destroy), wi(r, a.inputs))) return void $i(0, n, i, r);
      }
      (_i.effectTag |= e), (Ci.memoizedState = $i(t, n, i, r));
    }
    function Hi(e, t, n) {
      25 > zi || o("301");
      var r = e.alternate;
      if (e === _i || (null !== r && r === _i))
        if (
          ((Mi = !0),
          (e = { expirationTime: ki, action: n, next: null }),
          null === Ii && (Ii = new Map()),
          void 0 === (r = Ii.get(t)))
        )
          Ii.set(t, e);
        else {
          for (t = r; null !== t.next; ) t = t.next;
          t.next = e;
        }
      else {
        (n = {
          expirationTime: (r = So((r = nl()), e)),
          action: n,
          next: null,
        }),
          wo();
        var i = t.last;
        if (null === i) n.next = n;
        else {
          var a = i.next;
          null !== a && (n.next = a), (i.next = n);
        }
        (t.last = n), No(e, r);
      }
    }
    var Bi = {},
      qi = { current: Bi },
      Qi = { current: Bi },
      Gi = { current: Bi };
    function Ki(e) {
      return e === Bi && o("174"), e;
    }
    function Yi(e, t) {
      Tr(Gi, t), Tr(Qi, e), Tr(qi, Bi);
      var n = t.nodeType;
      switch (n) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : tr(null, "");
          break;
        default:
          t = tr(
            (t = (n = 8 === n ? t.parentNode : t).namespaceURI || null),
            (n = n.tagName)
          );
      }
      Er(qi), Tr(qi, t);
    }
    function Xi(e) {
      Er(qi), Er(Qi), Er(Gi);
    }
    function Zi(e) {
      Ki(Gi.current);
      var t = Ki(qi.current),
        n = tr(t, e.type);
      t !== n && (Tr(Qi, e), Tr(qi, n));
    }
    function Ji(e) {
      Qi.current === e && (Er(qi), Er(Qi));
    }
    function ea(e, t) {
      if (e && e.defaultProps)
        for (var n in ((t = i({}, t)), (e = e.defaultProps)))
          void 0 === t[n] && (t[n] = e[n]);
      return t;
    }
    var ta = Be.ReactCurrentDispatcher,
      na = new r.Component().refs;
    function ra(e, t, n, r) {
      (n = null == (n = n(r, (t = e.memoizedState))) ? t : i({}, t, n)),
        (e.memoizedState = n),
        null !== (r = e.updateQueue) &&
          0 === e.expirationTime &&
          (r.baseState = n);
    }
    var ia = {
      isMounted: function (e) {
        return !!(e = e._reactInternalFiber) && 2 === nn(e);
      },
      enqueueSetState: function (e, t, n) {
        e = e._reactInternalFiber;
        var r = nl(),
          i = ri((r = So(r, e)));
        (i.payload = t),
          null != n && (i.callback = n),
          wo(),
          ai(e, i),
          No(e, r);
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternalFiber;
        var r = nl(),
          i = ri((r = So(r, e)));
        (i.tag = 1),
          (i.payload = t),
          null != n && (i.callback = n),
          wo(),
          ai(e, i),
          No(e, r);
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternalFiber;
        var n = nl(),
          r = ri((n = So(n, e)));
        (r.tag = 2), null != t && (r.callback = t), wo(), ai(e, r), No(e, n);
      },
    };
    function aa(e, t, n, r, i, a, o) {
      return "function" == typeof (e = e.stateNode).shouldComponentUpdate
        ? e.shouldComponentUpdate(r, a, o)
        : !t.prototype ||
            !t.prototype.isPureReactComponent ||
            !tn(n, r) ||
            !tn(i, a);
    }
    function oa(e, t, n) {
      var r = !1,
        i = Sr,
        a = t.contextType;
      return (
        "object" == typeof a && null !== a
          ? (a = ta.current.readContext(a))
          : ((i = Mr(t) ? Or : Cr.current),
            (a = (r = null != (r = t.contextTypes)) ? Nr(e, i) : Sr)),
        (t = new t(n, a)),
        (e.memoizedState =
          null !== t.state && void 0 !== t.state ? t.state : null),
        (t.updater = ia),
        (e.stateNode = t),
        (t._reactInternalFiber = e),
        r &&
          (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = i),
          (e.__reactInternalMemoizedMaskedChildContext = a)),
        t
      );
    }
    function la(e, t, n, r) {
      (e = t.state),
        "function" == typeof t.componentWillReceiveProps &&
          t.componentWillReceiveProps(n, r),
        "function" == typeof t.UNSAFE_componentWillReceiveProps &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && ia.enqueueReplaceState(t, t.state, null);
    }
    function ua(e, t, n, r) {
      var i = e.stateNode;
      (i.props = n), (i.state = e.memoizedState), (i.refs = na);
      var a = t.contextType;
      "object" == typeof a && null !== a
        ? (i.context = ta.current.readContext(a))
        : ((a = Mr(t) ? Or : Cr.current), (i.context = Nr(e, a))),
        null !== (a = e.updateQueue) &&
          (si(e, a, n, i, r), (i.state = e.memoizedState)),
        "function" == typeof (a = t.getDerivedStateFromProps) &&
          (ra(e, t, a, n), (i.state = e.memoizedState)),
        "function" == typeof t.getDerivedStateFromProps ||
          "function" == typeof i.getSnapshotBeforeUpdate ||
          ("function" != typeof i.UNSAFE_componentWillMount &&
            "function" != typeof i.componentWillMount) ||
          ((t = i.state),
          "function" == typeof i.componentWillMount && i.componentWillMount(),
          "function" == typeof i.UNSAFE_componentWillMount &&
            i.UNSAFE_componentWillMount(),
          t !== i.state && ia.enqueueReplaceState(i, i.state, null),
          null !== (a = e.updateQueue) &&
            (si(e, a, n, i, r), (i.state = e.memoizedState))),
        "function" == typeof i.componentDidMount && (e.effectTag |= 4);
    }
    var sa = Array.isArray;
    function ca(e, t, n) {
      if (
        null !== (e = n.ref) &&
        "function" != typeof e &&
        "object" != typeof e
      ) {
        if (n._owner) {
          n = n._owner;
          var r = void 0;
          n && (1 !== n.tag && o("289"), (r = n.stateNode)), r || o("147", e);
          var i = "" + e;
          return null !== t &&
            null !== t.ref &&
            "function" == typeof t.ref &&
            t.ref._stringRef === i
            ? t.ref
            : (((t = function (e) {
                var t = r.refs;
                t === na && (t = r.refs = {}),
                  null === e ? delete t[i] : (t[i] = e);
              })._stringRef = i),
              t);
        }
        "string" != typeof e && o("284"), n._owner || o("290", e);
      }
      return e;
    }
    function da(e, t) {
      "textarea" !== e.type &&
        o(
          "31",
          "[object Object]" === Object.prototype.toString.call(t)
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : t,
          ""
        );
    }
    function pa(e) {
      function t(t, n) {
        if (e) {
          var r = t.lastEffect;
          null !== r
            ? ((r.nextEffect = n), (t.lastEffect = n))
            : (t.firstEffect = t.lastEffect = n),
            (n.nextEffect = null),
            (n.effectTag = 8);
        }
      }
      function n(n, r) {
        if (!e) return null;
        for (; null !== r; ) t(n, r), (r = r.sibling);
        return null;
      }
      function r(e, t) {
        for (e = new Map(); null !== t; )
          null !== t.key ? e.set(t.key, t) : e.set(t.index, t), (t = t.sibling);
        return e;
      }
      function i(e, t, n) {
        return ((e = Hr(e, t)).index = 0), (e.sibling = null), e;
      }
      function a(t, n, r) {
        return (
          (t.index = r),
          e
            ? null !== (r = t.alternate)
              ? (r = r.index) < n
                ? ((t.effectTag = 2), n)
                : r
              : ((t.effectTag = 2), n)
            : n
        );
      }
      function l(t) {
        return e && null === t.alternate && (t.effectTag = 2), t;
      }
      function u(e, t, n, r) {
        return null === t || 6 !== t.tag
          ? (((t = Gr(n, e.mode, r)).return = e), t)
          : (((t = i(t, n)).return = e), t);
      }
      function s(e, t, n, r) {
        return null !== t && t.elementType === n.type
          ? (((r = i(t, n.props)).ref = ca(e, t, n)), (r.return = e), r)
          : (((r = Br(n.type, n.key, n.props, null, e.mode, r)).ref = ca(
              e,
              t,
              n
            )),
            (r.return = e),
            r);
      }
      function c(e, t, n, r) {
        return null === t ||
          4 !== t.tag ||
          t.stateNode.containerInfo !== n.containerInfo ||
          t.stateNode.implementation !== n.implementation
          ? (((t = Kr(n, e.mode, r)).return = e), t)
          : (((t = i(t, n.children || [])).return = e), t);
      }
      function d(e, t, n, r, a) {
        return null === t || 7 !== t.tag
          ? (((t = qr(n, e.mode, r, a)).return = e), t)
          : (((t = i(t, n)).return = e), t);
      }
      function p(e, t, n) {
        if ("string" == typeof t || "number" == typeof t)
          return ((t = Gr("" + t, e.mode, n)).return = e), t;
        if ("object" == typeof t && null !== t) {
          switch (t.$$typeof) {
            case Ge:
              return (
                ((n = Br(t.type, t.key, t.props, null, e.mode, n)).ref = ca(
                  e,
                  null,
                  t
                )),
                (n.return = e),
                n
              );
            case Ke:
              return ((t = Kr(t, e.mode, n)).return = e), t;
          }
          if (sa(t) || lt(t))
            return ((t = qr(t, e.mode, n, null)).return = e), t;
          da(e, t);
        }
        return null;
      }
      function f(e, t, n, r) {
        var i = null !== t ? t.key : null;
        if ("string" == typeof n || "number" == typeof n)
          return null !== i ? null : u(e, t, "" + n, r);
        if ("object" == typeof n && null !== n) {
          switch (n.$$typeof) {
            case Ge:
              return n.key === i
                ? n.type === Ye
                  ? d(e, t, n.props.children, r, i)
                  : s(e, t, n, r)
                : null;
            case Ke:
              return n.key === i ? c(e, t, n, r) : null;
          }
          if (sa(n) || lt(n)) return null !== i ? null : d(e, t, n, r, null);
          da(e, n);
        }
        return null;
      }
      function h(e, t, n, r, i) {
        if ("string" == typeof r || "number" == typeof r)
          return u(t, (e = e.get(n) || null), "" + r, i);
        if ("object" == typeof r && null !== r) {
          switch (r.$$typeof) {
            case Ge:
              return (
                (e = e.get(null === r.key ? n : r.key) || null),
                r.type === Ye
                  ? d(t, e, r.props.children, i, r.key)
                  : s(t, e, r, i)
              );
            case Ke:
              return c(
                t,
                (e = e.get(null === r.key ? n : r.key) || null),
                r,
                i
              );
          }
          if (sa(r) || lt(r)) return d(t, (e = e.get(n) || null), r, i, null);
          da(t, r);
        }
        return null;
      }
      function m(i, o, l, u) {
        for (
          var s = null, c = null, d = o, m = (o = 0), g = null;
          null !== d && m < l.length;
          m++
        ) {
          d.index > m ? ((g = d), (d = null)) : (g = d.sibling);
          var v = f(i, d, l[m], u);
          if (null === v) {
            null === d && (d = g);
            break;
          }
          e && d && null === v.alternate && t(i, d),
            (o = a(v, o, m)),
            null === c ? (s = v) : (c.sibling = v),
            (c = v),
            (d = g);
        }
        if (m === l.length) return n(i, d), s;
        if (null === d) {
          for (; m < l.length; m++)
            (d = p(i, l[m], u)) &&
              ((o = a(d, o, m)),
              null === c ? (s = d) : (c.sibling = d),
              (c = d));
          return s;
        }
        for (d = r(i, d); m < l.length; m++)
          (g = h(d, i, m, l[m], u)) &&
            (e && null !== g.alternate && d.delete(null === g.key ? m : g.key),
            (o = a(g, o, m)),
            null === c ? (s = g) : (c.sibling = g),
            (c = g));
        return (
          e &&
            d.forEach(function (e) {
              return t(i, e);
            }),
          s
        );
      }
      function g(i, l, u, s) {
        var c = lt(u);
        "function" != typeof c && o("150"), null == (u = c.call(u)) && o("151");
        for (
          var d = (c = null), m = l, g = (l = 0), v = null, b = u.next();
          null !== m && !b.done;
          g++, b = u.next()
        ) {
          m.index > g ? ((v = m), (m = null)) : (v = m.sibling);
          var y = f(i, m, b.value, s);
          if (null === y) {
            m || (m = v);
            break;
          }
          e && m && null === y.alternate && t(i, m),
            (l = a(y, l, g)),
            null === d ? (c = y) : (d.sibling = y),
            (d = y),
            (m = v);
        }
        if (b.done) return n(i, m), c;
        if (null === m) {
          for (; !b.done; g++, b = u.next())
            null !== (b = p(i, b.value, s)) &&
              ((l = a(b, l, g)),
              null === d ? (c = b) : (d.sibling = b),
              (d = b));
          return c;
        }
        for (m = r(i, m); !b.done; g++, b = u.next())
          null !== (b = h(m, i, g, b.value, s)) &&
            (e && null !== b.alternate && m.delete(null === b.key ? g : b.key),
            (l = a(b, l, g)),
            null === d ? (c = b) : (d.sibling = b),
            (d = b));
        return (
          e &&
            m.forEach(function (e) {
              return t(i, e);
            }),
          c
        );
      }
      return function (e, r, a, u) {
        var s =
          "object" == typeof a && null !== a && a.type === Ye && null === a.key;
        s && (a = a.props.children);
        var c = "object" == typeof a && null !== a;
        if (c)
          switch (a.$$typeof) {
            case Ge:
              e: {
                for (c = a.key, s = r; null !== s; ) {
                  if (s.key === c) {
                    if (
                      7 === s.tag ? a.type === Ye : s.elementType === a.type
                    ) {
                      n(e, s.sibling),
                        ((r = i(
                          s,
                          a.type === Ye ? a.props.children : a.props
                        )).ref = ca(e, s, a)),
                        (r.return = e),
                        (e = r);
                      break e;
                    }
                    n(e, s);
                    break;
                  }
                  t(e, s), (s = s.sibling);
                }
                a.type === Ye
                  ? (((r = qr(a.props.children, e.mode, u, a.key)).return = e),
                    (e = r))
                  : (((u = Br(a.type, a.key, a.props, null, e.mode, u)).ref =
                      ca(e, r, a)),
                    (u.return = e),
                    (e = u));
              }
              return l(e);
            case Ke:
              e: {
                for (s = a.key; null !== r; ) {
                  if (r.key === s) {
                    if (
                      4 === r.tag &&
                      r.stateNode.containerInfo === a.containerInfo &&
                      r.stateNode.implementation === a.implementation
                    ) {
                      n(e, r.sibling),
                        ((r = i(r, a.children || [])).return = e),
                        (e = r);
                      break e;
                    }
                    n(e, r);
                    break;
                  }
                  t(e, r), (r = r.sibling);
                }
                ((r = Kr(a, e.mode, u)).return = e), (e = r);
              }
              return l(e);
          }
        if ("string" == typeof a || "number" == typeof a)
          return (
            (a = "" + a),
            null !== r && 6 === r.tag
              ? (n(e, r.sibling), ((r = i(r, a)).return = e), (e = r))
              : (n(e, r), ((r = Gr(a, e.mode, u)).return = e), (e = r)),
            l(e)
          );
        if (sa(a)) return m(e, r, a, u);
        if (lt(a)) return g(e, r, a, u);
        if ((c && da(e, a), void 0 === a && !s))
          switch (e.tag) {
            case 1:
            case 0:
              o("152", (u = e.type).displayName || u.name || "Component");
          }
        return n(e, r);
      };
    }
    var fa = pa(!0),
      ha = pa(!1),
      ma = null,
      ga = null,
      va = !1;
    function ba(e, t) {
      var n = Vr(5, null, null, 0);
      (n.elementType = "DELETED"),
        (n.type = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (n.effectTag = 8),
        null !== e.lastEffect
          ? ((e.lastEffect.nextEffect = n), (e.lastEffect = n))
          : (e.firstEffect = e.lastEffect = n);
    }
    function ya(e, t) {
      switch (e.tag) {
        case 5:
          var n = e.type;
          return (
            null !==
              (t =
                1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase()
                  ? null
                  : t) && ((e.stateNode = t), !0)
          );
        case 6:
          return (
            null !==
              (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) &&
            ((e.stateNode = t), !0)
          );
        default:
          return !1;
      }
    }
    function xa(e) {
      if (va) {
        var t = ga;
        if (t) {
          var n = t;
          if (!ya(e, t)) {
            if (!(t = xr(n)) || !ya(e, t))
              return (e.effectTag |= 2), (va = !1), void (ma = e);
            ba(ma, n);
          }
          (ma = e), (ga = wr(t));
        } else (e.effectTag |= 2), (va = !1), (ma = e);
      }
    }
    function wa(e) {
      for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag; )
        e = e.return;
      ma = e;
    }
    function ka(e) {
      if (e !== ma) return !1;
      if (!va) return wa(e), (va = !0), !1;
      var t = e.type;
      if (
        5 !== e.tag ||
        ("head" !== t && "body" !== t && !vr(t, e.memoizedProps))
      )
        for (t = ga; t; ) ba(e, t), (t = xr(t));
      return wa(e), (ga = ma ? xr(e.stateNode) : null), !0;
    }
    function _a() {
      (ga = ma = null), (va = !1);
    }
    var Ea = Be.ReactCurrentOwner;
    function Ta(e, t, n, r) {
      t.child = null === e ? ha(t, null, n, r) : fa(t, e.child, n, r);
    }
    function Sa(e, t, n, r, i) {
      n = n.render;
      var a = t.ref;
      yi(t), (ki = i), (_i = t), (Ei = null !== e ? e.memoizedState : null);
      var o = n(r, a);
      return (o = Ai(n, r, o, a)), (t.effectTag |= 1), Ta(e, t, o, i), t.child;
    }
    function Ca(e, t, n, r, i, a) {
      if (null === e) {
        var o = n.type;
        return "function" != typeof o ||
          Wr(o) ||
          void 0 !== o.defaultProps ||
          null !== n.compare ||
          void 0 !== n.defaultProps
          ? (((e = Br(n.type, null, r, null, t.mode, a)).ref = t.ref),
            (e.return = t),
            (t.child = e))
          : ((t.tag = 15), (t.type = o), Pa(e, t, o, r, i, a));
      }
      return (
        (o = e.child),
        i < a &&
        ((i = o.memoizedProps),
        (n = null !== (n = n.compare) ? n : tn)(i, r) && e.ref === t.ref)
          ? Aa(e, t, a)
          : ((t.effectTag |= 1),
            ((e = Hr(o, r)).ref = t.ref),
            (e.return = t),
            (t.child = e))
      );
    }
    function Pa(e, t, n, r, i, a) {
      return null !== e && i < a && tn(e.memoizedProps, r) && e.ref === t.ref
        ? Aa(e, t, a)
        : Na(e, t, n, r, a);
    }
    function Oa(e, t) {
      var n = t.ref;
      ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
        (t.effectTag |= 128);
    }
    function Na(e, t, n, r, i) {
      var a = Mr(n) ? Or : Cr.current;
      (a = Nr(t, a)),
        yi(t),
        (ki = i),
        (_i = t),
        (Ei = null !== e ? e.memoizedState : null);
      var o = n(r, a);
      return (o = Ai(n, r, o, a)), (t.effectTag |= 1), Ta(e, t, o, i), t.child;
    }
    function Ma(e, t, n, r, i) {
      if (Mr(n)) {
        var a = !0;
        Dr(t);
      } else a = !1;
      if ((yi(t), null === t.stateNode))
        null !== e &&
          ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
          oa(t, n, r),
          ua(t, n, r, i),
          (r = !0);
      else if (null === e) {
        var o = t.stateNode,
          l = t.memoizedProps;
        o.props = l;
        var u = o.context,
          s = n.contextType;
        "object" == typeof s && null !== s
          ? (s = ta.current.readContext(s))
          : (s = Nr(t, (s = Mr(n) ? Or : Cr.current)));
        var c = n.getDerivedStateFromProps,
          d =
            "function" == typeof c ||
            "function" == typeof o.getSnapshotBeforeUpdate;
        d ||
          ("function" != typeof o.UNSAFE_componentWillReceiveProps &&
            "function" != typeof o.componentWillReceiveProps) ||
          ((l !== r || u !== s) && la(t, o, r, s)),
          (ei = !1);
        var p = t.memoizedState;
        u = o.state = p;
        var f = t.updateQueue;
        null !== f && (si(t, f, r, o, i), (u = t.memoizedState)),
          l !== r || p !== u || Pr.current || ei
            ? ("function" == typeof c &&
                (ra(t, n, c, r), (u = t.memoizedState)),
              (l = ei || aa(t, n, l, r, p, u, s))
                ? (d ||
                    ("function" != typeof o.UNSAFE_componentWillMount &&
                      "function" != typeof o.componentWillMount) ||
                    ("function" == typeof o.componentWillMount &&
                      o.componentWillMount(),
                    "function" == typeof o.UNSAFE_componentWillMount &&
                      o.UNSAFE_componentWillMount()),
                  "function" == typeof o.componentDidMount &&
                    (t.effectTag |= 4))
                : ("function" == typeof o.componentDidMount &&
                    (t.effectTag |= 4),
                  (t.memoizedProps = r),
                  (t.memoizedState = u)),
              (o.props = r),
              (o.state = u),
              (o.context = s),
              (r = l))
            : ("function" == typeof o.componentDidMount && (t.effectTag |= 4),
              (r = !1));
      } else
        (o = t.stateNode),
          (l = t.memoizedProps),
          (o.props = t.type === t.elementType ? l : ea(t.type, l)),
          (u = o.context),
          "object" == typeof (s = n.contextType) && null !== s
            ? (s = ta.current.readContext(s))
            : (s = Nr(t, (s = Mr(n) ? Or : Cr.current))),
          (d =
            "function" == typeof (c = n.getDerivedStateFromProps) ||
            "function" == typeof o.getSnapshotBeforeUpdate) ||
            ("function" != typeof o.UNSAFE_componentWillReceiveProps &&
              "function" != typeof o.componentWillReceiveProps) ||
            ((l !== r || u !== s) && la(t, o, r, s)),
          (ei = !1),
          (u = t.memoizedState),
          (p = o.state = u),
          null !== (f = t.updateQueue) &&
            (si(t, f, r, o, i), (p = t.memoizedState)),
          l !== r || u !== p || Pr.current || ei
            ? ("function" == typeof c &&
                (ra(t, n, c, r), (p = t.memoizedState)),
              (c = ei || aa(t, n, l, r, u, p, s))
                ? (d ||
                    ("function" != typeof o.UNSAFE_componentWillUpdate &&
                      "function" != typeof o.componentWillUpdate) ||
                    ("function" == typeof o.componentWillUpdate &&
                      o.componentWillUpdate(r, p, s),
                    "function" == typeof o.UNSAFE_componentWillUpdate &&
                      o.UNSAFE_componentWillUpdate(r, p, s)),
                  "function" == typeof o.componentDidUpdate &&
                    (t.effectTag |= 4),
                  "function" == typeof o.getSnapshotBeforeUpdate &&
                    (t.effectTag |= 256))
                : ("function" != typeof o.componentDidUpdate ||
                    (l === e.memoizedProps && u === e.memoizedState) ||
                    (t.effectTag |= 4),
                  "function" != typeof o.getSnapshotBeforeUpdate ||
                    (l === e.memoizedProps && u === e.memoizedState) ||
                    (t.effectTag |= 256),
                  (t.memoizedProps = r),
                  (t.memoizedState = p)),
              (o.props = r),
              (o.state = p),
              (o.context = s),
              (r = c))
            : ("function" != typeof o.componentDidUpdate ||
                (l === e.memoizedProps && u === e.memoizedState) ||
                (t.effectTag |= 4),
              "function" != typeof o.getSnapshotBeforeUpdate ||
                (l === e.memoizedProps && u === e.memoizedState) ||
                (t.effectTag |= 256),
              (r = !1));
      return Ia(e, t, n, r, a, i);
    }
    function Ia(e, t, n, r, i, a) {
      Oa(e, t);
      var o = 0 != (64 & t.effectTag);
      if (!r && !o) return i && jr(t, n, !1), Aa(e, t, a);
      (r = t.stateNode), (Ea.current = t);
      var l =
        o && "function" != typeof n.getDerivedStateFromError
          ? null
          : r.render();
      return (
        (t.effectTag |= 1),
        null !== e && o
          ? ((t.child = fa(t, e.child, null, a)), (t.child = fa(t, null, l, a)))
          : Ta(e, t, l, a),
        (t.memoizedState = r.state),
        i && jr(t, n, !0),
        t.child
      );
    }
    function za(e) {
      var t = e.stateNode;
      t.pendingContext
        ? Lr(0, t.pendingContext, t.pendingContext !== t.context)
        : t.context && Lr(0, t.context, !1),
        Yi(e, t.containerInfo);
    }
    function La(e, t, n) {
      var r = t.mode,
        i = t.pendingProps,
        a = t.memoizedState;
      if (0 == (64 & t.effectTag)) {
        a = null;
        var o = !1;
      } else
        (a = { timedOutAt: null !== a ? a.timedOutAt : 0 }),
          (o = !0),
          (t.effectTag &= -65);
      if (null === e)
        if (o) {
          var l = i.fallback;
          (e = qr(null, r, 0, null)),
            0 == (1 & t.mode) &&
              (e.child = null !== t.memoizedState ? t.child.child : t.child),
            (r = qr(l, r, n, null)),
            (e.sibling = r),
            ((n = e).return = r.return = t);
        } else n = r = ha(t, null, i.children, n);
      else
        null !== e.memoizedState
          ? ((l = (r = e.child).sibling),
            o
              ? ((n = i.fallback),
                (i = Hr(r, r.pendingProps)),
                0 == (1 & t.mode) &&
                  (o = null !== t.memoizedState ? t.child.child : t.child) !==
                    r.child &&
                  (i.child = o),
                (r = i.sibling = Hr(l, n, l.expirationTime)),
                (n = i),
                (i.childExpirationTime = 0),
                (n.return = r.return = t))
              : (n = r = fa(t, r.child, i.children, n)))
          : ((l = e.child),
            o
              ? ((o = i.fallback),
                ((i = qr(null, r, 0, null)).child = l),
                0 == (1 & t.mode) &&
                  (i.child =
                    null !== t.memoizedState ? t.child.child : t.child),
                ((r = i.sibling = qr(o, r, n, null)).effectTag |= 2),
                (n = i),
                (i.childExpirationTime = 0),
                (n.return = r.return = t))
              : (r = n = fa(t, l, i.children, n))),
          (t.stateNode = e.stateNode);
      return (t.memoizedState = a), (t.child = n), r;
    }
    function Aa(e, t, n) {
      if (
        (null !== e && (t.firstContextDependency = e.firstContextDependency),
        t.childExpirationTime < n)
      )
        return null;
      if ((null !== e && t.child !== e.child && o("153"), null !== t.child)) {
        for (
          n = Hr((e = t.child), e.pendingProps, e.expirationTime),
            t.child = n,
            n.return = t;
          null !== e.sibling;

        )
          (e = e.sibling),
            ((n = n.sibling = Hr(e, e.pendingProps, e.expirationTime)).return =
              t);
        n.sibling = null;
      }
      return t.child;
    }
    function Da(e, t, n) {
      var r = t.expirationTime;
      if (
        null !== e &&
        e.memoizedProps === t.pendingProps &&
        !Pr.current &&
        r < n
      ) {
        switch (t.tag) {
          case 3:
            za(t), _a();
            break;
          case 5:
            Zi(t);
            break;
          case 1:
            Mr(t.type) && Dr(t);
            break;
          case 4:
            Yi(t, t.stateNode.containerInfo);
            break;
          case 10:
            vi(t, t.memoizedProps.value);
            break;
          case 13:
            if (null !== t.memoizedState)
              return 0 !== (r = t.child.childExpirationTime) && r >= n
                ? La(e, t, n)
                : null !== (t = Aa(e, t, n))
                ? t.sibling
                : null;
        }
        return Aa(e, t, n);
      }
      switch (((t.expirationTime = 0), t.tag)) {
        case 2:
          (r = t.elementType),
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            (e = t.pendingProps);
          var i = Nr(t, Cr.current);
          yi(t), (ki = n), (_i = t), (Ei = null);
          var a = r(e, i);
          if (
            ((t.effectTag |= 1),
            "object" == typeof a &&
              null !== a &&
              "function" == typeof a.render &&
              void 0 === a.$$typeof)
          ) {
            (t.tag = 1),
              Di(),
              Mr(r) ? ((i = !0), Dr(t)) : (i = !1),
              (t.memoizedState =
                null !== a.state && void 0 !== a.state ? a.state : null);
            var l = r.getDerivedStateFromProps;
            "function" == typeof l && ra(t, r, l, e),
              (a.updater = ia),
              (t.stateNode = a),
              (a._reactInternalFiber = t),
              ua(t, r, e, n),
              (t = Ia(null, t, r, !0, i, n));
          } else
            (t.tag = 0), Ta(null, t, (a = Ai(r, e, a, i)), n), (t = t.child);
          return t;
        case 16:
          switch (
            ((a = t.elementType),
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            (i = t.pendingProps),
            (e = (function (e) {
              var t = e._result;
              switch (e._status) {
                case 1:
                  return t;
                case 2:
                case 0:
                  throw t;
                default:
                  throw (
                    ((e._status = 0),
                    (t = (t = e._ctor)()).then(
                      function (t) {
                        0 === e._status &&
                          ((t = t.default), (e._status = 1), (e._result = t));
                      },
                      function (t) {
                        0 === e._status && ((e._status = 2), (e._result = t));
                      }
                    ),
                    (e._result = t),
                    t)
                  );
              }
            })(a)),
            (t.type = e),
            (a = t.tag =
              (function (e) {
                if ("function" == typeof e) return Wr(e) ? 1 : 0;
                if (null != e) {
                  if ((e = e.$$typeof) === nt) return 11;
                  if (e === it) return 14;
                }
                return 2;
              })(e)),
            (i = ea(e, i)),
            (l = void 0),
            a)
          ) {
            case 0:
              l = Na(null, t, e, i, n);
              break;
            case 1:
              l = Ma(null, t, e, i, n);
              break;
            case 11:
              l = Sa(null, t, e, i, n);
              break;
            case 14:
              l = Ca(null, t, e, ea(e.type, i), r, n);
              break;
            default:
              o("306", e, "");
          }
          return l;
        case 0:
          return (
            (r = t.type),
            (a = t.pendingProps),
            Na(e, t, r, (a = t.elementType === r ? a : ea(r, a)), n)
          );
        case 1:
          return (
            (r = t.type),
            (a = t.pendingProps),
            Ma(e, t, r, (a = t.elementType === r ? a : ea(r, a)), n)
          );
        case 3:
          return (
            za(t),
            null === (r = t.updateQueue) && o("282"),
            (a = null !== (a = t.memoizedState) ? a.element : null),
            si(t, r, t.pendingProps, null, n),
            (r = t.memoizedState.element) === a
              ? (_a(), (t = Aa(e, t, n)))
              : ((a = t.stateNode),
                (a = (null === e || null === e.child) && a.hydrate) &&
                  ((ga = wr(t.stateNode.containerInfo)),
                  (ma = t),
                  (a = va = !0)),
                a
                  ? ((t.effectTag |= 2), (t.child = ha(t, null, r, n)))
                  : (Ta(e, t, r, n), _a()),
                (t = t.child)),
            t
          );
        case 5:
          return (
            Zi(t),
            null === e && xa(t),
            (r = t.type),
            (a = t.pendingProps),
            (i = null !== e ? e.memoizedProps : null),
            (l = a.children),
            vr(r, a)
              ? (l = null)
              : null !== i && vr(r, i) && (t.effectTag |= 16),
            Oa(e, t),
            1 !== n && 1 & t.mode && a.hidden
              ? ((t.expirationTime = 1), (t = null))
              : (Ta(e, t, l, n), (t = t.child)),
            t
          );
        case 6:
          return null === e && xa(t), null;
        case 13:
          return La(e, t, n);
        case 4:
          return (
            Yi(t, t.stateNode.containerInfo),
            (r = t.pendingProps),
            null === e ? (t.child = fa(t, null, r, n)) : Ta(e, t, r, n),
            t.child
          );
        case 11:
          return (
            (r = t.type),
            (a = t.pendingProps),
            Sa(e, t, r, (a = t.elementType === r ? a : ea(r, a)), n)
          );
        case 7:
          return Ta(e, t, t.pendingProps, n), t.child;
        case 8:
        case 12:
          return Ta(e, t, t.pendingProps.children, n), t.child;
        case 10:
          e: {
            if (
              ((r = t.type._context),
              (a = t.pendingProps),
              (l = t.memoizedProps),
              vi(t, (i = a.value)),
              null !== l)
            ) {
              var u = l.value;
              if (
                0 ===
                (i = Jt(u, i)
                  ? 0
                  : 0 |
                    ("function" == typeof r._calculateChangedBits
                      ? r._calculateChangedBits(u, i)
                      : 1073741823))
              ) {
                if (l.children === a.children && !Pr.current) {
                  t = Aa(e, t, n);
                  break e;
                }
              } else
                for (null !== (l = t.child) && (l.return = t); null !== l; ) {
                  if (null !== (u = l.firstContextDependency))
                    do {
                      if (u.context === r && 0 != (u.observedBits & i)) {
                        if (1 === l.tag) {
                          var s = ri(n);
                          (s.tag = 2), ai(l, s);
                        }
                        l.expirationTime < n && (l.expirationTime = n),
                          null !== (s = l.alternate) &&
                            s.expirationTime < n &&
                            (s.expirationTime = n);
                        for (var c = l.return; null !== c; ) {
                          if (((s = c.alternate), c.childExpirationTime < n))
                            (c.childExpirationTime = n),
                              null !== s &&
                                s.childExpirationTime < n &&
                                (s.childExpirationTime = n);
                          else {
                            if (!(null !== s && s.childExpirationTime < n))
                              break;
                            s.childExpirationTime = n;
                          }
                          c = c.return;
                        }
                      }
                      (s = l.child), (u = u.next);
                    } while (null !== u);
                  else s = 10 === l.tag && l.type === t.type ? null : l.child;
                  if (null !== s) s.return = l;
                  else
                    for (s = l; null !== s; ) {
                      if (s === t) {
                        s = null;
                        break;
                      }
                      if (null !== (l = s.sibling)) {
                        (l.return = s.return), (s = l);
                        break;
                      }
                      s = s.return;
                    }
                  l = s;
                }
            }
            Ta(e, t, a.children, n), (t = t.child);
          }
          return t;
        case 9:
          return (
            (a = t.type),
            (r = (i = t.pendingProps).children),
            yi(t),
            (r = r((a = xi(a, i.unstable_observedBits)))),
            (t.effectTag |= 1),
            Ta(e, t, r, n),
            t.child
          );
        case 14:
          return (
            (i = ea((a = t.type), t.pendingProps)),
            Ca(e, t, a, (i = ea(a.type, i)), r, n)
          );
        case 15:
          return Pa(e, t, t.type, t.pendingProps, r, n);
        case 17:
          return (
            (r = t.type),
            (a = t.pendingProps),
            (a = t.elementType === r ? a : ea(r, a)),
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            (t.tag = 1),
            Mr(r) ? ((e = !0), Dr(t)) : (e = !1),
            yi(t),
            oa(t, r, a),
            ua(t, r, a, n),
            Ia(null, t, r, !0, e, n)
          );
        default:
          o("156");
      }
    }
    function ja(e) {
      e.effectTag |= 4;
    }
    var Ra = void 0,
      Ua = void 0,
      Fa = void 0,
      $a = void 0;
    (Ra = function (e, t) {
      for (var n = t.child; null !== n; ) {
        if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
        else if (4 !== n.tag && null !== n.child) {
          (n.child.return = n), (n = n.child);
          continue;
        }
        if (n === t) break;
        for (; null === n.sibling; ) {
          if (null === n.return || n.return === t) return;
          n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
      }
    }),
      (Ua = function () {}),
      (Fa = function (e, t, n, r, a) {
        var o = e.memoizedProps;
        if (o !== r) {
          var l = t.stateNode;
          switch ((Ki(qi.current), (e = null), n)) {
            case "input":
              (o = xt(l, o)), (r = xt(l, r)), (e = []);
              break;
            case "option":
              (o = Qn(l, o)), (r = Qn(l, r)), (e = []);
              break;
            case "select":
              (o = i({}, o, { value: void 0 })),
                (r = i({}, r, { value: void 0 })),
                (e = []);
              break;
            case "textarea":
              (o = Kn(l, o)), (r = Kn(l, r)), (e = []);
              break;
            default:
              "function" != typeof o.onClick &&
                "function" == typeof r.onClick &&
                (l.onclick = fr);
          }
          cr(n, r), (l = n = void 0);
          var u = null;
          for (n in o)
            if (!r.hasOwnProperty(n) && o.hasOwnProperty(n) && null != o[n])
              if ("style" === n) {
                var s = o[n];
                for (l in s)
                  s.hasOwnProperty(l) && (u || (u = {}), (u[l] = ""));
              } else
                "dangerouslySetInnerHTML" !== n &&
                  "children" !== n &&
                  "suppressContentEditableWarning" !== n &&
                  "suppressHydrationWarning" !== n &&
                  "autoFocus" !== n &&
                  (x.hasOwnProperty(n)
                    ? e || (e = [])
                    : (e = e || []).push(n, null));
          for (n in r) {
            var c = r[n];
            if (
              ((s = null != o ? o[n] : void 0),
              r.hasOwnProperty(n) && c !== s && (null != c || null != s))
            )
              if ("style" === n)
                if (s) {
                  for (l in s)
                    !s.hasOwnProperty(l) ||
                      (c && c.hasOwnProperty(l)) ||
                      (u || (u = {}), (u[l] = ""));
                  for (l in c)
                    c.hasOwnProperty(l) &&
                      s[l] !== c[l] &&
                      (u || (u = {}), (u[l] = c[l]));
                } else u || (e || (e = []), e.push(n, u)), (u = c);
              else
                "dangerouslySetInnerHTML" === n
                  ? ((c = c ? c.__html : void 0),
                    (s = s ? s.__html : void 0),
                    null != c && s !== c && (e = e || []).push(n, "" + c))
                  : "children" === n
                  ? s === c ||
                    ("string" != typeof c && "number" != typeof c) ||
                    (e = e || []).push(n, "" + c)
                  : "suppressContentEditableWarning" !== n &&
                    "suppressHydrationWarning" !== n &&
                    (x.hasOwnProperty(n)
                      ? (null != c && pr(a, n), e || s === c || (e = []))
                      : (e = e || []).push(n, c));
          }
          u && (e = e || []).push("style", u),
            (a = e),
            (t.updateQueue = a) && ja(t);
        }
      }),
      ($a = function (e, t, n, r) {
        n !== r && ja(t);
      });
    var Va = "function" == typeof WeakSet ? WeakSet : Set;
    function Wa(e, t) {
      var n = t.source,
        r = t.stack;
      null === r && null !== n && (r = st(n)),
        null !== n && ut(n.type),
        (t = t.value),
        null !== e && 1 === e.tag && ut(e.type);
      try {
        console.error(t);
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    function Ha(e) {
      var t = e.ref;
      if (null !== t)
        if ("function" == typeof t)
          try {
            t(null);
          } catch (t) {
            To(e, t);
          }
        else t.current = null;
    }
    function Ba(e, t, n) {
      if (null !== (n = null !== (n = n.updateQueue) ? n.lastEffect : null)) {
        var r = (n = n.next);
        do {
          if (0 != (r.tag & e)) {
            var i = r.destroy;
            (r.destroy = null), null !== i && i();
          }
          0 != (r.tag & t) &&
            ("function" != typeof (i = (i = r.create)()) && (i = null),
            (r.destroy = i)),
            (r = r.next);
        } while (r !== n);
      }
    }
    function qa(e) {
      switch (("function" == typeof Ur && Ur(e), e.tag)) {
        case 0:
        case 11:
        case 14:
        case 15:
          var t = e.updateQueue;
          if (null !== t && null !== (t = t.lastEffect)) {
            var n = (t = t.next);
            do {
              var r = n.destroy;
              if (null !== r) {
                var i = e;
                try {
                  r();
                } catch (e) {
                  To(i, e);
                }
              }
              n = n.next;
            } while (n !== t);
          }
          break;
        case 1:
          if (
            (Ha(e), "function" == typeof (t = e.stateNode).componentWillUnmount)
          )
            try {
              (t.props = e.memoizedProps),
                (t.state = e.memoizedState),
                t.componentWillUnmount();
            } catch (t) {
              To(e, t);
            }
          break;
        case 5:
          Ha(e);
          break;
        case 4:
          Ka(e);
      }
    }
    function Qa(e) {
      return 5 === e.tag || 3 === e.tag || 4 === e.tag;
    }
    function Ga(e) {
      e: {
        for (var t = e.return; null !== t; ) {
          if (Qa(t)) {
            var n = t;
            break e;
          }
          t = t.return;
        }
        o("160"), (n = void 0);
      }
      var r = (t = void 0);
      switch (n.tag) {
        case 5:
          (t = n.stateNode), (r = !1);
          break;
        case 3:
        case 4:
          (t = n.stateNode.containerInfo), (r = !0);
          break;
        default:
          o("161");
      }
      16 & n.effectTag && (ir(t, ""), (n.effectTag &= -17));
      e: t: for (n = e; ; ) {
        for (; null === n.sibling; ) {
          if (null === n.return || Qa(n.return)) {
            n = null;
            break e;
          }
          n = n.return;
        }
        for (
          n.sibling.return = n.return, n = n.sibling;
          5 !== n.tag && 6 !== n.tag;

        ) {
          if (2 & n.effectTag) continue t;
          if (null === n.child || 4 === n.tag) continue t;
          (n.child.return = n), (n = n.child);
        }
        if (!(2 & n.effectTag)) {
          n = n.stateNode;
          break e;
        }
      }
      for (var i = e; ; ) {
        if (5 === i.tag || 6 === i.tag)
          if (n)
            if (r) {
              var a = t,
                l = i.stateNode,
                u = n;
              8 === a.nodeType
                ? a.parentNode.insertBefore(l, u)
                : a.insertBefore(l, u);
            } else t.insertBefore(i.stateNode, n);
          else
            r
              ? ((l = t),
                (u = i.stateNode),
                8 === l.nodeType
                  ? (a = l.parentNode).insertBefore(u, l)
                  : (a = l).appendChild(u),
                null != (l = l._reactRootContainer) ||
                  null !== a.onclick ||
                  (a.onclick = fr))
              : t.appendChild(i.stateNode);
        else if (4 !== i.tag && null !== i.child) {
          (i.child.return = i), (i = i.child);
          continue;
        }
        if (i === e) break;
        for (; null === i.sibling; ) {
          if (null === i.return || i.return === e) return;
          i = i.return;
        }
        (i.sibling.return = i.return), (i = i.sibling);
      }
    }
    function Ka(e) {
      for (var t = e, n = !1, r = void 0, i = void 0; ; ) {
        if (!n) {
          n = t.return;
          e: for (;;) {
            switch ((null === n && o("160"), n.tag)) {
              case 5:
                (r = n.stateNode), (i = !1);
                break e;
              case 3:
              case 4:
                (r = n.stateNode.containerInfo), (i = !0);
                break e;
            }
            n = n.return;
          }
          n = !0;
        }
        if (5 === t.tag || 6 === t.tag) {
          e: for (var a = t, l = a; ; )
            if ((qa(l), null !== l.child && 4 !== l.tag))
              (l.child.return = l), (l = l.child);
            else {
              if (l === a) break;
              for (; null === l.sibling; ) {
                if (null === l.return || l.return === a) break e;
                l = l.return;
              }
              (l.sibling.return = l.return), (l = l.sibling);
            }
          i
            ? ((a = r),
              (l = t.stateNode),
              8 === a.nodeType ? a.parentNode.removeChild(l) : a.removeChild(l))
            : r.removeChild(t.stateNode);
        } else if (
          (4 === t.tag ? ((r = t.stateNode.containerInfo), (i = !0)) : qa(t),
          null !== t.child)
        ) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === e) break;
        for (; null === t.sibling; ) {
          if (null === t.return || t.return === e) return;
          4 === (t = t.return).tag && (n = !1);
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    function Ya(e, t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ba(4, 8, t);
          break;
        case 1:
          break;
        case 5:
          var n = t.stateNode;
          if (null != n) {
            var r = t.memoizedProps;
            e = null !== e ? e.memoizedProps : r;
            var i = t.type,
              a = t.updateQueue;
            (t.updateQueue = null),
              null !== a &&
                (function (e, t, n, r, i) {
                  (e[A] = i),
                    "input" === n &&
                      "radio" === i.type &&
                      null != i.name &&
                      kt(e, i),
                    dr(n, r),
                    (r = dr(n, i));
                  for (var a = 0; a < t.length; a += 2) {
                    var o = t[a],
                      l = t[a + 1];
                    "style" === o
                      ? ur(e, l)
                      : "dangerouslySetInnerHTML" === o
                      ? rr(e, l)
                      : "children" === o
                      ? ir(e, l)
                      : bt(e, o, l, r);
                  }
                  switch (n) {
                    case "input":
                      _t(e, i);
                      break;
                    case "textarea":
                      Xn(e, i);
                      break;
                    case "select":
                      (t = e._wrapperState.wasMultiple),
                        (e._wrapperState.wasMultiple = !!i.multiple),
                        null != (n = i.value)
                          ? Gn(e, !!i.multiple, n, !1)
                          : t !== !!i.multiple &&
                            (null != i.defaultValue
                              ? Gn(e, !!i.multiple, i.defaultValue, !0)
                              : Gn(e, !!i.multiple, i.multiple ? [] : "", !1));
                  }
                })(n, a, i, e, r);
          }
          break;
        case 6:
          null === t.stateNode && o("162"),
            (t.stateNode.nodeValue = t.memoizedProps);
          break;
        case 3:
        case 12:
          break;
        case 13:
          if (
            ((n = t.memoizedState),
            (r = void 0),
            (e = t),
            null === n
              ? (r = !1)
              : ((r = !0),
                (e = t.child),
                0 === n.timedOutAt && (n.timedOutAt = nl())),
            null !== e &&
              (function (e, t) {
                for (var n = e; ; ) {
                  if (5 === n.tag) {
                    var r = n.stateNode;
                    if (t) r.style.display = "none";
                    else {
                      r = n.stateNode;
                      var i = n.memoizedProps.style;
                      (i =
                        null != i && i.hasOwnProperty("display")
                          ? i.display
                          : null),
                        (r.style.display = lr("display", i));
                    }
                  } else if (6 === n.tag)
                    n.stateNode.nodeValue = t ? "" : n.memoizedProps;
                  else {
                    if (13 === n.tag && null !== n.memoizedState) {
                      ((r = n.child.sibling).return = n), (n = r);
                      continue;
                    }
                    if (null !== n.child) {
                      (n.child.return = n), (n = n.child);
                      continue;
                    }
                  }
                  if (n === e) break;
                  for (; null === n.sibling; ) {
                    if (null === n.return || n.return === e) return;
                    n = n.return;
                  }
                  (n.sibling.return = n.return), (n = n.sibling);
                }
              })(e, r),
            null !== (n = t.updateQueue))
          ) {
            t.updateQueue = null;
            var l = t.stateNode;
            null === l && (l = t.stateNode = new Va()),
              n.forEach(function (e) {
                var n = Po.bind(null, t, e);
                l.has(e) || (l.add(e), e.then(n, n));
              });
          }
          break;
        case 17:
          break;
        default:
          o("163");
      }
    }
    var Xa = "function" == typeof WeakMap ? WeakMap : Map;
    function Za(e, t, n) {
      ((n = ri(n)).tag = 3), (n.payload = { element: null });
      var r = t.value;
      return (
        (n.callback = function () {
          pl(r), Wa(e, t);
        }),
        n
      );
    }
    function Ja(e, t, n) {
      (n = ri(n)).tag = 3;
      var r = e.type.getDerivedStateFromError;
      if ("function" == typeof r) {
        var i = t.value;
        n.payload = function () {
          return r(i);
        };
      }
      var a = e.stateNode;
      return (
        null !== a &&
          "function" == typeof a.componentDidCatch &&
          (n.callback = function () {
            "function" != typeof r &&
              (null === bo ? (bo = new Set([this])) : bo.add(this));
            var n = t.value,
              i = t.stack;
            Wa(e, t),
              this.componentDidCatch(n, {
                componentStack: null !== i ? i : "",
              });
          }),
        n
      );
    }
    function eo(e) {
      switch (e.tag) {
        case 1:
          Mr(e.type) && Ir();
          var t = e.effectTag;
          return 2048 & t ? ((e.effectTag = (-2049 & t) | 64), e) : null;
        case 3:
          return (
            Xi(),
            zr(),
            0 != (64 & (t = e.effectTag)) && o("285"),
            (e.effectTag = (-2049 & t) | 64),
            e
          );
        case 5:
          return Ji(e), null;
        case 13:
          return 2048 & (t = e.effectTag)
            ? ((e.effectTag = (-2049 & t) | 64), e)
            : null;
        case 4:
          return Xi(), null;
        case 10:
          return bi(e), null;
        default:
          return null;
      }
    }
    var to = {
        readContext: xi,
        useCallback: function (e, t) {
          (_i = Li()), (t = null != t ? t : [e]);
          var n = (Ci = Ri()).memoizedState;
          return null !== n && wi(t, n[1])
            ? n[0]
            : ((Ci.memoizedState = [e, t]), e);
        },
        useContext: function (e, t) {
          return Li(), xi(e, t);
        },
        useEffect: function (e, t) {
          Wi(516, 192, e, t);
        },
        useImperativeHandle: function (e, t, n) {
          Vi(function () {
            if ("function" == typeof e) {
              var n = t();
              return (
                e(n),
                function () {
                  return e(null);
                }
              );
            }
            if (null != e)
              return (
                (n = t()),
                (e.current = n),
                function () {
                  e.current = null;
                }
              );
          }, (n = null != n ? n.concat([e]) : [e, t]));
        },
        useDebugValue: function () {
          Li();
        },
        useLayoutEffect: Vi,
        useMemo: function (e, t) {
          (_i = Li()), (t = null != t ? t : [e]);
          var n = (Ci = Ri()).memoizedState;
          return null !== n && wi(t, n[1])
            ? n[0]
            : ((e = e()), (Ci.memoizedState = [e, t]), e);
        },
        useReducer: Fi,
        useRef: function (e) {
          return (
            (_i = Li()),
            null === (Ci = Ri()).memoizedState
              ? ((e = { current: e }), (Ci.memoizedState = e))
              : (e = Ci.memoizedState),
            e
          );
        },
        useState: function (e) {
          return Fi(Ui, e);
        },
      },
      no = Be.ReactCurrentDispatcher,
      ro = Be.ReactCurrentOwner,
      io = 1073741822,
      ao = 0,
      oo = !1,
      lo = null,
      uo = null,
      so = 0,
      co = -1,
      po = !1,
      fo = null,
      ho = !1,
      mo = null,
      go = null,
      vo = null,
      bo = null;
    function yo() {
      if (null !== lo)
        for (var e = lo.return; null !== e; ) {
          var t = e;
          switch (t.tag) {
            case 1:
              var n = t.type.childContextTypes;
              null != n && Ir();
              break;
            case 3:
              Xi(), zr();
              break;
            case 5:
              Ji(t);
              break;
            case 4:
              Xi();
              break;
            case 10:
              bi(t);
          }
          e = e.return;
        }
      (uo = null), (so = 0), (co = -1), (po = !1), (lo = null);
    }
    function xo(e, t) {
      vo = go = mo = null;
      var n = Do;
      Do = !0;
      do {
        if (512 & t.effectTag) {
          var r = !1,
            i = void 0;
          try {
            var a = t;
            Ba(128, 0, a), Ba(0, 64, a);
          } catch (e) {
            (r = !0), (i = e);
          }
          r && To(t, i);
        }
        t = t.nextEffect;
      } while (null !== t);
      (Do = n), 0 !== (n = e.expirationTime) && rl(e, n);
    }
    function wo() {
      null !== vo && (a.unstable_cancelCallback(go), vo());
    }
    function ko(e) {
      for (;;) {
        var t = e.alternate,
          n = e.return,
          r = e.sibling;
        if (0 == (1024 & e.effectTag)) {
          lo = e;
          e: {
            var a = t,
              l = so,
              u = (t = e).pendingProps;
            switch (t.tag) {
              case 2:
              case 16:
                break;
              case 15:
              case 0:
                break;
              case 1:
                Mr(t.type) && Ir();
                break;
              case 3:
                Xi(),
                  zr(),
                  (u = t.stateNode).pendingContext &&
                    ((u.context = u.pendingContext), (u.pendingContext = null)),
                  (null !== a && null !== a.child) ||
                    (ka(t), (t.effectTag &= -3)),
                  Ua(t);
                break;
              case 5:
                Ji(t);
                var s = Ki(Gi.current);
                if (((l = t.type), null !== a && null != t.stateNode))
                  Fa(a, t, l, u, s), a.ref !== t.ref && (t.effectTag |= 128);
                else if (u) {
                  var c = Ki(qi.current);
                  if (ka(t)) {
                    a = (u = t).stateNode;
                    var d = u.type,
                      p = u.memoizedProps,
                      f = s;
                    switch (((a[L] = u), (a[A] = p), (l = void 0), (s = d))) {
                      case "iframe":
                      case "object":
                        Sn("load", a);
                        break;
                      case "video":
                      case "audio":
                        for (d = 0; d < ne.length; d++) Sn(ne[d], a);
                        break;
                      case "source":
                        Sn("error", a);
                        break;
                      case "img":
                      case "image":
                      case "link":
                        Sn("error", a), Sn("load", a);
                        break;
                      case "form":
                        Sn("reset", a), Sn("submit", a);
                        break;
                      case "details":
                        Sn("toggle", a);
                        break;
                      case "input":
                        wt(a, p), Sn("invalid", a), pr(f, "onChange");
                        break;
                      case "select":
                        (a._wrapperState = { wasMultiple: !!p.multiple }),
                          Sn("invalid", a),
                          pr(f, "onChange");
                        break;
                      case "textarea":
                        Yn(a, p), Sn("invalid", a), pr(f, "onChange");
                    }
                    for (l in (cr(s, p), (d = null), p))
                      p.hasOwnProperty(l) &&
                        ((c = p[l]),
                        "children" === l
                          ? "string" == typeof c
                            ? a.textContent !== c && (d = ["children", c])
                            : "number" == typeof c &&
                              a.textContent !== "" + c &&
                              (d = ["children", "" + c])
                          : x.hasOwnProperty(l) && null != c && pr(f, l));
                    switch (s) {
                      case "input":
                        We(a), Et(a, p, !0);
                        break;
                      case "textarea":
                        We(a), Zn(a);
                        break;
                      case "select":
                      case "option":
                        break;
                      default:
                        "function" == typeof p.onClick && (a.onclick = fr);
                    }
                    (l = d), (u.updateQueue = l), (u = null !== l) && ja(t);
                  } else {
                    (p = t),
                      (a = l),
                      (f = u),
                      (d = 9 === s.nodeType ? s : s.ownerDocument),
                      c === Jn.html && (c = er(a)),
                      c === Jn.html
                        ? "script" === a
                          ? (((a = d.createElement("div")).innerHTML =
                              "<script></script>"),
                            (d = a.removeChild(a.firstChild)))
                          : "string" == typeof f.is
                          ? (d = d.createElement(a, { is: f.is }))
                          : ((d = d.createElement(a)),
                            "select" === a && f.multiple && (d.multiple = !0))
                        : (d = d.createElementNS(c, a)),
                      ((a = d)[L] = p),
                      (a[A] = u),
                      Ra(a, t, !1, !1),
                      (f = a);
                    var h = s,
                      m = dr((d = l), (p = u));
                    switch (d) {
                      case "iframe":
                      case "object":
                        Sn("load", f), (s = p);
                        break;
                      case "video":
                      case "audio":
                        for (s = 0; s < ne.length; s++) Sn(ne[s], f);
                        s = p;
                        break;
                      case "source":
                        Sn("error", f), (s = p);
                        break;
                      case "img":
                      case "image":
                      case "link":
                        Sn("error", f), Sn("load", f), (s = p);
                        break;
                      case "form":
                        Sn("reset", f), Sn("submit", f), (s = p);
                        break;
                      case "details":
                        Sn("toggle", f), (s = p);
                        break;
                      case "input":
                        wt(f, p),
                          (s = xt(f, p)),
                          Sn("invalid", f),
                          pr(h, "onChange");
                        break;
                      case "option":
                        s = Qn(f, p);
                        break;
                      case "select":
                        (f._wrapperState = { wasMultiple: !!p.multiple }),
                          (s = i({}, p, { value: void 0 })),
                          Sn("invalid", f),
                          pr(h, "onChange");
                        break;
                      case "textarea":
                        Yn(f, p),
                          (s = Kn(f, p)),
                          Sn("invalid", f),
                          pr(h, "onChange");
                        break;
                      default:
                        s = p;
                    }
                    cr(d, s), (c = void 0);
                    var g = d,
                      v = f,
                      b = s;
                    for (c in b)
                      if (b.hasOwnProperty(c)) {
                        var y = b[c];
                        "style" === c
                          ? ur(v, y)
                          : "dangerouslySetInnerHTML" === c
                          ? null != (y = y ? y.__html : void 0) && rr(v, y)
                          : "children" === c
                          ? "string" == typeof y
                            ? ("textarea" !== g || "" !== y) && ir(v, y)
                            : "number" == typeof y && ir(v, "" + y)
                          : "suppressContentEditableWarning" !== c &&
                            "suppressHydrationWarning" !== c &&
                            "autoFocus" !== c &&
                            (x.hasOwnProperty(c)
                              ? null != y && pr(h, c)
                              : null != y && bt(v, c, y, m));
                      }
                    switch (d) {
                      case "input":
                        We(f), Et(f, p, !1);
                        break;
                      case "textarea":
                        We(f), Zn(f);
                        break;
                      case "option":
                        null != p.value &&
                          f.setAttribute("value", "" + yt(p.value));
                        break;
                      case "select":
                        ((s = f).multiple = !!p.multiple),
                          null != (f = p.value)
                            ? Gn(s, !!p.multiple, f, !1)
                            : null != p.defaultValue &&
                              Gn(s, !!p.multiple, p.defaultValue, !0);
                        break;
                      default:
                        "function" == typeof s.onClick && (f.onclick = fr);
                    }
                    (u = gr(l, u)) && ja(t), (t.stateNode = a);
                  }
                  null !== t.ref && (t.effectTag |= 128);
                } else null === t.stateNode && o("166");
                break;
              case 6:
                a && null != t.stateNode
                  ? $a(a, t, a.memoizedProps, u)
                  : ("string" != typeof u && null === t.stateNode && o("166"),
                    (a = Ki(Gi.current)),
                    Ki(qi.current),
                    ka(t)
                      ? ((l = (u = t).stateNode),
                        (a = u.memoizedProps),
                        (l[L] = u),
                        (u = l.nodeValue !== a) && ja(t))
                      : ((l = t),
                        ((u = (
                          9 === a.nodeType ? a : a.ownerDocument
                        ).createTextNode(u))[L] = t),
                        (l.stateNode = u)));
                break;
              case 11:
                break;
              case 13:
                if (((u = t.memoizedState), 0 != (64 & t.effectTag))) {
                  (t.expirationTime = l), (lo = t);
                  break e;
                }
                (u = null !== u),
                  (l = null !== a && null !== a.memoizedState),
                  null !== a &&
                    !u &&
                    l &&
                    null !== (a = a.child.sibling) &&
                    (null !== (s = t.firstEffect)
                      ? ((t.firstEffect = a), (a.nextEffect = s))
                      : ((t.firstEffect = t.lastEffect = a),
                        (a.nextEffect = null)),
                    (a.effectTag = 8)),
                  (u !== l || (0 == (1 & t.effectTag) && u)) &&
                    (t.effectTag |= 4);
                break;
              case 7:
              case 8:
              case 12:
                break;
              case 4:
                Xi(), Ua(t);
                break;
              case 10:
                bi(t);
                break;
              case 9:
              case 14:
                break;
              case 17:
                Mr(t.type) && Ir();
                break;
              default:
                o("156");
            }
            lo = null;
          }
          if (((t = e), 1 === so || 1 !== t.childExpirationTime)) {
            for (u = 0, l = t.child; null !== l; )
              (a = l.expirationTime) > u && (u = a),
                (s = l.childExpirationTime) > u && (u = s),
                (l = l.sibling);
            t.childExpirationTime = u;
          }
          if (null !== lo) return lo;
          null !== n &&
            0 == (1024 & n.effectTag) &&
            (null === n.firstEffect && (n.firstEffect = e.firstEffect),
            null !== e.lastEffect &&
              (null !== n.lastEffect &&
                (n.lastEffect.nextEffect = e.firstEffect),
              (n.lastEffect = e.lastEffect)),
            1 < e.effectTag &&
              (null !== n.lastEffect
                ? (n.lastEffect.nextEffect = e)
                : (n.firstEffect = e),
              (n.lastEffect = e)));
        } else {
          if (null !== (e = eo(e))) return (e.effectTag &= 1023), e;
          null !== n &&
            ((n.firstEffect = n.lastEffect = null), (n.effectTag |= 1024));
        }
        if (null !== r) return r;
        if (null === n) break;
        e = n;
      }
      return null;
    }
    function _o(e) {
      var t = Da(e.alternate, e, so);
      return (
        (e.memoizedProps = e.pendingProps),
        null === t && (t = ko(e)),
        (ro.current = null),
        t
      );
    }
    function Eo(e, t) {
      oo && o("243"), wo(), (oo = !0), (no.current = to);
      var n = e.nextExpirationTimeToWorkOn;
      (n === so && e === uo && null !== lo) ||
        (yo(),
        (so = n),
        (lo = Hr((uo = e).current, null)),
        (e.pendingCommitExpirationTime = 0));
      for (var r = !1; ; ) {
        try {
          if (t) for (; null !== lo && !ol(); ) lo = _o(lo);
          else for (; null !== lo; ) lo = _o(lo);
        } catch (t) {
          if (((gi = mi = hi = null), Di(), null === lo)) (r = !0), pl(t);
          else {
            null === lo && o("271");
            var i = lo,
              a = i.return;
            if (null !== a) {
              e: {
                var l = e,
                  u = a,
                  s = i,
                  c = t;
                if (
                  ((a = so),
                  (s.effectTag |= 1024),
                  (s.firstEffect = s.lastEffect = null),
                  null !== c &&
                    "object" == typeof c &&
                    "function" == typeof c.then)
                ) {
                  var d = c;
                  c = u;
                  var p = -1,
                    f = -1;
                  do {
                    if (13 === c.tag) {
                      var h = c.alternate;
                      if (null !== h && null !== (h = h.memoizedState)) {
                        f = 10 * (1073741822 - h.timedOutAt);
                        break;
                      }
                      "number" == typeof (h = c.pendingProps.maxDuration) &&
                        (0 >= h ? (p = 0) : (-1 === p || h < p) && (p = h));
                    }
                    c = c.return;
                  } while (null !== c);
                  c = u;
                  do {
                    if (
                      ((h = 13 === c.tag) &&
                        (h =
                          void 0 !== c.memoizedProps.fallback &&
                          null === c.memoizedState),
                      h)
                    ) {
                      if (
                        (null === (u = c.updateQueue)
                          ? ((u = new Set()).add(d), (c.updateQueue = u))
                          : u.add(d),
                        0 == (1 & c.mode))
                      ) {
                        (c.effectTag |= 64),
                          (s.effectTag &= -1957),
                          1 === s.tag &&
                            (null === s.alternate
                              ? (s.tag = 17)
                              : (((a = ri(1073741823)).tag = 2), ai(s, a))),
                          (s.expirationTime = 1073741823);
                        break e;
                      }
                      null === (s = l.pingCache)
                        ? ((s = l.pingCache = new Xa()),
                          (u = new Set()),
                          s.set(d, u))
                        : void 0 === (u = s.get(d)) &&
                          ((u = new Set()), s.set(d, u)),
                        u.has(a) ||
                          (u.add(a),
                          (s = Co.bind(null, l, d, a)),
                          d.then(s, s)),
                        -1 === p
                          ? (l = 1073741823)
                          : (-1 === f &&
                              (f = 10 * (1073741822 - Zr(l, a)) - 5e3),
                            (l = f + p)),
                        0 <= l && co < l && (co = l),
                        (c.effectTag |= 2048),
                        (c.expirationTime = a);
                      break e;
                    }
                    c = c.return;
                  } while (null !== c);
                  c = Error(
                    (ut(s.type) || "A React component") +
                      " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
                      st(s)
                  );
                }
                (po = !0), (c = pi(c, s)), (l = u);
                do {
                  switch (l.tag) {
                    case 3:
                      (l.effectTag |= 2048),
                        (l.expirationTime = a),
                        oi(l, (a = Za(l, c, a)));
                      break e;
                    case 1:
                      if (
                        ((d = c),
                        (p = l.type),
                        (f = l.stateNode),
                        0 == (64 & l.effectTag) &&
                          ("function" == typeof p.getDerivedStateFromError ||
                            (null !== f &&
                              "function" == typeof f.componentDidCatch &&
                              (null === bo || !bo.has(f)))))
                      ) {
                        (l.effectTag |= 2048),
                          (l.expirationTime = a),
                          oi(l, (a = Ja(l, d, a)));
                        break e;
                      }
                  }
                  l = l.return;
                } while (null !== l);
              }
              lo = ko(i);
              continue;
            }
            (r = !0), pl(t);
          }
        }
        break;
      }
      if (((oo = !1), (gi = mi = hi = no.current = null), Di(), r))
        (uo = null), (e.finishedWork = null);
      else if (null !== lo) e.finishedWork = null;
      else {
        if ((null === (r = e.current.alternate) && o("281"), (uo = null), po)) {
          if (
            ((i = e.latestPendingTime),
            (a = e.latestSuspendedTime),
            (l = e.latestPingedTime),
            (0 !== i && i < n) || (0 !== a && a < n) || (0 !== l && l < n))
          )
            return Xr(e, n), void el(e, r, n, e.expirationTime, -1);
          if (!e.didError && t)
            return (
              (e.didError = !0),
              (n = e.nextExpirationTimeToWorkOn = n),
              (t = e.expirationTime = 1073741823),
              void el(e, r, n, t, -1)
            );
        }
        t && -1 !== co
          ? (Xr(e, n),
            (t = 10 * (1073741822 - Zr(e, n))) < co && (co = t),
            (t = 10 * (1073741822 - nl())),
            (t = co - t),
            el(e, r, n, e.expirationTime, 0 > t ? 0 : t))
          : ((e.pendingCommitExpirationTime = n), (e.finishedWork = r));
      }
    }
    function To(e, t) {
      for (var n = e.return; null !== n; ) {
        switch (n.tag) {
          case 1:
            var r = n.stateNode;
            if (
              "function" == typeof n.type.getDerivedStateFromError ||
              ("function" == typeof r.componentDidCatch &&
                (null === bo || !bo.has(r)))
            )
              return (
                ai(n, (e = Ja(n, (e = pi(t, e)), 1073741823))),
                void No(n, 1073741823)
              );
            break;
          case 3:
            return (
              ai(n, (e = Za(n, (e = pi(t, e)), 1073741823))),
              void No(n, 1073741823)
            );
        }
        n = n.return;
      }
      3 === e.tag &&
        (ai(e, (n = Za(e, (n = pi(t, e)), 1073741823))), No(e, 1073741823));
    }
    function So(e, t) {
      return (
        0 !== ao
          ? (e = ao)
          : oo
          ? (e = ho ? 1073741823 : so)
          : 1 & t.mode
          ? ((e = Ho
              ? 1073741822 - 10 * (1 + (((1073741822 - e + 15) / 10) | 0))
              : 1073741822 - 25 * (1 + (((1073741822 - e + 500) / 25) | 0))),
            null !== uo && e === so && --e)
          : (e = 1073741823),
        Ho && (0 === Uo || e < Uo) && (Uo = e),
        e
      );
    }
    function Co(e, t, n) {
      var r = e.pingCache;
      null !== r && r.delete(t),
        null !== uo && so === n
          ? (uo = null)
          : ((t = e.earliestSuspendedTime),
            (r = e.latestSuspendedTime),
            0 !== t &&
              n <= t &&
              n >= r &&
              ((e.didError = !1),
              (0 === (t = e.latestPingedTime) || t > n) &&
                (e.latestPingedTime = n),
              Jr(n, e),
              0 !== (n = e.expirationTime) && rl(e, n)));
    }
    function Po(e, t) {
      var n = e.stateNode;
      null !== n && n.delete(t),
        null !== (e = Oo(e, (t = So((t = nl()), e)))) &&
          (Yr(e, t), 0 !== (t = e.expirationTime) && rl(e, t));
    }
    function Oo(e, t) {
      e.expirationTime < t && (e.expirationTime = t);
      var n = e.alternate;
      null !== n && n.expirationTime < t && (n.expirationTime = t);
      var r = e.return,
        i = null;
      if (null === r && 3 === e.tag) i = e.stateNode;
      else
        for (; null !== r; ) {
          if (
            ((n = r.alternate),
            r.childExpirationTime < t && (r.childExpirationTime = t),
            null !== n &&
              n.childExpirationTime < t &&
              (n.childExpirationTime = t),
            null === r.return && 3 === r.tag)
          ) {
            i = r.stateNode;
            break;
          }
          r = r.return;
        }
      return i;
    }
    function No(e, t) {
      null !== (e = Oo(e, t)) &&
        (!oo && 0 !== so && t > so && yo(),
        Yr(e, t),
        (oo && !ho && uo === e) || rl(e, e.expirationTime),
        Yo > Ko && ((Yo = 0), o("185")));
    }
    function Mo(e, t, n, r, i) {
      var a = ao;
      ao = 1073741823;
      try {
        return e(t, n, r, i);
      } finally {
        ao = a;
      }
    }
    var Io = null,
      zo = null,
      Lo = 0,
      Ao = void 0,
      Do = !1,
      jo = null,
      Ro = 0,
      Uo = 0,
      Fo = !1,
      $o = null,
      Vo = !1,
      Wo = !1,
      Ho = !1,
      Bo = null,
      qo = a.unstable_now(),
      Qo = 1073741822 - ((qo / 10) | 0),
      Go = Qo,
      Ko = 50,
      Yo = 0,
      Xo = null;
    function Zo() {
      Qo = 1073741822 - (((a.unstable_now() - qo) / 10) | 0);
    }
    function Jo(e, t) {
      if (0 !== Lo) {
        if (t < Lo) return;
        null !== Ao && a.unstable_cancelCallback(Ao);
      }
      (Lo = t),
        (e = a.unstable_now() - qo),
        (Ao = a.unstable_scheduleCallback(ll, {
          timeout: 10 * (1073741822 - t) - e,
        }));
    }
    function el(e, t, n, r, i) {
      (e.expirationTime = r),
        0 !== i || ol()
          ? 0 < i && (e.timeoutHandle = br(tl.bind(null, e, t, n), i))
          : ((e.pendingCommitExpirationTime = n), (e.finishedWork = t));
    }
    function tl(e, t, n) {
      (e.pendingCommitExpirationTime = n),
        (e.finishedWork = t),
        Zo(),
        (Go = Qo),
        sl(e, n);
    }
    function nl() {
      return Do ? Go : (il(), (0 !== Ro && 1 !== Ro) || (Zo(), (Go = Qo)), Go);
    }
    function rl(e, t) {
      null === e.nextScheduledRoot
        ? ((e.expirationTime = t),
          null === zo
            ? ((Io = zo = e), (e.nextScheduledRoot = e))
            : ((zo = zo.nextScheduledRoot = e).nextScheduledRoot = Io))
        : t > e.expirationTime && (e.expirationTime = t),
        Do ||
          (Vo
            ? Wo && ((jo = e), (Ro = 1073741823), cl(e, 1073741823, !1))
            : 1073741823 === t
            ? ul(1073741823, !1)
            : Jo(e, t));
    }
    function il() {
      var e = 0,
        t = null;
      if (null !== zo)
        for (var n = zo, r = Io; null !== r; ) {
          var i = r.expirationTime;
          if (0 === i) {
            if (
              ((null === n || null === zo) && o("244"),
              r === r.nextScheduledRoot)
            ) {
              Io = zo = r.nextScheduledRoot = null;
              break;
            }
            if (r === Io)
              (Io = i = r.nextScheduledRoot),
                (zo.nextScheduledRoot = i),
                (r.nextScheduledRoot = null);
            else {
              if (r === zo) {
                ((zo = n).nextScheduledRoot = Io), (r.nextScheduledRoot = null);
                break;
              }
              (n.nextScheduledRoot = r.nextScheduledRoot),
                (r.nextScheduledRoot = null);
            }
            r = n.nextScheduledRoot;
          } else {
            if ((i > e && ((e = i), (t = r)), r === zo)) break;
            if (1073741823 === e) break;
            (n = r), (r = r.nextScheduledRoot);
          }
        }
      (jo = t), (Ro = e);
    }
    var al = !1;
    function ol() {
      return !!al || (!!a.unstable_shouldYield() && (al = !0));
    }
    function ll() {
      try {
        if (!ol() && null !== Io) {
          Zo();
          var e = Io;
          do {
            var t = e.expirationTime;
            0 !== t && Qo <= t && (e.nextExpirationTimeToWorkOn = Qo),
              (e = e.nextScheduledRoot);
          } while (e !== Io);
        }
        ul(0, !0);
      } finally {
        al = !1;
      }
    }
    function ul(e, t) {
      if ((il(), t))
        for (
          Zo(), Go = Qo;
          null !== jo && 0 !== Ro && e <= Ro && !(al && Qo > Ro);

        )
          cl(jo, Ro, Qo > Ro), il(), Zo(), (Go = Qo);
      else for (; null !== jo && 0 !== Ro && e <= Ro; ) cl(jo, Ro, !1), il();
      if (
        (t && ((Lo = 0), (Ao = null)),
        0 !== Ro && Jo(jo, Ro),
        (Yo = 0),
        (Xo = null),
        null !== Bo)
      )
        for (e = Bo, Bo = null, t = 0; t < e.length; t++) {
          var n = e[t];
          try {
            n._onComplete();
          } catch (e) {
            Fo || ((Fo = !0), ($o = e));
          }
        }
      if (Fo) throw ((e = $o), ($o = null), (Fo = !1), e);
    }
    function sl(e, t) {
      Do && o("253"), (jo = e), (Ro = t), cl(e, t, !1), ul(1073741823, !1);
    }
    function cl(e, t, n) {
      if ((Do && o("245"), (Do = !0), n)) {
        var r = e.finishedWork;
        null !== r
          ? dl(e, r, t)
          : ((e.finishedWork = null),
            -1 !== (r = e.timeoutHandle) && ((e.timeoutHandle = -1), yr(r)),
            Eo(e, n),
            null !== (r = e.finishedWork) &&
              (ol() ? (e.finishedWork = r) : dl(e, r, t)));
      } else
        null !== (r = e.finishedWork)
          ? dl(e, r, t)
          : ((e.finishedWork = null),
            -1 !== (r = e.timeoutHandle) && ((e.timeoutHandle = -1), yr(r)),
            Eo(e, n),
            null !== (r = e.finishedWork) && dl(e, r, t));
      Do = !1;
    }
    function dl(e, t, n) {
      var r = e.firstBatch;
      if (
        null !== r &&
        r._expirationTime >= n &&
        (null === Bo ? (Bo = [r]) : Bo.push(r), r._defer)
      )
        return (e.finishedWork = t), void (e.expirationTime = 0);
      (e.finishedWork = null),
        e === Xo ? Yo++ : ((Xo = e), (Yo = 0)),
        (ho = oo = !0),
        e.current === t && o("177"),
        0 === (n = e.pendingCommitExpirationTime) && o("261"),
        (e.pendingCommitExpirationTime = 0),
        (r = t.expirationTime);
      var i = t.childExpirationTime;
      if (
        ((r = i > r ? i : r),
        (e.didError = !1),
        0 === r
          ? ((e.earliestPendingTime = 0),
            (e.latestPendingTime = 0),
            (e.earliestSuspendedTime = 0),
            (e.latestSuspendedTime = 0),
            (e.latestPingedTime = 0))
          : (r < e.latestPingedTime && (e.latestPingedTime = 0),
            0 !== (i = e.latestPendingTime) &&
              (i > r
                ? (e.earliestPendingTime = e.latestPendingTime = 0)
                : e.earliestPendingTime > r &&
                  (e.earliestPendingTime = e.latestPendingTime)),
            0 === (i = e.earliestSuspendedTime)
              ? Yr(e, r)
              : r < e.latestSuspendedTime
              ? ((e.earliestSuspendedTime = 0),
                (e.latestSuspendedTime = 0),
                (e.latestPingedTime = 0),
                Yr(e, r))
              : r > i && Yr(e, r)),
        Jr(0, e),
        (ro.current = null),
        1 < t.effectTag
          ? null !== t.lastEffect
            ? ((t.lastEffect.nextEffect = t), (r = t.firstEffect))
            : (r = t)
          : (r = t.firstEffect),
        (hr = Tn),
        Rn((i = jn())))
      ) {
        if ("selectionStart" in i)
          var l = { start: i.selectionStart, end: i.selectionEnd };
        else
          e: {
            var u =
              (l = ((l = i.ownerDocument) && l.defaultView) || window)
                .getSelection && l.getSelection();
            if (u && 0 !== u.rangeCount) {
              l = u.anchorNode;
              var s = u.anchorOffset,
                c = u.focusNode;
              u = u.focusOffset;
              try {
                l.nodeType, c.nodeType;
              } catch (e) {
                l = null;
                break e;
              }
              var d = 0,
                p = -1,
                f = -1,
                h = 0,
                m = 0,
                g = i,
                v = null;
              t: for (;;) {
                for (
                  var b;
                  g !== l || (0 !== s && 3 !== g.nodeType) || (p = d + s),
                    g !== c || (0 !== u && 3 !== g.nodeType) || (f = d + u),
                    3 === g.nodeType && (d += g.nodeValue.length),
                    null !== (b = g.firstChild);

                )
                  (v = g), (g = b);
                for (;;) {
                  if (g === i) break t;
                  if (
                    (v === l && ++h === s && (p = d),
                    v === c && ++m === u && (f = d),
                    null !== (b = g.nextSibling))
                  )
                    break;
                  v = (g = v).parentNode;
                }
                g = b;
              }
              l = -1 === p || -1 === f ? null : { start: p, end: f };
            } else l = null;
          }
        l = l || { start: 0, end: 0 };
      } else l = null;
      for (
        mr = { focusedElem: i, selectionRange: l }, Tn = !1, fo = r;
        null !== fo;

      ) {
        (i = !1), (l = void 0);
        try {
          for (; null !== fo; ) {
            if (256 & fo.effectTag)
              e: {
                var y = fo.alternate;
                switch ((s = fo).tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ba(2, 0, s);
                    break e;
                  case 1:
                    if (256 & s.effectTag && null !== y) {
                      var x = y.memoizedProps,
                        w = y.memoizedState,
                        k = s.stateNode,
                        _ = k.getSnapshotBeforeUpdate(
                          s.elementType === s.type ? x : ea(s.type, x),
                          w
                        );
                      k.__reactInternalSnapshotBeforeUpdate = _;
                    }
                    break e;
                  case 3:
                  case 5:
                  case 6:
                  case 4:
                  case 17:
                    break e;
                  default:
                    o("163");
                }
              }
            fo = fo.nextEffect;
          }
        } catch (e) {
          (i = !0), (l = e);
        }
        i &&
          (null === fo && o("178"),
          To(fo, l),
          null !== fo && (fo = fo.nextEffect));
      }
      for (fo = r; null !== fo; ) {
        (y = !1), (x = void 0);
        try {
          for (; null !== fo; ) {
            var E = fo.effectTag;
            if ((16 & E && ir(fo.stateNode, ""), 128 & E)) {
              var T = fo.alternate;
              if (null !== T) {
                var S = T.ref;
                null !== S &&
                  ("function" == typeof S ? S(null) : (S.current = null));
              }
            }
            switch (14 & E) {
              case 2:
                Ga(fo), (fo.effectTag &= -3);
                break;
              case 6:
                Ga(fo), (fo.effectTag &= -3), Ya(fo.alternate, fo);
                break;
              case 4:
                Ya(fo.alternate, fo);
                break;
              case 8:
                Ka((w = fo)),
                  (w.return = null),
                  (w.child = null),
                  (w.memoizedState = null),
                  (w.updateQueue = null);
                var C = w.alternate;
                null !== C &&
                  ((C.return = null),
                  (C.child = null),
                  (C.memoizedState = null),
                  (C.updateQueue = null));
            }
            fo = fo.nextEffect;
          }
        } catch (e) {
          (y = !0), (x = e);
        }
        y &&
          (null === fo && o("178"),
          To(fo, x),
          null !== fo && (fo = fo.nextEffect));
      }
      if (
        ((S = mr),
        (T = jn()),
        (E = S.focusedElem),
        (y = S.selectionRange),
        T !== E &&
          E &&
          E.ownerDocument &&
          (function e(t, n) {
            return (
              !(!t || !n) &&
              (t === n ||
                ((!t || 3 !== t.nodeType) &&
                  (n && 3 === n.nodeType
                    ? e(t, n.parentNode)
                    : "contains" in t
                    ? t.contains(n)
                    : !!t.compareDocumentPosition &&
                      !!(16 & t.compareDocumentPosition(n)))))
            );
          })(E.ownerDocument.documentElement, E))
      ) {
        null !== y &&
          Rn(E) &&
          ((T = y.start),
          void 0 === (S = y.end) && (S = T),
          "selectionStart" in E
            ? ((E.selectionStart = T),
              (E.selectionEnd = Math.min(S, E.value.length)))
            : (S =
                ((T = E.ownerDocument || document) && T.defaultView) || window)
                .getSelection &&
              ((S = S.getSelection()),
              (x = E.textContent.length),
              (C = Math.min(y.start, x)),
              (y = void 0 === y.end ? C : Math.min(y.end, x)),
              !S.extend && C > y && ((x = y), (y = C), (C = x)),
              (x = Dn(E, C)),
              (w = Dn(E, y)),
              x &&
                w &&
                (1 !== S.rangeCount ||
                  S.anchorNode !== x.node ||
                  S.anchorOffset !== x.offset ||
                  S.focusNode !== w.node ||
                  S.focusOffset !== w.offset) &&
                ((T = T.createRange()).setStart(x.node, x.offset),
                S.removeAllRanges(),
                C > y
                  ? (S.addRange(T), S.extend(w.node, w.offset))
                  : (T.setEnd(w.node, w.offset), S.addRange(T))))),
          (T = []);
        for (S = E; (S = S.parentNode); )
          1 === S.nodeType &&
            T.push({ element: S, left: S.scrollLeft, top: S.scrollTop });
        for (
          "function" == typeof E.focus && E.focus(), E = 0;
          E < T.length;
          E++
        )
          ((S = T[E]).element.scrollLeft = S.left),
            (S.element.scrollTop = S.top);
      }
      for (
        mr = null, Tn = !!hr, hr = null, e.current = t, fo = r;
        null !== fo;

      ) {
        (E = !1), (T = void 0);
        try {
          for (S = e, C = n; null !== fo; ) {
            var P = fo.effectTag;
            if (36 & P) {
              var O = fo.alternate;
              switch (((x = C), (y = fo).tag)) {
                case 0:
                case 11:
                case 15:
                  Ba(16, 32, y);
                  break;
                case 1:
                  var N = y.stateNode;
                  if (4 & y.effectTag)
                    if (null === O) N.componentDidMount();
                    else {
                      var M =
                        y.elementType === y.type
                          ? O.memoizedProps
                          : ea(y.type, O.memoizedProps);
                      N.componentDidUpdate(
                        M,
                        O.memoizedState,
                        N.__reactInternalSnapshotBeforeUpdate
                      );
                    }
                  var I = y.updateQueue;
                  null !== I && ci(0, I, N);
                  break;
                case 3:
                  var z = y.updateQueue;
                  if (null !== z) {
                    if (((w = null), null !== y.child))
                      switch (y.child.tag) {
                        case 5:
                          w = y.child.stateNode;
                          break;
                        case 1:
                          w = y.child.stateNode;
                      }
                    ci(0, z, w);
                  }
                  break;
                case 5:
                  var L = y.stateNode;
                  null === O &&
                    4 & y.effectTag &&
                    gr(y.type, y.memoizedProps) &&
                    L.focus();
                  break;
                case 6:
                case 4:
                case 12:
                case 13:
                case 17:
                  break;
                default:
                  o("163");
              }
            }
            if (128 & P) {
              var A = fo.ref;
              if (null !== A) {
                var D = fo.stateNode;
                switch (fo.tag) {
                  case 5:
                    var j = D;
                    break;
                  default:
                    j = D;
                }
                "function" == typeof A ? A(j) : (A.current = j);
              }
            }
            512 & P && (mo = S), (fo = fo.nextEffect);
          }
        } catch (e) {
          (E = !0), (T = e);
        }
        E &&
          (null === fo && o("178"),
          To(fo, T),
          null !== fo && (fo = fo.nextEffect));
      }
      null !== r &&
        null !== mo &&
        ((P = xo.bind(null, e, r)),
        (go = a.unstable_scheduleCallback(P)),
        (vo = P)),
        (oo = ho = !1),
        "function" == typeof Rr && Rr(t.stateNode),
        (P = t.expirationTime),
        0 === (t = (t = t.childExpirationTime) > P ? t : P) && (bo = null),
        (e.expirationTime = t),
        (e.finishedWork = null);
    }
    function pl(e) {
      null === jo && o("246"),
        (jo.expirationTime = 0),
        Fo || ((Fo = !0), ($o = e));
    }
    function fl(e, t) {
      var n = Vo;
      Vo = !0;
      try {
        return e(t);
      } finally {
        (Vo = n) || Do || ul(1073741823, !1);
      }
    }
    function hl(e, t) {
      if (Vo && !Wo) {
        Wo = !0;
        try {
          return e(t);
        } finally {
          Wo = !1;
        }
      }
      return e(t);
    }
    function ml(e, t, n) {
      if (Ho) return e(t, n);
      Vo || Do || 0 === Uo || (ul(Uo, !1), (Uo = 0));
      var r = Ho,
        i = Vo;
      Vo = Ho = !0;
      try {
        return e(t, n);
      } finally {
        (Ho = r), (Vo = i) || Do || ul(1073741823, !1);
      }
    }
    function gl(e, t, n, r, i) {
      var a = t.current;
      e: if (n) {
        t: {
          (2 === nn((n = n._reactInternalFiber)) && 1 === n.tag) || o("170");
          var l = n;
          do {
            switch (l.tag) {
              case 3:
                l = l.stateNode.context;
                break t;
              case 1:
                if (Mr(l.type)) {
                  l = l.stateNode.__reactInternalMemoizedMergedChildContext;
                  break t;
                }
            }
            l = l.return;
          } while (null !== l);
          o("171"), (l = void 0);
        }
        if (1 === n.tag) {
          var u = n.type;
          if (Mr(u)) {
            n = Ar(n, u, l);
            break e;
          }
        }
        n = l;
      } else n = Sr;
      return (
        null === t.context ? (t.context = n) : (t.pendingContext = n),
        (t = i),
        ((i = ri(r)).payload = { element: e }),
        null !== (t = void 0 === t ? null : t) && (i.callback = t),
        wo(),
        ai(a, i),
        No(a, r),
        r
      );
    }
    function vl(e, t, n, r) {
      var i = t.current;
      return gl(e, t, n, (i = So(nl(), i)), r);
    }
    function bl(e) {
      if (!(e = e.current).child) return null;
      switch (e.child.tag) {
        case 5:
        default:
          return e.child.stateNode;
      }
    }
    function yl(e) {
      var t = 1073741822 - 25 * (1 + (((1073741822 - nl() + 500) / 25) | 0));
      t >= io && (t = io - 1),
        (this._expirationTime = io = t),
        (this._root = e),
        (this._callbacks = this._next = null),
        (this._hasChildren = this._didComplete = !1),
        (this._children = null),
        (this._defer = !0);
    }
    function xl() {
      (this._callbacks = null),
        (this._didCommit = !1),
        (this._onCommit = this._onCommit.bind(this));
    }
    function wl(e, t, n) {
      (e = {
        current: (t = Vr(3, null, null, t ? 3 : 0)),
        containerInfo: e,
        pendingChildren: null,
        pingCache: null,
        earliestPendingTime: 0,
        latestPendingTime: 0,
        earliestSuspendedTime: 0,
        latestSuspendedTime: 0,
        latestPingedTime: 0,
        didError: !1,
        pendingCommitExpirationTime: 0,
        finishedWork: null,
        timeoutHandle: -1,
        context: null,
        pendingContext: null,
        hydrate: n,
        nextExpirationTimeToWorkOn: 0,
        expirationTime: 0,
        firstBatch: null,
        nextScheduledRoot: null,
      }),
        (this._internalRoot = t.stateNode = e);
    }
    function kl(e) {
      return !(
        !e ||
        (1 !== e.nodeType &&
          9 !== e.nodeType &&
          11 !== e.nodeType &&
          (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
      );
    }
    function _l(e, t, n, r, i) {
      kl(n) || o("200");
      var a = n._reactRootContainer;
      if (a) {
        if ("function" == typeof i) {
          var l = i;
          i = function () {
            var e = bl(a._internalRoot);
            l.call(e);
          };
        }
        null != e
          ? a.legacy_renderSubtreeIntoContainer(e, t, i)
          : a.render(t, i);
      } else {
        if (
          ((a = n._reactRootContainer =
            (function (e, t) {
              if (
                (t ||
                  (t = !(
                    !(t = e
                      ? 9 === e.nodeType
                        ? e.documentElement
                        : e.firstChild
                      : null) ||
                    1 !== t.nodeType ||
                    !t.hasAttribute("data-reactroot")
                  )),
                !t)
              )
                for (var n; (n = e.lastChild); ) e.removeChild(n);
              return new wl(e, !1, t);
            })(n, r)),
          "function" == typeof i)
        ) {
          var u = i;
          i = function () {
            var e = bl(a._internalRoot);
            u.call(e);
          };
        }
        hl(function () {
          null != e
            ? a.legacy_renderSubtreeIntoContainer(e, t, i)
            : a.render(t, i);
        });
      }
      return bl(a._internalRoot);
    }
    function El(e, t) {
      var n =
        2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      return (
        kl(t) || o("200"),
        (function (e, t, n) {
          var r =
            3 < arguments.length && void 0 !== arguments[3]
              ? arguments[3]
              : null;
          return {
            $$typeof: Ke,
            key: null == r ? null : "" + r,
            children: e,
            containerInfo: t,
            implementation: n,
          };
        })(e, t, null, n)
      );
    }
    (Ce = function (e, t, n) {
      switch (t) {
        case "input":
          if ((_t(e, n), (t = n.name), "radio" === n.type && null != t)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var i = U(r);
                i || o("90"), He(r), _t(r, i);
              }
            }
          }
          break;
        case "textarea":
          Xn(e, n);
          break;
        case "select":
          null != (t = n.value) && Gn(e, !!n.multiple, t, !1);
      }
    }),
      (yl.prototype.render = function (e) {
        this._defer || o("250"), (this._hasChildren = !0), (this._children = e);
        var t = this._root._internalRoot,
          n = this._expirationTime,
          r = new xl();
        return gl(e, t, null, n, r._onCommit), r;
      }),
      (yl.prototype.then = function (e) {
        if (this._didComplete) e();
        else {
          var t = this._callbacks;
          null === t && (t = this._callbacks = []), t.push(e);
        }
      }),
      (yl.prototype.commit = function () {
        var e = this._root._internalRoot,
          t = e.firstBatch;
        if (((this._defer && null !== t) || o("251"), this._hasChildren)) {
          var n = this._expirationTime;
          if (t !== this) {
            this._hasChildren &&
              ((n = this._expirationTime = t._expirationTime),
              this.render(this._children));
            for (var r = null, i = t; i !== this; ) (r = i), (i = i._next);
            null === r && o("251"),
              (r._next = i._next),
              (this._next = t),
              (e.firstBatch = this);
          }
          (this._defer = !1),
            sl(e, n),
            (t = this._next),
            (this._next = null),
            null !== (t = e.firstBatch = t) &&
              t._hasChildren &&
              t.render(t._children);
        } else (this._next = null), (this._defer = !1);
      }),
      (yl.prototype._onComplete = function () {
        if (!this._didComplete) {
          this._didComplete = !0;
          var e = this._callbacks;
          if (null !== e) for (var t = 0; t < e.length; t++) (0, e[t])();
        }
      }),
      (xl.prototype.then = function (e) {
        if (this._didCommit) e();
        else {
          var t = this._callbacks;
          null === t && (t = this._callbacks = []), t.push(e);
        }
      }),
      (xl.prototype._onCommit = function () {
        if (!this._didCommit) {
          this._didCommit = !0;
          var e = this._callbacks;
          if (null !== e)
            for (var t = 0; t < e.length; t++) {
              var n = e[t];
              "function" != typeof n && o("191", n), n();
            }
        }
      }),
      (wl.prototype.render = function (e, t) {
        var n = this._internalRoot,
          r = new xl();
        return (
          null !== (t = void 0 === t ? null : t) && r.then(t),
          vl(e, n, null, r._onCommit),
          r
        );
      }),
      (wl.prototype.unmount = function (e) {
        var t = this._internalRoot,
          n = new xl();
        return (
          null !== (e = void 0 === e ? null : e) && n.then(e),
          vl(null, t, null, n._onCommit),
          n
        );
      }),
      (wl.prototype.legacy_renderSubtreeIntoContainer = function (e, t, n) {
        var r = this._internalRoot,
          i = new xl();
        return (
          null !== (n = void 0 === n ? null : n) && i.then(n),
          vl(t, r, e, i._onCommit),
          i
        );
      }),
      (wl.prototype.createBatch = function () {
        var e = new yl(this),
          t = e._expirationTime,
          n = this._internalRoot,
          r = n.firstBatch;
        if (null === r) (n.firstBatch = e), (e._next = null);
        else {
          for (n = null; null !== r && r._expirationTime >= t; )
            (n = r), (r = r._next);
          (e._next = r), null !== n && (n._next = e);
        }
        return e;
      }),
      (ze = fl),
      (Le = ml),
      (Ae = function () {
        Do || 0 === Uo || (ul(Uo, !1), (Uo = 0));
      });
    var Tl,
      Sl,
      Cl = {
        createPortal: El,
        findDOMNode: function (e) {
          if (null == e) return null;
          if (1 === e.nodeType) return e;
          var t = e._reactInternalFiber;
          return (
            void 0 === t &&
              ("function" == typeof e.render
                ? o("188")
                : o("268", Object.keys(e))),
            (e = null === (e = an(t)) ? null : e.stateNode)
          );
        },
        hydrate: function (e, t, n) {
          return _l(null, e, t, !0, n);
        },
        render: function (e, t, n) {
          return _l(null, e, t, !1, n);
        },
        unstable_renderSubtreeIntoContainer: function (e, t, n, r) {
          return (
            (null == e || void 0 === e._reactInternalFiber) && o("38"),
            _l(e, t, n, !1, r)
          );
        },
        unmountComponentAtNode: function (e) {
          return (
            kl(e) || o("40"),
            !!e._reactRootContainer &&
              (hl(function () {
                _l(null, null, e, !1, function () {
                  e._reactRootContainer = null;
                });
              }),
              !0)
          );
        },
        unstable_createPortal: function () {
          return El.apply(void 0, arguments);
        },
        unstable_batchedUpdates: fl,
        unstable_interactiveUpdates: ml,
        flushSync: function (e, t) {
          Do && o("187");
          var n = Vo;
          Vo = !0;
          try {
            return Mo(e, t);
          } finally {
            (Vo = n), ul(1073741823, !1);
          }
        },
        unstable_createRoot: Pl,
        unstable_flushControlled: function (e) {
          var t = Vo;
          Vo = !0;
          try {
            Mo(e);
          } finally {
            (Vo = t) || Do || ul(1073741823, !1);
          }
        },
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
          Events: [
            j,
            R,
            U,
            N.injectEventPluginsByName,
            y,
            B,
            function (e) {
              C(e, H);
            },
            Me,
            Ie,
            On,
            I,
          ],
        },
      };
    function Pl(e, t) {
      return (
        kl(e) || o("299", "createRoot"),
        new wl(e, !0, null != t && !0 === t.hydrate)
      );
    }
    (Cl.createRoot = Pl),
      (Cl.unstable_createRoot = void 0),
      (Sl = (Tl = {
        findFiberByHostInstance: D,
        bundleType: 0,
        version: "16.8.0-alpha.1",
        rendererPackageName: "react-dom",
      }).findFiberByHostInstance),
      (function (e) {
        if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
        var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (t.isDisabled || !t.supportsFiber) return !0;
        try {
          var n = t.inject(e);
          (Rr = Fr(function (e) {
            return t.onCommitFiberRoot(n, e);
          })),
            (Ur = Fr(function (e) {
              return t.onCommitFiberUnmount(n, e);
            }));
        } catch (e) {}
      })(
        i({}, Tl, {
          overrideProps: null,
          currentDispatcherRef: Be.ReactCurrentDispatcher,
          findHostInstanceByFiber: function (e) {
            return null === (e = an(e)) ? null : e.stateNode;
          },
          findFiberByHostInstance: function (e) {
            return Sl ? Sl(e) : null;
          },
        })
      );
    var Ol = { default: Cl },
      Nl = (Ol && Cl) || Ol;
    e.exports = Nl.default || Nl;
  },
  function (e, t, n) {
    "use strict";
    e.exports = n(20);
  },
  function (e, t, n) {
    "use strict";
    (function (e) {
      /** @license React v0.13.0-alpha.1
       * scheduler.production.min.js
       *
       * Copyright (c) Facebook, Inc. and its affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = null,
        r = !1,
        i = 3,
        a = -1,
        o = -1,
        l = !1,
        u = !1;
      function s() {
        if (!l) {
          var e = n.expirationTime;
          u ? _() : (u = !0), k(p, e);
        }
      }
      function c() {
        var e = n,
          t = n.next;
        if (n === t) n = null;
        else {
          var r = n.previous;
          (n = r.next = t), (t.previous = r);
        }
        (e.next = e.previous = null),
          (r = e.callback),
          (t = e.expirationTime),
          (e = e.priorityLevel);
        var a = i,
          l = o;
        (i = e), (o = t);
        try {
          var u = r();
        } finally {
          (i = a), (o = l);
        }
        if ("function" == typeof u)
          if (
            ((u = {
              callback: u,
              priorityLevel: e,
              expirationTime: t,
              next: null,
              previous: null,
            }),
            null === n)
          )
            n = u.next = u.previous = u;
          else {
            (r = null), (e = n);
            do {
              if (e.expirationTime >= t) {
                r = e;
                break;
              }
              e = e.next;
            } while (e !== n);
            null === r ? (r = n) : r === n && ((n = u), s()),
              ((t = r.previous).next = r.previous = u),
              (u.next = r),
              (u.previous = t);
          }
      }
      function d() {
        if (-1 === a && null !== n && 1 === n.priorityLevel) {
          l = !0;
          try {
            do {
              c();
            } while (null !== n && 1 === n.priorityLevel);
          } finally {
            (l = !1), null !== n ? s() : (u = !1);
          }
        }
      }
      function p(e) {
        l = !0;
        var i = r;
        r = e;
        try {
          if (e)
            for (; null !== n; ) {
              var a = t.unstable_now();
              if (!(n.expirationTime <= a)) break;
              do {
                c();
              } while (null !== n && n.expirationTime <= a);
            }
          else if (null !== n)
            do {
              c();
            } while (null !== n && !E());
        } finally {
          (l = !1), (r = i), null !== n ? s() : (u = !1), d();
        }
      }
      var f,
        h,
        m = Date,
        g = "function" == typeof setTimeout ? setTimeout : void 0,
        v = "function" == typeof clearTimeout ? clearTimeout : void 0,
        b =
          "function" == typeof requestAnimationFrame
            ? requestAnimationFrame
            : void 0,
        y =
          "function" == typeof cancelAnimationFrame
            ? cancelAnimationFrame
            : void 0;
      function x(e) {
        (f = b(function (t) {
          v(h), e(t);
        })),
          (h = g(function () {
            y(f), e(t.unstable_now());
          }, 100));
      }
      if (
        "object" == typeof performance &&
        "function" == typeof performance.now
      ) {
        var w = performance;
        t.unstable_now = function () {
          return w.now();
        };
      } else
        t.unstable_now = function () {
          return m.now();
        };
      var k,
        _,
        E,
        T = null;
      if (
        ("undefined" != typeof window ? (T = window) : void 0 !== e && (T = e),
        T && T._schedMock)
      ) {
        var S = T._schedMock;
        (k = S[0]), (_ = S[1]), (E = S[2]), (t.unstable_now = S[3]);
      } else if (
        "undefined" == typeof window ||
        "function" != typeof MessageChannel
      ) {
        var C = null,
          P = function (e) {
            if (null !== C)
              try {
                C(e);
              } finally {
                C = null;
              }
          };
        (k = function (e) {
          null !== C ? setTimeout(k, 0, e) : ((C = e), setTimeout(P, 0, !1));
        }),
          (_ = function () {
            C = null;
          }),
          (E = function () {
            return !1;
          });
      } else {
        "undefined" != typeof console &&
          ("function" != typeof b &&
            console.error(
              "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
            ),
          "function" != typeof y &&
            console.error(
              "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
            ));
        var O = null,
          N = !1,
          M = -1,
          I = !1,
          z = !1,
          L = 0,
          A = 33,
          D = 33;
        E = function () {
          return L <= t.unstable_now();
        };
        var j = new MessageChannel(),
          R = j.port2;
        j.port1.onmessage = function () {
          N = !1;
          var e = O,
            n = M;
          (O = null), (M = -1);
          var r = t.unstable_now(),
            i = !1;
          if (0 >= L - r) {
            if (!(-1 !== n && n <= r))
              return I || ((I = !0), x(U)), (O = e), void (M = n);
            i = !0;
          }
          if (null !== e) {
            z = !0;
            try {
              e(i);
            } finally {
              z = !1;
            }
          }
        };
        var U = function (e) {
          if (null !== O) {
            x(U);
            var t = e - L + D;
            t < D && A < D ? (8 > t && (t = 8), (D = t < A ? A : t)) : (A = t),
              (L = e + D),
              N || ((N = !0), R.postMessage(void 0));
          } else I = !1;
        };
        (k = function (e, t) {
          (O = e),
            (M = t),
            z || 0 > t ? R.postMessage(void 0) : I || ((I = !0), x(U));
        }),
          (_ = function () {
            (O = null), (N = !1), (M = -1);
          });
      }
      (t.unstable_ImmediatePriority = 1),
        (t.unstable_UserBlockingPriority = 2),
        (t.unstable_NormalPriority = 3),
        (t.unstable_IdlePriority = 5),
        (t.unstable_LowPriority = 4),
        (t.unstable_runWithPriority = function (e, n) {
          switch (e) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              break;
            default:
              e = 3;
          }
          var r = i,
            o = a;
          (i = e), (a = t.unstable_now());
          try {
            return n();
          } finally {
            (i = r), (a = o), d();
          }
        }),
        (t.unstable_scheduleCallback = function (e, r) {
          var o = -1 !== a ? a : t.unstable_now();
          if (
            "object" == typeof r &&
            null !== r &&
            "number" == typeof r.timeout
          )
            r = o + r.timeout;
          else
            switch (i) {
              case 1:
                r = o + -1;
                break;
              case 2:
                r = o + 250;
                break;
              case 5:
                r = o + 1073741823;
                break;
              case 4:
                r = o + 1e4;
                break;
              default:
                r = o + 5e3;
            }
          if (
            ((e = {
              callback: e,
              priorityLevel: i,
              expirationTime: r,
              next: null,
              previous: null,
            }),
            null === n)
          )
            (n = e.next = e.previous = e), s();
          else {
            o = null;
            var l = n;
            do {
              if (l.expirationTime > r) {
                o = l;
                break;
              }
              l = l.next;
            } while (l !== n);
            null === o ? (o = n) : o === n && ((n = e), s()),
              ((r = o.previous).next = o.previous = e),
              (e.next = o),
              (e.previous = r);
          }
          return e;
        }),
        (t.unstable_cancelCallback = function (e) {
          var t = e.next;
          if (null !== t) {
            if (t === e) n = null;
            else {
              e === n && (n = t);
              var r = e.previous;
              (r.next = t), (t.previous = r);
            }
            e.next = e.previous = null;
          }
        }),
        (t.unstable_wrapCallback = function (e) {
          var n = i;
          return function () {
            var r = i,
              o = a;
            (i = n), (a = t.unstable_now());
            try {
              return e.apply(this, arguments);
            } finally {
              (i = r), (a = o), d();
            }
          };
        }),
        (t.unstable_getCurrentPriorityLevel = function () {
          return i;
        }),
        (t.unstable_shouldYield = function () {
          return !r && ((null !== n && n.expirationTime < o) || E());
        }),
        (t.unstable_continueExecution = function () {
          null !== n && s();
        }),
        (t.unstable_pauseExecution = function () {}),
        (t.unstable_getFirstCallbackNode = function () {
          return n;
        });
    }.call(this, n(21)));
  },
  function (e, t) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (n = window);
    }
    e.exports = n;
  },
  function (e, t, n) {
    "use strict";
    var r = n(23);
    e.exports = function (e) {
      var t,
        n,
        a = [],
        o = 1;
      if ("string" == typeof e)
        if (r[e]) (a = r[e].slice()), (n = "rgb");
        else if ("transparent" === e) (o = 0), (n = "rgb"), (a = [0, 0, 0]);
        else if (/^#[A-Fa-f0-9]+$/.test(e)) {
          var l = (c = e.slice(1)).length;
          (o = 1),
            l <= 4
              ? ((a = [
                  parseInt(c[0] + c[0], 16),
                  parseInt(c[1] + c[1], 16),
                  parseInt(c[2] + c[2], 16),
                ]),
                4 === l && (o = parseInt(c[3] + c[3], 16) / 255))
              : ((a = [
                  parseInt(c[0] + c[1], 16),
                  parseInt(c[2] + c[3], 16),
                  parseInt(c[4] + c[5], 16),
                ]),
                8 === l && (o = parseInt(c[6] + c[7], 16) / 255)),
            a[0] || (a[0] = 0),
            a[1] || (a[1] = 0),
            a[2] || (a[2] = 0),
            (n = "rgb");
        } else if (
          (t =
            /^((?:rgb|hs[lvb]|hwb|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms)a?)\s*\(([^\)]*)\)/.exec(
              e
            ))
        ) {
          var u = t[1],
            s = "rgb" === u,
            c = u.replace(/a$/, "");
          n = c;
          l = "cmyk" === c ? 4 : "gray" === c ? 1 : 3;
          (a = t[2]
            .trim()
            .split(/\s*[,\/]\s*|\s+/)
            .map(function (e, t) {
              if (/%$/.test(e))
                return t === l
                  ? parseFloat(e) / 100
                  : "rgb" === c
                  ? (255 * parseFloat(e)) / 100
                  : parseFloat(e);
              if ("h" === c[t]) {
                if (/deg$/.test(e)) return parseFloat(e);
                if (void 0 !== i[e]) return i[e];
              }
              return parseFloat(e);
            })),
            u === c && a.push(1),
            (o = s ? 1 : void 0 === a[l] ? 1 : a[l]),
            (a = a.slice(0, l));
        } else
          e.length > 10 &&
            /[0-9](?:\s|\/)/.test(e) &&
            ((a = e.match(/([0-9]+)/g).map(function (e) {
              return parseFloat(e);
            })),
            (n = e
              .match(/([a-z])/gi)
              .join("")
              .toLowerCase()));
      else
        isNaN(e)
          ? Array.isArray(e) || e.length
            ? ((a = [e[0], e[1], e[2]]),
              (n = "rgb"),
              (o = 4 === e.length ? e[3] : 1))
            : e instanceof Object &&
              (null != e.r || null != e.red || null != e.R
                ? ((n = "rgb"),
                  (a = [
                    e.r || e.red || e.R || 0,
                    e.g || e.green || e.G || 0,
                    e.b || e.blue || e.B || 0,
                  ]))
                : ((n = "hsl"),
                  (a = [
                    e.h || e.hue || e.H || 0,
                    e.s || e.saturation || e.S || 0,
                    e.l || e.lightness || e.L || e.b || e.brightness,
                  ])),
              (o = e.a || e.alpha || e.opacity || 1),
              null != e.opacity && (o /= 100))
          : ((n = "rgb"), (a = [e >>> 16, (65280 & e) >>> 8, 255 & e]));
      return { space: n, values: a, alpha: o };
    };
    var i = {
      red: 0,
      orange: 60,
      yellow: 120,
      green: 180,
      blue: 240,
      purple: 300,
    };
  },
  function (e, t, n) {
    "use strict";
    e.exports = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 134, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 250, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 221],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [112, 128, 144],
      slategrey: [112, 128, 144],
      snow: [255, 250, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 50],
    };
  },
  function (e, t, n) {
    "use strict";
    var r = n(25);
    (e.exports = {
      name: "hsl",
      min: [0, 0, 0],
      max: [360, 100, 100],
      channel: ["hue", "saturation", "lightness"],
      alias: ["HSL"],
      rgb: function (e) {
        var t,
          n,
          r,
          i,
          a,
          o = e[0] / 360,
          l = e[1] / 100,
          u = e[2] / 100;
        if (0 === l) return [(a = 255 * u), a, a];
        (t = 2 * u - (n = u < 0.5 ? u * (1 + l) : u + l - u * l)),
          (i = [0, 0, 0]);
        for (var s = 0; s < 3; s++)
          (r = o + (1 / 3) * -(s - 1)) < 0 ? r++ : r > 1 && r--,
            (a =
              6 * r < 1
                ? t + 6 * (n - t) * r
                : 2 * r < 1
                ? n
                : 3 * r < 2
                ? t + (n - t) * (2 / 3 - r) * 6
                : t),
            (i[s] = 255 * a);
        return i;
      },
    }),
      (r.hsl = function (e) {
        var t,
          n,
          r = e[0] / 255,
          i = e[1] / 255,
          a = e[2] / 255,
          o = Math.min(r, i, a),
          l = Math.max(r, i, a),
          u = l - o;
        return (
          l === o
            ? (t = 0)
            : r === l
            ? (t = (i - a) / u)
            : i === l
            ? (t = 2 + (a - r) / u)
            : a === l && (t = 4 + (r - i) / u),
          (t = Math.min(60 * t, 360)) < 0 && (t += 360),
          (n = (o + l) / 2),
          [
            t,
            100 * (l === o ? 0 : n <= 0.5 ? u / (l + o) : u / (2 - l - o)),
            100 * n,
          ]
        );
      });
  },
  function (e, t, n) {
    "use strict";
    e.exports = {
      name: "rgb",
      min: [0, 0, 0],
      max: [255, 255, 255],
      channel: ["red", "green", "blue"],
      alias: ["RGB"],
    };
  },
  function (e, t) {
    e.exports = function (e, t, n) {
      return t < n ? (e < t ? t : e > n ? n : e) : e < n ? n : e > t ? t : e;
    };
  },
  function (e, t) {
    e.exports = {
      jet: [
        { index: 0, rgb: [0, 0, 131] },
        { index: 0.125, rgb: [0, 60, 170] },
        { index: 0.375, rgb: [5, 255, 255] },
        { index: 0.625, rgb: [255, 255, 0] },
        { index: 0.875, rgb: [250, 0, 0] },
        { index: 1, rgb: [128, 0, 0] },
      ],
      hsv: [
        { index: 0, rgb: [255, 0, 0] },
        { index: 0.169, rgb: [253, 255, 2] },
        { index: 0.173, rgb: [247, 255, 2] },
        { index: 0.337, rgb: [0, 252, 4] },
        { index: 0.341, rgb: [0, 252, 10] },
        { index: 0.506, rgb: [1, 249, 255] },
        { index: 0.671, rgb: [2, 0, 253] },
        { index: 0.675, rgb: [8, 0, 253] },
        { index: 0.839, rgb: [255, 0, 251] },
        { index: 0.843, rgb: [255, 0, 245] },
        { index: 1, rgb: [255, 0, 6] },
      ],
      hot: [
        { index: 0, rgb: [0, 0, 0] },
        { index: 0.3, rgb: [230, 0, 0] },
        { index: 0.6, rgb: [255, 210, 0] },
        { index: 1, rgb: [255, 255, 255] },
      ],
      spring: [
        { index: 0, rgb: [255, 0, 255] },
        { index: 1, rgb: [255, 255, 0] },
      ],
      summer: [
        { index: 0, rgb: [0, 128, 102] },
        { index: 1, rgb: [255, 255, 102] },
      ],
      autumn: [
        { index: 0, rgb: [255, 0, 0] },
        { index: 1, rgb: [255, 255, 0] },
      ],
      winter: [
        { index: 0, rgb: [0, 0, 255] },
        { index: 1, rgb: [0, 255, 128] },
      ],
      bone: [
        { index: 0, rgb: [0, 0, 0] },
        { index: 0.376, rgb: [84, 84, 116] },
        { index: 0.753, rgb: [169, 200, 200] },
        { index: 1, rgb: [255, 255, 255] },
      ],
      copper: [
        { index: 0, rgb: [0, 0, 0] },
        { index: 0.804, rgb: [255, 160, 102] },
        { index: 1, rgb: [255, 199, 127] },
      ],
      greys: [
        { index: 0, rgb: [0, 0, 0] },
        { index: 1, rgb: [255, 255, 255] },
      ],
      yignbu: [
        { index: 0, rgb: [8, 29, 88] },
        { index: 0.125, rgb: [37, 52, 148] },
        { index: 0.25, rgb: [34, 94, 168] },
        { index: 0.375, rgb: [29, 145, 192] },
        { index: 0.5, rgb: [65, 182, 196] },
        { index: 0.625, rgb: [127, 205, 187] },
        { index: 0.75, rgb: [199, 233, 180] },
        { index: 0.875, rgb: [237, 248, 217] },
        { index: 1, rgb: [255, 255, 217] },
      ],
      greens: [
        { index: 0, rgb: [0, 68, 27] },
        { index: 0.125, rgb: [0, 109, 44] },
        { index: 0.25, rgb: [35, 139, 69] },
        { index: 0.375, rgb: [65, 171, 93] },
        { index: 0.5, rgb: [116, 196, 118] },
        { index: 0.625, rgb: [161, 217, 155] },
        { index: 0.75, rgb: [199, 233, 192] },
        { index: 0.875, rgb: [229, 245, 224] },
        { index: 1, rgb: [247, 252, 245] },
      ],
      yiorrd: [
        { index: 0, rgb: [128, 0, 38] },
        { index: 0.125, rgb: [189, 0, 38] },
        { index: 0.25, rgb: [227, 26, 28] },
        { index: 0.375, rgb: [252, 78, 42] },
        { index: 0.5, rgb: [253, 141, 60] },
        { index: 0.625, rgb: [254, 178, 76] },
        { index: 0.75, rgb: [254, 217, 118] },
        { index: 0.875, rgb: [255, 237, 160] },
        { index: 1, rgb: [255, 255, 204] },
      ],
      bluered: [
        { index: 0, rgb: [0, 0, 255] },
        { index: 1, rgb: [255, 0, 0] },
      ],
      rdbu: [
        { index: 0, rgb: [5, 10, 172] },
        { index: 0.35, rgb: [106, 137, 247] },
        { index: 0.5, rgb: [190, 190, 190] },
        { index: 0.6, rgb: [220, 170, 132] },
        { index: 0.7, rgb: [230, 145, 90] },
        { index: 1, rgb: [178, 10, 28] },
      ],
      picnic: [
        { index: 0, rgb: [0, 0, 255] },
        { index: 0.1, rgb: [51, 153, 255] },
        { index: 0.2, rgb: [102, 204, 255] },
        { index: 0.3, rgb: [153, 204, 255] },
        { index: 0.4, rgb: [204, 204, 255] },
        { index: 0.5, rgb: [255, 255, 255] },
        { index: 0.6, rgb: [255, 204, 255] },
        { index: 0.7, rgb: [255, 153, 255] },
        { index: 0.8, rgb: [255, 102, 204] },
        { index: 0.9, rgb: [255, 102, 102] },
        { index: 1, rgb: [255, 0, 0] },
      ],
      rainbow: [
        { index: 0, rgb: [150, 0, 90] },
        { index: 0.125, rgb: [0, 0, 200] },
        { index: 0.25, rgb: [0, 25, 255] },
        { index: 0.375, rgb: [0, 152, 255] },
        { index: 0.5, rgb: [44, 255, 150] },
        { index: 0.625, rgb: [151, 255, 0] },
        { index: 0.75, rgb: [255, 234, 0] },
        { index: 0.875, rgb: [255, 111, 0] },
        { index: 1, rgb: [255, 0, 0] },
      ],
      portland: [
        { index: 0, rgb: [12, 51, 131] },
        { index: 0.25, rgb: [10, 136, 186] },
        { index: 0.5, rgb: [242, 211, 56] },
        { index: 0.75, rgb: [242, 143, 56] },
        { index: 1, rgb: [217, 30, 30] },
      ],
      blackbody: [
        { index: 0, rgb: [0, 0, 0] },
        { index: 0.2, rgb: [230, 0, 0] },
        { index: 0.4, rgb: [230, 210, 0] },
        { index: 0.7, rgb: [255, 255, 255] },
        { index: 1, rgb: [160, 200, 255] },
      ],
      earth: [
        { index: 0, rgb: [0, 0, 130] },
        { index: 0.1, rgb: [0, 180, 180] },
        { index: 0.2, rgb: [40, 210, 40] },
        { index: 0.4, rgb: [230, 230, 50] },
        { index: 0.6, rgb: [120, 70, 20] },
        { index: 1, rgb: [255, 255, 255] },
      ],
      electric: [
        { index: 0, rgb: [0, 0, 0] },
        { index: 0.15, rgb: [30, 0, 100] },
        { index: 0.4, rgb: [120, 0, 100] },
        { index: 0.6, rgb: [160, 90, 0] },
        { index: 0.8, rgb: [230, 200, 0] },
        { index: 1, rgb: [255, 250, 220] },
      ],
      alpha: [
        { index: 0, rgb: [255, 255, 255, 0] },
        { index: 1, rgb: [255, 255, 255, 1] },
      ],
      viridis: [
        { index: 0, rgb: [68, 1, 84] },
        { index: 0.13, rgb: [71, 44, 122] },
        { index: 0.25, rgb: [59, 81, 139] },
        { index: 0.38, rgb: [44, 113, 142] },
        { index: 0.5, rgb: [33, 144, 141] },
        { index: 0.63, rgb: [39, 173, 129] },
        { index: 0.75, rgb: [92, 200, 99] },
        { index: 0.88, rgb: [170, 220, 50] },
        { index: 1, rgb: [253, 231, 37] },
      ],
      inferno: [
        { index: 0, rgb: [0, 0, 4] },
        { index: 0.13, rgb: [31, 12, 72] },
        { index: 0.25, rgb: [85, 15, 109] },
        { index: 0.38, rgb: [136, 34, 106] },
        { index: 0.5, rgb: [186, 54, 85] },
        { index: 0.63, rgb: [227, 89, 51] },
        { index: 0.75, rgb: [249, 140, 10] },
        { index: 0.88, rgb: [249, 201, 50] },
        { index: 1, rgb: [252, 255, 164] },
      ],
      magma: [
        { index: 0, rgb: [0, 0, 4] },
        { index: 0.13, rgb: [28, 16, 68] },
        { index: 0.25, rgb: [79, 18, 123] },
        { index: 0.38, rgb: [129, 37, 129] },
        { index: 0.5, rgb: [181, 54, 122] },
        { index: 0.63, rgb: [229, 80, 100] },
        { index: 0.75, rgb: [251, 135, 97] },
        { index: 0.88, rgb: [254, 194, 135] },
        { index: 1, rgb: [252, 253, 191] },
      ],
      plasma: [
        { index: 0, rgb: [13, 8, 135] },
        { index: 0.13, rgb: [75, 3, 161] },
        { index: 0.25, rgb: [125, 3, 168] },
        { index: 0.38, rgb: [168, 34, 150] },
        { index: 0.5, rgb: [203, 70, 121] },
        { index: 0.63, rgb: [229, 107, 93] },
        { index: 0.75, rgb: [248, 148, 65] },
        { index: 0.88, rgb: [253, 195, 40] },
        { index: 1, rgb: [240, 249, 33] },
      ],
      warm: [
        { index: 0, rgb: [125, 0, 179] },
        { index: 0.13, rgb: [172, 0, 187] },
        { index: 0.25, rgb: [219, 0, 170] },
        { index: 0.38, rgb: [255, 0, 130] },
        { index: 0.5, rgb: [255, 63, 74] },
        { index: 0.63, rgb: [255, 123, 0] },
        { index: 0.75, rgb: [234, 176, 0] },
        { index: 0.88, rgb: [190, 228, 0] },
        { index: 1, rgb: [147, 255, 0] },
      ],
      cool: [
        { index: 0, rgb: [125, 0, 179] },
        { index: 0.13, rgb: [116, 0, 218] },
        { index: 0.25, rgb: [98, 74, 237] },
        { index: 0.38, rgb: [68, 146, 231] },
        { index: 0.5, rgb: [0, 204, 197] },
        { index: 0.63, rgb: [0, 247, 146] },
        { index: 0.75, rgb: [0, 255, 88] },
        { index: 0.88, rgb: [40, 255, 8] },
        { index: 1, rgb: [147, 255, 0] },
      ],
      "rainbow-soft": [
        { index: 0, rgb: [125, 0, 179] },
        { index: 0.1, rgb: [199, 0, 180] },
        { index: 0.2, rgb: [255, 0, 121] },
        { index: 0.3, rgb: [255, 108, 0] },
        { index: 0.4, rgb: [222, 194, 0] },
        { index: 0.5, rgb: [150, 255, 0] },
        { index: 0.6, rgb: [0, 255, 55] },
        { index: 0.7, rgb: [0, 246, 150] },
        { index: 0.8, rgb: [50, 167, 222] },
        { index: 0.9, rgb: [103, 51, 235] },
        { index: 1, rgb: [124, 0, 186] },
      ],
      bathymetry: [
        { index: 0, rgb: [40, 26, 44] },
        { index: 0.13, rgb: [59, 49, 90] },
        { index: 0.25, rgb: [64, 76, 139] },
        { index: 0.38, rgb: [63, 110, 151] },
        { index: 0.5, rgb: [72, 142, 158] },
        { index: 0.63, rgb: [85, 174, 163] },
        { index: 0.75, rgb: [120, 206, 163] },
        { index: 0.88, rgb: [187, 230, 172] },
        { index: 1, rgb: [253, 254, 204] },
      ],
      cdom: [
        { index: 0, rgb: [47, 15, 62] },
        { index: 0.13, rgb: [87, 23, 86] },
        { index: 0.25, rgb: [130, 28, 99] },
        { index: 0.38, rgb: [171, 41, 96] },
        { index: 0.5, rgb: [206, 67, 86] },
        { index: 0.63, rgb: [230, 106, 84] },
        { index: 0.75, rgb: [242, 149, 103] },
        { index: 0.88, rgb: [249, 193, 135] },
        { index: 1, rgb: [254, 237, 176] },
      ],
      chlorophyll: [
        { index: 0, rgb: [18, 36, 20] },
        { index: 0.13, rgb: [25, 63, 41] },
        { index: 0.25, rgb: [24, 91, 59] },
        { index: 0.38, rgb: [13, 119, 72] },
        { index: 0.5, rgb: [18, 148, 80] },
        { index: 0.63, rgb: [80, 173, 89] },
        { index: 0.75, rgb: [132, 196, 122] },
        { index: 0.88, rgb: [175, 221, 162] },
        { index: 1, rgb: [215, 249, 208] },
      ],
      density: [
        { index: 0, rgb: [54, 14, 36] },
        { index: 0.13, rgb: [89, 23, 80] },
        { index: 0.25, rgb: [110, 45, 132] },
        { index: 0.38, rgb: [120, 77, 178] },
        { index: 0.5, rgb: [120, 113, 213] },
        { index: 0.63, rgb: [115, 151, 228] },
        { index: 0.75, rgb: [134, 185, 227] },
        { index: 0.88, rgb: [177, 214, 227] },
        { index: 1, rgb: [230, 241, 241] },
      ],
      "freesurface-blue": [
        { index: 0, rgb: [30, 4, 110] },
        { index: 0.13, rgb: [47, 14, 176] },
        { index: 0.25, rgb: [41, 45, 236] },
        { index: 0.38, rgb: [25, 99, 212] },
        { index: 0.5, rgb: [68, 131, 200] },
        { index: 0.63, rgb: [114, 156, 197] },
        { index: 0.75, rgb: [157, 181, 203] },
        { index: 0.88, rgb: [200, 208, 216] },
        { index: 1, rgb: [241, 237, 236] },
      ],
      "freesurface-red": [
        { index: 0, rgb: [60, 9, 18] },
        { index: 0.13, rgb: [100, 17, 27] },
        { index: 0.25, rgb: [142, 20, 29] },
        { index: 0.38, rgb: [177, 43, 27] },
        { index: 0.5, rgb: [192, 87, 63] },
        { index: 0.63, rgb: [205, 125, 105] },
        { index: 0.75, rgb: [216, 162, 148] },
        { index: 0.88, rgb: [227, 199, 193] },
        { index: 1, rgb: [241, 237, 236] },
      ],
      oxygen: [
        { index: 0, rgb: [64, 5, 5] },
        { index: 0.13, rgb: [106, 6, 15] },
        { index: 0.25, rgb: [144, 26, 7] },
        { index: 0.38, rgb: [168, 64, 3] },
        { index: 0.5, rgb: [188, 100, 4] },
        { index: 0.63, rgb: [206, 136, 11] },
        { index: 0.75, rgb: [220, 174, 25] },
        { index: 0.88, rgb: [231, 215, 44] },
        { index: 1, rgb: [248, 254, 105] },
      ],
      par: [
        { index: 0, rgb: [51, 20, 24] },
        { index: 0.13, rgb: [90, 32, 35] },
        { index: 0.25, rgb: [129, 44, 34] },
        { index: 0.38, rgb: [159, 68, 25] },
        { index: 0.5, rgb: [182, 99, 19] },
        { index: 0.63, rgb: [199, 134, 22] },
        { index: 0.75, rgb: [212, 171, 35] },
        { index: 0.88, rgb: [221, 210, 54] },
        { index: 1, rgb: [225, 253, 75] },
      ],
      phase: [
        { index: 0, rgb: [145, 105, 18] },
        { index: 0.13, rgb: [184, 71, 38] },
        { index: 0.25, rgb: [186, 58, 115] },
        { index: 0.38, rgb: [160, 71, 185] },
        { index: 0.5, rgb: [110, 97, 218] },
        { index: 0.63, rgb: [50, 123, 164] },
        { index: 0.75, rgb: [31, 131, 110] },
        { index: 0.88, rgb: [77, 129, 34] },
        { index: 1, rgb: [145, 105, 18] },
      ],
      salinity: [
        { index: 0, rgb: [42, 24, 108] },
        { index: 0.13, rgb: [33, 50, 162] },
        { index: 0.25, rgb: [15, 90, 145] },
        { index: 0.38, rgb: [40, 118, 137] },
        { index: 0.5, rgb: [59, 146, 135] },
        { index: 0.63, rgb: [79, 175, 126] },
        { index: 0.75, rgb: [120, 203, 104] },
        { index: 0.88, rgb: [193, 221, 100] },
        { index: 1, rgb: [253, 239, 154] },
      ],
      temperature: [
        { index: 0, rgb: [4, 35, 51] },
        { index: 0.13, rgb: [23, 51, 122] },
        { index: 0.25, rgb: [85, 59, 157] },
        { index: 0.38, rgb: [129, 79, 143] },
        { index: 0.5, rgb: [175, 95, 130] },
        { index: 0.63, rgb: [222, 112, 101] },
        { index: 0.75, rgb: [249, 146, 66] },
        { index: 0.88, rgb: [249, 196, 65] },
        { index: 1, rgb: [232, 250, 91] },
      ],
      turbidity: [
        { index: 0, rgb: [34, 31, 27] },
        { index: 0.13, rgb: [65, 50, 41] },
        { index: 0.25, rgb: [98, 69, 52] },
        { index: 0.38, rgb: [131, 89, 57] },
        { index: 0.5, rgb: [161, 112, 59] },
        { index: 0.63, rgb: [185, 140, 66] },
        { index: 0.75, rgb: [202, 174, 88] },
        { index: 0.88, rgb: [216, 209, 126] },
        { index: 1, rgb: [233, 246, 171] },
      ],
      "velocity-blue": [
        { index: 0, rgb: [17, 32, 64] },
        { index: 0.13, rgb: [35, 52, 116] },
        { index: 0.25, rgb: [29, 81, 156] },
        { index: 0.38, rgb: [31, 113, 162] },
        { index: 0.5, rgb: [50, 144, 169] },
        { index: 0.63, rgb: [87, 173, 176] },
        { index: 0.75, rgb: [149, 196, 189] },
        { index: 0.88, rgb: [203, 221, 211] },
        { index: 1, rgb: [254, 251, 230] },
      ],
      "velocity-green": [
        { index: 0, rgb: [23, 35, 19] },
        { index: 0.13, rgb: [24, 64, 38] },
        { index: 0.25, rgb: [11, 95, 45] },
        { index: 0.38, rgb: [39, 123, 35] },
        { index: 0.5, rgb: [95, 146, 12] },
        { index: 0.63, rgb: [152, 165, 18] },
        { index: 0.75, rgb: [201, 186, 69] },
        { index: 0.88, rgb: [233, 216, 137] },
        { index: 1, rgb: [255, 253, 205] },
      ],
      cubehelix: [
        { index: 0, rgb: [0, 0, 0] },
        { index: 0.07, rgb: [22, 5, 59] },
        { index: 0.13, rgb: [60, 4, 105] },
        { index: 0.2, rgb: [109, 1, 135] },
        { index: 0.27, rgb: [161, 0, 147] },
        { index: 0.33, rgb: [210, 2, 142] },
        { index: 0.4, rgb: [251, 11, 123] },
        { index: 0.47, rgb: [255, 29, 97] },
        { index: 0.53, rgb: [255, 54, 69] },
        { index: 0.6, rgb: [255, 85, 46] },
        { index: 0.67, rgb: [255, 120, 34] },
        { index: 0.73, rgb: [255, 157, 37] },
        { index: 0.8, rgb: [241, 191, 57] },
        { index: 0.87, rgb: [224, 220, 93] },
        { index: 0.93, rgb: [218, 241, 142] },
        { index: 1, rgb: [227, 253, 198] },
      ],
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    const r = n(29);
    function i(e, t, n = 32) {
      const r = 1 / n,
        i = [];
      return (
        (function e(n, a, o) {
          if (
            o - a > r &&
            !(function ([e, t, n, r, i, a, o, l], u) {
              const s = 3 * n - 2 * e - o,
                c = 3 * r - 2 * t - l,
                d = 3 * i - 2 * o - e,
                p = 3 * a - 2 * l - t;
              return (
                Math.max(s * s, d * d) + Math.max(c * c, p * p) <= 16 * u * u
              );
            })(n, t)
          ) {
            const t = (function ([e, t, n, r, i, a, o, l], u) {
                void 0 === u && (u = 0.5);
                let s = 1 - u,
                  c = s * e + u * n,
                  d = s * t + u * r,
                  p = s * n + u * i,
                  f = s * r + u * a,
                  h = s * i + u * o,
                  m = s * a + u * l,
                  g = s * c + u * p,
                  v = s * d + u * f,
                  b = s * p + u * h,
                  y = s * f + u * m,
                  x = s * g + u * b,
                  w = s * v + u * y;
                return [
                  [e, t, c, d, g, v, x, w],
                  [x, w, b, y, h, m, o, l],
                ];
              })(n, 0.5),
              r = (a + o) / 2;
            e(t[0], a, r), e(t[1], r, o);
          } else {
            const e = n[6] - n[0],
              t = n[7] - n[1];
            Math.sqrt(e * e + t * t) > 0 && i.push(n);
          }
        })(e, 0, 1),
        i
      );
    }
    function a(e) {
      if (!e) return null;
      const t = e.getAttribute("stroke") || e.style.stroke;
      return (
        t ||
        (e !== e.ownerSVGElement && e.ownerSVGElement && e.parentNode
          ? a(e.parentNode)
          : null)
      );
    }
    function o(e) {
      return e
        ? e.id && "g" === e.nodeName.toLowerCase()
          ? e.id
          : e.parentNode
          ? o(e.parentNode)
          : null
        : null;
    }
    t.flattenSVG = function (e, t = {}) {
      const { maxError: n = 0.1 } = t,
        l = e.createSVGPoint(),
        u = [];
      for (const t of (function* e(t) {
        switch (t.nodeName.toLowerCase()) {
          case "svg":
          case "g":
          case "a":
            for (const n of t.children) yield* e(n);
            break;
          case "rect":
          case "circle":
          case "ellipse":
          case "path":
          case "line":
          case "polyline":
          case "polygon":
            yield t;
        }
      })(e)) {
        const e = t.getCTM(),
          s =
            null == e
              ? ([e, t]) => [e, t]
              : ([t, n]) => {
                  (l.x = t), (l.y = n);
                  const r = l.matrixTransform(e);
                  return [r.x, r.y];
                },
          c = r.getPathData(t, { normalize: !0 });
        let d = null,
          p = null;
        for (const e of c)
          if ("M" === e.type)
            (d = s(e.values)),
              (p = d),
              u.push({ points: [d], stroke: a(t), groupId: o(t) });
          else if ("L" === e.type)
            (d = s(e.values)), u[u.length - 1].points.push(d);
          else if ("C" === e.type) {
            const [t, r, a, o, l, c] = e.values,
              [p, f] = d,
              [h, m] = s([t, r]),
              [g, v] = s([a, o]),
              [b, y] = s([l, c]),
              x = i([p, f, h, m, g, v, b, y], n);
            for (const e of x) u[u.length - 1].points.push([e[6], e[7]]);
            d = [b, y];
          } else if ("A" === e.type) {
            const [t, r, i, a, o, l, s] = e.values,
              c = i,
              p = o,
              f = a,
              {
                cos: h,
                sin: m,
                atan2: g,
                sqrt: v,
                sign: b,
                acos: y,
                abs: x,
                ceil: w,
              } = Math,
              k = (d[0] - l) / 2,
              _ = (d[1] - s) / 2,
              E = h(c) * k + m(c) * _,
              T = -m(c) * k + h(c) * _,
              S = E * E,
              C = T * T,
              P = S / (t * t) + C / (r * r),
              O = P <= 1 ? v(P) * t : t,
              N = P <= 1 ? v(P) * r : r,
              M = O * O,
              I = N * N;
            let z = (M * I - M * C - I * S) / (M * C + I * S);
            if ((x(z) < 1e-4 && (z = 0), z < 0))
              throw new Error(`bad arc args ${z}`);
            const L = (f === p ? -1 : 1) * v(z),
              A = (L * O * T) / N,
              D = (L * -N * E) / O,
              j = h(c) * A - m(c) * D + (d[0] + l) / 2,
              R = m(c) * A + h(c) * D + (d[1] + s) / 2,
              U = (e, t, n, r) => g(e * r - t * n, e * n + t * r),
              F = U(1, 0, (E - A) / O, (T - D) / N),
              $ =
                U((E - A) / O, (T - D) / N, (-E - A) / O, (-T - D) / N) %
                (2 * Math.PI),
              V =
                0 === p && $ > 0
                  ? $ - 2 * Math.PI
                  : 1 === p && $ < 0
                  ? $ + 2 * Math.PI
                  : $,
              W = n,
              H = w(x(V) / y(1 - W / O));
            for (let e = 1; e <= H; e++) {
              const t = F + (V * e) / H,
                n = h(c) * O * h(t) - m(c) * N * m(t) + j,
                r = m(c) * O * h(t) + h(c) * N * m(t) + R;
              u[u.length - 1].points.push([n, r]);
            }
            d = [l, s];
          } else {
            if ("Z" !== e.type) throw Error(`Unexpected path command: "${e}"`);
            !p ||
              (d[0] === p[0] && d[1] === p[1]) ||
              u[u.length - 1].points.push(p);
          }
      }
      return u;
    };
  },
  function (e, t) {
    // @license
    const n = {
        Z: "Z",
        M: "M",
        L: "L",
        C: "C",
        Q: "Q",
        A: "A",
        H: "H",
        V: "V",
        S: "S",
        T: "T",
        z: "Z",
        m: "m",
        l: "l",
        c: "c",
        q: "q",
        a: "a",
        h: "h",
        v: "v",
        s: "s",
        t: "t",
      },
      r = function (e) {
        (this._string = e),
          (this._currentIndex = 0),
          (this._endIndex = this._string.length),
          (this._prevCommand = null),
          this._skipOptionalSpaces();
      };
    r.prototype = {
      parseSegment: function () {
        var e = this._string[this._currentIndex],
          t = n[e] ? n[e] : null;
        if (null === t) {
          if (null === this._prevCommand) return null;
          if (
            null ===
            (t =
              ("+" === e || "-" === e || "." === e || (e >= "0" && e <= "9")) &&
              "Z" !== this._prevCommand
                ? "M" === this._prevCommand
                  ? "L"
                  : "m" === this._prevCommand
                  ? "l"
                  : this._prevCommand
                : null)
          )
            return null;
        } else this._currentIndex += 1;
        this._prevCommand = t;
        var r = null,
          i = t.toUpperCase();
        return (
          "H" === i || "V" === i
            ? (r = [this._parseNumber()])
            : "M" === i || "L" === i || "T" === i
            ? (r = [this._parseNumber(), this._parseNumber()])
            : "S" === i || "Q" === i
            ? (r = [
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber(),
              ])
            : "C" === i
            ? (r = [
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber(),
              ])
            : "A" === i
            ? (r = [
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber(),
                this._parseArcFlag(),
                this._parseArcFlag(),
                this._parseNumber(),
                this._parseNumber(),
              ])
            : "Z" === i && (this._skipOptionalSpaces(), (r = [])),
          null === r || r.indexOf(null) >= 0 ? null : { type: t, values: r }
        );
      },
      hasMoreData: function () {
        return this._currentIndex < this._endIndex;
      },
      peekSegmentType: function () {
        var e = this._string[this._currentIndex];
        return n[e] ? n[e] : null;
      },
      initialCommandIsMoveTo: function () {
        if (!this.hasMoreData()) return !0;
        var e = this.peekSegmentType();
        return "M" === e || "m" === e;
      },
      _isCurrentSpace: function () {
        var e = this._string[this._currentIndex];
        return (
          e <= " " &&
          (" " === e || "\n" === e || "\t" === e || "\r" === e || "\f" === e)
        );
      },
      _skipOptionalSpaces: function () {
        for (; this._currentIndex < this._endIndex && this._isCurrentSpace(); )
          this._currentIndex += 1;
        return this._currentIndex < this._endIndex;
      },
      _skipOptionalSpacesOrDelimiter: function () {
        return (
          !(
            this._currentIndex < this._endIndex &&
            !this._isCurrentSpace() &&
            "," !== this._string[this._currentIndex]
          ) &&
          (this._skipOptionalSpaces() &&
            this._currentIndex < this._endIndex &&
            "," === this._string[this._currentIndex] &&
            ((this._currentIndex += 1), this._skipOptionalSpaces()),
          this._currentIndex < this._endIndex)
        );
      },
      _parseNumber: function () {
        var e = 0,
          t = 0,
          n = 1,
          r = 0,
          i = 1,
          a = 1,
          o = this._currentIndex;
        if (
          (this._skipOptionalSpaces(),
          this._currentIndex < this._endIndex &&
          "+" === this._string[this._currentIndex]
            ? (this._currentIndex += 1)
            : this._currentIndex < this._endIndex &&
              "-" === this._string[this._currentIndex] &&
              ((this._currentIndex += 1), (i = -1)),
          this._currentIndex === this._endIndex ||
            ((this._string[this._currentIndex] < "0" ||
              this._string[this._currentIndex] > "9") &&
              "." !== this._string[this._currentIndex]))
        )
          return null;
        for (
          var l = this._currentIndex;
          this._currentIndex < this._endIndex &&
          this._string[this._currentIndex] >= "0" &&
          this._string[this._currentIndex] <= "9";

        )
          this._currentIndex += 1;
        if (this._currentIndex !== l)
          for (var u = this._currentIndex - 1, s = 1; u >= l; )
            (t += s * (this._string[u] - "0")), (u -= 1), (s *= 10);
        if (
          this._currentIndex < this._endIndex &&
          "." === this._string[this._currentIndex]
        ) {
          if (
            ((this._currentIndex += 1),
            this._currentIndex >= this._endIndex ||
              this._string[this._currentIndex] < "0" ||
              this._string[this._currentIndex] > "9")
          )
            return null;
          for (
            ;
            this._currentIndex < this._endIndex &&
            this._string[this._currentIndex] >= "0" &&
            this._string[this._currentIndex] <= "9";

          )
            (n *= 10),
              (r += (this._string.charAt(this._currentIndex) - "0") / n),
              (this._currentIndex += 1);
        }
        if (
          this._currentIndex !== o &&
          this._currentIndex + 1 < this._endIndex &&
          ("e" === this._string[this._currentIndex] ||
            "E" === this._string[this._currentIndex]) &&
          "x" !== this._string[this._currentIndex + 1] &&
          "m" !== this._string[this._currentIndex + 1]
        ) {
          if (
            ((this._currentIndex += 1),
            "+" === this._string[this._currentIndex]
              ? (this._currentIndex += 1)
              : "-" === this._string[this._currentIndex] &&
                ((this._currentIndex += 1), (a = -1)),
            this._currentIndex >= this._endIndex ||
              this._string[this._currentIndex] < "0" ||
              this._string[this._currentIndex] > "9")
          )
            return null;
          for (
            ;
            this._currentIndex < this._endIndex &&
            this._string[this._currentIndex] >= "0" &&
            this._string[this._currentIndex] <= "9";

          )
            (e *= 10),
              (e += this._string[this._currentIndex] - "0"),
              (this._currentIndex += 1);
        }
        var c = t + r;
        return (
          (c *= i),
          e && (c *= Math.pow(10, a * e)),
          o === this._currentIndex
            ? null
            : (this._skipOptionalSpacesOrDelimiter(), c)
        );
      },
      _parseArcFlag: function () {
        if (this._currentIndex >= this._endIndex) return null;
        var e = null,
          t = this._string[this._currentIndex];
        if (((this._currentIndex += 1), "0" === t)) e = 0;
        else {
          if ("1" !== t) return null;
          e = 1;
        }
        return this._skipOptionalSpacesOrDelimiter(), e;
      },
    };
    const i = function (e) {
        if (!e || 0 === e.length) return [];
        var t = new r(e),
          n = [];
        if (t.initialCommandIsMoveTo())
          for (; t.hasMoreData(); ) {
            var i = t.parseSegment();
            if (null === i) break;
            n.push(i);
          }
        return n;
      },
      a = "undefined" != typeof Symbol ? Symbol() : "__cachedPathData",
      o =
        "undefined" != typeof Symbol ? Symbol() : "__cachedNormalizedPathData";
    var l = function (e, t, n, r, i, a, o, u, s, c) {
        var d,
          p,
          f,
          h,
          m,
          g = function (e, t, n) {
            return {
              x: e * Math.cos(n) - t * Math.sin(n),
              y: e * Math.sin(n) + t * Math.cos(n),
            };
          },
          v = ((d = o), (Math.PI * d) / 180),
          b = [];
        if (c) (p = c[0]), (f = c[1]), (h = c[2]), (m = c[3]);
        else {
          var y = g(e, t, -v);
          (e = y.x), (t = y.y);
          var x = g(n, r, -v),
            w = (e - (n = x.x)) / 2,
            k = (t - (r = x.y)) / 2,
            _ = (w * w) / (i * i) + (k * k) / (a * a);
          _ > 1 && ((i *= _ = Math.sqrt(_)), (a *= _));
          var E = i * i,
            T = a * a,
            S = E * T - E * k * k - T * w * w,
            C = E * k * k + T * w * w,
            P = (u === s ? -1 : 1) * Math.sqrt(Math.abs(S / C));
          (h = (P * i * k) / a + (e + n) / 2),
            (m = (P * -a * w) / i + (t + r) / 2),
            (p = Math.asin(parseFloat(((t - m) / a).toFixed(9)))),
            (f = Math.asin(parseFloat(((r - m) / a).toFixed(9)))),
            e < h && (p = Math.PI - p),
            n < h && (f = Math.PI - f),
            p < 0 && (p = 2 * Math.PI + p),
            f < 0 && (f = 2 * Math.PI + f),
            s && p > f && (p -= 2 * Math.PI),
            !s && f > p && (f -= 2 * Math.PI);
        }
        var O = f - p;
        if (Math.abs(O) > (120 * Math.PI) / 180) {
          var N = f,
            M = n,
            I = r;
          (f =
            s && f > p
              ? p + ((120 * Math.PI) / 180) * 1
              : p + ((120 * Math.PI) / 180) * -1),
            (n = h + i * Math.cos(f)),
            (r = m + a * Math.sin(f)),
            (b = l(n, r, M, I, i, a, o, 0, s, [f, N, h, m]));
        }
        O = f - p;
        var z = Math.cos(p),
          L = Math.sin(p),
          A = Math.cos(f),
          D = Math.sin(f),
          j = Math.tan(O / 4),
          R = (4 / 3) * i * j,
          U = (4 / 3) * a * j,
          F = [e, t],
          $ = [e + R * L, t - U * z],
          V = [n + R * D, r - U * A],
          W = [n, r];
        if ((($[0] = 2 * F[0] - $[0]), ($[1] = 2 * F[1] - $[1]), c))
          return [$, V, W].concat(b);
        b = [$, V, W].concat(b);
        for (var H = [], B = 0; B < b.length; B += 3) {
          (i = g(b[B][0], b[B][1], v)), (a = g(b[B + 1][0], b[B + 1][1], v));
          var q = g(b[B + 2][0], b[B + 2][1], v);
          H.push([i.x, i.y, a.x, a.y, q.x, q.y]);
        }
        return H;
      },
      u = function (e) {
        return e.map(function (e) {
          return { type: e.type, values: Array.prototype.slice.call(e.values) };
        });
      },
      s = function (e) {
        var t = [],
          n = null,
          r = null,
          i = null,
          a = null,
          o = null,
          u = null,
          s = null;
        return (
          e.forEach(function (e) {
            if ("M" === e.type) {
              var c = e.values[0],
                d = e.values[1];
              t.push({ type: "M", values: [c, d] }),
                (u = c),
                (s = d),
                (a = c),
                (o = d);
            } else if ("C" === e.type) {
              var p = e.values[0],
                f = e.values[1],
                h = e.values[2],
                m = e.values[3];
              (c = e.values[4]), (d = e.values[5]);
              t.push({ type: "C", values: [p, f, h, m, c, d] }),
                (r = h),
                (i = m),
                (a = c),
                (o = d);
            } else if ("L" === e.type) {
              (c = e.values[0]), (d = e.values[1]);
              t.push({ type: "L", values: [c, d] }), (a = c), (o = d);
            } else if ("H" === e.type) {
              c = e.values[0];
              t.push({ type: "L", values: [c, o] }), (a = c);
            } else if ("V" === e.type) {
              d = e.values[0];
              t.push({ type: "L", values: [a, d] }), (o = d);
            } else if ("S" === e.type) {
              (h = e.values[0]),
                (m = e.values[1]),
                (c = e.values[2]),
                (d = e.values[3]);
              "C" === n || "S" === n
                ? ((g = a + (a - r)), (v = o + (o - i)))
                : ((g = a), (v = o)),
                t.push({ type: "C", values: [g, v, h, m, c, d] }),
                (r = h),
                (i = m),
                (a = c),
                (o = d);
            } else if ("T" === e.type) {
              (c = e.values[0]), (d = e.values[1]);
              "Q" === n || "T" === n
                ? ((p = a + (a - r)), (f = o + (o - i)))
                : ((p = a), (f = o));
              var g = a + (2 * (p - a)) / 3,
                v = o + (2 * (f - o)) / 3,
                b = c + (2 * (p - c)) / 3,
                y = d + (2 * (f - d)) / 3;
              t.push({ type: "C", values: [g, v, b, y, c, d] }),
                (r = p),
                (i = f),
                (a = c),
                (o = d);
            } else if ("Q" === e.type) {
              (p = e.values[0]),
                (f = e.values[1]),
                (c = e.values[2]),
                (d = e.values[3]),
                (g = a + (2 * (p - a)) / 3),
                (v = o + (2 * (f - o)) / 3),
                (b = c + (2 * (p - c)) / 3),
                (y = d + (2 * (f - d)) / 3);
              t.push({ type: "C", values: [g, v, b, y, c, d] }),
                (r = p),
                (i = f),
                (a = c),
                (o = d);
            } else if ("A" === e.type) {
              var x = Math.abs(e.values[0]),
                w = Math.abs(e.values[1]),
                k = e.values[2],
                _ = e.values[3],
                E = e.values[4];
              (c = e.values[5]), (d = e.values[6]);
              if (0 === x || 0 === w)
                t.push({ type: "C", values: [a, o, c, d, c, d] }),
                  (a = c),
                  (o = d);
              else if (a !== c || o !== d)
                l(a, o, c, d, x, w, k, _, E).forEach(function (e) {
                  t.push({ type: "C", values: e });
                }),
                  (a = c),
                  (o = d);
            } else "Z" === e.type && (t.push(e), (a = u), (o = s));
            n = e.type;
          }),
          t
        );
      };
    const c = (e, t) =>
        t in e && "baseVal" in e[t] ? e[t].baseVal.value : +e.getAttribute(t),
      d = {
        circle: function (e) {
          var t = c(this, "cx"),
            n = c(this, "cy"),
            r = c(this, "r"),
            i = [
              { type: "M", values: [t + r, n] },
              { type: "A", values: [r, r, 0, 0, 1, t, n + r] },
              { type: "A", values: [r, r, 0, 0, 1, t - r, n] },
              { type: "A", values: [r, r, 0, 0, 1, t, n - r] },
              { type: "A", values: [r, r, 0, 0, 1, t + r, n] },
              { type: "Z", values: [] },
            ];
          return e && !0 === e.normalize && (i = s(i)), i;
        },
        ellipse: function (e) {
          var t = c(this, "cx"),
            n = c(this, "cy"),
            r = c(this, "rx"),
            i = c(this, "ry"),
            a = [
              { type: "M", values: [t + r, n] },
              { type: "A", values: [r, i, 0, 0, 1, t, n + i] },
              { type: "A", values: [r, i, 0, 0, 1, t - r, n] },
              { type: "A", values: [r, i, 0, 0, 1, t, n - i] },
              { type: "A", values: [r, i, 0, 0, 1, t + r, n] },
              { type: "Z", values: [] },
            ];
          return e && !0 === e.normalize && (a = s(a)), a;
        },
        path: function (e) {
          if (e && e.normalize) {
            if (this[o]) return u(this[o]);
            this[a]
              ? (n = u(this[a]))
              : ((n = i(this.getAttribute("d") || "")), (this[a] = u(n)));
            var t = s(
              (function (e) {
                var t = [],
                  n = null,
                  r = null,
                  i = null,
                  a = null;
                return (
                  e.forEach(function (e) {
                    var o = e.type;
                    if ("M" === o) {
                      var l = e.values[0],
                        u = e.values[1];
                      t.push({ type: "M", values: [l, u] }),
                        (i = l),
                        (a = u),
                        (n = l),
                        (r = u);
                    } else if ("m" === o) {
                      (l = n + e.values[0]), (u = r + e.values[1]);
                      t.push({ type: "M", values: [l, u] }),
                        (i = l),
                        (a = u),
                        (n = l),
                        (r = u);
                    } else if ("L" === o) {
                      (l = e.values[0]), (u = e.values[1]);
                      t.push({ type: "L", values: [l, u] }), (n = l), (r = u);
                    } else if ("l" === o) {
                      (l = n + e.values[0]), (u = r + e.values[1]);
                      t.push({ type: "L", values: [l, u] }), (n = l), (r = u);
                    } else if ("C" === o) {
                      var s = e.values[0],
                        c = e.values[1],
                        d = e.values[2],
                        p = e.values[3];
                      (l = e.values[4]), (u = e.values[5]);
                      t.push({ type: "C", values: [s, c, d, p, l, u] }),
                        (n = l),
                        (r = u);
                    } else if ("c" === o) {
                      (s = n + e.values[0]),
                        (c = r + e.values[1]),
                        (d = n + e.values[2]),
                        (p = r + e.values[3]),
                        (l = n + e.values[4]),
                        (u = r + e.values[5]);
                      t.push({ type: "C", values: [s, c, d, p, l, u] }),
                        (n = l),
                        (r = u);
                    } else if ("Q" === o) {
                      (s = e.values[0]),
                        (c = e.values[1]),
                        (l = e.values[2]),
                        (u = e.values[3]);
                      t.push({ type: "Q", values: [s, c, l, u] }),
                        (n = l),
                        (r = u);
                    } else if ("q" === o) {
                      (s = n + e.values[0]),
                        (c = r + e.values[1]),
                        (l = n + e.values[2]),
                        (u = r + e.values[3]);
                      t.push({ type: "Q", values: [s, c, l, u] }),
                        (n = l),
                        (r = u);
                    } else if ("A" === o) {
                      (l = e.values[5]), (u = e.values[6]);
                      t.push({
                        type: "A",
                        values: [
                          e.values[0],
                          e.values[1],
                          e.values[2],
                          e.values[3],
                          e.values[4],
                          l,
                          u,
                        ],
                      }),
                        (n = l),
                        (r = u);
                    } else if ("a" === o) {
                      (l = n + e.values[5]), (u = r + e.values[6]);
                      t.push({
                        type: "A",
                        values: [
                          e.values[0],
                          e.values[1],
                          e.values[2],
                          e.values[3],
                          e.values[4],
                          l,
                          u,
                        ],
                      }),
                        (n = l),
                        (r = u);
                    } else if ("H" === o) {
                      l = e.values[0];
                      t.push({ type: "H", values: [l] }), (n = l);
                    } else if ("h" === o) {
                      l = n + e.values[0];
                      t.push({ type: "H", values: [l] }), (n = l);
                    } else if ("V" === o) {
                      u = e.values[0];
                      t.push({ type: "V", values: [u] }), (r = u);
                    } else if ("v" === o) {
                      u = r + e.values[0];
                      t.push({ type: "V", values: [u] }), (r = u);
                    } else if ("S" === o) {
                      (d = e.values[0]),
                        (p = e.values[1]),
                        (l = e.values[2]),
                        (u = e.values[3]);
                      t.push({ type: "S", values: [d, p, l, u] }),
                        (n = l),
                        (r = u);
                    } else if ("s" === o) {
                      (d = n + e.values[0]),
                        (p = r + e.values[1]),
                        (l = n + e.values[2]),
                        (u = r + e.values[3]);
                      t.push({ type: "S", values: [d, p, l, u] }),
                        (n = l),
                        (r = u);
                    } else if ("T" === o) {
                      (l = e.values[0]), (u = e.values[1]);
                      t.push({ type: "T", values: [l, u] }), (n = l), (r = u);
                    } else if ("t" === o) {
                      (l = n + e.values[0]), (u = r + e.values[1]);
                      t.push({ type: "T", values: [l, u] }), (n = l), (r = u);
                    } else
                      ("Z" !== o && "z" !== o) ||
                        (t.push({ type: "Z", values: [] }), (n = i), (r = a));
                  }),
                  t
                );
              })(n)
            );
            return (this[o] = u(t)), t;
          }
          if (this[a]) return u(this[a]);
          var n = i(this.getAttribute("d") || "");
          return (this[a] = u(n)), n;
        },
        polygon: function () {
          for (var e = [], t = 0; t < this.points.numberOfItems; t += 1) {
            var n = this.points.getItem(t);
            e.push({ type: 0 === t ? "M" : "L", values: [n.x, n.y] });
          }
          return e.push({ type: "Z", values: [] }), e;
        },
        polyline: function () {
          for (var e = [], t = 0; t < this.points.numberOfItems; t += 1) {
            var n = this.points.getItem(t);
            e.push({ type: 0 === t ? "M" : "L", values: [n.x, n.y] });
          }
          return e;
        },
        line: function () {
          const e = c(this, "x1"),
            t = c(this, "x2");
          return [
            { type: "M", values: [e, c(this, "y1")] },
            { type: "L", values: [t, c(this, "y2")] },
          ];
        },
        rect: function (e) {
          var t = c(this, "x"),
            n = c(this, "y"),
            r = c(this, "width"),
            i = c(this, "height"),
            a = this.hasAttribute("rx") ? c(this, "rx") : c(this, "ry"),
            o = this.hasAttribute("ry") ? c(this, "ry") : c(this, "rx");
          a > r / 2 && (a = r / 2), o > i / 2 && (o = i / 2);
          var l = [
            { type: "M", values: [t + a, n] },
            { type: "H", values: [t + r - a] },
            { type: "A", values: [a, o, 0, 0, 1, t + r, n + o] },
            { type: "V", values: [n + i - o] },
            { type: "A", values: [a, o, 0, 0, 1, t + r - a, n + i] },
            { type: "H", values: [t + a] },
            { type: "A", values: [a, o, 0, 0, 1, t, n + i - o] },
            { type: "V", values: [n + o] },
            { type: "A", values: [a, o, 0, 0, 1, t + a, n] },
            { type: "Z", values: [] },
          ];
          return (
            (l = l.filter(function (e) {
              return "A" !== e.type || (0 !== e.values[0] && 0 !== e.values[1]);
            })),
            e && !0 === e.normalize && (l = s(l)),
            l
          );
        },
      };
    e.exports = {
      getPathData: function (e, t) {
        const n = e.nodeName.toLowerCase();
        if (n in d) return d[n].call(e, t);
        throw new Error(`Unsupported SVG element type: '${n}'`);
      },
    };
  },
  function (e, t, n) {
    var r = n(31);
    "string" == typeof r && (r = [[e.i, r, ""]]);
    var i = { hmr: !0, transform: void 0, insertInto: void 0 };
    n(33)(r, i);
    r.locals && (e.exports = r.locals);
  },
  function (e, t, n) {
    (e.exports = n(32)(!1)).push([
      e.i,
      ":root {\n  --teal: #75D5CD;\n  --teal-light: #DCF4F2;\n  --teal-dark: #3F9991;\n  --purple: #8E75B6;\n  --purple-light: #E3DCED;\n  --purple-dark: #604987;\n  --red: #DE7272;\n  --panel-width: 260px;\n}\n\nbody {\n  font-family: 'Work Sans', sans-serif;\n  font-size: 14px;\n  color: var(--purple);\n  background-color: #f6f6f6;\n}\n\nbody, html, #app {\n  height: 100%;\n  margin: 0;\n}\n\nbody.dragover {\n  background-color: var(--teal);\n}\n\n* {\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nstrong {\n  font-weight: 900;\n}\n\n.root {\n  display: flex;\n  align-items: stretch;\n  height: 100%;\n}\n\npath {\n  stroke: black;\n  fill: transparent;\n}\n\n.preview-area {\n  position: relative;\n  flex: 1 1 auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n}\n\n.preview {\n  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);\n  overflow: hidden;\n  background-color: white;\n  position: relative;\n}\n\n.preview-loader {\n  align-items: center;\n  background: rgba(0, 0, 0, 0.2);\n  color: whitesmoke;\n  display: flex;\n  font-size: 36px;\n  font-weight: bold;\n  height: 100%;\n  justify-content: center;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.preview > svg {\n  display: block;\n  contain: strict;\n}\n\n.preview > svg:not(:first-child) {\n  position: absolute;\n  transform: translateZ(0.001px);\n  top: 0;\n  left: 0;\n}\n\n.dragover .drag-target {\n  opacity: 0;\n}\n\n.drag-target {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: rgba(0, 0, 0, 0.2);\n}\n\n.drag-target-message {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: whitesmoke;\n  font-weight: bold;\n  font-size: 36px;\n}\n\n.control-panel {\n  position: relative;\n  flex: 0 0 var(--panel-width);\n  width: var(--panel-width);\n  background-color: white;\n  overflow-y: scroll;\n\n  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);\n}\n\n.control-panel-bottom {\n  position: fixed;\n  bottom: 0;\n  width: var(--panel-width);\n  padding-bottom: 0.5rem;\n  background-color: white;\n}\n\n.control-panel-bottom .section-header {\n  padding-top: 0.25rem;\n}\n\n.saxi-title {\n  margin: 0 1rem;\n  padding-top: 0.5rem;\n  font-size: 36px;\n  font-weight: 900;\n  text-align: center;\n  user-select: none;\n}\n.disconnected .saxi-title {\n  text-decoration-line: line-through;\n}\n\n.section-header {\n  margin-bottom: 1rem;\n  padding: 1rem 0;\n  border-bottom: 1px solid var(--purple-light);\n  font-size: 18px;\n  font-weight: 900;\n  text-align: center;\n  user-select: none;\n}\n\n.section-body {\n  padding: 0 1rem;\n}\n\n/* INPUTS */\n\nlabel {\n  font-size: 10px;\n  text-align: center;\n  line-height: 1.6;\n  user-select: none;\n}\n\ninput[type=number] {\n  width: 100%;\n  padding: 0.3rem;\n  margin-bottom: 0.5rem;\n  border: 1px solid var(--purple);\n  font-family: 'Work Sans', sans-serif;\n  font-size: 14px;\n  color: var(--purple);\n  background-color: white;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n  outline: none;\n}\n\ninput[type=checkbox] {\n  position: relative;\n  appearance: none;\n  -webkit-appearance: none;\n  width: 18px;\n  height: 18px;\n  margin: 0 0.5rem 0 0;\n  border: 1px solid var(--purple);\n  background-color: white;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n  outline: none;\n  cursor: pointer;\n}\n\ninput[type=checkbox]:checked:after {\n  display: block;\n  position: absolute;\n  top: 3px;\n  right: 3px;\n  bottom: 3px;\n  left: 3px;\n  content: '';\n  background-color: var(--purple);\n}\n\nbutton, select {\n  width: 100%;\n  margin-bottom: 0.5rem;\n  padding: 0.4rem;\n  font-family: 'Work Sans', sans-serif;\n  font-size: 14px;\n  font-weight: 700;\n  background-color: white;\n  color: var(--purple);\n  border: 1px solid var(--purple);\n  border-radius: 0;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n  outline: none;\n}\n\nbutton:not(:disabled):hover,\nbutton:not(:disabled):focus,\nselect:not(:disabled):hover,\nselect:focus,\ninput[type=number]:hover,\ninput[type=number]:focus,\ninput[type=checkbox]:focus {\n  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);\n}\n\nbutton:not(:disabled):active {\n  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25), inset 2px 2px 5px rgba(0, 0, 0, 0.2);\n  background-color: #fafafa;\n  color: var(--purple-dark);\n}\n\n/* button-link is a button element that looks like a link */\nbutton.button-link {\n  display: block;\n  padding: 0;\n  border: none;\n  font-size: 10px;\n  text-decoration: none;\n  background-color: transparent;\n  box-shadow: none;\n  font-weight: 400;\n}\n\nbutton.button-link:hover,\nbutton.button-link:active,\nbutton.button-link:focus {\n  box-shadow: none;\n  background-color: transparent;\n  text-decoration: underline;\n}\n\nselect {\n  height: 30px;\n  appearance: none;\n  -webkit-appearance: none;\n}\n\nselect[multiple]:focus option:checked {\n  background: var(--purple);\n  color: white;\n}\n\n.flex button,\n.flex label {\n  width: calc(50% - 0.25rem);\n  align-self: flex-end;\n}\n\n.flex-checkbox {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 0.5rem;\n}\n\n/* PEN section */\n\n.pen-label {\n  width: calc(50% - 0.25rem);\n}\n\n/* PAPER section */\n\n.paper-sizes {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n\n.paper-label {\n  width: 44%;\n  margin-bottom: 0;\n}\n\n.paper-sizes__swap {\n  width: 10%;\n  margin-bottom: 16px;\n  cursor: pointer;\n  fill: var(--purple);\n}\n.paper-sizes__swap:hover {\n  fill: var(--purple-dark);\n}\n\n.layer-select {\n  height: 50px;\n  background-color: white;\n  border: 1px solid var(--purple);\n  color: var(--purple);\n}\n.layer-select:hover {\n  background-color: white;\n  cursor: default;\n}\n\n.spacer {\n  height: 200px;\n}\n\n/* MORE section */\n\nsummary {\n  outline: none;\n  cursor: pointer;\n}\n\nsummary:focus {\n  color: var(--purple-dark);\n}\n\n.horizontal-labels label {\n  display: block;\n  position: relative;\n}\n.horizontal-labels label::after {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 28px;\n  border-right: 1px solid var(--purple);\n}\n\n.horizontal-labels img {\n  position: absolute;\n  padding: 4px;\n  width: 28px;\n  height: 28px;\n  border-right: 1px solid var(--purple);\n  /*opacity: 0.5;*/\n}\n.horizontal-labels input {\n  padding-left: 32px;\n}\n\n/* PLOT section */\n\n.duration {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 0.5rem;\n}\n\n.section-body__plot button {\n  padding: 0.4rem;\n  font-size: 18px;\n}\n.section-body__plot button:disabled {\n  /*background-color: var(--purple-light);*/\n  /*color: var(--purple-light);*/\n  cursor: default;\n}\n\n.replan-button {\n  /*color: var(--purple);*/\n}\n\n.plot-button {\n  color: white;\n  background-color: var(--teal);\n  border: 1px solid var(--teal-dark);\n}\n.plot-button:not(:disabled):active {\n  color: white;\n  background-color: var(--teal);\n}\n.plot-button:disabled {\n  color: var(--teal-light);\n  background-color: white;\n}\n.plot-button--plotting {\n  background-color: var(--teal-light);\n}\n\n.button-row {\n  display: flex;\n}\n.button-row > *:not(:first-child) {\n  margin-left: 10px;\n}\n\n.cancel-button {\n  background-color: white;\n  color: var(--purple-light);\n}\n.cancel-button--active {\n  color: var(--purple);\n}\n\n\n/* UTILS */\n\n.purple { color: var(--purple); }\n.teal { color: var(--teal); }\n.teal-dark { color: var(--teal-dark); }\n.red { color: var(--red); }\n\n.reg { font-weight: 400; }\n\n.flex {\n  display: flex;\n  justify-content: space-between;\n}\n\n.info-disconnected {\n  text-align: center;\n  color: var(--red);\n}\n",
      "",
    ]);
  },
  function (e, t, n) {
    "use strict";
    e.exports = function (e) {
      var t = [];
      return (
        (t.toString = function () {
          return this.map(function (t) {
            var n = (function (e, t) {
              var n = e[1] || "",
                r = e[3];
              if (!r) return n;
              if (t && "function" == typeof btoa) {
                var i =
                    ((o = r),
                    "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," +
                      btoa(unescape(encodeURIComponent(JSON.stringify(o)))) +
                      " */"),
                  a = r.sources.map(function (e) {
                    return "/*# sourceURL=" + r.sourceRoot + e + " */";
                  });
                return [n].concat(a).concat([i]).join("\n");
              }
              var o;
              return [n].join("\n");
            })(t, e);
            return t[2] ? "@media " + t[2] + "{" + n + "}" : n;
          }).join("");
        }),
        (t.i = function (e, n) {
          "string" == typeof e && (e = [[null, e, ""]]);
          for (var r = {}, i = 0; i < this.length; i++) {
            var a = this[i][0];
            null != a && (r[a] = !0);
          }
          for (i = 0; i < e.length; i++) {
            var o = e[i];
            (null != o[0] && r[o[0]]) ||
              (n && !o[2]
                ? (o[2] = n)
                : n && (o[2] = "(" + o[2] + ") and (" + n + ")"),
              t.push(o));
          }
        }),
        t
      );
    };
  },
  function (e, t, n) {
    var r,
      i,
      a = {},
      o =
        ((r = function () {
          return window && document && document.all && !window.atob;
        }),
        function () {
          return void 0 === i && (i = r.apply(this, arguments)), i;
        }),
      l = function (e, t) {
        return t ? t.querySelector(e) : document.querySelector(e);
      },
      u = (function (e) {
        var t = {};
        return function (e, n) {
          if ("function" == typeof e) return e();
          if (void 0 === t[e]) {
            var r = l.call(this, e, n);
            if (
              window.HTMLIFrameElement &&
              r instanceof window.HTMLIFrameElement
            )
              try {
                r = r.contentDocument.head;
              } catch (e) {
                r = null;
              }
            t[e] = r;
          }
          return t[e];
        };
      })(),
      s = null,
      c = 0,
      d = [],
      p = n(34);
    function f(e, t) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n],
          i = a[r.id];
        if (i) {
          i.refs++;
          for (var o = 0; o < i.parts.length; o++) i.parts[o](r.parts[o]);
          for (; o < r.parts.length; o++) i.parts.push(y(r.parts[o], t));
        } else {
          var l = [];
          for (o = 0; o < r.parts.length; o++) l.push(y(r.parts[o], t));
          a[r.id] = { id: r.id, refs: 1, parts: l };
        }
      }
    }
    function h(e, t) {
      for (var n = [], r = {}, i = 0; i < e.length; i++) {
        var a = e[i],
          o = t.base ? a[0] + t.base : a[0],
          l = { css: a[1], media: a[2], sourceMap: a[3] };
        r[o] ? r[o].parts.push(l) : n.push((r[o] = { id: o, parts: [l] }));
      }
      return n;
    }
    function m(e, t) {
      var n = u(e.insertInto);
      if (!n)
        throw new Error(
          "Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid."
        );
      var r = d[d.length - 1];
      if ("top" === e.insertAt)
        r
          ? r.nextSibling
            ? n.insertBefore(t, r.nextSibling)
            : n.appendChild(t)
          : n.insertBefore(t, n.firstChild),
          d.push(t);
      else if ("bottom" === e.insertAt) n.appendChild(t);
      else {
        if ("object" != typeof e.insertAt || !e.insertAt.before)
          throw new Error(
            "[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n"
          );
        var i = u(e.insertAt.before, n);
        n.insertBefore(t, i);
      }
    }
    function g(e) {
      if (null === e.parentNode) return !1;
      e.parentNode.removeChild(e);
      var t = d.indexOf(e);
      t >= 0 && d.splice(t, 1);
    }
    function v(e) {
      var t = document.createElement("style");
      if (
        (void 0 === e.attrs.type && (e.attrs.type = "text/css"),
        void 0 === e.attrs.nonce)
      ) {
        var r = (function () {
          0;
          return n.nc;
        })();
        r && (e.attrs.nonce = r);
      }
      return b(t, e.attrs), m(e, t), t;
    }
    function b(e, t) {
      Object.keys(t).forEach(function (n) {
        e.setAttribute(n, t[n]);
      });
    }
    function y(e, t) {
      var n, r, i, a;
      if (t.transform && e.css) {
        if (
          !(a =
            "function" == typeof t.transform
              ? t.transform(e.css)
              : t.transform.default(e.css))
        )
          return function () {};
        e.css = a;
      }
      if (t.singleton) {
        var o = c++;
        (n = s || (s = v(t))),
          (r = k.bind(null, n, o, !1)),
          (i = k.bind(null, n, o, !0));
      } else
        e.sourceMap &&
        "function" == typeof URL &&
        "function" == typeof URL.createObjectURL &&
        "function" == typeof URL.revokeObjectURL &&
        "function" == typeof Blob &&
        "function" == typeof btoa
          ? ((n = (function (e) {
              var t = document.createElement("link");
              return (
                void 0 === e.attrs.type && (e.attrs.type = "text/css"),
                (e.attrs.rel = "stylesheet"),
                b(t, e.attrs),
                m(e, t),
                t
              );
            })(t)),
            (r = E.bind(null, n, t)),
            (i = function () {
              g(n), n.href && URL.revokeObjectURL(n.href);
            }))
          : ((n = v(t)),
            (r = _.bind(null, n)),
            (i = function () {
              g(n);
            }));
      return (
        r(e),
        function (t) {
          if (t) {
            if (
              t.css === e.css &&
              t.media === e.media &&
              t.sourceMap === e.sourceMap
            )
              return;
            r((e = t));
          } else i();
        }
      );
    }
    e.exports = function (e, t) {
      if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document)
        throw new Error(
          "The style-loader cannot be used in a non-browser environment"
        );
      ((t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs : {}),
        t.singleton || "boolean" == typeof t.singleton || (t.singleton = o()),
        t.insertInto || (t.insertInto = "head"),
        t.insertAt || (t.insertAt = "bottom");
      var n = h(e, t);
      return (
        f(n, t),
        function (e) {
          for (var r = [], i = 0; i < n.length; i++) {
            var o = n[i];
            (l = a[o.id]).refs--, r.push(l);
          }
          e && f(h(e, t), t);
          for (i = 0; i < r.length; i++) {
            var l;
            if (0 === (l = r[i]).refs) {
              for (var u = 0; u < l.parts.length; u++) l.parts[u]();
              delete a[l.id];
            }
          }
        }
      );
    };
    var x,
      w =
        ((x = []),
        function (e, t) {
          return (x[e] = t), x.filter(Boolean).join("\n");
        });
    function k(e, t, n, r) {
      var i = n ? "" : r.css;
      if (e.styleSheet) e.styleSheet.cssText = w(t, i);
      else {
        var a = document.createTextNode(i),
          o = e.childNodes;
        o[t] && e.removeChild(o[t]),
          o.length ? e.insertBefore(a, o[t]) : e.appendChild(a);
      }
    }
    function _(e, t) {
      var n = t.css,
        r = t.media;
      if ((r && e.setAttribute("media", r), e.styleSheet))
        e.styleSheet.cssText = n;
      else {
        for (; e.firstChild; ) e.removeChild(e.firstChild);
        e.appendChild(document.createTextNode(n));
      }
    }
    function E(e, t, n) {
      var r = n.css,
        i = n.sourceMap,
        a = void 0 === t.convertToAbsoluteUrls && i;
      (t.convertToAbsoluteUrls || a) && (r = p(r)),
        i &&
          (r +=
            "\n/*# sourceMappingURL=data:application/json;base64," +
            btoa(unescape(encodeURIComponent(JSON.stringify(i)))) +
            " */");
      var o = new Blob([r], { type: "text/css" }),
        l = e.href;
      (e.href = URL.createObjectURL(o)), l && URL.revokeObjectURL(l);
    }
  },
  function (e, t) {
    e.exports = function (e) {
      var t = "undefined" != typeof window && window.location;
      if (!t) throw new Error("fixUrls requires window.location");
      if (!e || "string" != typeof e) return e;
      var n = t.protocol + "//" + t.host,
        r = n + t.pathname.replace(/\/[^\/]*$/, "/");
      return e.replace(
        /url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,
        function (e, t) {
          var i,
            a = t
              .trim()
              .replace(/^"(.*)"$/, function (e, t) {
                return t;
              })
              .replace(/^'(.*)'$/, function (e, t) {
                return t;
              });
          return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a)
            ? e
            : ((i =
                0 === a.indexOf("//")
                  ? a
                  : 0 === a.indexOf("/")
                  ? n + a
                  : r + a.replace(/^\.\//, "")),
              "url(" + JSON.stringify(i) + ")");
        }
      );
    };
  },
  function (e, t) {
    var n,
      r,
      i = (e.exports = {});
    function a() {
      throw new Error("setTimeout has not been defined");
    }
    function o() {
      throw new Error("clearTimeout has not been defined");
    }
    function l(e) {
      if (n === setTimeout) return setTimeout(e, 0);
      if ((n === a || !n) && setTimeout)
        return (n = setTimeout), setTimeout(e, 0);
      try {
        return n(e, 0);
      } catch (t) {
        try {
          return n.call(null, e, 0);
        } catch (t) {
          return n.call(this, e, 0);
        }
      }
    }
    !(function () {
      try {
        n = "function" == typeof setTimeout ? setTimeout : a;
      } catch (e) {
        n = a;
      }
      try {
        r = "function" == typeof clearTimeout ? clearTimeout : o;
      } catch (e) {
        r = o;
      }
    })();
    var u,
      s = [],
      c = !1,
      d = -1;
    function p() {
      c &&
        u &&
        ((c = !1), u.length ? (s = u.concat(s)) : (d = -1), s.length && f());
    }
    function f() {
      if (!c) {
        var e = l(p);
        c = !0;
        for (var t = s.length; t; ) {
          for (u = s, s = []; ++d < t; ) u && u[d].run();
          (d = -1), (t = s.length);
        }
        (u = null),
          (c = !1),
          (function (e) {
            if (r === clearTimeout) return clearTimeout(e);
            if ((r === o || !r) && clearTimeout)
              return (r = clearTimeout), clearTimeout(e);
            try {
              r(e);
            } catch (t) {
              try {
                return r.call(null, e);
              } catch (t) {
                return r.call(this, e);
              }
            }
          })(e);
      }
    }
    function h(e, t) {
      (this.fun = e), (this.array = t);
    }
    function m() {}
    (i.nextTick = function (e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      s.push(new h(e, t)), 1 !== s.length || c || l(f);
    }),
      (h.prototype.run = function () {
        this.fun.apply(null, this.array);
      }),
      (i.title = "browser"),
      (i.browser = !0),
      (i.env = {}),
      (i.argv = []),
      (i.version = ""),
      (i.versions = {}),
      (i.on = m),
      (i.addListener = m),
      (i.once = m),
      (i.off = m),
      (i.removeListener = m),
      (i.removeAllListeners = m),
      (i.emit = m),
      (i.prependListener = m),
      (i.prependOnceListener = m),
      (i.listeners = function (e) {
        return [];
      }),
      (i.binding = function (e) {
        throw new Error("process.binding is not supported");
      }),
      (i.cwd = function () {
        return "/";
      }),
      (i.chdir = function (e) {
        throw new Error("process.chdir is not supported");
      }),
      (i.umask = function () {
        return 0;
      });
  },
  function (e, t, n) {
    "use strict";
    n.r(t);
    var r = n(6),
      i = n.n(r),
      a = n(0),
      o = n.n(a),
      l = n(7),
      u = n.n(l),
      s = n(8),
      c = n(9),
      d = n(10),
      p = n(3),
      f = n(2);
    n(1);
    var h = n(11),
      m = n.n(h),
      g = (n(30), n(12)),
      v = n.n(g),
      b = n(13),
      y = n.n(b),
      x = n(14),
      w = n.n(x),
      k = n(15),
      _ = function (e, t, n, r) {
        return new (n || (n = Promise))(function (i, a) {
          function o(e) {
            try {
              u(r.next(e));
            } catch (e) {
              a(e);
            }
          }
          function l(e) {
            try {
              u(r.throw(e));
            } catch (e) {
              a(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? i(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t);
                    })).then(o, l);
          }
          u((r = r.apply(e, t || [])).next());
        });
      };
    const E = {
        connected: !0,
        paused: !1,
        deviceInfo: null,
        planOptions: f.e,
        visualizationOptions: {
          penStrokeWidth: 0.5,
          colorPathsByStrokeOrder: !1,
        },
        plannedOptions: null,
        paths: null,
        groupLayers: [],
        strokeLayers: [],
        progress: null,
      },
      T = JSON.parse(window.localStorage.getItem("planOptions")) || {};
    (E.planOptions = Object.assign(Object.assign({}, E.planOptions), T)),
      (E.planOptions.paperSize = new p.a(E.planOptions.paperSize.size));
    const S = o.a.createContext(null);
    function C(e, t) {
      switch (t.type) {
        case "SET_PLAN_OPTION":
          return Object.assign(Object.assign({}, e), {
            planOptions: Object.assign(
              Object.assign({}, e.planOptions),
              t.value
            ),
          });
        case "SET_VISUALIZATION_OPTION":
          return Object.assign(Object.assign({}, e), {
            visualizationOptions: Object.assign(
              Object.assign({}, e.visualizationOptions),
              t.value
            ),
          });
        case "SET_DEVICE_INFO":
          return Object.assign(Object.assign({}, e), { deviceInfo: t.value });
        case "SET_PAUSED":
          return Object.assign(Object.assign({}, e), { paused: t.value });
        case "SET_PATHS":
          const {
            paths: n,
            strokeLayers: r,
            selectedStrokeLayers: i,
            groupLayers: a,
            selectedGroupLayers: o,
            layerMode: l,
          } = t;
          return Object.assign(Object.assign({}, e), {
            paths: n,
            groupLayers: a,
            strokeLayers: r,
            planOptions: Object.assign(Object.assign({}, e.planOptions), {
              selectedStrokeLayers: i,
              selectedGroupLayers: o,
              layerMode: l,
            }),
          });
        case "SET_PROGRESS":
          return Object.assign(Object.assign({}, e), { progress: t.motionIdx });
        case "SET_CONNECTED":
          return Object.assign(Object.assign({}, e), {
            connected: t.connected,
          });
        default:
          return console.warn(`Unrecognized action type '${t.type}'`), e;
      }
    }
    class P {
      constructor(e, t) {
        (this._unpaused = null),
          (this._signalUnpause = null),
          (this._cancelRequested = !1),
          (this.ebb = e),
          (this._name = t);
      }
      static connect(e) {
        return _(this, void 0, void 0, function* () {
          e ||
            (e = yield navigator.serial.requestPort({
              filters: [{ usbVendorId: 1240, usbProductId: 64914 }],
            })),
            yield e.open({ baudRate: 9600 });
          const { usbVendorId: t, usbProductId: n } = e.getInfo();
          return new P(
            new k.a(e),
            `${t.toString(16).padStart(4, "0")}:${n
              .toString(16)
              .padStart(4, "0")}`
          );
        });
      }
      name() {
        return this._name;
      }
      close() {
        return this.ebb.close();
      }
      plot(e) {
        return _(this, void 0, void 0, function* () {
          (this._unpaused = null),
            (this._cancelRequested = !1),
            yield this.ebb.enableMotors(2);
          let t = 0,
            n = !0;
          for (const r of e.motions) {
            if (
              (this.onprogress && this.onprogress(t),
              yield this.ebb.executeMotion(r),
              r instanceof f.b && (n = r.initialPos < r.finalPos),
              this._unpaused &&
                n &&
                (yield this._unpaused, this.onpause && this.onpause(!1)),
              this._cancelRequested)
            )
              break;
            t += 1;
          }
          this._cancelRequested
            ? (yield this.ebb.setPenHeight(f.a.Axidraw.penPctToPos(0), 1e3),
              this.oncancelled && this.oncancelled())
            : this.onfinished && this.onfinished(),
            yield this.ebb.waitUntilMotorsIdle(),
            yield this.ebb.disableMotors();
        });
      }
      cancel() {
        this._cancelRequested = !0;
      }
      pause() {
        (this._unpaused = new Promise((e) => {
          this._signalUnpause = e;
        })),
          this.onpause && this.onpause(!0);
      }
      resume() {
        const e = this._signalUnpause;
        (this._unpaused = null), (this._signalUnpause = null), e();
      }
      setPenHeight(e, t) {
        return _(this, void 0, void 0, function* () {
          (yield this.ebb.supportsSR()) &&
            (yield this.ebb.setServoPowerTimeout(1e4, !0)),
            yield this.ebb.setPenHeight(e, t);
        });
      }
      limp() {
        this.ebb.disableMotors();
      }
    }
    const O = (e, t) => {
        const [n, r] = Object(a.useState)(!1),
          [i, o] = Object(a.useState)(null);
        function l(e) {
          return JSON.stringify(e, (e, t) => (t instanceof Set ? [...t] : t));
        }
        const u = Object(a.useRef)(null),
          s = Object(a.useRef)(null),
          c = Object(a.useRef)(null);
        return (
          Object(a.useEffect)(() => {
            if (!e) return;
            if (null != s.current && u.current === e) {
              const e = (function (e, t, n) {
                const r = Object.assign(Object.assign({}, t), {
                  penUpHeight: e.penUpHeight,
                  penDownHeight: e.penDownHeight,
                });
                if (l(e) === l(r))
                  return n.withPenHeights(
                    f.a.Axidraw.penPctToPos(t.penUpHeight),
                    f.a.Axidraw.penPctToPos(t.penDownHeight)
                  );
              })(c.current, t, s.current);
              if (e) return o(e), (s.current = e), void (c.current = t);
            }
            u.current = e;
            const n = new m.a();
            r(!0),
              console.time("posting to worker"),
              n.postMessage({ paths: e, planOptions: t }),
              console.timeEnd("posting to worker");
            const i = (e) => {
              console.time("deserializing");
              const n = f.c.deserialize(e.data);
              console.timeEnd("deserializing"),
                o(n),
                (s.current = n),
                (c.current = t),
                r(!1);
            };
            return (
              n.addEventListener("message", i),
              () => {
                n.terminate(), n.removeEventListener("message", i), r(!1);
              }
            );
          }, [e, l(t)]),
          [n, i, o]
        );
      },
      N = (e) => {
        const t = new Set(),
          n = new Set();
        for (const r of e) t.add(r.stroke), n.add(r.groupId);
        const r = n.size > 1 ? "group" : "stroke",
          i = Array.from(n).sort(),
          a = Array.from(t).sort();
        return {
          type: "SET_PATHS",
          paths: e,
          groupLayers: i,
          strokeLayers: a,
          selectedGroupLayers: new Set(i),
          selectedStrokeLayers: new Set(a),
          layerMode: r,
        };
      };
    function M({ state: e, driver: t }) {
      const { penUpHeight: n, penDownHeight: r } = e.planOptions,
        i = Object(a.useContext)(S);
      return o.a.createElement(
        a.Fragment,
        null,
        o.a.createElement(
          "div",
          { className: "flex" },
          o.a.createElement(
            "label",
            { className: "pen-label" },
            "up height (%)",
            o.a.createElement("input", {
              type: "number",
              min: "0",
              max: "100",
              value: n,
              onChange: (e) =>
                ((e) =>
                  i({ type: "SET_PLAN_OPTION", value: { penUpHeight: e } }))(
                  parseInt(e.target.value, 10)
                ),
            })
          ),
          o.a.createElement(
            "label",
            { className: "pen-label" },
            "down height (%)",
            o.a.createElement("input", {
              type: "number",
              min: "0",
              max: "100",
              value: r,
              onChange: (e) =>
                ((e) =>
                  i({ type: "SET_PLAN_OPTION", value: { penDownHeight: e } }))(
                  parseInt(e.target.value, 10)
                ),
            })
          )
        ),
        o.a.createElement(
          "div",
          { className: "flex" },
          o.a.createElement(
            "button",
            {
              onClick: () => {
                const e = f.a.Axidraw.penPctToPos(n);
                t.setPenHeight(e, 1e3);
              },
            },
            "pen up"
          ),
          o.a.createElement(
            "button",
            {
              onClick: () => {
                const e = f.a.Axidraw.penPctToPos(r);
                t.setPenHeight(e, 1e3);
              },
            },
            "pen down"
          )
        )
      );
    }
    function I({ state: e }) {
      const t = Object(a.useContext)(S);
      return o.a.createElement(
        o.a.Fragment,
        null,
        o.a.createElement(
          "label",
          { title: "Width of lines in preview. Does not affect plot." },
          "visualized stroke width (mm)",
          o.a.createElement("input", {
            type: "number",
            value: e.visualizationOptions.penStrokeWidth,
            min: "0",
            max: "10",
            step: "0.1",
            onChange: (e) =>
              t({
                type: "SET_VISUALIZATION_OPTION",
                value: { penStrokeWidth: Number(e.target.value) },
              }),
          })
        ),
        o.a.createElement(
          "label",
          {
            className: "flex-checkbox",
            title:
              "Color paths in the preview based on the order in which they will be plotted. Yellow is first, pink is last.",
          },
          o.a.createElement("input", {
            type: "checkbox",
            checked: e.visualizationOptions.colorPathsByStrokeOrder,
            onChange: (e) =>
              t({
                type: "SET_VISUALIZATION_OPTION",
                value: { colorPathsByStrokeOrder: !!e.target.checked },
              }),
          }),
          "color based on order"
        )
      );
    }
    function z({ onClick: e }) {
      return o.a.createElement(
        "svg",
        {
          className: "paper-sizes__swap",
          xmlns: "http://www.w3.org/2000/svg",
          width: "14.05",
          height: "11.46",
          viewBox: "0 0 14.05 11.46",
          onClick: e,
        },
        o.a.createElement(
          "g",
          null,
          o.a.createElement("polygon", {
            points:
              "14.05 3.04 8.79 0 8.79 1.78 1.38 1.78 1.38 4.29 8.79 4.29 8.79 6.08 14.05 3.04",
          }),
          o.a.createElement("polygon", {
            points:
              "0 8.43 5.26 11.46 5.26 9.68 12.67 9.68 12.67 7.17 5.26 7.17 5.26 5.39 0 8.43",
          })
        )
      );
    }
    function L({ state: e }) {
      const t = Object(a.useContext)(S),
        n = e.planOptions.paperSize.isLandscape;
      function r(e, n) {
        t({
          type: "SET_PLAN_OPTION",
          value: { paperSize: new p.a({ x: e, y: n }) },
        });
      }
      const { paperSize: i } = e.planOptions,
        l =
          Object.keys(p.a.standard).find((e) => {
            const t = p.a.standard[e].size;
            return (
              (t.x === i.size.x && t.y === i.size.y) ||
              (t.y === i.size.x && t.x === i.size.y)
            );
          }) || "Custom";
      return o.a.createElement(
        "div",
        null,
        o.a.createElement(
          "select",
          {
            value: l,
            onChange: function (e) {
              const r = e.target.value;
              if ("Custom" !== r) {
                const e = p.a.standard[r][n ? "landscape" : "portrait"];
                t({ type: "SET_PLAN_OPTION", value: { paperSize: e } });
              }
            },
          },
          Object.keys(p.a.standard).map((e) =>
            o.a.createElement("option", { key: e }, e)
          ),
          o.a.createElement("option", null, "Custom")
        ),
        o.a.createElement(
          "div",
          { className: "paper-sizes" },
          o.a.createElement(
            "label",
            { className: "paper-label" },
            "width (mm)",
            o.a.createElement("input", {
              type: "number",
              value: i.size.x,
              onChange: (e) => r(Number(e.target.value), i.size.y),
            })
          ),
          o.a.createElement(z, {
            onClick: () => {
              t({
                type: "SET_PLAN_OPTION",
                value: { paperSize: i.isLandscape ? i.portrait : i.landscape },
              });
            },
          }),
          o.a.createElement(
            "label",
            { className: "paper-label" },
            "height (mm)",
            o.a.createElement("input", {
              type: "number",
              value: i.size.y,
              onChange: (e) => r(i.size.x, Number(e.target.value)),
            })
          )
        ),
        o.a.createElement(
          "div",
          null,
          o.a.createElement(
            "label",
            null,
            "rotate drawing (degrees)",
            o.a.createElement(
              "div",
              { className: "horizontal-labels" },
              o.a.createElement("img", {
                src: w.a,
                alt: "rotate drawing (degrees)",
              }),
              o.a.createElement("input", {
                type: "number",
                min: "-90",
                step: "90",
                max: "360",
                placeholder: "0",
                value: e.planOptions.rotateDrawing,
                onInput: (e) => {
                  let t = e.target.value;
                  Number(t) < 0 && (e.target.value = "270"),
                    Number(t) > 270 && (e.target.value = "0");
                },
                onChange: (e) =>
                  t({
                    type: "SET_PLAN_OPTION",
                    value: { rotateDrawing: e.target.value },
                  }),
              })
            )
          )
        ),
        o.a.createElement(
          "label",
          null,
          "margin (mm)",
          o.a.createElement("input", {
            type: "number",
            value: e.planOptions.marginMm,
            min: "0",
            max: Math.min(i.size.x / 2, i.size.y / 2),
            onChange: (e) =>
              t({
                type: "SET_PLAN_OPTION",
                value: { marginMm: Number(e.target.value) },
              }),
          })
        )
      );
    }
    function A({ driver: e }) {
      return o.a.createElement(
        "div",
        null,
        o.a.createElement(
          "button",
          { onClick: () => e.limp() },
          "disengage motors"
        )
      );
    }
    function D({ plan: e }) {
      return o.a.createElement(
        "div",
        { className: "duration" },
        o.a.createElement("div", null, "Duration"),
        o.a.createElement(
          "div",
          null,
          o.a.createElement(
            "strong",
            null,
            e && e.duration
              ? (function (e) {
                  const t = Math.floor(e / 60 / 60),
                    n = Math.floor((e - 60 * t * 60) / 60),
                    r = [
                      [t, "h"],
                      [n, "m"],
                      [Math.floor(e - 60 * t * 60 - 60 * n), "s"],
                    ];
                  return r
                    .slice(r.findIndex((e) => 0 !== e[0]))
                    .map(([e, t]) => `${e}${t}`)
                    .join("");
                })(e.duration())
              : "-"
          )
        )
      );
    }
    function j({ state: e, previewSize: t, plan: n }) {
      const r = e.planOptions.paperSize,
        i = e.visualizationOptions.penStrokeWidth * f.a.Axidraw.stepsPerMm,
        l = e.visualizationOptions.colorPathsByStrokeOrder,
        u = Object(a.useMemo)(() => {
          if (n) {
            const e = l
                ? s(c({ colormap: "spring" }))
                : () => "rgba(0, 0, 0, 0.8)",
              t = n.motions
                .map((e) =>
                  e instanceof f.d
                    ? e.blocks.map((e) => e.p1).concat([e.p2])
                    : []
                )
                .filter((e) => e.length);
            return o.a.createElement(
              "g",
              { transform: `scale(${1 / f.a.Axidraw.stepsPerMm})` },
              t.map((n, r) =>
                o.a.createElement("path", {
                  key: r,
                  d: n.reduce(
                    (e, { x: t, y: n }, r) =>
                      e + `${0 === r ? "M" : "L"}${t} ${n}`,
                    ""
                  ),
                  style:
                    r % 2 == 0
                      ? { stroke: "rgba(0, 0, 0, 0.3)", strokeWidth: 0.5 }
                      : { stroke: e(1 - r / t.length), strokeWidth: i },
                })
              )
            );
          }
        }, [n, i, l]),
        { width: d, height: p } =
          (r.size.x / r.size.y) * t.height <= t.width
            ? { width: (r.size.x / r.size.y) * t.height, height: t.height }
            : { height: (r.size.y / r.size.x) * t.width, width: t.width },
        [h, m] = Object(a.useState)(0);
      Object(a.useLayoutEffect)(() => {
        let t = null,
          n = !1;
        if (null != e.progress) {
          const e = Date.now(),
            r = () => {
              n || (m(Date.now() - e), (t = requestAnimationFrame(r)));
            };
          r();
        }
        return () => {
          (n = !0), null != t && cancelAnimationFrame(t), m(0);
        };
      }, [e.progress]);
      let g = null;
      if (null != e.progress && null != n) {
        const t = n.motion(e.progress),
          i =
            t instanceof f.d
              ? t.instant(Math.min(h / 1e3, t.duration())).p
              : n.motion(e.progress - 1).p2,
          { stepsPerMm: a } = f.a.Axidraw,
          l = i.x / a,
          u = i.y / a;
        g = o.a.createElement(
          "svg",
          {
            width: 2 * d,
            height: 2 * p,
            viewBox: `${-d} ${-p} ${2 * d} ${2 * p}`,
            style: {
              transform:
                "translateZ(0.001px) " +
                `translate(${-d}px, ${-p}px) ` +
                `translate(${(l / r.size.x) * 50}%,${(u / r.size.y) * 50}%)`,
            },
          },
          o.a.createElement(
            "g",
            null,
            o.a.createElement("path", {
              d: `M-${d} 0l${2 * d} 0M0 -${p}l0 ${2 * p}`,
              style: { stroke: "rgba(222, 114, 114, 0.6)", strokeWidth: 1 },
            }),
            o.a.createElement("path", {
              d: "M-10 0l20 0M0 -10l0 20",
              style: { stroke: "rgba(222, 114, 114, 1)", strokeWidth: 2 },
            })
          )
        );
      }
      const v = o.a.createElement(
        "g",
        null,
        o.a.createElement("rect", {
          x: e.planOptions.marginMm,
          y: e.planOptions.marginMm,
          width: r.size.x - 2 * e.planOptions.marginMm,
          height: r.size.y - 2 * e.planOptions.marginMm,
          fill: "none",
          stroke: "black",
          strokeWidth: "0.1",
          strokeDasharray: "1,1",
        })
      );
      return o.a.createElement(
        "div",
        { className: "preview" },
        o.a.createElement(
          "svg",
          { width: d, height: p, viewBox: `0 0 ${r.size.x} ${r.size.y}` },
          u,
          v
        ),
        g
      );
    }
    function R({ isLoadingFile: e, isPlanning: t }) {
      return e || t
        ? o.a.createElement(
            "div",
            { className: "preview-loader" },
            e ? "Loading file..." : "Replanning..."
          )
        : null;
    }
    function U({ state: e }) {
      const t = Object(a.useContext)(S),
        n =
          "group" === e.planOptions.layerMode ? e.groupLayers : e.strokeLayers,
        r =
          "group" === e.planOptions.layerMode
            ? e.planOptions.selectedGroupLayers
            : e.planOptions.selectedStrokeLayers;
      if (n.length <= 1) return null;
      const i =
        "group" === e.planOptions.layerMode
          ? (e) => {
              const n = new Set(
                [...e.target.selectedOptions].map((e) => e.value)
              );
              t({ type: "SET_PLAN_OPTION", value: { selectedGroupLayers: n } });
            }
          : (e) => {
              const n = new Set(
                [...e.target.selectedOptions].map((e) => e.value)
              );
              t({
                type: "SET_PLAN_OPTION",
                value: { selectedStrokeLayers: n },
              });
            };
      return o.a.createElement(
        "div",
        null,
        o.a.createElement(
          "label",
          null,
          "layers",
          o.a.createElement(
            "select",
            {
              className: "layer-select",
              multiple: !0,
              value: [...r],
              onChange: i,
              size: 3,
            },
            n.map((e) => o.a.createElement("option", { key: e }, e))
          )
        )
      );
    }
    function F({ state: e, plan: t, isPlanning: n, driver: r }) {
      return o.a.createElement(
        "div",
        null,
        n
          ? o.a.createElement(
              "button",
              { className: "replan-button", disabled: !0 },
              "Replanning..."
            )
          : o.a.createElement(
              "button",
              {
                className: `plot-button ${
                  null != e.progress ? "plot-button--plotting" : ""
                }`,
                disabled: null == t || null != e.progress,
                onClick: () =>
                  (function (e) {
                    r.plot(e);
                  })(t),
              },
              t && null != e.progress ? "Plotting..." : "Plot"
            ),
        o.a.createElement(
          "div",
          { className: "button-row" },
          o.a.createElement(
            "button",
            {
              className: `cancel-button ${
                null != e.progress ? "cancel-button--active" : ""
              }`,
              onClick: e.paused
                ? function () {
                    r.resume();
                  }
                : function () {
                    r.pause();
                  },
              disabled: null == t || null == e.progress,
            },
            e.paused ? "Resume" : "Pause"
          ),
          o.a.createElement(
            "button",
            {
              className: `cancel-button ${
                null != e.progress ? "cancel-button--active" : ""
              }`,
              onClick: function () {
                r.cancel();
              },
              disabled: null == t || null == e.progress,
            },
            "Cancel"
          )
        )
      );
    }
    function $() {
      const e = Object(a.useContext)(S);
      return o.a.createElement(
        "button",
        {
          className: "button-link",
          onClick: () => {
            window.localStorage.removeItem("planOptions"),
              e({ type: "SET_PLAN_OPTION", value: Object.assign({}, f.e) });
          },
        },
        "reset all options"
      );
    }
    function V({ state: e }) {
      const t = Object(a.useContext)(S);
      return o.a.createElement(
        "div",
        null,
        o.a.createElement(
          "label",
          {
            className: "flex-checkbox",
            title: "Re-order paths to minimize pen-up travel time",
          },
          o.a.createElement("input", {
            type: "checkbox",
            checked: e.planOptions.sortPaths,
            onChange: (e) =>
              t({
                type: "SET_PLAN_OPTION",
                value: { sortPaths: !!e.target.checked },
              }),
          }),
          "sort paths"
        ),
        o.a.createElement(
          "label",
          {
            className: "flex-checkbox",
            title: "Re-scale and position the image to fit on the page",
          },
          o.a.createElement("input", {
            type: "checkbox",
            checked: e.planOptions.fitPage,
            onChange: (e) =>
              t({
                type: "SET_PLAN_OPTION",
                value: { fitPage: !!e.target.checked },
              }),
          }),
          "fit page"
        ),
        e.planOptions.fitPage
          ? null
          : o.a.createElement(
              "label",
              {
                className: "flex-checkbox",
                title: "Remove lines that fall outside the margins",
              },
              o.a.createElement("input", {
                type: "checkbox",
                checked: e.planOptions.cropToMargins,
                onChange: (e) =>
                  t({
                    type: "SET_PLAN_OPTION",
                    value: { cropToMargins: !!e.target.checked },
                  }),
              }),
              "crop to margins"
            ),
        o.a.createElement(
          "label",
          {
            className: "flex-checkbox",
            title: "Split into layers according to group ID, instead of stroke",
          },
          o.a.createElement("input", {
            type: "checkbox",
            checked: "group" === e.planOptions.layerMode,
            onChange: (e) =>
              t({
                type: "SET_PLAN_OPTION",
                value: { layerMode: e.target.checked ? "group" : "stroke" },
              }),
          }),
          "layer by group"
        ),
        o.a.createElement(
          "div",
          { className: "horizontal-labels" },
          o.a.createElement(
            "label",
            { title: "point-joining radius (mm)" },
            o.a.createElement("img", {
              src: y.a,
              alt: "point-joining radius (mm)",
            }),
            o.a.createElement("input", {
              type: "number",
              value: e.planOptions.pointJoinRadius,
              step: "0.1",
              min: "0",
              onChange: (e) =>
                t({
                  type: "SET_PLAN_OPTION",
                  value: { pointJoinRadius: Number(e.target.value) },
                }),
            })
          ),
          o.a.createElement(
            "label",
            { title: "path-joining radius (mm)" },
            o.a.createElement("img", {
              src: v.a,
              alt: "path-joining radius (mm)",
            }),
            o.a.createElement("input", {
              type: "number",
              value: e.planOptions.pathJoinRadius,
              step: "0.1",
              min: "0",
              onChange: (e) =>
                t({
                  type: "SET_PLAN_OPTION",
                  value: { pathJoinRadius: Number(e.target.value) },
                }),
            })
          )
        ),
        o.a.createElement(
          "div",
          null,
          o.a.createElement(
            "label",
            { title: "Remove paths that are shorter than this length (in mm)" },
            "minimum path length",
            o.a.createElement("input", {
              type: "number",
              value: e.planOptions.minimumPathLength,
              step: "0.1",
              min: "0",
              onChange: (e) =>
                t({
                  type: "SET_PLAN_OPTION",
                  value: { minimumPathLength: Number(e.target.value) },
                }),
            })
          ),
          o.a.createElement(
            "div",
            { className: "flex" },
            o.a.createElement(
              "label",
              { title: "Acceleration when the pen is down (in mm/s^2)" },
              "down acc. (mm/s",
              o.a.createElement("sup", null, "2"),
              ")",
              o.a.createElement("input", {
                type: "number",
                value: e.planOptions.penDownAcceleration,
                step: "0.1",
                min: "0",
                onChange: (e) =>
                  t({
                    type: "SET_PLAN_OPTION",
                    value: { penDownAcceleration: Number(e.target.value) },
                  }),
              })
            ),
            o.a.createElement(
              "label",
              { title: "Maximum velocity when the pen is down (in mm/s)" },
              "down max vel. (mm/s)",
              o.a.createElement("input", {
                type: "number",
                value: e.planOptions.penDownMaxVelocity,
                step: "0.1",
                min: "0",
                onChange: (e) =>
                  t({
                    type: "SET_PLAN_OPTION",
                    value: { penDownMaxVelocity: Number(e.target.value) },
                  }),
              })
            )
          ),
          o.a.createElement(
            "label",
            null,
            "cornering factor",
            o.a.createElement("input", {
              type: "number",
              value: e.planOptions.penDownCorneringFactor,
              step: "0.01",
              min: "0",
              onChange: (e) =>
                t({
                  type: "SET_PLAN_OPTION",
                  value: { penDownCorneringFactor: Number(e.target.value) },
                }),
            })
          ),
          o.a.createElement(
            "div",
            { className: "flex" },
            o.a.createElement(
              "label",
              { title: "Acceleration when the pen is up (in mm/s^2)" },
              "up acc. (mm/s",
              o.a.createElement("sup", null, "2"),
              ")",
              o.a.createElement("input", {
                type: "number",
                value: e.planOptions.penUpAcceleration,
                step: "0.1",
                min: "0",
                onChange: (e) =>
                  t({
                    type: "SET_PLAN_OPTION",
                    value: { penUpAcceleration: Number(e.target.value) },
                  }),
              })
            ),
            o.a.createElement(
              "label",
              { title: "Maximum velocity when the pen is up (in mm/s)" },
              "up max vel. (mm/s)",
              o.a.createElement("input", {
                type: "number",
                value: e.planOptions.penUpMaxVelocity,
                step: "0.1",
                min: "0",
                onChange: (e) =>
                  t({
                    type: "SET_PLAN_OPTION",
                    value: { penUpMaxVelocity: Number(e.target.value) },
                  }),
              })
            )
          ),
          o.a.createElement(
            "div",
            { className: "flex" },
            o.a.createElement(
              "label",
              { title: "How long the pen takes to lift (in seconds)" },
              "pen lift duration (s)",
              o.a.createElement("input", {
                type: "number",
                value: e.planOptions.penLiftDuration,
                step: "0.01",
                min: "0",
                onChange: (e) =>
                  t({
                    type: "SET_PLAN_OPTION",
                    value: { penLiftDuration: Number(e.target.value) },
                  }),
              })
            ),
            o.a.createElement(
              "label",
              { title: "How long the pen takes to drop (in seconds)" },
              "pen drop duration (s)",
              o.a.createElement("input", {
                type: "number",
                value: e.planOptions.penDropDuration,
                step: "0.01",
                min: "0",
                onChange: (e) =>
                  t({
                    type: "SET_PLAN_OPTION",
                    value: { penDropDuration: Number(e.target.value) },
                  }),
              })
            )
          )
        )
      );
    }
    function W({ driver: e, setDriver: t }) {
      const [n, r] = Object(a.useState)(!1);
      return (
        Object(a.useEffect)(() => {
          (() =>
            _(this, void 0, void 0, function* () {
              try {
                const e = yield navigator.serial.getPorts();
                e.length > 0 &&
                  (console.log("connecting to", e[0]),
                  t(yield P.connect(e[0])));
              } finally {
                r(!1);
              }
            }))();
        }, []),
        o.a.createElement(
          o.a.Fragment,
          null,
          e ? `Connected: ${e.name()}` : null,
          e
            ? null
            : o.a.createElement(
                "button",
                {
                  disabled: n,
                  onClick: () =>
                    _(this, void 0, void 0, function* () {
                      try {
                        const n = yield navigator.serial.requestPort({
                          filters: [{ usbVendorId: 1240, usbProductId: 64914 }],
                        });
                        e && (yield e.close()), t(yield P.connect(n));
                      } catch (e) {
                        alert(
                          `Failed to connect to serial device: ${e.message}`
                        ),
                          console.error(e);
                      }
                    }),
                },
                n ? "Connecting..." : e ? "Change Port" : "Connect"
              )
        )
      );
    }
    function H() {
      return o.a.createElement(
        "div",
        { className: "drag-target" },
        o.a.createElement(
          "div",
          { className: "drag-target-message" },
          "Loading..."
        )
      );
    }
    function B(e) {
      return (function (e, t) {
        const n = document.createElement("div");
        (n.style.position = "absolute"),
          (n.style.left = "99999px"),
          document.body.appendChild(n);
        try {
          return (n.innerHTML = e), t(n.querySelector("svg"));
        } finally {
          n.remove();
        }
      })(e, d.flattenSVG).map((e) => {
        const t = e.points.map(([e, t]) => ({ x: e, y: t }));
        return (t.stroke = e.stroke), (t.groupId = e.groupId), t;
      });
    }
    u.a.render(
      o.a.createElement(function () {
        const [e, t] = Object(a.useState)(null),
          [n, r] = Object(a.useReducer)(C, E),
          [l, u, s] = O(n.paths, n.planOptions),
          [c, d] = Object(a.useState)(!1);
        Object(a.useEffect)(() => {
          window.localStorage.setItem(
            "planOptions",
            JSON.stringify(n.planOptions)
          );
        }, [n.planOptions]),
          Object(a.useEffect)(() => {
            null != e &&
              ((e.onprogress = (e) => {
                r({ type: "SET_PROGRESS", motionIdx: e });
              }),
              (e.oncancelled = e.onfinished =
                () => {
                  r({ type: "SET_PROGRESS", motionIdx: null });
                }),
              (e.onconnectionchange = (e) => {
                r({ type: "SET_CONNECTED", connected: e });
              }),
              (e.ondevinfo = (e) => {
                r({ type: "SET_DEVICE_INFO", value: e });
              }),
              (e.onpause = (e) => {
                r({ type: "SET_PAUSED", value: e });
              }),
              (e.onplan = (e) => {
                s(e);
              }));
          }, [e]),
          Object(a.useEffect)(() => {
            const e = (e) => {
                e.preventDefault();
                const t = e.dataTransfer.items[0].getAsFile(),
                  n = new FileReader();
                d(!0),
                  s(null),
                  (n.onload = () => {
                    r(N(B(n.result))),
                      document.body.classList.remove("dragover"),
                      d(!1);
                  }),
                  (n.onerror = () => {
                    d(!1);
                  }),
                  n.readAsText(t);
              },
              t = (e) => {
                e.preventDefault(), document.body.classList.add("dragover");
              },
              n = (e) => {
                e.preventDefault(), document.body.classList.remove("dragover");
              },
              i = (e) => {
                e.clipboardData.items[0].getAsString((e) => {
                  r(N(B(e)));
                });
              };
            return (
              document.body.addEventListener("drop", e),
              document.body.addEventListener("dragover", t),
              document.body.addEventListener("dragleave", n),
              document.addEventListener("paste", i),
              () => {
                document.body.removeEventListener("drop", e),
                  document.body.removeEventListener("dragover", t),
                  document.body.removeEventListener("dragleave", n),
                  document.removeEventListener("paste", i);
              }
            );
          });
        const p = Object(a.useRef)(null),
          f = i()(p),
          h = !u && !c && !l;
        return o.a.createElement(
          S.Provider,
          { value: r },
          o.a.createElement(
            "div",
            { className: `root ${n.connected ? "connected" : "disconnected"}` },
            o.a.createElement(
              "div",
              { className: "control-panel" },
              o.a.createElement(
                "div",
                {
                  className: "saxi-title red",
                  title: n.deviceInfo ? n.deviceInfo.path : null,
                },
                o.a.createElement(
                  "span",
                  { className: "red reg" },
                  "plottables.io"
                )
              ),
              o.a.createElement(W, { driver: e, setDriver: t }),
              n.connected
                ? null
                : o.a.createElement(
                    "div",
                    { className: "info-disconnected" },
                    "disconnected"
                  ),
              o.a.createElement("div", { className: "section-header" }, "pen"),
              o.a.createElement(
                "div",
                { className: "section-body" },
                o.a.createElement(M, { state: n, driver: e }),
                o.a.createElement(A, { driver: e }),
                o.a.createElement($, null)
              ),
              o.a.createElement(
                "div",
                { className: "section-header" },
                "paper"
              ),
              o.a.createElement(
                "div",
                { className: "section-body" },
                o.a.createElement(L, { state: n }),
                o.a.createElement(U, { state: n })
              ),
              o.a.createElement(
                "details",
                null,
                o.a.createElement(
                  "summary",
                  { className: "section-header" },
                  "more"
                ),
                o.a.createElement(
                  "div",
                  { className: "section-body" },
                  o.a.createElement(V, { state: n }),
                  o.a.createElement(I, { state: n })
                )
              ),
              o.a.createElement("div", { className: "spacer" }),
              o.a.createElement(
                "div",
                { className: "control-panel-bottom" },
                o.a.createElement(
                  "div",
                  { className: "section-header" },
                  "plot"
                ),
                o.a.createElement(
                  "div",
                  { className: "section-body section-body__plot" },
                  o.a.createElement(D, { plan: u }),
                  o.a.createElement(F, {
                    plan: u,
                    isPlanning: l,
                    state: n,
                    driver: e,
                  })
                )
              )
            ),
            o.a.createElement(
              "div",
              { className: "preview-area", ref: p },
              o.a.createElement(j, {
                state: n,
                previewSize: {
                  width: Math.max(0, f.width - 40),
                  height: Math.max(0, f.height - 40),
                },
                plan: u,
              }),
              o.a.createElement(R, { isPlanning: l, isLoadingFile: c }),
              h ? o.a.createElement(H, null) : null
            )
          )
        );
      }, null),
      document.getElementById("app")
    );
  },
]);
//# sourceMappingURL=main.js.map
