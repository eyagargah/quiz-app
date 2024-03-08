"use strict";
(self.webpackChunkquiz_app = self.webpackChunkquiz_app || []).push([
  [179],
  {
    99: () => {
      function fe(n) {
        return "function" == typeof n;
      }
      function po(n) {
        const e = n((i) => {
          Error.call(i), (i.stack = new Error().stack);
        });
        return (
          (e.prototype = Object.create(Error.prototype)),
          (e.prototype.constructor = e),
          e
        );
      }
      const qs = po(
        (n) =>
          function (e) {
            n(this),
              (this.message = e
                ? `${e.length} errors occurred during unsubscription:\n${e
                    .map((i, r) => `${r + 1}) ${i.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = e);
          }
      );
      function ir(n, t) {
        if (n) {
          const e = n.indexOf(t);
          0 <= e && n.splice(e, 1);
        }
      }
      class tt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: e } = this;
            if (e)
              if (((this._parentage = null), Array.isArray(e)))
                for (const o of e) o.remove(this);
              else e.remove(this);
            const { initialTeardown: i } = this;
            if (fe(i))
              try {
                i();
              } catch (o) {
                t = o instanceof qs ? o.errors : [o];
              }
            const { _finalizers: r } = this;
            if (r) {
              this._finalizers = null;
              for (const o of r)
                try {
                  zf(o);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof qs ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new qs(t);
          }
        }
        add(t) {
          var e;
          if (t && t !== this)
            if (this.closed) zf(t);
            else {
              if (t instanceof tt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (e = this._finalizers) && void 0 !== e ? e : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: e } = this;
          return e === t || (Array.isArray(e) && e.includes(t));
        }
        _addParent(t) {
          const { _parentage: e } = this;
          this._parentage = Array.isArray(e) ? (e.push(t), e) : e ? [e, t] : t;
        }
        _removeParent(t) {
          const { _parentage: e } = this;
          e === t ? (this._parentage = null) : Array.isArray(e) && ir(e, t);
        }
        remove(t) {
          const { _finalizers: e } = this;
          e && ir(e, t), t instanceof tt && t._removeParent(this);
        }
      }
      tt.EMPTY = (() => {
        const n = new tt();
        return (n.closed = !0), n;
      })();
      const Hf = tt.EMPTY;
      function Uf(n) {
        return (
          n instanceof tt ||
          (n && "closed" in n && fe(n.remove) && fe(n.add) && fe(n.unsubscribe))
        );
      }
      function zf(n) {
        fe(n) ? n() : n.unsubscribe();
      }
      const Ei = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Gs = {
          setTimeout(n, t, ...e) {
            const { delegate: i } = Gs;
            return i?.setTimeout
              ? i.setTimeout(n, t, ...e)
              : setTimeout(n, t, ...e);
          },
          clearTimeout(n) {
            const { delegate: t } = Gs;
            return (t?.clearTimeout || clearTimeout)(n);
          },
          delegate: void 0,
        };
      function $f(n) {
        Gs.setTimeout(() => {
          const { onUnhandledError: t } = Ei;
          if (!t) throw n;
          t(n);
        });
      }
      function Pc() {}
      const eM = Nc("C", void 0, void 0);
      function Nc(n, t, e) {
        return { kind: n, value: t, error: e };
      }
      let Si = null;
      function Ws(n) {
        if (Ei.useDeprecatedSynchronousErrorHandling) {
          const t = !Si;
          if ((t && (Si = { errorThrown: !1, error: null }), n(), t)) {
            const { errorThrown: e, error: i } = Si;
            if (((Si = null), e)) throw i;
          }
        } else n();
      }
      class Lc extends tt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Uf(t) && t.add(this))
              : (this.destination = aM);
        }
        static create(t, e, i) {
          return new go(t, e, i);
        }
        next(t) {
          this.isStopped
            ? Bc(
                (function nM(n) {
                  return Nc("N", n, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Bc(
                (function tM(n) {
                  return Nc("E", void 0, n);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Bc(eM, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const rM = Function.prototype.bind;
      function Vc(n, t) {
        return rM.call(n, t);
      }
      class oM {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: e } = this;
          if (e.next)
            try {
              e.next(t);
            } catch (i) {
              Ks(i);
            }
        }
        error(t) {
          const { partialObserver: e } = this;
          if (e.error)
            try {
              e.error(t);
            } catch (i) {
              Ks(i);
            }
          else Ks(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (e) {
              Ks(e);
            }
        }
      }
      class go extends Lc {
        constructor(t, e, i) {
          let r;
          if ((super(), fe(t) || !t))
            r = {
              next: t ?? void 0,
              error: e ?? void 0,
              complete: i ?? void 0,
            };
          else {
            let o;
            this && Ei.useDeprecatedNextContext
              ? ((o = Object.create(t)),
                (o.unsubscribe = () => this.unsubscribe()),
                (r = {
                  next: t.next && Vc(t.next, o),
                  error: t.error && Vc(t.error, o),
                  complete: t.complete && Vc(t.complete, o),
                }))
              : (r = t);
          }
          this.destination = new oM(r);
        }
      }
      function Ks(n) {
        Ei.useDeprecatedSynchronousErrorHandling
          ? (function iM(n) {
              Ei.useDeprecatedSynchronousErrorHandling &&
                Si &&
                ((Si.errorThrown = !0), (Si.error = n));
            })(n)
          : $f(n);
      }
      function Bc(n, t) {
        const { onStoppedNotification: e } = Ei;
        e && Gs.setTimeout(() => e(n, t));
      }
      const aM = {
          closed: !0,
          next: Pc,
          error: function sM(n) {
            throw n;
          },
          complete: Pc,
        },
        jc =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function ni(n) {
        return n;
      }
      function qf(n) {
        return 0 === n.length
          ? ni
          : 1 === n.length
          ? n[0]
          : function (e) {
              return n.reduce((i, r) => r(i), e);
            };
      }
      let Ee = (() => {
        class n {
          constructor(e) {
            e && (this._subscribe = e);
          }
          lift(e) {
            const i = new n();
            return (i.source = this), (i.operator = e), i;
          }
          subscribe(e, i, r) {
            const o = (function dM(n) {
              return (
                (n && n instanceof Lc) ||
                ((function cM(n) {
                  return n && fe(n.next) && fe(n.error) && fe(n.complete);
                })(n) &&
                  Uf(n))
              );
            })(e)
              ? e
              : new go(e, i, r);
            return (
              Ws(() => {
                const { operator: s, source: a } = this;
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                );
              }),
              o
            );
          }
          _trySubscribe(e) {
            try {
              return this._subscribe(e);
            } catch (i) {
              e.error(i);
            }
          }
          forEach(e, i) {
            return new (i = Gf(i))((r, o) => {
              const s = new go({
                next: (a) => {
                  try {
                    e(a);
                  } catch (l) {
                    o(l), s.unsubscribe();
                  }
                },
                error: o,
                complete: r,
              });
              this.subscribe(s);
            });
          }
          _subscribe(e) {
            var i;
            return null === (i = this.source) || void 0 === i
              ? void 0
              : i.subscribe(e);
          }
          [jc]() {
            return this;
          }
          pipe(...e) {
            return qf(e)(this);
          }
          toPromise(e) {
            return new (e = Gf(e))((i, r) => {
              let o;
              this.subscribe(
                (s) => (o = s),
                (s) => r(s),
                () => i(o)
              );
            });
          }
        }
        return (n.create = (t) => new n(t)), n;
      })();
      function Gf(n) {
        var t;
        return null !== (t = n ?? Ei.Promise) && void 0 !== t ? t : Promise;
      }
      const uM = po(
        (n) =>
          function () {
            n(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let qe = (() => {
        class n extends Ee {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(e) {
            const i = new Wf(this, this);
            return (i.operator = e), i;
          }
          _throwIfClosed() {
            if (this.closed) throw new uM();
          }
          next(e) {
            Ws(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const i of this.currentObservers) i.next(e);
              }
            });
          }
          error(e) {
            Ws(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = e);
                const { observers: i } = this;
                for (; i.length; ) i.shift().error(e);
              }
            });
          }
          complete() {
            Ws(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: e } = this;
                for (; e.length; ) e.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var e;
            return (
              (null === (e = this.observers) || void 0 === e
                ? void 0
                : e.length) > 0
            );
          }
          _trySubscribe(e) {
            return this._throwIfClosed(), super._trySubscribe(e);
          }
          _subscribe(e) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(e),
              this._innerSubscribe(e)
            );
          }
          _innerSubscribe(e) {
            const { hasError: i, isStopped: r, observers: o } = this;
            return i || r
              ? Hf
              : ((this.currentObservers = null),
                o.push(e),
                new tt(() => {
                  (this.currentObservers = null), ir(o, e);
                }));
          }
          _checkFinalizedStatuses(e) {
            const { hasError: i, thrownError: r, isStopped: o } = this;
            i ? e.error(r) : o && e.complete();
          }
          asObservable() {
            const e = new Ee();
            return (e.source = this), e;
          }
        }
        return (n.create = (t, e) => new Wf(t, e)), n;
      })();
      class Wf extends qe {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          var e, i;
          null ===
            (i =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.next) ||
            void 0 === i ||
            i.call(e, t);
        }
        error(t) {
          var e, i;
          null ===
            (i =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.error) ||
            void 0 === i ||
            i.call(e, t);
        }
        complete() {
          var t, e;
          null ===
            (e =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === e ||
            e.call(t);
        }
        _subscribe(t) {
          var e, i;
          return null !==
            (i =
              null === (e = this.source) || void 0 === e
                ? void 0
                : e.subscribe(t)) && void 0 !== i
            ? i
            : Hf;
        }
      }
      function Kf(n) {
        return fe(n?.lift);
      }
      function ke(n) {
        return (t) => {
          if (Kf(t))
            return t.lift(function (e) {
              try {
                return n(e, this);
              } catch (i) {
                this.error(i);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Se(n, t, e, i, r) {
        return new hM(n, t, e, i, r);
      }
      class hM extends Lc {
        constructor(t, e, i, r, o, s) {
          super(t),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = e
              ? function (a) {
                  try {
                    e(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = r
              ? function (a) {
                  try {
                    r(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = i
              ? function () {
                  try {
                    i();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: e } = this;
            super.unsubscribe(),
              !e &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function V(n, t) {
        return ke((e, i) => {
          let r = 0;
          e.subscribe(
            Se(i, (o) => {
              i.next(n.call(t, o, r++));
            })
          );
        });
      }
      function ii(n) {
        return this instanceof ii ? ((this.v = n), this) : new ii(n);
      }
      function Xf(n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var e,
          t = n[Symbol.asyncIterator];
        return t
          ? t.call(n)
          : ((n = (function $c(n) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                e = t && n[t],
                i = 0;
              if (e) return e.call(n);
              if (n && "number" == typeof n.length)
                return {
                  next: function () {
                    return (
                      n && i >= n.length && (n = void 0),
                      { value: n && n[i++], done: !n }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(n)),
            (e = {}),
            i("next"),
            i("throw"),
            i("return"),
            (e[Symbol.asyncIterator] = function () {
              return this;
            }),
            e);
        function i(o) {
          e[o] =
            n[o] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function r(o, s, a, l) {
                  Promise.resolve(l).then(function (c) {
                    o({ value: c, done: a });
                  }, s);
                })(a, l, (s = n[o](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const Jf = (n) =>
        n && "number" == typeof n.length && "function" != typeof n;
      function ep(n) {
        return fe(n?.then);
      }
      function tp(n) {
        return fe(n[jc]);
      }
      function np(n) {
        return Symbol.asyncIterator && fe(n?.[Symbol.asyncIterator]);
      }
      function ip(n) {
        return new TypeError(
          `You provided ${
            null !== n && "object" == typeof n ? "an invalid object" : `'${n}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const rp = (function FM() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function op(n) {
        return fe(n?.[rp]);
      }
      function sp(n) {
        return (function Yf(n, t, e) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var r,
            i = e.apply(n, t || []),
            o = [];
          return (
            (r = {}),
            s("next"),
            s("throw"),
            s("return"),
            (r[Symbol.asyncIterator] = function () {
              return this;
            }),
            r
          );
          function s(h) {
            i[h] &&
              (r[h] = function (m) {
                return new Promise(function (f, p) {
                  o.push([h, m, f, p]) > 1 || a(h, m);
                });
              });
          }
          function a(h, m) {
            try {
              !(function l(h) {
                h.value instanceof ii
                  ? Promise.resolve(h.value.v).then(c, d)
                  : u(o[0][2], h);
              })(i[h](m));
            } catch (f) {
              u(o[0][3], f);
            }
          }
          function c(h) {
            a("next", h);
          }
          function d(h) {
            a("throw", h);
          }
          function u(h, m) {
            h(m), o.shift(), o.length && a(o[0][0], o[0][1]);
          }
        })(this, arguments, function* () {
          const e = n.getReader();
          try {
            for (;;) {
              const { value: i, done: r } = yield ii(e.read());
              if (r) return yield ii(void 0);
              yield yield ii(i);
            }
          } finally {
            e.releaseLock();
          }
        });
      }
      function ap(n) {
        return fe(n?.getReader);
      }
      function Lt(n) {
        if (n instanceof Ee) return n;
        if (null != n) {
          if (tp(n))
            return (function PM(n) {
              return new Ee((t) => {
                const e = n[jc]();
                if (fe(e.subscribe)) return e.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(n);
          if (Jf(n))
            return (function NM(n) {
              return new Ee((t) => {
                for (let e = 0; e < n.length && !t.closed; e++) t.next(n[e]);
                t.complete();
              });
            })(n);
          if (ep(n))
            return (function LM(n) {
              return new Ee((t) => {
                n.then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                ).then(null, $f);
              });
            })(n);
          if (np(n)) return lp(n);
          if (op(n))
            return (function VM(n) {
              return new Ee((t) => {
                for (const e of n) if ((t.next(e), t.closed)) return;
                t.complete();
              });
            })(n);
          if (ap(n))
            return (function BM(n) {
              return lp(sp(n));
            })(n);
        }
        throw ip(n);
      }
      function lp(n) {
        return new Ee((t) => {
          (function jM(n, t) {
            var e, i, r, o;
            return (function Qf(n, t, e, i) {
              return new (e || (e = Promise))(function (o, s) {
                function a(d) {
                  try {
                    c(i.next(d));
                  } catch (u) {
                    s(u);
                  }
                }
                function l(d) {
                  try {
                    c(i.throw(d));
                  } catch (u) {
                    s(u);
                  }
                }
                function c(d) {
                  d.done
                    ? o(d.value)
                    : (function r(o) {
                        return o instanceof e
                          ? o
                          : new e(function (s) {
                              s(o);
                            });
                      })(d.value).then(a, l);
                }
                c((i = i.apply(n, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (e = Xf(n); !(i = yield e.next()).done; )
                  if ((t.next(i.value), t.closed)) return;
              } catch (s) {
                r = { error: s };
              } finally {
                try {
                  i && !i.done && (o = e.return) && (yield o.call(e));
                } finally {
                  if (r) throw r.error;
                }
              }
              t.complete();
            });
          })(n, t).catch((e) => t.error(e));
        });
      }
      function An(n, t, e, i = 0, r = !1) {
        const o = t.schedule(function () {
          e(), r ? n.add(this.schedule(null, i)) : this.unsubscribe();
        }, i);
        if ((n.add(o), !r)) return o;
      }
      function We(n, t, e = 1 / 0) {
        return fe(t)
          ? We((i, r) => V((o, s) => t(i, o, r, s))(Lt(n(i, r))), e)
          : ("number" == typeof t && (e = t),
            ke((i, r) =>
              (function HM(n, t, e, i, r, o, s, a) {
                const l = [];
                let c = 0,
                  d = 0,
                  u = !1;
                const h = () => {
                    u && !l.length && !c && t.complete();
                  },
                  m = (p) => (c < i ? f(p) : l.push(p)),
                  f = (p) => {
                    o && t.next(p), c++;
                    let g = !1;
                    Lt(e(p, d++)).subscribe(
                      Se(
                        t,
                        (y) => {
                          r?.(y), o ? m(y) : t.next(y);
                        },
                        () => {
                          g = !0;
                        },
                        void 0,
                        () => {
                          if (g)
                            try {
                              for (c--; l.length && c < i; ) {
                                const y = l.shift();
                                s ? An(t, s, () => f(y)) : f(y);
                              }
                              h();
                            } catch (y) {
                              t.error(y);
                            }
                        }
                      )
                    );
                  };
                return (
                  n.subscribe(
                    Se(t, m, () => {
                      (u = !0), h();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(i, r, n, e)
            ));
      }
      function rr(n = 1 / 0) {
        return We(ni, n);
      }
      const un = new Ee((n) => n.complete());
      function qc(n) {
        return n[n.length - 1];
      }
      function _o(n) {
        return (function zM(n) {
          return n && fe(n.schedule);
        })(qc(n))
          ? n.pop()
          : void 0;
      }
      function dp(n, t = 0) {
        return ke((e, i) => {
          e.subscribe(
            Se(
              i,
              (r) => An(i, n, () => i.next(r), t),
              () => An(i, n, () => i.complete(), t),
              (r) => An(i, n, () => i.error(r), t)
            )
          );
        });
      }
      function up(n, t = 0) {
        return ke((e, i) => {
          i.add(n.schedule(() => e.subscribe(i), t));
        });
      }
      function hp(n, t) {
        if (!n) throw new Error("Iterable cannot be null");
        return new Ee((e) => {
          An(e, t, () => {
            const i = n[Symbol.asyncIterator]();
            An(
              e,
              t,
              () => {
                i.next().then((r) => {
                  r.done ? e.complete() : e.next(r.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Pe(n, t) {
        return t
          ? (function ZM(n, t) {
              if (null != n) {
                if (tp(n))
                  return (function qM(n, t) {
                    return Lt(n).pipe(up(t), dp(t));
                  })(n, t);
                if (Jf(n))
                  return (function WM(n, t) {
                    return new Ee((e) => {
                      let i = 0;
                      return t.schedule(function () {
                        i === n.length
                          ? e.complete()
                          : (e.next(n[i++]), e.closed || this.schedule());
                      });
                    });
                  })(n, t);
                if (ep(n))
                  return (function GM(n, t) {
                    return Lt(n).pipe(up(t), dp(t));
                  })(n, t);
                if (np(n)) return hp(n, t);
                if (op(n))
                  return (function KM(n, t) {
                    return new Ee((e) => {
                      let i;
                      return (
                        An(e, t, () => {
                          (i = n[rp]()),
                            An(
                              e,
                              t,
                              () => {
                                let r, o;
                                try {
                                  ({ value: r, done: o } = i.next());
                                } catch (s) {
                                  return void e.error(s);
                                }
                                o ? e.complete() : e.next(r);
                              },
                              0,
                              !0
                            );
                        }),
                        () => fe(i?.return) && i.return()
                      );
                    });
                  })(n, t);
                if (ap(n))
                  return (function QM(n, t) {
                    return hp(sp(n), t);
                  })(n, t);
              }
              throw ip(n);
            })(n, t)
          : Lt(n);
      }
      function Gc(n, t, ...e) {
        if (!0 === t) return void n();
        if (!1 === t) return;
        const i = new go({
          next: () => {
            i.unsubscribe(), n();
          },
        });
        return t(...e).subscribe(i);
      }
      function he(n) {
        for (let t in n) if (n[t] === he) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Wc(n, t) {
        for (const e in t)
          t.hasOwnProperty(e) && !n.hasOwnProperty(e) && (n[e] = t[e]);
      }
      function pe(n) {
        if ("string" == typeof n) return n;
        if (Array.isArray(n)) return "[" + n.map(pe).join(", ") + "]";
        if (null == n) return "" + n;
        if (n.overriddenName) return `${n.overriddenName}`;
        if (n.name) return `${n.name}`;
        const t = n.toString();
        if (null == t) return "" + t;
        const e = t.indexOf("\n");
        return -1 === e ? t : t.substring(0, e);
      }
      function Kc(n, t) {
        return null == n || "" === n
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? n
          : n + " " + t;
      }
      const YM = he({ __forward_ref__: he });
      function le(n) {
        return (
          (n.__forward_ref__ = le),
          (n.toString = function () {
            return pe(this());
          }),
          n
        );
      }
      function F(n) {
        return Qc(n) ? n() : n;
      }
      function Qc(n) {
        return (
          "function" == typeof n &&
          n.hasOwnProperty(YM) &&
          n.__forward_ref__ === le
        );
      }
      function Zc(n) {
        return n && !!n.ɵproviders;
      }
      const Qs = "https://g.co/ng/security#xss";
      class v extends Error {
        constructor(t, e) {
          super(Zs(t, e)), (this.code = t);
        }
      }
      function Zs(n, t) {
        return `NG0${Math.abs(n)}${t ? ": " + t.trim() : ""}`;
      }
      function j(n) {
        return "string" == typeof n ? n : null == n ? "" : String(n);
      }
      function Ys(n, t) {
        throw new v(-201, !1);
      }
      function Vt(n, t) {
        null == n &&
          (function se(n, t, e, i) {
            throw new Error(
              `ASSERTION ERROR: ${n}` +
                (null == i ? "" : ` [Expected=> ${e} ${i} ${t} <=Actual]`)
            );
          })(t, n, null, "!=");
      }
      function I(n) {
        return {
          token: n.token,
          providedIn: n.providedIn || null,
          factory: n.factory,
          value: void 0,
        };
      }
      function be(n) {
        return { providers: n.providers || [], imports: n.imports || [] };
      }
      function Xs(n) {
        return pp(n, Js) || pp(n, _p);
      }
      function pp(n, t) {
        return n.hasOwnProperty(t) ? n[t] : null;
      }
      function gp(n) {
        return n && (n.hasOwnProperty(Yc) || n.hasOwnProperty(oE))
          ? n[Yc]
          : null;
      }
      const Js = he({ ɵprov: he }),
        Yc = he({ ɵinj: he }),
        _p = he({ ngInjectableDef: he }),
        oE = he({ ngInjectorDef: he });
      var P = (() => (
        ((P = P || {})[(P.Default = 0)] = "Default"),
        (P[(P.Host = 1)] = "Host"),
        (P[(P.Self = 2)] = "Self"),
        (P[(P.SkipSelf = 4)] = "SkipSelf"),
        (P[(P.Optional = 8)] = "Optional"),
        P
      ))();
      let Xc;
      function Bt(n) {
        const t = Xc;
        return (Xc = n), t;
      }
      function bp(n, t, e) {
        const i = Xs(n);
        return i && "root" == i.providedIn
          ? void 0 === i.value
            ? (i.value = i.factory())
            : i.value
          : e & P.Optional
          ? null
          : void 0 !== t
          ? t
          : void Ys(pe(n));
      }
      const ve = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        bo = {},
        Jc = "__NG_DI_FLAG__",
        ea = "ngTempTokenPath",
        aE = "ngTokenPath",
        lE = /\n/gm,
        cE = "\u0275",
        vp = "__source";
      let vo;
      function or(n) {
        const t = vo;
        return (vo = n), t;
      }
      function dE(n, t = P.Default) {
        if (void 0 === vo) throw new v(-203, !1);
        return null === vo
          ? bp(n, void 0, t)
          : vo.get(n, t & P.Optional ? null : void 0, t);
      }
      function D(n, t = P.Default) {
        return (
          (function sE() {
            return Xc;
          })() || dE
        )(F(n), t);
      }
      function q(n, t = P.Default) {
        return D(n, ta(t));
      }
      function ta(n) {
        return typeof n > "u" || "number" == typeof n
          ? n
          : 0 |
              (n.optional && 8) |
              (n.host && 1) |
              (n.self && 2) |
              (n.skipSelf && 4);
      }
      function ed(n) {
        const t = [];
        for (let e = 0; e < n.length; e++) {
          const i = F(n[e]);
          if (Array.isArray(i)) {
            if (0 === i.length) throw new v(900, !1);
            let r,
              o = P.Default;
            for (let s = 0; s < i.length; s++) {
              const a = i[s],
                l = uE(a);
              "number" == typeof l
                ? -1 === l
                  ? (r = a.token)
                  : (o |= l)
                : (r = a);
            }
            t.push(D(r, o));
          } else t.push(D(i));
        }
        return t;
      }
      function yo(n, t) {
        return (n[Jc] = t), (n.prototype[Jc] = t), n;
      }
      function uE(n) {
        return n[Jc];
      }
      function Tn(n) {
        return { toString: n }.toString();
      }
      var hn = (() => (
          ((hn = hn || {})[(hn.OnPush = 0)] = "OnPush"),
          (hn[(hn.Default = 1)] = "Default"),
          hn
        ))(),
        Yt = (() => {
          return (
            ((n = Yt || (Yt = {}))[(n.Emulated = 0)] = "Emulated"),
            (n[(n.None = 2)] = "None"),
            (n[(n.ShadowDom = 3)] = "ShadowDom"),
            Yt
          );
          var n;
        })();
      const kn = {},
        ne = [],
        na = he({ ɵcmp: he }),
        td = he({ ɵdir: he }),
        nd = he({ ɵpipe: he }),
        wp = he({ ɵmod: he }),
        Rn = he({ ɵfac: he }),
        wo = he({ __NG_ELEMENT_ID__: he });
      let fE = 0;
      function On(n) {
        return Tn(() => {
          const t = Cp(n),
            e = {
              ...t,
              decls: n.decls,
              vars: n.vars,
              template: n.template,
              consts: n.consts || null,
              ngContentSelectors: n.ngContentSelectors,
              onPush: n.changeDetection === hn.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && n.dependencies) || null,
              getStandaloneInjector: null,
              data: n.data || {},
              encapsulation: n.encapsulation || Yt.Emulated,
              id: "c" + fE++,
              styles: n.styles || ne,
              _: null,
              schemas: n.schemas || null,
              tView: null,
            };
          Dp(e);
          const i = n.dependencies;
          return (e.directiveDefs = ia(i, !1)), (e.pipeDefs = ia(i, !0)), e;
        });
      }
      function gE(n) {
        return ae(n) || nt(n);
      }
      function _E(n) {
        return null !== n;
      }
      function we(n) {
        return Tn(() => ({
          type: n.type,
          bootstrap: n.bootstrap || ne,
          declarations: n.declarations || ne,
          imports: n.imports || ne,
          exports: n.exports || ne,
          transitiveCompileScopes: null,
          schemas: n.schemas || null,
          id: n.id || null,
        }));
      }
      function xp(n, t) {
        if (null == n) return kn;
        const e = {};
        for (const i in n)
          if (n.hasOwnProperty(i)) {
            let r = n[i],
              o = r;
            Array.isArray(r) && ((o = r[1]), (r = r[0])),
              (e[r] = i),
              t && (t[r] = o);
          }
        return e;
      }
      function T(n) {
        return Tn(() => {
          const t = Cp(n);
          return Dp(t), t;
        });
      }
      function ae(n) {
        return n[na] || null;
      }
      function nt(n) {
        return n[td] || null;
      }
      function bt(n) {
        return n[nd] || null;
      }
      function Dt(n, t) {
        const e = n[wp] || null;
        if (!e && !0 === t)
          throw new Error(`Type ${pe(n)} does not have '\u0275mod' property.`);
        return e;
      }
      function Cp(n) {
        const t = {};
        return {
          type: n.type,
          providersResolver: null,
          factory: null,
          hostBindings: n.hostBindings || null,
          hostVars: n.hostVars || 0,
          hostAttrs: n.hostAttrs || null,
          contentQueries: n.contentQueries || null,
          declaredInputs: t,
          exportAs: n.exportAs || null,
          standalone: !0 === n.standalone,
          selectors: n.selectors || ne,
          viewQuery: n.viewQuery || null,
          features: n.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: xp(n.inputs, t),
          outputs: xp(n.outputs),
        };
      }
      function Dp(n) {
        n.features?.forEach((t) => t(n));
      }
      function ia(n, t) {
        if (!n) return null;
        const e = t ? bt : gE;
        return () =>
          ("function" == typeof n ? n() : n).map((i) => e(i)).filter(_E);
      }
      const Fn = 0,
        S = 1,
        G = 2,
        Ie = 3,
        Xt = 4,
        Ii = 5,
        it = 6,
        ar = 7,
        Re = 8,
        ra = 9,
        oa = 10,
        K = 11,
        id = 12,
        xo = 13,
        Mp = 14,
        lr = 15,
        rt = 16,
        Co = 17,
        cr = 18,
        mn = 19,
        Do = 20,
        Ep = 21,
        ye = 22,
        rd = 1,
        Sp = 2,
        sa = 7,
        aa = 8,
        dr = 9,
        ut = 10;
      function Mt(n) {
        return Array.isArray(n) && "object" == typeof n[rd];
      }
      function Jt(n) {
        return Array.isArray(n) && !0 === n[rd];
      }
      function od(n) {
        return 0 != (4 & n.flags);
      }
      function Mo(n) {
        return n.componentOffset > -1;
      }
      function la(n) {
        return 1 == (1 & n.flags);
      }
      function en(n) {
        return !!n.template;
      }
      function vE(n) {
        return 0 != (256 & n[G]);
      }
      function Ai(n, t) {
        return n.hasOwnProperty(Rn) ? n[Rn] : null;
      }
      class xE {
        constructor(t, e, i) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = i);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Et() {
        return Tp;
      }
      function Tp(n) {
        return n.type.prototype.ngOnChanges && (n.setInput = DE), CE;
      }
      function CE() {
        const n = Rp(this),
          t = n?.current;
        if (t) {
          const e = n.previous;
          if (e === kn) n.previous = t;
          else for (let i in t) e[i] = t[i];
          (n.current = null), this.ngOnChanges(t);
        }
      }
      function DE(n, t, e, i) {
        const r = this.declaredInputs[e],
          o =
            Rp(n) ||
            (function ME(n, t) {
              return (n[kp] = t);
            })(n, { previous: kn, current: null }),
          s = o.current || (o.current = {}),
          a = o.previous,
          l = a[r];
        (s[r] = new xE(l && l.currentValue, t, a === kn)), (n[i] = t);
      }
      Et.ngInherit = !0;
      const kp = "__ngSimpleChanges__";
      function Rp(n) {
        return n[kp] || null;
      }
      const jt = function (n, t, e) {},
        Op = "svg";
      function Ke(n) {
        for (; Array.isArray(n); ) n = n[Fn];
        return n;
      }
      function ca(n, t) {
        return Ke(t[n]);
      }
      function St(n, t) {
        return Ke(t[n.index]);
      }
      function Pp(n, t) {
        return n.data[t];
      }
      function vt(n, t) {
        const e = t[n];
        return Mt(e) ? e : e[Fn];
      }
      function da(n) {
        return 64 == (64 & n[G]);
      }
      function oi(n, t) {
        return null == t ? null : n[t];
      }
      function Np(n) {
        n[cr] = 0;
      }
      function ad(n, t) {
        n[Ii] += t;
        let e = n,
          i = n[Ie];
        for (
          ;
          null !== i && ((1 === t && 1 === e[Ii]) || (-1 === t && 0 === e[Ii]));

        )
          (i[Ii] += t), (e = i), (i = i[Ie]);
      }
      const H = { lFrame: Kp(null), bindingsEnabled: !0 };
      function Vp() {
        return H.bindingsEnabled;
      }
      function w() {
        return H.lFrame.lView;
      }
      function J() {
        return H.lFrame.tView;
      }
      function Qe() {
        let n = Hp();
        for (; null !== n && 64 === n.type; ) n = n.parent;
        return n;
      }
      function Hp() {
        return H.lFrame.currentTNode;
      }
      function fn(n, t) {
        const e = H.lFrame;
        (e.currentTNode = n), (e.isParent = t);
      }
      function ld() {
        return H.lFrame.isParent;
      }
      function cd() {
        H.lFrame.isParent = !1;
      }
      function hr() {
        return H.lFrame.bindingIndex++;
      }
      function VE(n, t) {
        const e = H.lFrame;
        (e.bindingIndex = e.bindingRootIndex = n), dd(t);
      }
      function dd(n) {
        H.lFrame.currentDirectiveIndex = n;
      }
      function qp() {
        return H.lFrame.currentQueryIndex;
      }
      function hd(n) {
        H.lFrame.currentQueryIndex = n;
      }
      function jE(n) {
        const t = n[S];
        return 2 === t.type ? t.declTNode : 1 === t.type ? n[it] : null;
      }
      function Gp(n, t, e) {
        if (e & P.SkipSelf) {
          let r = t,
            o = n;
          for (
            ;
            !((r = r.parent),
            null !== r ||
              e & P.Host ||
              ((r = jE(o)), null === r || ((o = o[lr]), 10 & r.type)));

          );
          if (null === r) return !1;
          (t = r), (n = o);
        }
        const i = (H.lFrame = Wp());
        return (i.currentTNode = t), (i.lView = n), !0;
      }
      function md(n) {
        const t = Wp(),
          e = n[S];
        (H.lFrame = t),
          (t.currentTNode = e.firstChild),
          (t.lView = n),
          (t.tView = e),
          (t.contextLView = n),
          (t.bindingIndex = e.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Wp() {
        const n = H.lFrame,
          t = null === n ? null : n.child;
        return null === t ? Kp(n) : t;
      }
      function Kp(n) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: n,
          child: null,
          inI18n: !1,
        };
        return null !== n && (n.child = t), t;
      }
      function Qp() {
        const n = H.lFrame;
        return (
          (H.lFrame = n.parent), (n.currentTNode = null), (n.lView = null), n
        );
      }
      const Zp = Qp;
      function fd() {
        const n = Qp();
        (n.isParent = !0),
          (n.tView = null),
          (n.selectedIndex = -1),
          (n.contextLView = null),
          (n.elementDepthCount = 0),
          (n.currentDirectiveIndex = -1),
          (n.currentNamespace = null),
          (n.bindingRootIndex = -1),
          (n.bindingIndex = -1),
          (n.currentQueryIndex = 0);
      }
      function mt() {
        return H.lFrame.selectedIndex;
      }
      function Ti(n) {
        H.lFrame.selectedIndex = n;
      }
      function xe() {
        const n = H.lFrame;
        return Pp(n.tView, n.selectedIndex);
      }
      function ua(n, t) {
        for (let e = t.directiveStart, i = t.directiveEnd; e < i; e++) {
          const o = n.data[e].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: d,
            } = o;
          s && (n.contentHooks ?? (n.contentHooks = [])).push(-e, s),
            a &&
              ((n.contentHooks ?? (n.contentHooks = [])).push(e, a),
              (n.contentCheckHooks ?? (n.contentCheckHooks = [])).push(e, a)),
            l && (n.viewHooks ?? (n.viewHooks = [])).push(-e, l),
            c &&
              ((n.viewHooks ?? (n.viewHooks = [])).push(e, c),
              (n.viewCheckHooks ?? (n.viewCheckHooks = [])).push(e, c)),
            null != d && (n.destroyHooks ?? (n.destroyHooks = [])).push(e, d);
        }
      }
      function ha(n, t, e) {
        Yp(n, t, 3, e);
      }
      function ma(n, t, e, i) {
        (3 & n[G]) === e && Yp(n, t, e, i);
      }
      function _d(n, t) {
        let e = n[G];
        (3 & e) === t && ((e &= 2047), (e += 1), (n[G] = e));
      }
      function Yp(n, t, e, i) {
        const o = i ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== i ? 65535 & n[cr] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != i && a >= i)) break;
          } else
            t[l] < 0 && (n[cr] += 65536),
              (a < o || -1 == o) &&
                (WE(n, e, t, l), (n[cr] = (4294901760 & n[cr]) + l + 2)),
              l++;
      }
      function WE(n, t, e, i) {
        const r = e[i] < 0,
          o = e[i + 1],
          a = n[r ? -e[i] : e[i]];
        if (r) {
          if (n[G] >> 11 < n[cr] >> 16 && (3 & n[G]) === t) {
            (n[G] += 2048), jt(4, a, o);
            try {
              o.call(a);
            } finally {
              jt(5, a, o);
            }
          }
        } else {
          jt(4, a, o);
          try {
            o.call(a);
          } finally {
            jt(5, a, o);
          }
        }
      }
      const mr = -1;
      class So {
        constructor(t, e, i) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = i);
        }
      }
      function vd(n, t, e) {
        let i = 0;
        for (; i < e.length; ) {
          const r = e[i];
          if ("number" == typeof r) {
            if (0 !== r) break;
            i++;
            const o = e[i++],
              s = e[i++],
              a = e[i++];
            n.setAttribute(t, s, a, o);
          } else {
            const o = r,
              s = e[++i];
            Jp(o) ? n.setProperty(t, o, s) : n.setAttribute(t, o, s), i++;
          }
        }
        return i;
      }
      function Xp(n) {
        return 3 === n || 4 === n || 6 === n;
      }
      function Jp(n) {
        return 64 === n.charCodeAt(0);
      }
      function Io(n, t) {
        if (null !== t && 0 !== t.length)
          if (null === n || 0 === n.length) n = t.slice();
          else {
            let e = -1;
            for (let i = 0; i < t.length; i++) {
              const r = t[i];
              "number" == typeof r
                ? (e = r)
                : 0 === e ||
                  eg(n, e, r, null, -1 === e || 2 === e ? t[++i] : null);
            }
          }
        return n;
      }
      function eg(n, t, e, i, r) {
        let o = 0,
          s = n.length;
        if (-1 === t) s = -1;
        else
          for (; o < n.length; ) {
            const a = n[o++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < n.length; ) {
          const a = n[o];
          if ("number" == typeof a) break;
          if (a === e) {
            if (null === i) return void (null !== r && (n[o + 1] = r));
            if (i === n[o + 1]) return void (n[o + 2] = r);
          }
          o++, null !== i && o++, null !== r && o++;
        }
        -1 !== s && (n.splice(s, 0, t), (o = s + 1)),
          n.splice(o++, 0, e),
          null !== i && n.splice(o++, 0, i),
          null !== r && n.splice(o++, 0, r);
      }
      function tg(n) {
        return n !== mr;
      }
      function fa(n) {
        return 32767 & n;
      }
      function pa(n, t) {
        let e = (function YE(n) {
            return n >> 16;
          })(n),
          i = t;
        for (; e > 0; ) (i = i[lr]), e--;
        return i;
      }
      let yd = !0;
      function ga(n) {
        const t = yd;
        return (yd = n), t;
      }
      const ng = 255,
        ig = 5;
      let XE = 0;
      const pn = {};
      function _a(n, t) {
        const e = rg(n, t);
        if (-1 !== e) return e;
        const i = t[S];
        i.firstCreatePass &&
          ((n.injectorIndex = t.length),
          wd(i.data, n),
          wd(t, null),
          wd(i.blueprint, null));
        const r = xd(n, t),
          o = n.injectorIndex;
        if (tg(r)) {
          const s = fa(r),
            a = pa(r, t),
            l = a[S].data;
          for (let c = 0; c < 8; c++) t[o + c] = a[s + c] | l[s + c];
        }
        return (t[o + 8] = r), o;
      }
      function wd(n, t) {
        n.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function rg(n, t) {
        return -1 === n.injectorIndex ||
          (n.parent && n.parent.injectorIndex === n.injectorIndex) ||
          null === t[n.injectorIndex + 8]
          ? -1
          : n.injectorIndex;
      }
      function xd(n, t) {
        if (n.parent && -1 !== n.parent.injectorIndex)
          return n.parent.injectorIndex;
        let e = 0,
          i = null,
          r = t;
        for (; null !== r; ) {
          if (((i = ug(r)), null === i)) return mr;
          if ((e++, (r = r[lr]), -1 !== i.injectorIndex))
            return i.injectorIndex | (e << 16);
        }
        return mr;
      }
      function Cd(n, t, e) {
        !(function JE(n, t, e) {
          let i;
          "string" == typeof e
            ? (i = e.charCodeAt(0) || 0)
            : e.hasOwnProperty(wo) && (i = e[wo]),
            null == i && (i = e[wo] = XE++);
          const r = i & ng;
          t.data[n + (r >> ig)] |= 1 << r;
        })(n, t, e);
      }
      function og(n, t, e) {
        if (e & P.Optional || void 0 !== n) return n;
        Ys();
      }
      function sg(n, t, e, i) {
        if (
          (e & P.Optional && void 0 === i && (i = null),
          !(e & (P.Self | P.Host)))
        ) {
          const r = n[ra],
            o = Bt(void 0);
          try {
            return r ? r.get(t, i, e & P.Optional) : bp(t, i, e & P.Optional);
          } finally {
            Bt(o);
          }
        }
        return og(i, 0, e);
      }
      function ag(n, t, e, i = P.Default, r) {
        if (null !== n) {
          if (1024 & t[G]) {
            const s = (function rS(n, t, e, i, r) {
              let o = n,
                s = t;
              for (
                ;
                null !== o && null !== s && 1024 & s[G] && !(256 & s[G]);

              ) {
                const a = lg(o, s, e, i | P.Self, pn);
                if (a !== pn) return a;
                let l = o.parent;
                if (!l) {
                  const c = s[Ep];
                  if (c) {
                    const d = c.get(e, pn, i);
                    if (d !== pn) return d;
                  }
                  (l = ug(s)), (s = s[lr]);
                }
                o = l;
              }
              return r;
            })(n, t, e, i, pn);
            if (s !== pn) return s;
          }
          const o = lg(n, t, e, i, pn);
          if (o !== pn) return o;
        }
        return sg(t, e, i, r);
      }
      function lg(n, t, e, i, r) {
        const o = (function nS(n) {
          if ("string" == typeof n) return n.charCodeAt(0) || 0;
          const t = n.hasOwnProperty(wo) ? n[wo] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & ng : iS) : t;
        })(e);
        if ("function" == typeof o) {
          if (!Gp(t, n, i)) return i & P.Host ? og(r, 0, i) : sg(t, e, i, r);
          try {
            const s = o(i);
            if (null != s || i & P.Optional) return s;
            Ys();
          } finally {
            Zp();
          }
        } else if ("number" == typeof o) {
          let s = null,
            a = rg(n, t),
            l = mr,
            c = i & P.Host ? t[rt][it] : null;
          for (
            (-1 === a || i & P.SkipSelf) &&
            ((l = -1 === a ? xd(n, t) : t[a + 8]),
            l !== mr && dg(i, !1)
              ? ((s = t[S]), (a = fa(l)), (t = pa(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const d = t[S];
            if (cg(o, a, d.data)) {
              const u = tS(a, t, e, s, i, c);
              if (u !== pn) return u;
            }
            (l = t[a + 8]),
              l !== mr && dg(i, t[S].data[a + 8] === c) && cg(o, a, t)
                ? ((s = d), (a = fa(l)), (t = pa(l, t)))
                : (a = -1);
          }
        }
        return r;
      }
      function tS(n, t, e, i, r, o) {
        const s = t[S],
          a = s.data[n + 8],
          d = ba(
            a,
            s,
            e,
            null == i ? Mo(a) && yd : i != s && 0 != (3 & a.type),
            r & P.Host && o === a
          );
        return null !== d ? ki(t, s, d, a) : pn;
      }
      function ba(n, t, e, i, r) {
        const o = n.providerIndexes,
          s = t.data,
          a = 1048575 & o,
          l = n.directiveStart,
          d = o >> 20,
          h = r ? a + d : n.directiveEnd;
        for (let m = i ? a : a + d; m < h; m++) {
          const f = s[m];
          if ((m < l && e === f) || (m >= l && f.type === e)) return m;
        }
        if (r) {
          const m = s[l];
          if (m && en(m) && m.type === e) return l;
        }
        return null;
      }
      function ki(n, t, e, i) {
        let r = n[e];
        const o = t.data;
        if (
          (function KE(n) {
            return n instanceof So;
          })(r)
        ) {
          const s = r;
          s.resolving &&
            (function XM(n, t) {
              const e = t ? `. Dependency path: ${t.join(" > ")} > ${n}` : "";
              throw new v(
                -200,
                `Circular dependency in DI detected for ${n}${e}`
              );
            })(
              (function oe(n) {
                return "function" == typeof n
                  ? n.name || n.toString()
                  : "object" == typeof n &&
                    null != n &&
                    "function" == typeof n.type
                  ? n.type.name || n.type.toString()
                  : j(n);
              })(o[e])
            );
          const a = ga(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? Bt(s.injectImpl) : null;
          Gp(n, i, P.Default);
          try {
            (r = n[e] = s.factory(void 0, o, n, i)),
              t.firstCreatePass &&
                e >= i.directiveStart &&
                (function GE(n, t, e) {
                  const {
                    ngOnChanges: i,
                    ngOnInit: r,
                    ngDoCheck: o,
                  } = t.type.prototype;
                  if (i) {
                    const s = Tp(t);
                    (e.preOrderHooks ?? (e.preOrderHooks = [])).push(n, s),
                      (
                        e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])
                      ).push(n, s);
                  }
                  r &&
                    (e.preOrderHooks ?? (e.preOrderHooks = [])).push(0 - n, r),
                    o &&
                      ((e.preOrderHooks ?? (e.preOrderHooks = [])).push(n, o),
                      (
                        e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])
                      ).push(n, o));
                })(e, o[e], t);
          } finally {
            null !== l && Bt(l), ga(a), (s.resolving = !1), Zp();
          }
        }
        return r;
      }
      function cg(n, t, e) {
        return !!(e[t + (n >> ig)] & (1 << n));
      }
      function dg(n, t) {
        return !(n & P.Self || (n & P.Host && t));
      }
      class fr {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e, i) {
          return ag(this._tNode, this._lView, t, ta(i), e);
        }
      }
      function iS() {
        return new fr(Qe(), w());
      }
      function Dd(n) {
        return Qc(n)
          ? () => {
              const t = Dd(F(n));
              return t && t();
            }
          : Ai(n);
      }
      function ug(n) {
        const t = n[S],
          e = t.type;
        return 2 === e ? t.declTNode : 1 === e ? n[it] : null;
      }
      function Ao(n) {
        return (function eS(n, t) {
          if ("class" === t) return n.classes;
          if ("style" === t) return n.styles;
          const e = n.attrs;
          if (e) {
            const i = e.length;
            let r = 0;
            for (; r < i; ) {
              const o = e[r];
              if (Xp(o)) break;
              if (0 === o) r += 2;
              else if ("number" == typeof o)
                for (r++; r < i && "string" == typeof e[r]; ) r++;
              else {
                if (o === t) return e[r + 1];
                r += 2;
              }
            }
          }
          return null;
        })(Qe(), n);
      }
      const gr = "__parameters__";
      function br(n, t, e) {
        return Tn(() => {
          const i = (function Md(n) {
            return function (...e) {
              if (n) {
                const i = n(...e);
                for (const r in i) this[r] = i[r];
              }
            };
          })(t);
          function r(...o) {
            if (this instanceof r) return i.apply(this, o), this;
            const s = new r(...o);
            return (a.annotation = s), a;
            function a(l, c, d) {
              const u = l.hasOwnProperty(gr)
                ? l[gr]
                : Object.defineProperty(l, gr, { value: [] })[gr];
              for (; u.length <= d; ) u.push(null);
              return (u[d] = u[d] || []).push(s), l;
            }
          }
          return (
            e && (r.prototype = Object.create(e.prototype)),
            (r.prototype.ngMetadataName = n),
            (r.annotationCls = r),
            r
          );
        });
      }
      class C {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = I({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Ri(n, t) {
        n.forEach((e) => (Array.isArray(e) ? Ri(e, t) : t(e)));
      }
      function mg(n, t, e) {
        t >= n.length ? n.push(e) : n.splice(t, 0, e);
      }
      function va(n, t) {
        return t >= n.length - 1 ? n.pop() : n.splice(t, 1)[0];
      }
      function Ro(n, t) {
        const e = [];
        for (let i = 0; i < n; i++) e.push(t);
        return e;
      }
      function It(n, t, e) {
        let i = vr(n, t);
        return (
          i >= 0
            ? (n[1 | i] = e)
            : ((i = ~i),
              (function lS(n, t, e, i) {
                let r = n.length;
                if (r == t) n.push(e, i);
                else if (1 === r) n.push(i, n[0]), (n[0] = e);
                else {
                  for (r--, n.push(n[r - 1], n[r]); r > t; )
                    (n[r] = n[r - 2]), r--;
                  (n[t] = e), (n[t + 1] = i);
                }
              })(n, i, t, e)),
          i
        );
      }
      function Sd(n, t) {
        const e = vr(n, t);
        if (e >= 0) return n[1 | e];
      }
      function vr(n, t) {
        return (function fg(n, t, e) {
          let i = 0,
            r = n.length >> e;
          for (; r !== i; ) {
            const o = i + ((r - i) >> 1),
              s = n[o << e];
            if (t === s) return o << e;
            s > t ? (r = o) : (i = o + 1);
          }
          return ~(r << e);
        })(n, t, 1);
      }
      const si = yo(br("Optional"), 8),
        yr = yo(br("SkipSelf"), 4);
      var yt = (() => (
        ((yt = yt || {})[(yt.Important = 1)] = "Important"),
        (yt[(yt.DashCase = 2)] = "DashCase"),
        yt
      ))();
      const Od = new Map();
      let TS = 0;
      const Pd = "__ngContext__";
      function ot(n, t) {
        Mt(t)
          ? ((n[Pd] = t[Do]),
            (function RS(n) {
              Od.set(n[Do], n);
            })(t))
          : (n[Pd] = t);
      }
      let Nd;
      function Ld(n, t) {
        return Nd(n, t);
      }
      function No(n) {
        const t = n[Ie];
        return Jt(t) ? t[Ie] : t;
      }
      function Vd(n) {
        return Fg(n[xo]);
      }
      function Bd(n) {
        return Fg(n[Xt]);
      }
      function Fg(n) {
        for (; null !== n && !Jt(n); ) n = n[Xt];
        return n;
      }
      function xr(n, t, e, i, r) {
        if (null != i) {
          let o,
            s = !1;
          Jt(i) ? (o = i) : Mt(i) && ((s = !0), (i = i[Fn]));
          const a = Ke(i);
          0 === n && null !== e
            ? null == r
              ? jg(t, e, a)
              : Oi(t, e, a, r || null, !0)
            : 1 === n && null !== e
            ? Oi(t, e, a, r || null, !0)
            : 2 === n
            ? (function Gd(n, t, e) {
                const i = Ca(n, t);
                i &&
                  (function XS(n, t, e, i) {
                    n.removeChild(t, e, i);
                  })(n, i, t, e);
              })(t, a, s)
            : 3 === n && t.destroyNode(a),
            null != o &&
              (function tI(n, t, e, i, r) {
                const o = e[sa];
                o !== Ke(e) && xr(t, n, i, o, r);
                for (let a = ut; a < e.length; a++) {
                  const l = e[a];
                  Lo(l[S], l, n, t, i, o);
                }
              })(t, n, o, e, r);
        }
      }
      function Hd(n, t, e) {
        return n.createElement(t, e);
      }
      function Ng(n, t) {
        const e = n[dr],
          i = e.indexOf(t),
          r = t[Ie];
        512 & t[G] && ((t[G] &= -513), ad(r, -1)), e.splice(i, 1);
      }
      function Ud(n, t) {
        if (n.length <= ut) return;
        const e = ut + t,
          i = n[e];
        if (i) {
          const r = i[Co];
          null !== r && r !== n && Ng(r, i), t > 0 && (n[e - 1][Xt] = i[Xt]);
          const o = va(n, ut + t);
          !(function $S(n, t) {
            Lo(n, t, t[K], 2, null, null), (t[Fn] = null), (t[it] = null);
          })(i[S], i);
          const s = o[mn];
          null !== s && s.detachView(o[S]),
            (i[Ie] = null),
            (i[Xt] = null),
            (i[G] &= -65);
        }
        return i;
      }
      function Lg(n, t) {
        if (!(128 & t[G])) {
          const e = t[K];
          e.destroyNode && Lo(n, t, e, 3, null, null),
            (function WS(n) {
              let t = n[xo];
              if (!t) return zd(n[S], n);
              for (; t; ) {
                let e = null;
                if (Mt(t)) e = t[xo];
                else {
                  const i = t[ut];
                  i && (e = i);
                }
                if (!e) {
                  for (; t && !t[Xt] && t !== n; )
                    Mt(t) && zd(t[S], t), (t = t[Ie]);
                  null === t && (t = n), Mt(t) && zd(t[S], t), (e = t && t[Xt]);
                }
                t = e;
              }
            })(t);
        }
      }
      function zd(n, t) {
        if (!(128 & t[G])) {
          (t[G] &= -65),
            (t[G] |= 128),
            (function YS(n, t) {
              let e;
              if (null != n && null != (e = n.destroyHooks))
                for (let i = 0; i < e.length; i += 2) {
                  const r = t[e[i]];
                  if (!(r instanceof So)) {
                    const o = e[i + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = r[o[s]],
                          l = o[s + 1];
                        jt(4, a, l);
                        try {
                          l.call(a);
                        } finally {
                          jt(5, a, l);
                        }
                      }
                    else {
                      jt(4, r, o);
                      try {
                        o.call(r);
                      } finally {
                        jt(5, r, o);
                      }
                    }
                  }
                }
            })(n, t),
            (function ZS(n, t) {
              const e = n.cleanup,
                i = t[ar];
              let r = -1;
              if (null !== e)
                for (let o = 0; o < e.length - 1; o += 2)
                  if ("string" == typeof e[o]) {
                    const s = e[o + 3];
                    s >= 0 ? i[(r = s)]() : i[(r = -s)].unsubscribe(), (o += 2);
                  } else {
                    const s = i[(r = e[o + 1])];
                    e[o].call(s);
                  }
              if (null !== i) {
                for (let o = r + 1; o < i.length; o++) (0, i[o])();
                t[ar] = null;
              }
            })(n, t),
            1 === t[S].type && t[K].destroy();
          const e = t[Co];
          if (null !== e && Jt(t[Ie])) {
            e !== t[Ie] && Ng(e, t);
            const i = t[mn];
            null !== i && i.detachView(n);
          }
          !(function OS(n) {
            Od.delete(n[Do]);
          })(t);
        }
      }
      function Vg(n, t, e) {
        return (function Bg(n, t, e) {
          let i = t;
          for (; null !== i && 40 & i.type; ) i = (t = i).parent;
          if (null === i) return e[Fn];
          {
            const { componentOffset: r } = i;
            if (r > -1) {
              const { encapsulation: o } = n.data[i.directiveStart + r];
              if (o === Yt.None || o === Yt.Emulated) return null;
            }
            return St(i, e);
          }
        })(n, t.parent, e);
      }
      function Oi(n, t, e, i, r) {
        n.insertBefore(t, e, i, r);
      }
      function jg(n, t, e) {
        n.appendChild(t, e);
      }
      function Hg(n, t, e, i, r) {
        null !== i ? Oi(n, t, e, i, r) : jg(n, t, e);
      }
      function Ca(n, t) {
        return n.parentNode(t);
      }
      function Ug(n, t, e) {
        return $g(n, t, e);
      }
      let $d,
        Qd,
        Sa,
        $g = function zg(n, t, e) {
          return 40 & n.type ? St(n, e) : null;
        };
      function Da(n, t, e, i) {
        const r = Vg(n, i, t),
          o = t[K],
          a = Ug(i.parent || t[it], i, t);
        if (null != r)
          if (Array.isArray(e))
            for (let l = 0; l < e.length; l++) Hg(o, r, e[l], a, !1);
          else Hg(o, r, e, a, !1);
        void 0 !== $d && $d(o, i, t, e, r);
      }
      function Ma(n, t) {
        if (null !== t) {
          const e = t.type;
          if (3 & e) return St(t, n);
          if (4 & e) return qd(-1, n[t.index]);
          if (8 & e) {
            const i = t.child;
            if (null !== i) return Ma(n, i);
            {
              const r = n[t.index];
              return Jt(r) ? qd(-1, r) : Ke(r);
            }
          }
          if (32 & e) return Ld(t, n)() || Ke(n[t.index]);
          {
            const i = Gg(n, t);
            return null !== i
              ? Array.isArray(i)
                ? i[0]
                : Ma(No(n[rt]), i)
              : Ma(n, t.next);
          }
        }
        return null;
      }
      function Gg(n, t) {
        return null !== t ? n[rt][it].projection[t.projection] : null;
      }
      function qd(n, t) {
        const e = ut + n + 1;
        if (e < t.length) {
          const i = t[e],
            r = i[S].firstChild;
          if (null !== r) return Ma(i, r);
        }
        return t[sa];
      }
      function Wd(n, t, e, i, r, o, s) {
        for (; null != e; ) {
          const a = i[e.index],
            l = e.type;
          if (
            (s && 0 === t && (a && ot(Ke(a), i), (e.flags |= 2)),
            32 != (32 & e.flags))
          )
            if (8 & l) Wd(n, t, e.child, i, r, o, !1), xr(t, n, r, a, o);
            else if (32 & l) {
              const c = Ld(e, i);
              let d;
              for (; (d = c()); ) xr(t, n, r, d, o);
              xr(t, n, r, a, o);
            } else 16 & l ? Wg(n, t, i, e, r, o) : xr(t, n, r, a, o);
          e = s ? e.projectionNext : e.next;
        }
      }
      function Lo(n, t, e, i, r, o) {
        Wd(e, i, n.firstChild, t, r, o, !1);
      }
      function Wg(n, t, e, i, r, o) {
        const s = e[rt],
          l = s[it].projection[i.projection];
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) xr(t, n, r, l[c], o);
        else Wd(n, t, l, s[Ie], r, o, !0);
      }
      function Kg(n, t, e) {
        "" === e
          ? n.removeAttribute(t, "class")
          : n.setAttribute(t, "class", e);
      }
      function Qg(n, t, e) {
        const { mergedAttrs: i, classes: r, styles: o } = e;
        null !== i && vd(n, t, i),
          null !== r && Kg(n, t, r),
          null !== o &&
            (function iI(n, t, e) {
              n.setAttribute(t, "style", e);
            })(n, t, o);
      }
      function Jg(n) {
        return (
          (function Zd() {
            if (void 0 === Sa && ((Sa = null), ve.trustedTypes))
              try {
                Sa = ve.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (n) => n,
                  createScript: (n) => n,
                  createScriptURL: (n) => n,
                });
              } catch {}
            return Sa;
          })()?.createScriptURL(n) || n
        );
      }
      class Fi {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Qs})`;
        }
      }
      function At(n) {
        return n instanceof Fi ? n.changingThisBreaksApplicationSecurity : n;
      }
      function gn(n, t) {
        const e = (function mI(n) {
          return (n instanceof Fi && n.getTypeName()) || null;
        })(n);
        if (null != e && e !== t) {
          if ("ResourceURL" === e && "URL" === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${e} (see ${Qs})`);
        }
        return e === t;
      }
      const xI = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var ie = (() => (
        ((ie = ie || {})[(ie.NONE = 0)] = "NONE"),
        (ie[(ie.HTML = 1)] = "HTML"),
        (ie[(ie.STYLE = 2)] = "STYLE"),
        (ie[(ie.SCRIPT = 3)] = "SCRIPT"),
        (ie[(ie.URL = 4)] = "URL"),
        (ie[(ie.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        ie
      ))();
      function Ta(n) {
        const t = Bo();
        return t
          ? t.sanitize(ie.URL, n) || ""
          : gn(n, "URL")
          ? At(n)
          : (function Ia(n) {
              return (n = String(n)).match(xI) ? n : "unsafe:" + n;
            })(j(n));
      }
      function a_(n) {
        const t = Bo();
        if (t) return Jg(t.sanitize(ie.RESOURCE_URL, n) || "");
        if (gn(n, "ResourceURL")) return Jg(At(n));
        throw new v(904, !1);
      }
      function Bo() {
        const n = w();
        return n && n[id];
      }
      const ka = new C("ENVIRONMENT_INITIALIZER"),
        c_ = new C("INJECTOR", -1),
        d_ = new C("INJECTOR_DEF_TYPES");
      class u_ {
        get(t, e = bo) {
          if (e === bo) {
            const i = new Error(`NullInjectorError: No provider for ${pe(t)}!`);
            throw ((i.name = "NullInjectorError"), i);
          }
          return e;
        }
      }
      function FI(...n) {
        return { ɵproviders: h_(0, n), ɵfromNgModule: !0 };
      }
      function h_(n, ...t) {
        const e = [],
          i = new Set();
        let r;
        return (
          Ri(t, (o) => {
            const s = o;
            eu(s, e, [], i) && (r || (r = []), r.push(s));
          }),
          void 0 !== r && m_(r, e),
          e
        );
      }
      function m_(n, t) {
        for (let e = 0; e < n.length; e++) {
          const { providers: r } = n[e];
          tu(r, (o) => {
            t.push(o);
          });
        }
      }
      function eu(n, t, e, i) {
        if (!(n = F(n))) return !1;
        let r = null,
          o = gp(n);
        const s = !o && ae(n);
        if (o || s) {
          if (s && !s.standalone) return !1;
          r = n;
        } else {
          const l = n.ngModule;
          if (((o = gp(l)), !o)) return !1;
          r = l;
        }
        const a = i.has(r);
        if (s) {
          if (a) return !1;
          if ((i.add(r), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of l) eu(c, t, e, i);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !a) {
              let c;
              i.add(r);
              try {
                Ri(o.imports, (d) => {
                  eu(d, t, e, i) && (c || (c = []), c.push(d));
                });
              } finally {
              }
              void 0 !== c && m_(c, t);
            }
            if (!a) {
              const c = Ai(r) || (() => new r());
              t.push(
                { provide: r, useFactory: c, deps: ne },
                { provide: d_, useValue: r, multi: !0 },
                { provide: ka, useValue: () => D(r), multi: !0 }
              );
            }
            const l = o.providers;
            null == l ||
              a ||
              tu(l, (d) => {
                t.push(d);
              });
          }
        }
        return r !== n && void 0 !== n.providers;
      }
      function tu(n, t) {
        for (let e of n)
          Zc(e) && (e = e.ɵproviders), Array.isArray(e) ? tu(e, t) : t(e);
      }
      const PI = he({ provide: String, useValue: he });
      function nu(n) {
        return null !== n && "object" == typeof n && PI in n;
      }
      function Pi(n) {
        return "function" == typeof n;
      }
      const iu = new C("Set Injector scope."),
        Ra = {},
        LI = {};
      let ru;
      function Oa() {
        return void 0 === ru && (ru = new u_()), ru;
      }
      class Vn {}
      class g_ extends Vn {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, e, i, r) {
          super(),
            (this.parent = e),
            (this.source = i),
            (this.scopes = r),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            su(t, (s) => this.processProvider(s)),
            this.records.set(c_, Dr(void 0, this)),
            r.has("environment") && this.records.set(Vn, Dr(void 0, this));
          const o = this.records.get(iu);
          null != o && "string" == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get(d_.multi, ne, P.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const e = or(this),
            i = Bt(void 0);
          try {
            return t();
          } finally {
            or(e), Bt(i);
          }
        }
        get(t, e = bo, i = P.Default) {
          this.assertNotDestroyed(), (i = ta(i));
          const r = or(this),
            o = Bt(void 0);
          try {
            if (!(i & P.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function UI(n) {
                    return (
                      "function" == typeof n ||
                      ("object" == typeof n && n instanceof C)
                    );
                  })(t) && Xs(t);
                (a = l && this.injectableDefInScope(l) ? Dr(ou(t), Ra) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (i & P.Self ? Oa() : this.parent).get(
              t,
              (e = i & P.Optional && e === bo ? null : e)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[ea] = s[ea] || []).unshift(pe(t)), r)) throw s;
              return (function hE(n, t, e, i) {
                const r = n[ea];
                throw (
                  (t[vp] && r.unshift(t[vp]),
                  (n.message = (function mE(n, t, e, i = null) {
                    n =
                      n && "\n" === n.charAt(0) && n.charAt(1) == cE
                        ? n.slice(2)
                        : n;
                    let r = pe(t);
                    if (Array.isArray(t)) r = t.map(pe).join(" -> ");
                    else if ("object" == typeof t) {
                      let o = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          o.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : pe(a))
                          );
                        }
                      r = `{${o.join(", ")}}`;
                    }
                    return `${e}${i ? "(" + i + ")" : ""}[${r}]: ${n.replace(
                      lE,
                      "\n  "
                    )}`;
                  })("\n" + n.message, r, e, i)),
                  (n[aE] = r),
                  (n[ea] = null),
                  n)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Bt(o), or(r);
          }
        }
        resolveInjectorInitializers() {
          const t = or(this),
            e = Bt(void 0);
          try {
            const i = this.get(ka.multi, ne, P.Self);
            for (const r of i) r();
          } finally {
            or(t), Bt(e);
          }
        }
        toString() {
          const t = [],
            e = this.records;
          for (const i of e.keys()) t.push(pe(i));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new v(205, !1);
        }
        processProvider(t) {
          let e = Pi((t = F(t))) ? t : F(t && t.provide);
          const i = (function BI(n) {
            return nu(n) ? Dr(void 0, n.useValue) : Dr(__(n), Ra);
          })(t);
          if (Pi(t) || !0 !== t.multi) this.records.get(e);
          else {
            let r = this.records.get(e);
            r ||
              ((r = Dr(void 0, Ra, !0)),
              (r.factory = () => ed(r.multi)),
              this.records.set(e, r)),
              (e = t),
              r.multi.push(t);
          }
          this.records.set(e, i);
        }
        hydrate(t, e) {
          return (
            e.value === Ra && ((e.value = LI), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              (function HI(n) {
                return (
                  null !== n &&
                  "object" == typeof n &&
                  "function" == typeof n.ngOnDestroy
                );
              })(e.value) &&
              this._ngOnDestroyHooks.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const e = F(t.providedIn);
          return "string" == typeof e
            ? "any" === e || this.scopes.has(e)
            : this.injectorDefTypes.has(e);
        }
      }
      function ou(n) {
        const t = Xs(n),
          e = null !== t ? t.factory : Ai(n);
        if (null !== e) return e;
        if (n instanceof C) throw new v(204, !1);
        if (n instanceof Function)
          return (function VI(n) {
            const t = n.length;
            if (t > 0) throw (Ro(t, "?"), new v(204, !1));
            const e = (function rE(n) {
              return (n && (n[Js] || n[_p])) || null;
            })(n);
            return null !== e ? () => e.factory(n) : () => new n();
          })(n);
        throw new v(204, !1);
      }
      function __(n, t, e) {
        let i;
        if (Pi(n)) {
          const r = F(n);
          return Ai(r) || ou(r);
        }
        if (nu(n)) i = () => F(n.useValue);
        else if (
          (function p_(n) {
            return !(!n || !n.useFactory);
          })(n)
        )
          i = () => n.useFactory(...ed(n.deps || []));
        else if (
          (function f_(n) {
            return !(!n || !n.useExisting);
          })(n)
        )
          i = () => D(F(n.useExisting));
        else {
          const r = F(n && (n.useClass || n.provide));
          if (
            !(function jI(n) {
              return !!n.deps;
            })(n)
          )
            return Ai(r) || ou(r);
          i = () => new r(...ed(n.deps));
        }
        return i;
      }
      function Dr(n, t, e = !1) {
        return { factory: n, value: t, multi: e ? [] : void 0 };
      }
      function su(n, t) {
        for (const e of n)
          Array.isArray(e) ? su(e, t) : e && Zc(e) ? su(e.ɵproviders, t) : t(e);
      }
      class zI {}
      class b_ {}
      class qI {
        resolveComponentFactory(t) {
          throw (function $I(n) {
            const t = Error(
              `No component factory found for ${pe(
                n
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = n), t;
          })(t);
        }
      }
      let jo = (() => {
        class n {}
        return (n.NULL = new qI()), n;
      })();
      function GI() {
        return Mr(Qe(), w());
      }
      function Mr(n, t) {
        return new Ae(St(n, t));
      }
      let Ae = (() => {
        class n {
          constructor(e) {
            this.nativeElement = e;
          }
        }
        return (n.__NG_ELEMENT_ID__ = GI), n;
      })();
      function WI(n) {
        return n instanceof Ae ? n.nativeElement : n;
      }
      class Ho {}
      let Bn = (() => {
          class n {}
          return (
            (n.__NG_ELEMENT_ID__ = () =>
              (function KI() {
                const n = w(),
                  e = vt(Qe().index, n);
                return (Mt(e) ? e : n)[K];
              })()),
            n
          );
        })(),
        QI = (() => {
          class n {}
          return (
            (n.ɵprov = I({
              token: n,
              providedIn: "root",
              factory: () => null,
            })),
            n
          );
        })();
      class Ni {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const ZI = new Ni("15.2.10"),
        au = {},
        lu = "ngOriginalError";
      function cu(n) {
        return n[lu];
      }
      class ai {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t);
          this._console.error("ERROR", t),
            e && this._console.error("ORIGINAL ERROR", e);
        }
        _findOriginalError(t) {
          let e = t && cu(t);
          for (; e && cu(e); ) e = cu(e);
          return e || null;
        }
      }
      function jn(n) {
        return n instanceof Function ? n() : n;
      }
      function w_(n, t, e) {
        let i = n.length;
        for (;;) {
          const r = n.indexOf(t, e);
          if (-1 === r) return r;
          if (0 === r || n.charCodeAt(r - 1) <= 32) {
            const o = t.length;
            if (r + o === i || n.charCodeAt(r + o) <= 32) return r;
          }
          e = r + 1;
        }
      }
      const x_ = "ng-template";
      function aA(n, t, e) {
        let i = 0,
          r = !0;
        for (; i < n.length; ) {
          let o = n[i++];
          if ("string" == typeof o && r) {
            const s = n[i++];
            if (e && "class" === o && -1 !== w_(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === o) {
              for (; i < n.length && "string" == typeof (o = n[i++]); )
                if (o.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof o && (r = !1);
          }
        }
        return !1;
      }
      function C_(n) {
        return 4 === n.type && n.value !== x_;
      }
      function lA(n, t, e) {
        return t === (4 !== n.type || e ? n.value : x_);
      }
      function cA(n, t, e) {
        let i = 4;
        const r = n.attrs || [],
          o = (function hA(n) {
            for (let t = 0; t < n.length; t++) if (Xp(n[t])) return t;
            return n.length;
          })(r);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & i) {
                if (
                  ((i = 2 | (1 & i)),
                  ("" !== l && !lA(n, l, e)) || ("" === l && 1 === t.length))
                ) {
                  if (tn(i)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & i ? l : t[++a];
                if (8 & i && null !== n.attrs) {
                  if (!aA(n.attrs, c, e)) {
                    if (tn(i)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const u = dA(8 & i ? "class" : l, r, C_(n), e);
                if (-1 === u) {
                  if (tn(i)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== c) {
                  let h;
                  h = u > o ? "" : r[u + 1].toLowerCase();
                  const m = 8 & i ? h : null;
                  if ((m && -1 !== w_(m, c, 0)) || (2 & i && c !== h)) {
                    if (tn(i)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !tn(i) && !tn(l)) return !1;
            if (s && tn(l)) continue;
            (s = !1), (i = l | (1 & i));
          }
        }
        return tn(i) || s;
      }
      function tn(n) {
        return 0 == (1 & n);
      }
      function dA(n, t, e, i) {
        if (null === t) return -1;
        let r = 0;
        if (i || !e) {
          let o = !1;
          for (; r < t.length; ) {
            const s = t[r];
            if (s === n) return r;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++r];
                for (; "string" == typeof a; ) a = t[++r];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                r += 4;
                continue;
              }
            }
            r += o ? 1 : 2;
          }
          return -1;
        }
        return (function mA(n, t) {
          let e = n.indexOf(4);
          if (e > -1)
            for (e++; e < n.length; ) {
              const i = n[e];
              if ("number" == typeof i) return -1;
              if (i === t) return e;
              e++;
            }
          return -1;
        })(t, n);
      }
      function D_(n, t, e = !1) {
        for (let i = 0; i < t.length; i++) if (cA(n, t[i], e)) return !0;
        return !1;
      }
      function fA(n, t) {
        e: for (let e = 0; e < t.length; e++) {
          const i = t[e];
          if (n.length === i.length) {
            for (let r = 0; r < n.length; r++) if (n[r] !== i[r]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function M_(n, t) {
        return n ? ":not(" + t.trim() + ")" : t;
      }
      function pA(n) {
        let t = n[0],
          e = 1,
          i = 2,
          r = "",
          o = !1;
        for (; e < n.length; ) {
          let s = n[e];
          if ("string" == typeof s)
            if (2 & i) {
              const a = n[++e];
              r += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & i ? (r += "." + s) : 4 & i && (r += " " + s);
          else
            "" !== r && !tn(s) && ((t += M_(o, r)), (r = "")),
              (i = s),
              (o = o || !tn(i));
          e++;
        }
        return "" !== r && (t += M_(o, r)), t;
      }
      const U = {};
      function ce(n) {
        E_(J(), w(), mt() + n, !1);
      }
      function E_(n, t, e, i) {
        if (!i)
          if (3 == (3 & t[G])) {
            const o = n.preOrderCheckHooks;
            null !== o && ha(t, o, e);
          } else {
            const o = n.preOrderHooks;
            null !== o && ma(t, o, 0, e);
          }
        Ti(e);
      }
      function T_(n, t = null, e = null, i) {
        const r = k_(n, t, e, i);
        return r.resolveInjectorInitializers(), r;
      }
      function k_(n, t = null, e = null, i, r = new Set()) {
        const o = [e || ne, FI(n)];
        return (
          (i = i || ("object" == typeof n ? void 0 : pe(n))),
          new g_(o, t || Oa(), i || null, r)
        );
      }
      let nn = (() => {
        class n {
          static create(e, i) {
            if (Array.isArray(e)) return T_({ name: "" }, i, e, "");
            {
              const r = e.name ?? "";
              return T_({ name: r }, e.parent, e.providers, r);
            }
          }
        }
        return (
          (n.THROW_IF_NOT_FOUND = bo),
          (n.NULL = new u_()),
          (n.ɵprov = I({ token: n, providedIn: "any", factory: () => D(c_) })),
          (n.__NG_ELEMENT_ID__ = -1),
          n
        );
      })();
      function _(n, t = P.Default) {
        const e = w();
        return null === e ? D(n, t) : ag(Qe(), e, F(n), t);
      }
      function fu() {
        throw new Error("invalid");
      }
      function V_(n, t) {
        const e = n.contentQueries;
        if (null !== e)
          for (let i = 0; i < e.length; i += 2) {
            const o = e[i + 1];
            if (-1 !== o) {
              const s = n.data[o];
              hd(e[i]), s.contentQueries(2, t[o], o);
            }
          }
      }
      function Pa(n, t, e, i, r, o, s, a, l, c, d) {
        const u = t.blueprint.slice();
        return (
          (u[Fn] = r),
          (u[G] = 76 | i),
          (null !== d || (n && 1024 & n[G])) && (u[G] |= 1024),
          Np(u),
          (u[Ie] = u[lr] = n),
          (u[Re] = e),
          (u[oa] = s || (n && n[oa])),
          (u[K] = a || (n && n[K])),
          (u[id] = l || (n && n[id]) || null),
          (u[ra] = c || (n && n[ra]) || null),
          (u[it] = o),
          (u[Do] = (function kS() {
            return TS++;
          })()),
          (u[Ep] = d),
          (u[rt] = 2 == t.type ? n[rt] : u),
          u
        );
      }
      function Ir(n, t, e, i, r) {
        let o = n.data[t];
        if (null === o)
          (o = (function pu(n, t, e, i, r) {
            const o = Hp(),
              s = ld(),
              l = (n.data[t] = (function HA(n, t, e, i, r, o) {
                return {
                  type: e,
                  index: i,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: r,
                  attrs: o,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? o : o && o.parent, e, t, i, r));
            return (
              null === n.firstChild && (n.firstChild = l),
              null !== o &&
                (s
                  ? null == o.child && null !== l.parent && (o.child = l)
                  : null === o.next && ((o.next = l), (l.prev = o))),
              l
            );
          })(n, t, e, i, r)),
            (function LE() {
              return H.lFrame.inI18n;
            })() && (o.flags |= 32);
        else if (64 & o.type) {
          (o.type = e), (o.value = i), (o.attrs = r);
          const s = (function Eo() {
            const n = H.lFrame,
              t = n.currentTNode;
            return n.isParent ? t : t.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return fn(o, !0), o;
      }
      function Uo(n, t, e, i) {
        if (0 === e) return -1;
        const r = t.length;
        for (let o = 0; o < e; o++)
          t.push(i), n.blueprint.push(i), n.data.push(null);
        return r;
      }
      function gu(n, t, e) {
        md(t);
        try {
          const i = n.viewQuery;
          null !== i && Mu(1, i, e);
          const r = n.template;
          null !== r && B_(n, t, r, 1, e),
            n.firstCreatePass && (n.firstCreatePass = !1),
            n.staticContentQueries && V_(n, t),
            n.staticViewQueries && Mu(2, n.viewQuery, e);
          const o = n.components;
          null !== o &&
            (function VA(n, t) {
              for (let e = 0; e < t.length; e++) aT(n, t[e]);
            })(t, o);
        } catch (i) {
          throw (
            (n.firstCreatePass &&
              ((n.incompleteFirstPass = !0), (n.firstCreatePass = !1)),
            i)
          );
        } finally {
          (t[G] &= -5), fd();
        }
      }
      function Na(n, t, e, i) {
        const r = t[G];
        if (128 != (128 & r)) {
          md(t);
          try {
            Np(t),
              (function zp(n) {
                return (H.lFrame.bindingIndex = n);
              })(n.bindingStartIndex),
              null !== e && B_(n, t, e, 2, i);
            const s = 3 == (3 & r);
            if (s) {
              const c = n.preOrderCheckHooks;
              null !== c && ha(t, c, null);
            } else {
              const c = n.preOrderHooks;
              null !== c && ma(t, c, 0, null), _d(t, 0);
            }
            if (
              ((function oT(n) {
                for (let t = Vd(n); null !== t; t = Bd(t)) {
                  if (!t[Sp]) continue;
                  const e = t[dr];
                  for (let i = 0; i < e.length; i++) {
                    const r = e[i];
                    512 & r[G] || ad(r[Ie], 1), (r[G] |= 512);
                  }
                }
              })(t),
              (function rT(n) {
                for (let t = Vd(n); null !== t; t = Bd(t))
                  for (let e = ut; e < t.length; e++) {
                    const i = t[e],
                      r = i[S];
                    da(i) && Na(r, i, r.template, i[Re]);
                  }
              })(t),
              null !== n.contentQueries && V_(n, t),
              s)
            ) {
              const c = n.contentCheckHooks;
              null !== c && ha(t, c);
            } else {
              const c = n.contentHooks;
              null !== c && ma(t, c, 1), _d(t, 1);
            }
            !(function NA(n, t) {
              const e = n.hostBindingOpCodes;
              if (null !== e)
                try {
                  for (let i = 0; i < e.length; i++) {
                    const r = e[i];
                    if (r < 0) Ti(~r);
                    else {
                      const o = r,
                        s = e[++i],
                        a = e[++i];
                      VE(s, o), a(2, t[o]);
                    }
                  }
                } finally {
                  Ti(-1);
                }
            })(n, t);
            const a = n.components;
            null !== a &&
              (function LA(n, t) {
                for (let e = 0; e < t.length; e++) sT(n, t[e]);
              })(t, a);
            const l = n.viewQuery;
            if ((null !== l && Mu(2, l, i), s)) {
              const c = n.viewCheckHooks;
              null !== c && ha(t, c);
            } else {
              const c = n.viewHooks;
              null !== c && ma(t, c, 2), _d(t, 2);
            }
            !0 === n.firstUpdatePass && (n.firstUpdatePass = !1),
              (t[G] &= -41),
              512 & t[G] && ((t[G] &= -513), ad(t[Ie], -1));
          } finally {
            fd();
          }
        }
      }
      function B_(n, t, e, i, r) {
        const o = mt(),
          s = 2 & i;
        try {
          Ti(-1),
            s && t.length > ye && E_(n, t, ye, !1),
            jt(s ? 2 : 0, r),
            e(i, r);
        } finally {
          Ti(o), jt(s ? 3 : 1, r);
        }
      }
      function _u(n, t, e) {
        if (od(t)) {
          const r = t.directiveEnd;
          for (let o = t.directiveStart; o < r; o++) {
            const s = n.data[o];
            s.contentQueries && s.contentQueries(1, e[o], o);
          }
        }
      }
      function bu(n, t, e) {
        Vp() &&
          ((function KA(n, t, e, i) {
            const r = e.directiveStart,
              o = e.directiveEnd;
            Mo(e) &&
              (function tT(n, t, e) {
                const i = St(t, n),
                  r = j_(e),
                  o = n[oa],
                  s = La(
                    n,
                    Pa(
                      n,
                      r,
                      null,
                      e.onPush ? 32 : 16,
                      i,
                      t,
                      o,
                      o.createRenderer(i, e),
                      null,
                      null,
                      null
                    )
                  );
                n[t.index] = s;
              })(t, e, n.data[r + e.componentOffset]),
              n.firstCreatePass || _a(e, t),
              ot(i, t);
            const s = e.initialInputs;
            for (let a = r; a < o; a++) {
              const l = n.data[a],
                c = ki(t, n, a, e);
              ot(c, t),
                null !== s && nT(0, a - r, c, l, 0, s),
                en(l) && (vt(e.index, t)[Re] = ki(t, n, a, e));
            }
          })(n, t, e, St(e, t)),
          64 == (64 & e.flags) && q_(n, t, e));
      }
      function vu(n, t, e = St) {
        const i = t.localNames;
        if (null !== i) {
          let r = t.index + 1;
          for (let o = 0; o < i.length; o += 2) {
            const s = i[o + 1],
              a = -1 === s ? e(t, n) : n[s];
            n[r++] = a;
          }
        }
      }
      function j_(n) {
        const t = n.tView;
        return null === t || t.incompleteFirstPass
          ? (n.tView = yu(
              1,
              null,
              n.template,
              n.decls,
              n.vars,
              n.directiveDefs,
              n.pipeDefs,
              n.viewQuery,
              n.schemas,
              n.consts
            ))
          : t;
      }
      function yu(n, t, e, i, r, o, s, a, l, c) {
        const d = ye + i,
          u = d + r,
          h = (function BA(n, t) {
            const e = [];
            for (let i = 0; i < t; i++) e.push(i < n ? null : U);
            return e;
          })(d, u),
          m = "function" == typeof c ? c() : c;
        return (h[S] = {
          type: n,
          blueprint: h,
          template: e,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: u,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: m,
          incompleteFirstPass: !1,
        });
      }
      function H_(n, t, e, i) {
        const r = W_(t);
        null === e
          ? r.push(i)
          : (r.push(e), n.firstCreatePass && K_(n).push(i, r.length - 1));
      }
      function U_(n, t, e, i) {
        for (let r in n)
          if (n.hasOwnProperty(r)) {
            e = null === e ? {} : e;
            const o = n[r];
            null === i
              ? z_(e, t, r, o)
              : i.hasOwnProperty(r) && z_(e, t, i[r], o);
          }
        return e;
      }
      function z_(n, t, e, i) {
        n.hasOwnProperty(e) ? n[e].push(t, i) : (n[e] = [t, i]);
      }
      function Tt(n, t, e, i, r, o, s, a) {
        const l = St(t, e);
        let d,
          c = t.inputs;
        !a && null != c && (d = c[i])
          ? (Eu(n, e, d, i, r),
            Mo(t) &&
              (function $A(n, t) {
                const e = vt(t, n);
                16 & e[G] || (e[G] |= 32);
              })(e, t.index))
          : 3 & t.type &&
            ((i = (function zA(n) {
              return "class" === n
                ? "className"
                : "for" === n
                ? "htmlFor"
                : "formaction" === n
                ? "formAction"
                : "innerHtml" === n
                ? "innerHTML"
                : "readonly" === n
                ? "readOnly"
                : "tabindex" === n
                ? "tabIndex"
                : n;
            })(i)),
            (r = null != s ? s(r, t.value || "", i) : r),
            o.setProperty(l, i, r));
      }
      function wu(n, t, e, i) {
        if (Vp()) {
          const r = null === i ? null : { "": -1 },
            o = (function ZA(n, t) {
              const e = n.directiveRegistry;
              let i = null,
                r = null;
              if (e)
                for (let o = 0; o < e.length; o++) {
                  const s = e[o];
                  if (D_(t, s.selectors, !1))
                    if ((i || (i = []), en(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (r = r || new Map()),
                          s.findHostDirectiveDefs(s, a, r),
                          i.unshift(...a, s),
                          xu(n, t, a.length);
                      } else i.unshift(s), xu(n, t, 0);
                    else
                      (r = r || new Map()),
                        s.findHostDirectiveDefs?.(s, i, r),
                        i.push(s);
                }
              return null === i ? null : [i, r];
            })(n, e);
          let s, a;
          null === o ? (s = a = null) : ([s, a] = o),
            null !== s && $_(n, t, e, s, r, a),
            r &&
              (function YA(n, t, e) {
                if (t) {
                  const i = (n.localNames = []);
                  for (let r = 0; r < t.length; r += 2) {
                    const o = e[t[r + 1]];
                    if (null == o) throw new v(-301, !1);
                    i.push(t[r], o);
                  }
                }
              })(e, i, r);
        }
        e.mergedAttrs = Io(e.mergedAttrs, e.attrs);
      }
      function $_(n, t, e, i, r, o) {
        for (let c = 0; c < i.length; c++) Cd(_a(e, t), n, i[c].type);
        !(function JA(n, t, e) {
          (n.flags |= 1),
            (n.directiveStart = t),
            (n.directiveEnd = t + e),
            (n.providerIndexes = t);
        })(e, n.data.length, i.length);
        for (let c = 0; c < i.length; c++) {
          const d = i[c];
          d.providersResolver && d.providersResolver(d);
        }
        let s = !1,
          a = !1,
          l = Uo(n, t, i.length, null);
        for (let c = 0; c < i.length; c++) {
          const d = i[c];
          (e.mergedAttrs = Io(e.mergedAttrs, d.hostAttrs)),
            eT(n, e, t, l, d),
            XA(l, d, r),
            null !== d.contentQueries && (e.flags |= 4),
            (null !== d.hostBindings ||
              null !== d.hostAttrs ||
              0 !== d.hostVars) &&
              (e.flags |= 64);
          const u = d.type.prototype;
          !s &&
            (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
            ((n.preOrderHooks ?? (n.preOrderHooks = [])).push(e.index),
            (s = !0)),
            !a &&
              (u.ngOnChanges || u.ngDoCheck) &&
              ((n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])).push(
                e.index
              ),
              (a = !0)),
            l++;
        }
        !(function UA(n, t, e) {
          const r = t.directiveEnd,
            o = n.data,
            s = t.attrs,
            a = [];
          let l = null,
            c = null;
          for (let d = t.directiveStart; d < r; d++) {
            const u = o[d],
              h = e ? e.get(u) : null,
              f = h ? h.outputs : null;
            (l = U_(u.inputs, d, l, h ? h.inputs : null)),
              (c = U_(u.outputs, d, c, f));
            const p = null === l || null === s || C_(t) ? null : iT(l, d, s);
            a.push(p);
          }
          null !== l &&
            (l.hasOwnProperty("class") && (t.flags |= 8),
            l.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = l),
            (t.outputs = c);
        })(n, e, o);
      }
      function q_(n, t, e) {
        const i = e.directiveStart,
          r = e.directiveEnd,
          o = e.index,
          s = (function BE() {
            return H.lFrame.currentDirectiveIndex;
          })();
        try {
          Ti(o);
          for (let a = i; a < r; a++) {
            const l = n.data[a],
              c = t[a];
            dd(a),
              (null !== l.hostBindings ||
                0 !== l.hostVars ||
                null !== l.hostAttrs) &&
                QA(l, c);
          }
        } finally {
          Ti(-1), dd(s);
        }
      }
      function QA(n, t) {
        null !== n.hostBindings && n.hostBindings(1, t);
      }
      function xu(n, t, e) {
        (t.componentOffset = e),
          (n.components ?? (n.components = [])).push(t.index);
      }
      function XA(n, t, e) {
        if (e) {
          if (t.exportAs)
            for (let i = 0; i < t.exportAs.length; i++) e[t.exportAs[i]] = n;
          en(t) && (e[""] = n);
        }
      }
      function eT(n, t, e, i, r) {
        n.data[i] = r;
        const o = r.factory || (r.factory = Ai(r.type)),
          s = new So(o, en(r), _);
        (n.blueprint[i] = s),
          (e[i] = s),
          (function GA(n, t, e, i, r) {
            const o = r.hostBindings;
            if (o) {
              let s = n.hostBindingOpCodes;
              null === s && (s = n.hostBindingOpCodes = []);
              const a = ~t.index;
              (function WA(n) {
                let t = n.length;
                for (; t > 0; ) {
                  const e = n[--t];
                  if ("number" == typeof e && e < 0) return e;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(e, i, o);
            }
          })(n, t, i, Uo(n, e, r.hostVars, U), r);
      }
      function _n(n, t, e, i, r, o) {
        const s = St(n, t);
        !(function Cu(n, t, e, i, r, o, s) {
          if (null == o) n.removeAttribute(t, r, e);
          else {
            const a = null == s ? j(o) : s(o, i || "", r);
            n.setAttribute(t, r, a, e);
          }
        })(t[K], s, o, n.value, e, i, r);
      }
      function nT(n, t, e, i, r, o) {
        const s = o[t];
        if (null !== s) {
          const a = i.setInput;
          for (let l = 0; l < s.length; ) {
            const c = s[l++],
              d = s[l++],
              u = s[l++];
            null !== a ? i.setInput(e, u, c, d) : (e[d] = u);
          }
        }
      }
      function iT(n, t, e) {
        let i = null,
          r = 0;
        for (; r < e.length; ) {
          const o = e[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              if (n.hasOwnProperty(o)) {
                null === i && (i = []);
                const s = n[o];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    i.push(o, s[a + 1], e[r + 1]);
                    break;
                  }
              }
              r += 2;
            } else r += 2;
          else r += 4;
        }
        return i;
      }
      function G_(n, t, e, i) {
        return [n, !0, !1, t, null, 0, i, e, null, null];
      }
      function sT(n, t) {
        const e = vt(t, n);
        if (da(e)) {
          const i = e[S];
          48 & e[G] ? Na(i, e, i.template, e[Re]) : e[Ii] > 0 && Du(e);
        }
      }
      function Du(n) {
        for (let i = Vd(n); null !== i; i = Bd(i))
          for (let r = ut; r < i.length; r++) {
            const o = i[r];
            if (da(o))
              if (512 & o[G]) {
                const s = o[S];
                Na(s, o, s.template, o[Re]);
              } else o[Ii] > 0 && Du(o);
          }
        const e = n[S].components;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const r = vt(e[i], n);
            da(r) && r[Ii] > 0 && Du(r);
          }
      }
      function aT(n, t) {
        const e = vt(t, n),
          i = e[S];
        (function lT(n, t) {
          for (let e = t.length; e < n.blueprint.length; e++)
            t.push(n.blueprint[e]);
        })(i, e),
          gu(i, e, e[Re]);
      }
      function La(n, t) {
        return n[xo] ? (n[Mp][Xt] = t) : (n[xo] = t), (n[Mp] = t), t;
      }
      function Va(n) {
        for (; n; ) {
          n[G] |= 32;
          const t = No(n);
          if (vE(n) && !t) return n;
          n = t;
        }
        return null;
      }
      function Ba(n, t, e, i = !0) {
        const r = t[oa];
        r.begin && r.begin();
        try {
          Na(n, t, n.template, e);
        } catch (s) {
          throw (i && Z_(t, s), s);
        } finally {
          r.end && r.end();
        }
      }
      function Mu(n, t, e) {
        hd(0), t(n, e);
      }
      function W_(n) {
        return n[ar] || (n[ar] = []);
      }
      function K_(n) {
        return n.cleanup || (n.cleanup = []);
      }
      function Z_(n, t) {
        const e = n[ra],
          i = e ? e.get(ai, null) : null;
        i && i.handleError(t);
      }
      function Eu(n, t, e, i, r) {
        for (let o = 0; o < e.length; ) {
          const s = e[o++],
            a = e[o++],
            l = t[s],
            c = n.data[s];
          null !== c.setInput ? c.setInput(l, r, i, a) : (l[a] = r);
        }
      }
      function ja(n, t, e) {
        let i = e ? n.styles : null,
          r = e ? n.classes : null,
          o = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (o = a)
              : 1 == o
              ? (r = Kc(r, a))
              : 2 == o && (i = Kc(i, a + ": " + t[++s] + ";"));
          }
        e ? (n.styles = i) : (n.stylesWithoutHost = i),
          e ? (n.classes = r) : (n.classesWithoutHost = r);
      }
      function Ha(n, t, e, i, r = !1) {
        for (; null !== e; ) {
          const o = t[e.index];
          if ((null !== o && i.push(Ke(o)), Jt(o)))
            for (let a = ut; a < o.length; a++) {
              const l = o[a],
                c = l[S].firstChild;
              null !== c && Ha(l[S], l, c, i);
            }
          const s = e.type;
          if (8 & s) Ha(n, t, e.child, i);
          else if (32 & s) {
            const a = Ld(e, t);
            let l;
            for (; (l = a()); ) i.push(l);
          } else if (16 & s) {
            const a = Gg(t, e);
            if (Array.isArray(a)) i.push(...a);
            else {
              const l = No(t[rt]);
              Ha(l[S], l, a, i, !0);
            }
          }
          e = r ? e.projectionNext : e.next;
        }
        return i;
      }
      class zo {
        get rootNodes() {
          const t = this._lView,
            e = t[S];
          return Ha(e, t, e.firstChild, []);
        }
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[Re];
        }
        set context(t) {
          this._lView[Re] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[G]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[Ie];
            if (Jt(t)) {
              const e = t[aa],
                i = e ? e.indexOf(this) : -1;
              i > -1 && (Ud(t, i), va(e, i));
            }
            this._attachedToViewContainer = !1;
          }
          Lg(this._lView[S], this._lView);
        }
        onDestroy(t) {
          H_(this._lView[S], this._lView, null, t);
        }
        markForCheck() {
          Va(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[G] &= -65;
        }
        reattach() {
          this._lView[G] |= 64;
        }
        detectChanges() {
          Ba(this._lView[S], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new v(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function GS(n, t) {
              Lo(n, t, t[K], 2, null, null);
            })(this._lView[S], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new v(902, !1);
          this._appRef = t;
        }
      }
      class cT extends zo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Ba(t[S], t, t[Re], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Y_ extends jo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = ae(t);
          return new $o(e, this.ngModule);
        }
      }
      function X_(n) {
        const t = [];
        for (let e in n)
          n.hasOwnProperty(e) && t.push({ propName: n[e], templateName: e });
        return t;
      }
      class uT {
        constructor(t, e) {
          (this.injector = t), (this.parentInjector = e);
        }
        get(t, e, i) {
          i = ta(i);
          const r = this.injector.get(t, au, i);
          return r !== au || e === au ? r : this.parentInjector.get(t, e, i);
        }
      }
      class $o extends b_ {
        get inputs() {
          return X_(this.componentDef.inputs);
        }
        get outputs() {
          return X_(this.componentDef.outputs);
        }
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = (function gA(n) {
              return n.map(pA).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        create(t, e, i, r) {
          let o = (r = r || this.ngModule) instanceof Vn ? r : r?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new uT(t, o) : t,
            a = s.get(Ho, null);
          if (null === a) throw new v(407, !1);
          const l = s.get(QI, null),
            c = a.createRenderer(null, this.componentDef),
            d = this.componentDef.selectors[0][0] || "div",
            u = i
              ? (function jA(n, t, e) {
                  return n.selectRootElement(t, e === Yt.ShadowDom);
                })(c, i, this.componentDef.encapsulation)
              : Hd(
                  c,
                  d,
                  (function dT(n) {
                    const t = n.toLowerCase();
                    return "svg" === t ? Op : "math" === t ? "math" : null;
                  })(d)
                ),
            h = this.componentDef.onPush ? 288 : 272,
            m = yu(0, null, null, 1, 0, null, null, null, null, null),
            f = Pa(null, m, null, h, null, null, a, c, l, s, null);
          let p, g;
          md(f);
          try {
            const y = this.componentDef;
            let x,
              b = null;
            y.findHostDirectiveDefs
              ? ((x = []),
                (b = new Map()),
                y.findHostDirectiveDefs(y, x, b),
                x.push(y))
              : (x = [y]);
            const E = (function mT(n, t) {
                const e = n[S],
                  i = ye;
                return (n[i] = t), Ir(e, i, 2, "#host", null);
              })(f, u),
              Z = (function fT(n, t, e, i, r, o, s, a) {
                const l = r[S];
                !(function pT(n, t, e, i) {
                  for (const r of n)
                    t.mergedAttrs = Io(t.mergedAttrs, r.hostAttrs);
                  null !== t.mergedAttrs &&
                    (ja(t, t.mergedAttrs, !0), null !== e && Qg(i, e, t));
                })(i, n, t, s);
                const c = o.createRenderer(t, e),
                  d = Pa(
                    r,
                    j_(e),
                    null,
                    e.onPush ? 32 : 16,
                    r[n.index],
                    n,
                    o,
                    c,
                    a || null,
                    null,
                    null
                  );
                return (
                  l.firstCreatePass && xu(l, n, i.length - 1),
                  La(r, d),
                  (r[n.index] = d)
                );
              })(E, u, y, x, f, a, c);
            (g = Pp(m, ye)),
              u &&
                (function _T(n, t, e, i) {
                  if (i) vd(n, e, ["ng-version", ZI.full]);
                  else {
                    const { attrs: r, classes: o } = (function _A(n) {
                      const t = [],
                        e = [];
                      let i = 1,
                        r = 2;
                      for (; i < n.length; ) {
                        let o = n[i];
                        if ("string" == typeof o)
                          2 === r
                            ? "" !== o && t.push(o, n[++i])
                            : 8 === r && e.push(o);
                        else {
                          if (!tn(r)) break;
                          r = o;
                        }
                        i++;
                      }
                      return { attrs: t, classes: e };
                    })(t.selectors[0]);
                    r && vd(n, e, r),
                      o && o.length > 0 && Kg(n, e, o.join(" "));
                  }
                })(c, y, u, i),
              void 0 !== e &&
                (function bT(n, t, e) {
                  const i = (n.projection = []);
                  for (let r = 0; r < t.length; r++) {
                    const o = e[r];
                    i.push(null != o ? Array.from(o) : null);
                  }
                })(g, this.ngContentSelectors, e),
              (p = (function gT(n, t, e, i, r, o) {
                const s = Qe(),
                  a = r[S],
                  l = St(s, r);
                $_(a, r, s, e, null, i);
                for (let d = 0; d < e.length; d++)
                  ot(ki(r, a, s.directiveStart + d, s), r);
                q_(a, r, s), l && ot(l, r);
                const c = ki(r, a, s.directiveStart + s.componentOffset, s);
                if (((n[Re] = r[Re] = c), null !== o))
                  for (const d of o) d(c, t);
                return _u(a, s, n), c;
              })(Z, y, x, b, f, [vT])),
              gu(m, f, null);
          } finally {
            fd();
          }
          return new hT(this.componentType, p, Mr(g, f), f, g);
        }
      }
      class hT extends zI {
        constructor(t, e, i, r, o) {
          super(),
            (this.location = i),
            (this._rootLView = r),
            (this._tNode = o),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new cT(r)),
            (this.componentType = t);
        }
        setInput(t, e) {
          const i = this._tNode.inputs;
          let r;
          if (null !== i && (r = i[t])) {
            const o = this._rootLView;
            Eu(o[S], o, r, t, e), Va(vt(this._tNode.index, o));
          }
        }
        get injector() {
          return new fr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function vT() {
        const n = Qe();
        ua(w()[S], n);
      }
      function X(n) {
        let t = (function J_(n) {
            return Object.getPrototypeOf(n.prototype).constructor;
          })(n.type),
          e = !0;
        const i = [n];
        for (; t; ) {
          let r;
          if (en(n)) r = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new v(903, !1);
            r = t.ɵdir;
          }
          if (r) {
            if (e) {
              i.push(r);
              const s = n;
              (s.inputs = Su(n.inputs)),
                (s.declaredInputs = Su(n.declaredInputs)),
                (s.outputs = Su(n.outputs));
              const a = r.hostBindings;
              a && CT(n, a);
              const l = r.viewQuery,
                c = r.contentQueries;
              if (
                (l && wT(n, l),
                c && xT(n, c),
                Wc(n.inputs, r.inputs),
                Wc(n.declaredInputs, r.declaredInputs),
                Wc(n.outputs, r.outputs),
                en(r) && r.data.animation)
              ) {
                const d = n.data;
                d.animation = (d.animation || []).concat(r.data.animation);
              }
            }
            const o = r.features;
            if (o)
              for (let s = 0; s < o.length; s++) {
                const a = o[s];
                a && a.ngInherit && a(n), a === X && (e = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function yT(n) {
          let t = 0,
            e = null;
          for (let i = n.length - 1; i >= 0; i--) {
            const r = n[i];
            (r.hostVars = t += r.hostVars),
              (r.hostAttrs = Io(r.hostAttrs, (e = Io(e, r.hostAttrs))));
          }
        })(i);
      }
      function Su(n) {
        return n === kn ? {} : n === ne ? [] : n;
      }
      function wT(n, t) {
        const e = n.viewQuery;
        n.viewQuery = e
          ? (i, r) => {
              t(i, r), e(i, r);
            }
          : t;
      }
      function xT(n, t) {
        const e = n.contentQueries;
        n.contentQueries = e
          ? (i, r, o) => {
              t(i, r, o), e(i, r, o);
            }
          : t;
      }
      function CT(n, t) {
        const e = n.hostBindings;
        n.hostBindings = e
          ? (i, r) => {
              t(i, r), e(i, r);
            }
          : t;
      }
      function Ua(n) {
        return (
          !!(function Iu(n) {
            return (
              null !== n && ("function" == typeof n || "object" == typeof n)
            );
          })(n) &&
          (Array.isArray(n) || (!(n instanceof Map) && Symbol.iterator in n))
        );
      }
      function st(n, t, e) {
        return !Object.is(n[t], e) && ((n[t] = e), !0);
      }
      function Ze(n, t, e, i) {
        const r = w();
        return st(r, hr(), t) && (J(), _n(xe(), r, n, t, e, i)), Ze;
      }
      function Tr(n, t, e, i) {
        return st(n, hr(), e) ? t + j(e) + i : U;
      }
      function Le(n, t, e) {
        const i = w();
        return st(i, hr(), t) && Tt(J(), xe(), i, n, t, i[K], e, !1), Le;
      }
      function Au(n, t, e, i, r) {
        const s = r ? "class" : "style";
        Eu(n, e, t.inputs[s], s, i);
      }
      function B(n, t, e, i) {
        const r = w(),
          o = J(),
          s = ye + n,
          a = r[K],
          l = o.firstCreatePass
            ? (function PT(n, t, e, i, r, o) {
                const s = t.consts,
                  l = Ir(t, n, 2, i, oi(s, r));
                return (
                  wu(t, e, l, oi(s, o)),
                  null !== l.attrs && ja(l, l.attrs, !1),
                  null !== l.mergedAttrs && ja(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, o, r, t, e, i)
            : o.data[s],
          c = (r[s] = Hd(
            a,
            t,
            (function qE() {
              return H.lFrame.currentNamespace;
            })()
          )),
          d = la(l);
        return (
          fn(l, !0),
          Qg(a, c, l),
          32 != (32 & l.flags) && Da(o, r, c, l),
          0 ===
            (function kE() {
              return H.lFrame.elementDepthCount;
            })() && ot(c, r),
          (function RE() {
            H.lFrame.elementDepthCount++;
          })(),
          d && (bu(o, r, l), _u(o, l, r)),
          null !== i && vu(r, l),
          B
        );
      }
      function z() {
        let n = Qe();
        ld() ? cd() : ((n = n.parent), fn(n, !1));
        const t = n;
        !(function OE() {
          H.lFrame.elementDepthCount--;
        })();
        const e = J();
        return (
          e.firstCreatePass && (ua(e, n), od(n) && e.queries.elementEnd(n)),
          null != t.classesWithoutHost &&
            (function QE(n) {
              return 0 != (8 & n.flags);
            })(t) &&
            Au(e, t, w(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function ZE(n) {
              return 0 != (16 & n.flags);
            })(t) &&
            Au(e, t, w(), t.stylesWithoutHost, !1),
          z
        );
      }
      function de(n, t, e, i) {
        return B(n, t, e, i), z(), de;
      }
      function Go(n) {
        return !!n && "function" == typeof n.then;
      }
      const Ru = function fb(n) {
        return !!n && "function" == typeof n.subscribe;
      };
      function Ve(n, t, e, i) {
        const r = w(),
          o = J(),
          s = Qe();
        return (
          (function gb(n, t, e, i, r, o, s) {
            const a = la(i),
              c = n.firstCreatePass && K_(n),
              d = t[Re],
              u = W_(t);
            let h = !0;
            if (3 & i.type || s) {
              const p = St(i, t),
                g = s ? s(p) : p,
                y = u.length,
                x = s ? (E) => s(Ke(E[i.index])) : i.index;
              let b = null;
              if (
                (!s &&
                  a &&
                  (b = (function LT(n, t, e, i) {
                    const r = n.cleanup;
                    if (null != r)
                      for (let o = 0; o < r.length - 1; o += 2) {
                        const s = r[o];
                        if (s === e && r[o + 1] === i) {
                          const a = t[ar],
                            l = r[o + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (o += 2);
                      }
                    return null;
                  })(n, t, r, i.index)),
                null !== b)
              )
                ((b.__ngLastListenerFn__ || b).__ngNextListenerFn__ = o),
                  (b.__ngLastListenerFn__ = o),
                  (h = !1);
              else {
                o = bb(i, t, d, o, !1);
                const E = e.listen(g, r, o);
                u.push(o, E), c && c.push(r, x, y, y + 1);
              }
            } else o = bb(i, t, d, o, !1);
            const m = i.outputs;
            let f;
            if (h && null !== m && (f = m[r])) {
              const p = f.length;
              if (p)
                for (let g = 0; g < p; g += 2) {
                  const Z = t[f[g]][f[g + 1]].subscribe(o),
                    te = u.length;
                  u.push(o, Z), c && c.push(r, i.index, te, -(te + 1));
                }
            }
          })(o, r, r[K], s, n, t, i),
          Ve
        );
      }
      function _b(n, t, e, i) {
        try {
          return jt(6, t, e), !1 !== e(i);
        } catch (r) {
          return Z_(n, r), !1;
        } finally {
          jt(7, t, e);
        }
      }
      function bb(n, t, e, i, r) {
        return function o(s) {
          if (s === Function) return i;
          Va(n.componentOffset > -1 ? vt(n.index, t) : t);
          let l = _b(t, e, i, s),
            c = o.__ngNextListenerFn__;
          for (; c; ) (l = _b(t, e, c, s) && l), (c = c.__ngNextListenerFn__);
          return r && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function vn(n = 1) {
        return (function HE(n) {
          return (H.lFrame.contextLView = (function UE(n, t) {
            for (; n > 0; ) (t = t[lr]), n--;
            return t;
          })(n, H.lFrame.contextLView))[Re];
        })(n);
      }
      function VT(n, t) {
        let e = null;
        const i = (function uA(n) {
          const t = n.attrs;
          if (null != t) {
            const e = t.indexOf(5);
            if (!(1 & e)) return t[e + 1];
          }
          return null;
        })(n);
        for (let r = 0; r < t.length; r++) {
          const o = t[r];
          if ("*" !== o) {
            if (null === i ? D_(n, o, !0) : fA(i, o)) return r;
          } else e = r;
        }
        return e;
      }
      function Ou(n, t, e) {
        return qa(n, "", t, "", e), Ou;
      }
      function qa(n, t, e, i, r) {
        const o = w(),
          s = Tr(o, t, e, i);
        return s !== U && Tt(J(), xe(), o, n, s, o[K], r, !1), qa;
      }
      function Ga(n, t) {
        return (n << 17) | (t << 2);
      }
      function di(n) {
        return (n >> 17) & 32767;
      }
      function Fu(n) {
        return 2 | n;
      }
      function Vi(n) {
        return (131068 & n) >> 2;
      }
      function Pu(n, t) {
        return (-131069 & n) | (t << 2);
      }
      function Nu(n) {
        return 1 | n;
      }
      function Sb(n, t, e, i, r) {
        const o = n[e + 1],
          s = null === t;
        let a = i ? di(o) : Vi(o),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const d = n[a + 1];
          $T(n[a], t) && ((l = !0), (n[a + 1] = i ? Nu(d) : Fu(d))),
            (a = i ? di(d) : Vi(d));
        }
        l && (n[e + 1] = i ? Fu(o) : Nu(o));
      }
      function $T(n, t) {
        return (
          null === n ||
          null == t ||
          (Array.isArray(n) ? n[1] : n) === t ||
          (!(!Array.isArray(n) || "string" != typeof t) && vr(n, t) >= 0)
        );
      }
      function kt(n, t) {
        return (
          (function rn(n, t, e, i) {
            const r = w(),
              o = J(),
              s = (function Nn(n) {
                const t = H.lFrame,
                  e = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + n), e;
              })(2);
            o.firstUpdatePass &&
              (function Nb(n, t, e, i) {
                const r = n.data;
                if (null === r[e + 1]) {
                  const o = r[mt()],
                    s = (function Pb(n, t) {
                      return t >= n.expandoStartIndex;
                    })(n, e);
                  (function jb(n, t) {
                    return 0 != (n.flags & (t ? 8 : 16));
                  })(o, i) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function JT(n, t, e, i) {
                      const r = (function ud(n) {
                        const t = H.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : n[t];
                      })(n);
                      let o = i ? t.residualClasses : t.residualStyles;
                      if (null === r)
                        0 === (i ? t.classBindings : t.styleBindings) &&
                          ((e = Wo((e = Lu(null, n, t, e, i)), t.attrs, i)),
                          (o = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || n[s] !== r)
                          if (((e = Lu(r, n, t, e, i)), null === o)) {
                            let l = (function ek(n, t, e) {
                              const i = e ? t.classBindings : t.styleBindings;
                              if (0 !== Vi(i)) return n[di(i)];
                            })(n, t, i);
                            void 0 !== l &&
                              Array.isArray(l) &&
                              ((l = Lu(null, n, t, l[1], i)),
                              (l = Wo(l, t.attrs, i)),
                              (function tk(n, t, e, i) {
                                n[di(e ? t.classBindings : t.styleBindings)] =
                                  i;
                              })(n, t, i, l));
                          } else
                            o = (function nk(n, t, e) {
                              let i;
                              const r = t.directiveEnd;
                              for (
                                let o = 1 + t.directiveStylingLast;
                                o < r;
                                o++
                              )
                                i = Wo(i, n[o].hostAttrs, e);
                              return Wo(i, t.attrs, e);
                            })(n, t, i);
                      }
                      return (
                        void 0 !== o &&
                          (i
                            ? (t.residualClasses = o)
                            : (t.residualStyles = o)),
                        e
                      );
                    })(r, o, t, i)),
                    (function UT(n, t, e, i, r, o) {
                      let s = o ? t.classBindings : t.styleBindings,
                        a = di(s),
                        l = Vi(s);
                      n[i] = e;
                      let d,
                        c = !1;
                      if (
                        (Array.isArray(e)
                          ? ((d = e[1]),
                            (null === d || vr(e, d) > 0) && (c = !0))
                          : (d = e),
                        r)
                      )
                        if (0 !== l) {
                          const h = di(n[a + 1]);
                          (n[i + 1] = Ga(h, a)),
                            0 !== h && (n[h + 1] = Pu(n[h + 1], i)),
                            (n[a + 1] = (function jT(n, t) {
                              return (131071 & n) | (t << 17);
                            })(n[a + 1], i));
                        } else
                          (n[i + 1] = Ga(a, 0)),
                            0 !== a && (n[a + 1] = Pu(n[a + 1], i)),
                            (a = i);
                      else
                        (n[i + 1] = Ga(l, 0)),
                          0 === a ? (a = i) : (n[l + 1] = Pu(n[l + 1], i)),
                          (l = i);
                      c && (n[i + 1] = Fu(n[i + 1])),
                        Sb(n, d, i, !0),
                        Sb(n, d, i, !1),
                        (function zT(n, t, e, i, r) {
                          const o = r ? n.residualClasses : n.residualStyles;
                          null != o &&
                            "string" == typeof t &&
                            vr(o, t) >= 0 &&
                            (e[i + 1] = Nu(e[i + 1]));
                        })(t, d, n, i, o),
                        (s = Ga(a, l)),
                        o ? (t.classBindings = s) : (t.styleBindings = s);
                    })(r, o, t, e, s, i);
                }
              })(o, n, s, i),
              t !== U &&
                st(r, s, t) &&
                (function Vb(n, t, e, i, r, o, s, a) {
                  if (!(3 & t.type)) return;
                  const l = n.data,
                    c = l[a + 1],
                    d = (function HT(n) {
                      return 1 == (1 & n);
                    })(c)
                      ? Bb(l, t, e, r, Vi(c), s)
                      : void 0;
                  Wa(d) ||
                    (Wa(o) ||
                      ((function BT(n) {
                        return 2 == (2 & n);
                      })(c) &&
                        (o = Bb(l, null, e, r, a, s))),
                    (function nI(n, t, e, i, r) {
                      if (t) r ? n.addClass(e, i) : n.removeClass(e, i);
                      else {
                        let o = -1 === i.indexOf("-") ? void 0 : yt.DashCase;
                        null == r
                          ? n.removeStyle(e, i, o)
                          : ("string" == typeof r &&
                              r.endsWith("!important") &&
                              ((r = r.slice(0, -10)), (o |= yt.Important)),
                            n.setStyle(e, i, r, o));
                      }
                    })(i, s, ca(mt(), e), r, o));
                })(
                  o,
                  o.data[mt()],
                  r,
                  r[K],
                  n,
                  (r[s + 1] = (function sk(n, t) {
                    return (
                      null == n ||
                        "" === n ||
                        ("string" == typeof t
                          ? (n += t)
                          : "object" == typeof n && (n = pe(At(n)))),
                      n
                    );
                  })(t, e)),
                  i,
                  s
                );
          })(n, t, null, !0),
          kt
        );
      }
      function Lu(n, t, e, i, r) {
        let o = null;
        const s = e.directiveEnd;
        let a = e.directiveStylingLast;
        for (
          -1 === a ? (a = e.directiveStart) : a++;
          a < s && ((o = t[a]), (i = Wo(i, o.hostAttrs, r)), o !== n);

        )
          a++;
        return null !== n && (e.directiveStylingLast = a), i;
      }
      function Wo(n, t, e) {
        const i = e ? 1 : 2;
        let r = -1;
        if (null !== t)
          for (let o = 0; o < t.length; o++) {
            const s = t[o];
            "number" == typeof s
              ? (r = s)
              : r === i &&
                (Array.isArray(n) || (n = void 0 === n ? [] : ["", n]),
                It(n, s, !!e || t[++o]));
          }
        return void 0 === n ? null : n;
      }
      function Bb(n, t, e, i, r, o) {
        const s = null === t;
        let a;
        for (; r > 0; ) {
          const l = n[r],
            c = Array.isArray(l),
            d = c ? l[1] : l,
            u = null === d;
          let h = e[r + 1];
          h === U && (h = u ? ne : void 0);
          let m = u ? Sd(h, i) : d === i ? h : void 0;
          if ((c && !Wa(m) && (m = Sd(l, i)), Wa(m) && ((a = m), s))) return a;
          const f = n[r + 1];
          r = s ? di(f) : Vi(f);
        }
        if (null !== t) {
          let l = o ? t.residualClasses : t.residualStyles;
          null != l && (a = Sd(l, i));
        }
        return a;
      }
      function Wa(n) {
        return void 0 !== n;
      }
      function Ce(n, t = "") {
        const e = w(),
          i = J(),
          r = n + ye,
          o = i.firstCreatePass ? Ir(i, r, 1, t, null) : i.data[r],
          s = (e[r] = (function jd(n, t) {
            return n.createText(t);
          })(e[K], t));
        Da(i, e, s, o), fn(o, !1);
      }
      function xn(n) {
        return Ko("", n, ""), xn;
      }
      function Ko(n, t, e) {
        const i = w(),
          r = Tr(i, n, t, e);
        return (
          r !== U &&
            (function Hn(n, t, e) {
              const i = ca(t, n);
              !(function Pg(n, t, e) {
                n.setValue(t, e);
              })(n[K], i, e);
            })(i, mt(), r),
          Ko
        );
      }
      function Vu(n, t, e) {
        const i = w();
        return st(i, hr(), t) && Tt(J(), xe(), i, n, t, i[K], e, !0), Vu;
      }
      const jr = "en-US";
      let av = jr;
      function Hu(n, t, e, i, r) {
        if (((n = F(n)), Array.isArray(n)))
          for (let o = 0; o < n.length; o++) Hu(n[o], t, e, i, r);
        else {
          const o = J(),
            s = w();
          let a = Pi(n) ? n : F(n.provide),
            l = __(n);
          const c = Qe(),
            d = 1048575 & c.providerIndexes,
            u = c.directiveStart,
            h = c.providerIndexes >> 20;
          if (Pi(n) || !n.multi) {
            const m = new So(l, r, _),
              f = zu(a, t, r ? d : d + h, u);
            -1 === f
              ? (Cd(_a(c, s), o, a),
                Uu(o, n, t.length),
                t.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                e.push(m),
                s.push(m))
              : ((e[f] = m), (s[f] = m));
          } else {
            const m = zu(a, t, d + h, u),
              f = zu(a, t, d, d + h),
              g = f >= 0 && e[f];
            if ((r && !g) || (!r && !(m >= 0 && e[m]))) {
              Cd(_a(c, s), o, a);
              const y = (function M1(n, t, e, i, r) {
                const o = new So(n, e, _);
                return (
                  (o.multi = []),
                  (o.index = t),
                  (o.componentProviders = 0),
                  Rv(o, r, i && !e),
                  o
                );
              })(r ? D1 : C1, e.length, r, i, l);
              !r && g && (e[f].providerFactory = y),
                Uu(o, n, t.length, 0),
                t.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                e.push(y),
                s.push(y);
            } else Uu(o, n, m > -1 ? m : f, Rv(e[r ? f : m], l, !r && i));
            !r && i && g && e[f].componentProviders++;
          }
        }
      }
      function Uu(n, t, e, i) {
        const r = Pi(t),
          o = (function NI(n) {
            return !!n.useClass;
          })(t);
        if (r || o) {
          const l = (o ? F(t.useClass) : t).prototype.ngOnDestroy;
          if (l) {
            const c = n.destroyHooks || (n.destroyHooks = []);
            if (!r && t.multi) {
              const d = c.indexOf(e);
              -1 === d ? c.push(e, [i, l]) : c[d + 1].push(i, l);
            } else c.push(e, l);
          }
        }
      }
      function Rv(n, t, e) {
        return e && n.componentProviders++, n.multi.push(t) - 1;
      }
      function zu(n, t, e, i) {
        for (let r = e; r < i; r++) if (t[r] === n) return r;
        return -1;
      }
      function C1(n, t, e, i) {
        return $u(this.multi, []);
      }
      function D1(n, t, e, i) {
        const r = this.multi;
        let o;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = ki(e, e[S], this.providerFactory.index, i);
          (o = a.slice(0, s)), $u(r, o);
          for (let l = s; l < a.length; l++) o.push(a[l]);
        } else (o = []), $u(r, o);
        return o;
      }
      function $u(n, t) {
        for (let e = 0; e < n.length; e++) t.push((0, n[e])());
        return t;
      }
      function ue(n, t = []) {
        return (e) => {
          e.providersResolver = (i, r) =>
            (function x1(n, t, e) {
              const i = J();
              if (i.firstCreatePass) {
                const r = en(n);
                Hu(e, i.data, i.blueprint, r, !0),
                  Hu(t, i.data, i.blueprint, r, !1);
              }
            })(i, r ? r(n) : n, t);
        };
      }
      class Hr {}
      class Ov {}
      class Fv extends Hr {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Y_(this));
          const i = Dt(t);
          (this._bootstrapComponents = jn(i.bootstrap)),
            (this._r3Injector = k_(
              t,
              e,
              [
                { provide: Hr, useValue: this },
                { provide: jo, useValue: this.componentFactoryResolver },
              ],
              pe(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((e) => e()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class qu extends Ov {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Fv(this.moduleType, t);
        }
      }
      class S1 extends Hr {
        constructor(t, e, i) {
          super(),
            (this.componentFactoryResolver = new Y_(this)),
            (this.instance = null);
          const r = new g_(
            [
              ...t,
              { provide: Hr, useValue: this },
              { provide: jo, useValue: this.componentFactoryResolver },
            ],
            e || Oa(),
            i,
            new Set(["environment"])
          );
          (this.injector = r), r.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Xa(n, t, e = null) {
        return new S1(n, t, e).injector;
      }
      let I1 = (() => {
        class n {
          constructor(e) {
            (this._injector = e), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(e) {
            if (!e.standalone) return null;
            if (!this.cachedInjectors.has(e.id)) {
              const i = h_(0, e.type),
                r =
                  i.length > 0
                    ? Xa([i], this._injector, `Standalone[${e.type.name}]`)
                    : null;
              this.cachedInjectors.set(e.id, r);
            }
            return this.cachedInjectors.get(e.id);
          }
          ngOnDestroy() {
            try {
              for (const e of this.cachedInjectors.values())
                null !== e && e.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (n.ɵprov = I({
            token: n,
            providedIn: "environment",
            factory: () => new n(D(Vn)),
          })),
          n
        );
      })();
      function Pv(n) {
        n.getStandaloneInjector = (t) =>
          t.get(I1).getOrCreateStandaloneInjector(n);
      }
      function Wu(n) {
        return (t) => {
          setTimeout(n, void 0, t);
        };
      }
      const me = class eR extends qe {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, i) {
          let r = t,
            o = e || (() => null),
            s = i;
          if (t && "object" == typeof t) {
            const l = t;
            (r = l.next?.bind(l)),
              (o = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((o = Wu(o)), r && (r = Wu(r)), s && (s = Wu(s)));
          const a = super.subscribe({ next: r, error: o, complete: s });
          return t instanceof tt && t.add(a), a;
        }
      };
      function tR() {
        return this._results[Symbol.iterator]();
      }
      class ns {
        get changes() {
          return this._changes || (this._changes = new me());
        }
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const e = ns.prototype;
          e[Symbol.iterator] || (e[Symbol.iterator] = tR);
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, e) {
          const i = this;
          i.dirty = !1;
          const r = (function Ht(n) {
            return n.flat(Number.POSITIVE_INFINITY);
          })(t);
          (this._changesDetected = !(function sS(n, t, e) {
            if (n.length !== t.length) return !1;
            for (let i = 0; i < n.length; i++) {
              let r = n[i],
                o = t[i];
              if ((e && ((r = e(r)), (o = e(o))), o !== r)) return !1;
            }
            return !0;
          })(i._results, r, e)) &&
            ((i._results = r),
            (i.length = r.length),
            (i.last = r[this.length - 1]),
            (i.first = r[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let Un = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = rR), n;
      })();
      const nR = Un,
        iR = class extends nR {
          constructor(t, e, i) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = e),
              (this.elementRef = i);
          }
          createEmbeddedView(t, e) {
            const i = this._declarationTContainer.tView,
              r = Pa(
                this._declarationLView,
                i,
                t,
                16,
                null,
                i.declTNode,
                null,
                null,
                null,
                null,
                e || null
              );
            r[Co] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[mn];
            return (
              null !== s && (r[mn] = s.createEmbeddedView(i)),
              gu(i, r, t),
              new zo(r)
            );
          }
        };
      function rR() {
        return Ja(Qe(), w());
      }
      function Ja(n, t) {
        return 4 & n.type ? new iR(t, n, Mr(n, t)) : null;
      }
      let sn = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = oR), n;
      })();
      function oR() {
        return Qv(Qe(), w());
      }
      const sR = sn,
        Wv = class extends sR {
          constructor(t, e, i) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = e),
              (this._hostLView = i);
          }
          get element() {
            return Mr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new fr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = xd(this._hostTNode, this._hostLView);
            if (tg(t)) {
              const e = pa(t, this._hostLView),
                i = fa(t);
              return new fr(e[S].data[i + 8], e);
            }
            return new fr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const e = Kv(this._lContainer);
            return (null !== e && e[t]) || null;
          }
          get length() {
            return this._lContainer.length - ut;
          }
          createEmbeddedView(t, e, i) {
            let r, o;
            "number" == typeof i
              ? (r = i)
              : null != i && ((r = i.index), (o = i.injector));
            const s = t.createEmbeddedView(e || {}, o);
            return this.insert(s, r), s;
          }
          createComponent(t, e, i, r, o) {
            const s =
              t &&
              !(function ko(n) {
                return "function" == typeof n;
              })(t);
            let a;
            if (s) a = e;
            else {
              const u = e || {};
              (a = u.index),
                (i = u.injector),
                (r = u.projectableNodes),
                (o = u.environmentInjector || u.ngModuleRef);
            }
            const l = s ? t : new $o(ae(t)),
              c = i || this.parentInjector;
            if (!o && null == l.ngModule) {
              const h = (s ? c : this.parentInjector).get(Vn, null);
              h && (o = h);
            }
            const d = l.create(c, r, void 0, o);
            return this.insert(d.hostView, a), d;
          }
          insert(t, e) {
            const i = t._lView,
              r = i[S];
            if (
              (function TE(n) {
                return Jt(n[Ie]);
              })(i)
            ) {
              const d = this.indexOf(t);
              if (-1 !== d) this.detach(d);
              else {
                const u = i[Ie],
                  h = new Wv(u, u[it], u[Ie]);
                h.detach(h.indexOf(t));
              }
            }
            const o = this._adjustIndex(e),
              s = this._lContainer;
            !(function KS(n, t, e, i) {
              const r = ut + i,
                o = e.length;
              i > 0 && (e[r - 1][Xt] = t),
                i < o - ut
                  ? ((t[Xt] = e[r]), mg(e, ut + i, t))
                  : (e.push(t), (t[Xt] = null)),
                (t[Ie] = e);
              const s = t[Co];
              null !== s &&
                e !== s &&
                (function QS(n, t) {
                  const e = n[dr];
                  t[rt] !== t[Ie][Ie][rt] && (n[Sp] = !0),
                    null === e ? (n[dr] = [t]) : e.push(t);
                })(s, t);
              const a = t[mn];
              null !== a && a.insertView(n), (t[G] |= 64);
            })(r, i, s, o);
            const a = qd(o, s),
              l = i[K],
              c = Ca(l, s[sa]);
            return (
              null !== c &&
                (function qS(n, t, e, i, r, o) {
                  (i[Fn] = r), (i[it] = t), Lo(n, i, e, 1, r, o);
                })(r, s[it], l, i, c, a),
              t.attachToViewContainerRef(),
              mg(Ku(s), o, t),
              t
            );
          }
          move(t, e) {
            return this.insert(t, e);
          }
          indexOf(t) {
            const e = Kv(this._lContainer);
            return null !== e ? e.indexOf(t) : -1;
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              i = Ud(this._lContainer, e);
            i && (va(Ku(this._lContainer), e), Lg(i[S], i));
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              i = Ud(this._lContainer, e);
            return i && null != va(Ku(this._lContainer), e) ? new zo(i) : null;
          }
          _adjustIndex(t, e = 0) {
            return t ?? this.length + e;
          }
        };
      function Kv(n) {
        return n[aa];
      }
      function Ku(n) {
        return n[aa] || (n[aa] = []);
      }
      function Qv(n, t) {
        let e;
        const i = t[n.index];
        if (Jt(i)) e = i;
        else {
          let r;
          if (8 & n.type) r = Ke(i);
          else {
            const o = t[K];
            r = o.createComment("");
            const s = St(n, t);
            Oi(
              o,
              Ca(o, s),
              r,
              (function JS(n, t) {
                return n.nextSibling(t);
              })(o, s),
              !1
            );
          }
          (t[n.index] = e = G_(i, t, r, n)), La(t, e);
        }
        return new Wv(e, n, t);
      }
      class Qu {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Qu(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Zu {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const i =
                null !== t.contentQueries ? t.contentQueries[0] : e.length,
              r = [];
            for (let o = 0; o < i; o++) {
              const s = e.getByIndex(o);
              r.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Zu(r);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++)
            null !== ey(t, e).matches && this.queries[e].setDirty();
        }
      }
      class Zv {
        constructor(t, e, i = null) {
          (this.predicate = t), (this.flags = e), (this.read = i);
        }
      }
      class Yu {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++)
            this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let i = 0; i < this.length; i++) {
            const r = null !== e ? e.length : 0,
              o = this.getByIndex(i).embeddedTView(t, r);
            o &&
              ((o.indexInDeclarationView = i),
              null !== e ? e.push(o) : (e = [o]));
          }
          return null !== e ? new Yu(e) : null;
        }
        template(t, e) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Xu {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, e),
              new Xu(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const e = this._declarationNodeIndex;
            let i = t.parent;
            for (; null !== i && 8 & i.type && i.index !== e; ) i = i.parent;
            return e === (null !== i ? i.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          const i = this.metadata.predicate;
          if (Array.isArray(i))
            for (let r = 0; r < i.length; r++) {
              const o = i[r];
              this.matchTNodeWithReadOption(t, e, aR(e, o)),
                this.matchTNodeWithReadOption(t, e, ba(e, t, o, !1, !1));
            }
          else
            i === Un
              ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, ba(e, t, i, !1, !1));
        }
        matchTNodeWithReadOption(t, e, i) {
          if (null !== i) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === Ae || r === sn || (r === Un && 4 & e.type))
                this.addMatch(e.index, -2);
              else {
                const o = ba(e, t, r, !1, !1);
                null !== o && this.addMatch(e.index, o);
              }
            else this.addMatch(e.index, i);
          }
        }
        addMatch(t, e) {
          null === this.matches
            ? (this.matches = [t, e])
            : this.matches.push(t, e);
        }
      }
      function aR(n, t) {
        const e = n.localNames;
        if (null !== e)
          for (let i = 0; i < e.length; i += 2) if (e[i] === t) return e[i + 1];
        return null;
      }
      function cR(n, t, e, i) {
        return -1 === e
          ? (function lR(n, t) {
              return 11 & n.type ? Mr(n, t) : 4 & n.type ? Ja(n, t) : null;
            })(t, n)
          : -2 === e
          ? (function dR(n, t, e) {
              return e === Ae
                ? Mr(t, n)
                : e === Un
                ? Ja(t, n)
                : e === sn
                ? Qv(t, n)
                : void 0;
            })(n, t, i)
          : ki(n, n[S], e, t);
      }
      function Yv(n, t, e, i) {
        const r = t[mn].queries[i];
        if (null === r.matches) {
          const o = n.data,
            s = e.matches,
            a = [];
          for (let l = 0; l < s.length; l += 2) {
            const c = s[l];
            a.push(c < 0 ? null : cR(t, o[c], s[l + 1], e.metadata.read));
          }
          r.matches = a;
        }
        return r.matches;
      }
      function Ju(n, t, e, i) {
        const r = n.queries.getByIndex(e),
          o = r.matches;
        if (null !== o) {
          const s = Yv(n, t, r, e);
          for (let a = 0; a < o.length; a += 2) {
            const l = o[a];
            if (l > 0) i.push(s[a / 2]);
            else {
              const c = o[a + 1],
                d = t[-l];
              for (let u = ut; u < d.length; u++) {
                const h = d[u];
                h[Co] === h[Ie] && Ju(h[S], h, c, i);
              }
              if (null !== d[dr]) {
                const u = d[dr];
                for (let h = 0; h < u.length; h++) {
                  const m = u[h];
                  Ju(m[S], m, c, i);
                }
              }
            }
          }
        }
        return i;
      }
      function zn(n) {
        const t = w(),
          e = J(),
          i = qp();
        hd(i + 1);
        const r = ey(e, i);
        if (
          n.dirty &&
          (function AE(n) {
            return 4 == (4 & n[G]);
          })(t) ===
            (2 == (2 & r.metadata.flags))
        ) {
          if (null === r.matches) n.reset([]);
          else {
            const o = r.crossesNgTemplate ? Ju(e, t, i, []) : Yv(e, t, r, i);
            n.reset(o, WI), n.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function eh(n, t, e) {
        const i = J();
        i.firstCreatePass &&
          ((function Jv(n, t, e) {
            null === n.queries && (n.queries = new Yu()),
              n.queries.track(new Xu(t, e));
          })(i, new Zv(n, t, e), -1),
          2 == (2 & t) && (i.staticViewQueries = !0)),
          (function Xv(n, t, e) {
            const i = new ns(4 == (4 & e));
            H_(n, t, i, i.destroy),
              null === t[mn] && (t[mn] = new Zu()),
              t[mn].queries.push(new Qu(i));
          })(i, w(), t);
      }
      function ey(n, t) {
        return n.queries.getByIndex(t);
      }
      function nl(...n) {}
      const il = new C("Application Initializer");
      let rl = (() => {
        class n {
          constructor(e) {
            (this.appInits = e),
              (this.resolve = nl),
              (this.reject = nl),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((i, r) => {
                (this.resolve = i), (this.reject = r);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const e = [],
              i = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let r = 0; r < this.appInits.length; r++) {
                const o = this.appInits[r]();
                if (Go(o)) e.push(o);
                else if (Ru(o)) {
                  const s = new Promise((a, l) => {
                    o.subscribe({ complete: a, error: l });
                  });
                  e.push(s);
                }
              }
            Promise.all(e)
              .then(() => {
                i();
              })
              .catch((r) => {
                this.reject(r);
              }),
              0 === e.length && i(),
              (this.initialized = !0);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(il, 8));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const rs = new C("AppId", {
        providedIn: "root",
        factory: function by() {
          return `${sh()}${sh()}${sh()}`;
        },
      });
      function sh() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const vy = new C("Platform Initializer"),
        ah = new C("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        $r = new C("AnimationModuleType");
      let RR = (() => {
        class n {
          log(e) {
            console.log(e);
          }
          warn(e) {
            console.warn(e);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "platform" })),
          n
        );
      })();
      const Cn = new C("LocaleId", {
        providedIn: "root",
        factory: () =>
          q(Cn, P.Optional | P.SkipSelf) ||
          (function OR() {
            return (typeof $localize < "u" && $localize.locale) || jr;
          })(),
      });
      class PR {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      let yy = (() => {
        class n {
          compileModuleSync(e) {
            return new qu(e);
          }
          compileModuleAsync(e) {
            return Promise.resolve(this.compileModuleSync(e));
          }
          compileModuleAndAllComponentsSync(e) {
            const i = this.compileModuleSync(e),
              o = jn(Dt(e).declarations).reduce((s, a) => {
                const l = ae(a);
                return l && s.push(new $o(l)), s;
              }, []);
            return new PR(i, o);
          }
          compileModuleAndAllComponentsAsync(e) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(e));
          }
          clearCache() {}
          clearCacheFor(e) {}
          getModuleId(e) {}
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const VR = (() => Promise.resolve(0))();
      function lh(n) {
        typeof Zone > "u"
          ? VR.then(() => {
              n && n.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", n);
      }
      class re {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: i = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new me(!1)),
            (this.onMicrotaskEmpty = new me(!1)),
            (this.onStable = new me(!1)),
            (this.onError = new me(!1)),
            typeof Zone > "u")
          )
            throw new v(908, !1);
          Zone.assertZonePatched();
          const r = this;
          (r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !i && e),
            (r.shouldCoalesceRunChangeDetection = i),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function BR() {
              let n = ve.requestAnimationFrame,
                t = ve.cancelAnimationFrame;
              if (typeof Zone < "u" && n && t) {
                const e = n[Zone.__symbol__("OriginalDelegate")];
                e && (n = e);
                const i = t[Zone.__symbol__("OriginalDelegate")];
                i && (t = i);
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function UR(n) {
              const t = () => {
                !(function HR(n) {
                  n.isCheckStableRunning ||
                    -1 !== n.lastRequestAnimationFrameId ||
                    ((n.lastRequestAnimationFrameId =
                      n.nativeRequestAnimationFrame.call(ve, () => {
                        n.fakeTopEventTask ||
                          (n.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (n.lastRequestAnimationFrameId = -1),
                                dh(n),
                                (n.isCheckStableRunning = !0),
                                ch(n),
                                (n.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          n.fakeTopEventTask.invoke();
                      })),
                    dh(n));
                })(n);
              };
              n._inner = n._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (e, i, r, o, s, a) => {
                  try {
                    return Cy(n), e.invokeTask(r, o, s, a);
                  } finally {
                    ((n.shouldCoalesceEventChangeDetection &&
                      "eventTask" === o.type) ||
                      n.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Dy(n);
                  }
                },
                onInvoke: (e, i, r, o, s, a, l) => {
                  try {
                    return Cy(n), e.invoke(r, o, s, a, l);
                  } finally {
                    n.shouldCoalesceRunChangeDetection && t(), Dy(n);
                  }
                },
                onHasTask: (e, i, r, o) => {
                  e.hasTask(r, o),
                    i === r &&
                      ("microTask" == o.change
                        ? ((n._hasPendingMicrotasks = o.microTask),
                          dh(n),
                          ch(n))
                        : "macroTask" == o.change &&
                          (n.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (e, i, r, o) => (
                  e.handleError(r, o),
                  n.runOutsideAngular(() => n.onError.emit(o)),
                  !1
                ),
              });
            })(r);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!re.isInAngularZone()) throw new v(909, !1);
        }
        static assertNotInAngularZone() {
          if (re.isInAngularZone()) throw new v(909, !1);
        }
        run(t, e, i) {
          return this._inner.run(t, e, i);
        }
        runTask(t, e, i, r) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + r, t, jR, nl, nl);
          try {
            return o.runTask(s, e, i);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(t, e, i) {
          return this._inner.runGuarded(t, e, i);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const jR = {};
      function ch(n) {
        if (0 == n._nesting && !n.hasPendingMicrotasks && !n.isStable)
          try {
            n._nesting++, n.onMicrotaskEmpty.emit(null);
          } finally {
            if ((n._nesting--, !n.hasPendingMicrotasks))
              try {
                n.runOutsideAngular(() => n.onStable.emit(null));
              } finally {
                n.isStable = !0;
              }
          }
      }
      function dh(n) {
        n.hasPendingMicrotasks = !!(
          n._hasPendingMicrotasks ||
          ((n.shouldCoalesceEventChangeDetection ||
            n.shouldCoalesceRunChangeDetection) &&
            -1 !== n.lastRequestAnimationFrameId)
        );
      }
      function Cy(n) {
        n._nesting++,
          n.isStable && ((n.isStable = !1), n.onUnstable.emit(null));
      }
      function Dy(n) {
        n._nesting--, ch(n);
      }
      class zR {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new me()),
            (this.onMicrotaskEmpty = new me()),
            (this.onStable = new me()),
            (this.onError = new me());
        }
        run(t, e, i) {
          return t.apply(e, i);
        }
        runGuarded(t, e, i) {
          return t.apply(e, i);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, i, r) {
          return t.apply(e, i);
        }
      }
      const My = new C(""),
        ol = new C("");
      let mh,
        uh = (() => {
          class n {
            constructor(e, i, r) {
              (this._ngZone = e),
                (this.registry = i),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                mh ||
                  ((function $R(n) {
                    mh = n;
                  })(r),
                  r.addToWindow(i)),
                this._watchAngularEvents(),
                e.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      re.assertNotInAngularZone(),
                        lh(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                lh(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let e = this._callbacks.pop();
                    clearTimeout(e.timeoutId), e.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let e = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (i) =>
                    !i.updateCb ||
                    !i.updateCb(e) ||
                    (clearTimeout(i.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((e) => ({
                    source: e.source,
                    creationLocation: e.creationLocation,
                    data: e.data,
                  }))
                : [];
            }
            addCallback(e, i, r) {
              let o = -1;
              i &&
                i > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== o
                  )),
                    e(this._didWork, this.getPendingTasks());
                }, i)),
                this._callbacks.push({ doneCb: e, timeoutId: o, updateCb: r });
            }
            whenStable(e, i, r) {
              if (r && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(e, i, r), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(e) {
              this.registry.registerApplication(e, this);
            }
            unregisterApplication(e) {
              this.registry.unregisterApplication(e);
            }
            findProviders(e, i, r) {
              return [];
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(D(re), D(hh), D(ol));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        hh = (() => {
          class n {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(e, i) {
              this._applications.set(e, i);
            }
            unregisterApplication(e) {
              this._applications.delete(e);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(e) {
              return this._applications.get(e) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(e, i = !0) {
              return mh?.findTestabilityInTree(this, e, i) ?? null;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = I({
              token: n,
              factory: n.ɵfac,
              providedIn: "platform",
            })),
            n
          );
        })();
      const qn = !1;
      let ui = null;
      const Ey = new C("AllowMultipleToken"),
        fh = new C("PlatformDestroyListeners"),
        Sy = new C("appBootstrapListener");
      class Iy {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function Ty(n, t, e = []) {
        const i = `Platform: ${t}`,
          r = new C(i);
        return (o = []) => {
          let s = ph();
          if (!s || s.injector.get(Ey, !1)) {
            const a = [...e, ...o, { provide: r, useValue: !0 }];
            n
              ? n(a)
              : (function WR(n) {
                  if (ui && !ui.get(Ey, !1)) throw new v(400, !1);
                  ui = n;
                  const t = n.get(Ry);
                  (function Ay(n) {
                    const t = n.get(vy, null);
                    t && t.forEach((e) => e());
                  })(n);
                })(
                  (function ky(n = [], t) {
                    return nn.create({
                      name: t,
                      providers: [
                        { provide: iu, useValue: "platform" },
                        { provide: fh, useValue: new Set([() => (ui = null)]) },
                        ...n,
                      ],
                    });
                  })(a, i)
                );
          }
          return (function QR(n) {
            const t = ph();
            if (!t) throw new v(401, !1);
            return t;
          })();
        };
      }
      function ph() {
        return ui?.get(Ry) ?? null;
      }
      let Ry = (() => {
        class n {
          constructor(e) {
            (this._injector = e),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(e, i) {
            const r = (function Fy(n, t) {
                let e;
                return (
                  (e =
                    "noop" === n
                      ? new zR()
                      : ("zone.js" === n ? void 0 : n) || new re(t)),
                  e
                );
              })(
                i?.ngZone,
                (function Oy(n) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!n || !n.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!n || !n.ngZoneRunCoalescing) || !1,
                  };
                })(i)
              ),
              o = [{ provide: re, useValue: r }];
            return r.run(() => {
              const s = nn.create({
                  providers: o,
                  parent: this.injector,
                  name: e.moduleType.name,
                }),
                a = e.create(s),
                l = a.injector.get(ai, null);
              if (!l) throw new v(402, !1);
              return (
                r.runOutsideAngular(() => {
                  const c = r.onError.subscribe({
                    next: (d) => {
                      l.handleError(d);
                    },
                  });
                  a.onDestroy(() => {
                    sl(this._modules, a), c.unsubscribe();
                  });
                }),
                (function Py(n, t, e) {
                  try {
                    const i = e();
                    return Go(i)
                      ? i.catch((r) => {
                          throw (
                            (t.runOutsideAngular(() => n.handleError(r)), r)
                          );
                        })
                      : i;
                  } catch (i) {
                    throw (t.runOutsideAngular(() => n.handleError(i)), i);
                  }
                })(l, r, () => {
                  const c = a.injector.get(rl);
                  return (
                    c.runInitializers(),
                    c.donePromise.then(
                      () => (
                        (function lv(n) {
                          Vt(n, "Expected localeId to be defined"),
                            "string" == typeof n &&
                              (av = n.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(Cn, jr) || jr),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(e, i = []) {
            const r = Ny({}, i);
            return (function qR(n, t, e) {
              const i = new qu(e);
              return Promise.resolve(i);
            })(0, 0, e).then((o) => this.bootstrapModuleFactory(o, r));
          }
          _moduleDoBootstrap(e) {
            const i = e.injector.get(os);
            if (e._bootstrapComponents.length > 0)
              e._bootstrapComponents.forEach((r) => i.bootstrap(r));
            else {
              if (!e.instance.ngDoBootstrap) throw new v(-403, !1);
              e.instance.ngDoBootstrap(i);
            }
            this._modules.push(e);
          }
          onDestroy(e) {
            this._destroyListeners.push(e);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new v(404, !1);
            this._modules.slice().forEach((i) => i.destroy()),
              this._destroyListeners.forEach((i) => i());
            const e = this._injector.get(fh, null);
            e && (e.forEach((i) => i()), e.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(nn));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "platform" })),
          n
        );
      })();
      function Ny(n, t) {
        return Array.isArray(t) ? t.reduce(Ny, n) : { ...n, ...t };
      }
      let os = (() => {
        class n {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(e, i, r) {
            (this._zone = e),
              (this._injector = i),
              (this._exceptionHandler = r),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const o = new Ee((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new Ee((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    re.assertNotInAngularZone(),
                      lh(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const c = this._zone.onUnstable.subscribe(() => {
                  re.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), c.unsubscribe();
                };
              });
            this.isStable = (function mp(...n) {
              const t = _o(n),
                e = (function $M(n, t) {
                  return "number" == typeof qc(n) ? n.pop() : t;
                })(n, 1 / 0),
                i = n;
              return i.length
                ? 1 === i.length
                  ? Lt(i[0])
                  : rr(e)(Pe(i, t))
                : un;
            })(
              o,
              s.pipe(
                (function fp(n = {}) {
                  const {
                    connector: t = () => new qe(),
                    resetOnError: e = !0,
                    resetOnComplete: i = !0,
                    resetOnRefCountZero: r = !0,
                  } = n;
                  return (o) => {
                    let s,
                      a,
                      l,
                      c = 0,
                      d = !1,
                      u = !1;
                    const h = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      m = () => {
                        h(), (s = l = void 0), (d = u = !1);
                      },
                      f = () => {
                        const p = s;
                        m(), p?.unsubscribe();
                      };
                    return ke((p, g) => {
                      c++, !u && !d && h();
                      const y = (l = l ?? t());
                      g.add(() => {
                        c--, 0 === c && !u && !d && (a = Gc(f, r));
                      }),
                        y.subscribe(g),
                        !s &&
                          c > 0 &&
                          ((s = new go({
                            next: (x) => y.next(x),
                            error: (x) => {
                              (u = !0), h(), (a = Gc(m, e, x)), y.error(x);
                            },
                            complete: () => {
                              (d = !0), h(), (a = Gc(m, i)), y.complete();
                            },
                          })),
                          Lt(p).subscribe(s));
                    })(o);
                  };
                })()
              )
            );
          }
          bootstrap(e, i) {
            const r = e instanceof b_;
            if (!this._injector.get(rl).done) {
              !r &&
                (function sr(n) {
                  const t = ae(n) || nt(n) || bt(n);
                  return null !== t && t.standalone;
                })(e);
              throw new v(405, qn);
            }
            let s;
            (s = r ? e : this._injector.get(jo).resolveComponentFactory(e)),
              this.componentTypes.push(s.componentType);
            const a = (function GR(n) {
                return n.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Hr),
              c = s.create(nn.NULL, [], i || s.selector, a),
              d = c.location.nativeElement,
              u = c.injector.get(My, null);
            return (
              u?.registerApplication(d),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  sl(this.components, c),
                  u?.unregisterApplication(d);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new v(101, !1);
            try {
              this._runningTick = !0;
              for (let e of this._views) e.detectChanges();
            } catch (e) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(e)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(e) {
            const i = e;
            this._views.push(i), i.attachToAppRef(this);
          }
          detachView(e) {
            const i = e;
            sl(this._views, i), i.detachFromAppRef();
          }
          _loadComponent(e) {
            this.attachView(e.hostView), this.tick(), this.components.push(e);
            const i = this._injector.get(Sy, []);
            i.push(...this._bootstrapListeners), i.forEach((r) => r(e));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((e) => e()),
                  this._views.slice().forEach((e) => e.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(e) {
            return (
              this._destroyListeners.push(e),
              () => sl(this._destroyListeners, e)
            );
          }
          destroy() {
            if (this._destroyed) throw new v(406, !1);
            const e = this._injector;
            e.destroy && !e.destroyed && e.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(re), D(Vn), D(ai));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function sl(n, t) {
        const e = n.indexOf(t);
        e > -1 && n.splice(e, 1);
      }
      let qr = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = YR), n;
      })();
      function YR(n) {
        return (function XR(n, t, e) {
          if (Mo(n) && !e) {
            const i = vt(n.index, t);
            return new zo(i, i);
          }
          return 47 & n.type ? new zo(t[rt], t) : null;
        })(Qe(), w(), 16 == (16 & n));
      }
      class Hy {
        constructor() {}
        supports(t) {
          return Ua(t);
        }
        create(t) {
          return new rO(t);
        }
      }
      const iO = (n, t) => t;
      class rO {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || iO);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            i = this._removalsHead,
            r = 0,
            o = null;
          for (; e || i; ) {
            const s = !i || (e && e.currentIndex < zy(i, r, o)) ? e : i,
              a = zy(s, r, o),
              l = s.currentIndex;
            if (s === i) r--, (i = i._nextRemoved);
            else if (((e = e._next), null == s.previousIndex)) r++;
            else {
              o || (o = []);
              const c = a - r,
                d = l - r;
              if (c != d) {
                for (let h = 0; h < c; h++) {
                  const m = h < o.length ? o[h] : (o[h] = 0),
                    f = m + h;
                  d <= f && f < c && (o[h] = m + 1);
                }
                o[s.previousIndex] = d - c;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !Ua(t))) throw new v(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let r,
            o,
            s,
            e = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (o = t[a]),
                (s = this._trackByFn(a, o)),
                null !== e && Object.is(e.trackById, s)
                  ? (i && (e = this._verifyReinsertion(e, o, s, a)),
                    Object.is(e.item, o) || this._addIdentityChange(e, o))
                  : ((e = this._mismatch(e, o, s, a)), (i = !0)),
                (e = e._next);
          } else
            (r = 0),
              (function TT(n, t) {
                if (Array.isArray(n))
                  for (let e = 0; e < n.length; e++) t(n[e]);
                else {
                  const e = n[Symbol.iterator]();
                  let i;
                  for (; !(i = e.next()).done; ) t(i.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(r, a)),
                  null !== e && Object.is(e.trackById, s)
                    ? (i && (e = this._verifyReinsertion(e, a, s, r)),
                      Object.is(e.item, a) || this._addIdentityChange(e, a))
                    : ((e = this._mismatch(e, a, s, r)), (i = !0)),
                  (e = e._next),
                  r++;
              }),
              (this.length = r);
          return this._truncate(e), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, i, r) {
          let o;
          return (
            null === t ? (o = this._itTail) : ((o = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(i, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, o, r))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(i, r))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, o, r))
              : (t = this._addAfter(new oO(e, i), o, r)),
            t
          );
        }
        _verifyReinsertion(t, e, i, r) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(i, null);
          return (
            null !== o
              ? (t = this._reinsertAfter(o, t._prev, r))
              : t.currentIndex != r &&
                ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, i) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            o = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = o) : (r._nextRemoved = o),
            null === o ? (this._removalsTail = r) : (o._prevRemoved = r),
            this._insertAfter(t, e, i),
            this._addToMoves(t, i),
            t
          );
        }
        _moveAfter(t, e, i) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, i),
            this._addToMoves(t, i),
            t
          );
        }
        _addAfter(t, e, i) {
          return (
            this._insertAfter(t, e, i),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, i) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Uy()),
            this._linkedRecords.put(t),
            (t.currentIndex = i),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            i = t._next;
          return (
            null === e ? (this._itHead = i) : (e._next = i),
            null === i ? (this._itTail = e) : (i._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Uy()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class oO {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class sO {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let i;
          for (i = this._head; null !== i; i = i._nextDup)
            if (
              (null === e || e <= i.currentIndex) &&
              Object.is(i.trackById, t)
            )
              return i;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            i = t._nextDup;
          return (
            null === e ? (this._head = i) : (e._nextDup = i),
            null === i ? (this._tail = e) : (i._prevDup = e),
            null === this._head
          );
        }
      }
      class Uy {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let i = this.map.get(e);
          i || ((i = new sO()), this.map.set(e, i)), i.add(t);
        }
        get(t, e) {
          const r = this.map.get(t);
          return r ? r.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function zy(n, t, e) {
        const i = n.previousIndex;
        if (null === i) return i;
        let r = 0;
        return e && i < e.length && (r = e[i]), i + t + r;
      }
      function qy() {
        return new cl([new Hy()]);
      }
      let cl = (() => {
        class n {
          constructor(e) {
            this.factories = e;
          }
          static create(e, i) {
            if (null != i) {
              const r = i.factories.slice();
              e = e.concat(r);
            }
            return new n(e);
          }
          static extend(e) {
            return {
              provide: n,
              useFactory: (i) => n.create(e, i || qy()),
              deps: [[n, new yr(), new si()]],
            };
          }
          find(e) {
            const i = this.factories.find((r) => r.supports(e));
            if (null != i) return i;
            throw new v(901, !1);
          }
        }
        return (n.ɵprov = I({ token: n, providedIn: "root", factory: qy })), n;
      })();
      const uO = Ty(null, "core", []);
      let hO = (() => {
        class n {
          constructor(e) {}
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(os));
          }),
          (n.ɵmod = we({ type: n })),
          (n.ɵinj = be({})),
          n
        );
      })();
      function Gr(n) {
        return "boolean" == typeof n ? n : null != n && "false" !== n;
      }
      let yh = null;
      function Gn() {
        return yh;
      }
      class pO {}
      const ge = new C("DocumentToken");
      let wh = (() => {
        class n {
          historyGo(e) {
            throw new Error("Not implemented");
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = I({
            token: n,
            factory: function () {
              return (function gO() {
                return D(Wy);
              })();
            },
            providedIn: "platform",
          })),
          n
        );
      })();
      const _O = new C("Location Initialized");
      let Wy = (() => {
        class n extends wh {
          constructor(e) {
            super(),
              (this._doc = e),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Gn().getBaseHref(this._doc);
          }
          onPopState(e) {
            const i = Gn().getGlobalEventTarget(this._doc, "window");
            return (
              i.addEventListener("popstate", e, !1),
              () => i.removeEventListener("popstate", e)
            );
          }
          onHashChange(e) {
            const i = Gn().getGlobalEventTarget(this._doc, "window");
            return (
              i.addEventListener("hashchange", e, !1),
              () => i.removeEventListener("hashchange", e)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(e) {
            this._location.pathname = e;
          }
          pushState(e, i, r) {
            Ky() ? this._history.pushState(e, i, r) : (this._location.hash = r);
          }
          replaceState(e, i, r) {
            Ky()
              ? this._history.replaceState(e, i, r)
              : (this._location.hash = r);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(e = 0) {
            this._history.go(e);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(ge));
          }),
          (n.ɵprov = I({
            token: n,
            factory: function () {
              return (function bO() {
                return new Wy(D(ge));
              })();
            },
            providedIn: "platform",
          })),
          n
        );
      })();
      function Ky() {
        return !!window.history.pushState;
      }
      function xh(n, t) {
        if (0 == n.length) return t;
        if (0 == t.length) return n;
        let e = 0;
        return (
          n.endsWith("/") && e++,
          t.startsWith("/") && e++,
          2 == e ? n + t.substring(1) : 1 == e ? n + t : n + "/" + t
        );
      }
      function Qy(n) {
        const t = n.match(/#|\?|$/),
          e = (t && t.index) || n.length;
        return n.slice(0, e - ("/" === n[e - 1] ? 1 : 0)) + n.slice(e);
      }
      function Wn(n) {
        return n && "?" !== n[0] ? "?" + n : n;
      }
      let Ui = (() => {
        class n {
          historyGo(e) {
            throw new Error("Not implemented");
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = I({
            token: n,
            factory: function () {
              return q(Yy);
            },
            providedIn: "root",
          })),
          n
        );
      })();
      const Zy = new C("appBaseHref");
      let Yy = (() => {
          class n extends Ui {
            constructor(e, i) {
              super(),
                (this._platformLocation = e),
                (this._removeListenerFns = []),
                (this._baseHref =
                  i ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  q(ge).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(e) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(e),
                this._platformLocation.onHashChange(e)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(e) {
              return xh(this._baseHref, e);
            }
            path(e = !1) {
              const i =
                  this._platformLocation.pathname +
                  Wn(this._platformLocation.search),
                r = this._platformLocation.hash;
              return r && e ? `${i}${r}` : i;
            }
            pushState(e, i, r, o) {
              const s = this.prepareExternalUrl(r + Wn(o));
              this._platformLocation.pushState(e, i, s);
            }
            replaceState(e, i, r, o) {
              const s = this.prepareExternalUrl(r + Wn(o));
              this._platformLocation.replaceState(e, i, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(e = 0) {
              this._platformLocation.historyGo?.(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(D(wh), D(Zy, 8));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        vO = (() => {
          class n extends Ui {
            constructor(e, i) {
              super(),
                (this._platformLocation = e),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != i && (this._baseHref = i);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(e) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(e),
                this._platformLocation.onHashChange(e)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(e = !1) {
              let i = this._platformLocation.hash;
              return null == i && (i = "#"), i.length > 0 ? i.substring(1) : i;
            }
            prepareExternalUrl(e) {
              const i = xh(this._baseHref, e);
              return i.length > 0 ? "#" + i : i;
            }
            pushState(e, i, r, o) {
              let s = this.prepareExternalUrl(r + Wn(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(e, i, s);
            }
            replaceState(e, i, r, o) {
              let s = this.prepareExternalUrl(r + Wn(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(e, i, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(e = 0) {
              this._platformLocation.historyGo?.(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(D(wh), D(Zy, 8));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Ch = (() => {
          class n {
            constructor(e) {
              (this._subject = new me()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = e);
              const i = this._locationStrategy.getBaseHref();
              (this._basePath = (function xO(n) {
                if (new RegExp("^(https?:)?//").test(n)) {
                  const [, e] = n.split(/\/\/[^\/]+/);
                  return e;
                }
                return n;
              })(Qy(Xy(i)))),
                this._locationStrategy.onPopState((r) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: r.state,
                    type: r.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(e = !1) {
              return this.normalize(this._locationStrategy.path(e));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(e, i = "") {
              return this.path() == this.normalize(e + Wn(i));
            }
            normalize(e) {
              return n.stripTrailingSlash(
                (function wO(n, t) {
                  if (!n || !t.startsWith(n)) return t;
                  const e = t.substring(n.length);
                  return "" === e || ["/", ";", "?", "#"].includes(e[0])
                    ? e
                    : t;
                })(this._basePath, Xy(e))
              );
            }
            prepareExternalUrl(e) {
              return (
                e && "/" !== e[0] && (e = "/" + e),
                this._locationStrategy.prepareExternalUrl(e)
              );
            }
            go(e, i = "", r = null) {
              this._locationStrategy.pushState(r, "", e, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(e + Wn(i)),
                  r
                );
            }
            replaceState(e, i = "", r = null) {
              this._locationStrategy.replaceState(r, "", e, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(e + Wn(i)),
                  r
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(e = 0) {
              this._locationStrategy.historyGo?.(e);
            }
            onUrlChange(e) {
              return (
                this._urlChangeListeners.push(e),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((i) => {
                    this._notifyUrlChangeListeners(i.url, i.state);
                  })),
                () => {
                  const i = this._urlChangeListeners.indexOf(e);
                  this._urlChangeListeners.splice(i, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(e = "", i) {
              this._urlChangeListeners.forEach((r) => r(e, i));
            }
            subscribe(e, i, r) {
              return this._subject.subscribe({
                next: e,
                error: i,
                complete: r,
              });
            }
          }
          return (
            (n.normalizeQueryParams = Wn),
            (n.joinWithSlash = xh),
            (n.stripTrailingSlash = Qy),
            (n.ɵfac = function (e) {
              return new (e || n)(D(Ui));
            }),
            (n.ɵprov = I({
              token: n,
              factory: function () {
                return (function yO() {
                  return new Ch(D(Ui));
                })();
              },
              providedIn: "root",
            })),
            n
          );
        })();
      function Xy(n) {
        return n.replace(/\/index.html$/, "");
      }
      class lF {
        constructor(t, e, i, r) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = i),
            (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let dw = (() => {
        class n {
          set ngForOf(e) {
            (this._ngForOf = e), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(e) {
            this._trackByFn = e;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(e, i, r) {
            (this._viewContainer = e),
              (this._template = i),
              (this._differs = r),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(e) {
            e && (this._template = e);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const e = this._ngForOf;
              !this._differ &&
                e &&
                (this._differ = this._differs
                  .find(e)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const e = this._differ.diff(this._ngForOf);
              e && this._applyChanges(e);
            }
          }
          _applyChanges(e) {
            const i = this._viewContainer;
            e.forEachOperation((r, o, s) => {
              if (null == r.previousIndex)
                i.createEmbeddedView(
                  this._template,
                  new lF(r.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) i.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = i.get(o);
                i.move(a, s), uw(a, r);
              }
            });
            for (let r = 0, o = i.length; r < o; r++) {
              const a = i.get(r).context;
              (a.index = r), (a.count = o), (a.ngForOf = this._ngForOf);
            }
            e.forEachIdentityChange((r) => {
              uw(i.get(r.currentIndex), r);
            });
          }
          static ngTemplateContextGuard(e, i) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(sn), _(Un), _(cl));
          }),
          (n.ɵdir = T({
            type: n,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          n
        );
      })();
      function uw(n, t) {
        n.context.$implicit = t.item;
      }
      let cs = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵmod = we({ type: n })),
          (n.ɵinj = be({})),
          n
        );
      })();
      const _w = "browser";
      let HF = (() => {
        class n {}
        return (
          (n.ɵprov = I({
            token: n,
            providedIn: "root",
            factory: () => new UF(D(ge), window),
          })),
          n
        );
      })();
      class UF {
        constructor(t, e) {
          (this.document = t), (this.window = e), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const e = (function zF(n, t) {
            const e = n.getElementById(t) || n.getElementsByName(t)[0];
            if (e) return e;
            if (
              "function" == typeof n.createTreeWalker &&
              n.body &&
              (n.body.createShadowRoot || n.body.attachShadow)
            ) {
              const i = n.createTreeWalker(n.body, NodeFilter.SHOW_ELEMENT);
              let r = i.currentNode;
              for (; r; ) {
                const o = r.shadowRoot;
                if (o) {
                  const s =
                    o.getElementById(t) || o.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                r = i.nextNode();
              }
            }
            return null;
          })(this.document, t);
          e && (this.scrollToElement(e), e.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            i = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            o = this.offset();
          this.window.scrollTo(i - o[0], r - o[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              bw(this.window.history) ||
              bw(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function bw(n) {
        return Object.getOwnPropertyDescriptor(n, "scrollRestoration");
      }
      class _P extends pO {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class jh extends _P {
        static makeCurrent() {
          !(function fO(n) {
            yh || (yh = n);
          })(new jh());
        }
        onAndCancel(t, e, i) {
          return (
            t.addEventListener(e, i, !1),
            () => {
              t.removeEventListener(e, i, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const e = (function bP() {
            return (
              (us = us || document.querySelector("base")),
              us ? us.getAttribute("href") : null
            );
          })();
          return null == e
            ? null
            : (function vP(n) {
                (wl = wl || document.createElement("a")),
                  wl.setAttribute("href", n);
                const t = wl.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(e);
        }
        resetBaseElement() {
          us = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function oF(n, t) {
            t = encodeURIComponent(t);
            for (const e of n.split(";")) {
              const i = e.indexOf("="),
                [r, o] = -1 == i ? [e, ""] : [e.slice(0, i), e.slice(i + 1)];
              if (r.trim() === t) return decodeURIComponent(o);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let wl,
        us = null;
      const Cw = new C("TRANSITION_ID"),
        wP = [
          {
            provide: il,
            useFactory: function yP(n, t, e) {
              return () => {
                e.get(rl).donePromise.then(() => {
                  const i = Gn(),
                    r = t.querySelectorAll(`style[ng-transition="${n}"]`);
                  for (let o = 0; o < r.length; o++) i.remove(r[o]);
                });
              };
            },
            deps: [Cw, ge, nn],
            multi: !0,
          },
        ];
      let CP = (() => {
        class n {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const xl = new C("EventManagerPlugins");
      let Cl = (() => {
        class n {
          constructor(e, i) {
            (this._zone = i),
              (this._eventNameToPlugin = new Map()),
              e.forEach((r) => {
                r.manager = this;
              }),
              (this._plugins = e.slice().reverse());
          }
          addEventListener(e, i, r) {
            return this._findPluginFor(i).addEventListener(e, i, r);
          }
          addGlobalEventListener(e, i, r) {
            return this._findPluginFor(i).addGlobalEventListener(e, i, r);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(e) {
            const i = this._eventNameToPlugin.get(e);
            if (i) return i;
            const r = this._plugins;
            for (let o = 0; o < r.length; o++) {
              const s = r[o];
              if (s.supports(e)) return this._eventNameToPlugin.set(e, s), s;
            }
            throw new Error(`No event manager plugin found for event ${e}`);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(xl), D(re));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Dw {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, i) {
          const r = Gn().getGlobalEventTarget(this._doc, t);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, i);
        }
      }
      let Mw = (() => {
          class n {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(e) {
              for (const i of e)
                1 === this.changeUsageCount(i, 1) && this.onStyleAdded(i);
            }
            removeStyles(e) {
              for (const i of e)
                0 === this.changeUsageCount(i, -1) && this.onStyleRemoved(i);
            }
            onStyleRemoved(e) {}
            onStyleAdded(e) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(e, i) {
              const r = this.usageCount;
              let o = r.get(e) ?? 0;
              return (o += i), o > 0 ? r.set(e, o) : r.delete(e), o;
            }
            ngOnDestroy() {
              for (const e of this.getAllStyles()) this.onStyleRemoved(e);
              this.usageCount.clear();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        hs = (() => {
          class n extends Mw {
            constructor(e) {
              super(),
                (this.doc = e),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(e) {
              for (const i of this.hostNodes) this.addStyleToHost(i, e);
            }
            onStyleRemoved(e) {
              const i = this.styleRef;
              i.get(e)?.forEach((o) => o.remove()), i.delete(e);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(e) {
              this.hostNodes.add(e);
              for (const i of this.getAllStyles()) this.addStyleToHost(e, i);
            }
            removeHost(e) {
              this.hostNodes.delete(e);
            }
            addStyleToHost(e, i) {
              const r = this.doc.createElement("style");
              (r.textContent = i), e.appendChild(r);
              const o = this.styleRef.get(i);
              o ? o.push(r) : this.styleRef.set(i, [r]);
            }
            resetHostNodes() {
              const e = this.hostNodes;
              e.clear(), e.add(this.doc.head);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(D(ge));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      const Hh = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Uh = /%COMP%/g,
        Iw = new C("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function Aw(n, t) {
        return t.flat(100).map((e) => e.replace(Uh, n));
      }
      function Tw(n) {
        return (t) => {
          if ("__ngUnwrap__" === t) return n;
          !1 === n(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Dl = (() => {
        class n {
          constructor(e, i, r, o) {
            (this.eventManager = e),
              (this.sharedStylesHost = i),
              (this.appId = r),
              (this.removeStylesOnCompDestory = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new zh(e));
          }
          createRenderer(e, i) {
            if (!e || !i) return this.defaultRenderer;
            const r = this.getOrCreateRenderer(e, i);
            return (
              r instanceof Ow
                ? r.applyToHost(e)
                : r instanceof $h && r.applyStyles(),
              r
            );
          }
          getOrCreateRenderer(e, i) {
            const r = this.rendererByCompId;
            let o = r.get(i.id);
            if (!o) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                l = this.removeStylesOnCompDestory;
              switch (i.encapsulation) {
                case Yt.Emulated:
                  o = new Ow(s, a, i, this.appId, l);
                  break;
                case Yt.ShadowDom:
                  return new TP(s, a, e, i);
                default:
                  o = new $h(s, a, i, l);
              }
              (o.onDestroy = () => r.delete(i.id)), r.set(i.id, o);
            }
            return o;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(Cl), D(hs), D(rs), D(Iw));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class zh {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(Hh[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          (Rw(t) ? t.content : t).appendChild(e);
        }
        insertBefore(t, e, i) {
          t && (Rw(t) ? t.content : t).insertBefore(e, i);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let i = "string" == typeof t ? document.querySelector(t) : t;
          if (!i)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (i.textContent = ""), i;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, i, r) {
          if (r) {
            e = r + ":" + e;
            const o = Hh[r];
            o ? t.setAttributeNS(o, e, i) : t.setAttribute(e, i);
          } else t.setAttribute(e, i);
        }
        removeAttribute(t, e, i) {
          if (i) {
            const r = Hh[i];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${i}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, i, r) {
          r & (yt.DashCase | yt.Important)
            ? t.style.setProperty(e, i, r & yt.Important ? "important" : "")
            : (t.style[e] = i);
        }
        removeStyle(t, e, i) {
          i & yt.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, i) {
          t[e] = i;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, i) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, Tw(i))
            : this.eventManager.addEventListener(t, e, Tw(i));
        }
      }
      function Rw(n) {
        return "TEMPLATE" === n.tagName && void 0 !== n.content;
      }
      class TP extends zh {
        constructor(t, e, i, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = i),
            (this.shadowRoot = i.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const o = Aw(r.id, r.styles);
          for (const s of o) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, i) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, i);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class $h extends zh {
        constructor(t, e, i, r, o = i.id) {
          super(t),
            (this.sharedStylesHost = e),
            (this.removeStylesOnCompDestory = r),
            (this.rendererUsageCount = 0),
            (this.styles = Aw(o, i.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class Ow extends $h {
        constructor(t, e, i, r, o) {
          const s = r + "-" + i.id;
          super(t, e, i, o, s),
            (this.contentAttr = (function SP(n) {
              return "_ngcontent-%COMP%".replace(Uh, n);
            })(s)),
            (this.hostAttr = (function IP(n) {
              return "_nghost-%COMP%".replace(Uh, n);
            })(s));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const i = super.createElement(t, e);
          return super.setAttribute(i, this.contentAttr, ""), i;
        }
      }
      let kP = (() => {
        class n extends Dw {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return !0;
          }
          addEventListener(e, i, r) {
            return (
              e.addEventListener(i, r, !1),
              () => this.removeEventListener(e, i, r)
            );
          }
          removeEventListener(e, i, r) {
            return e.removeEventListener(i, r);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(ge));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Fw = ["alt", "control", "meta", "shift"],
        RP = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        OP = {
          alt: (n) => n.altKey,
          control: (n) => n.ctrlKey,
          meta: (n) => n.metaKey,
          shift: (n) => n.shiftKey,
        };
      let FP = (() => {
        class n extends Dw {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return null != n.parseEventName(e);
          }
          addEventListener(e, i, r) {
            const o = n.parseEventName(i),
              s = n.eventCallback(o.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Gn().onAndCancel(e, o.domEventName, s));
          }
          static parseEventName(e) {
            const i = e.toLowerCase().split("."),
              r = i.shift();
            if (0 === i.length || ("keydown" !== r && "keyup" !== r))
              return null;
            const o = n._normalizeKey(i.pop());
            let s = "",
              a = i.indexOf("code");
            if (
              (a > -1 && (i.splice(a, 1), (s = "code.")),
              Fw.forEach((c) => {
                const d = i.indexOf(c);
                d > -1 && (i.splice(d, 1), (s += c + "."));
              }),
              (s += o),
              0 != i.length || 0 === o.length)
            )
              return null;
            const l = {};
            return (l.domEventName = r), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(e, i) {
            let r = RP[e.key] || e.key,
              o = "";
            return (
              i.indexOf("code.") > -1 && ((r = e.code), (o = "code.")),
              !(null == r || !r) &&
                ((r = r.toLowerCase()),
                " " === r ? (r = "space") : "." === r && (r = "dot"),
                Fw.forEach((s) => {
                  s !== r && (0, OP[s])(e) && (o += s + ".");
                }),
                (o += r),
                o === i)
            );
          }
          static eventCallback(e, i, r) {
            return (o) => {
              n.matchEventFullKeyCode(o, e) && r.runGuarded(() => i(o));
            };
          }
          static _normalizeKey(e) {
            return "esc" === e ? "escape" : e;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(ge));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const VP = Ty(uO, "browser", [
          { provide: ah, useValue: _w },
          {
            provide: vy,
            useValue: function PP() {
              jh.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: ge,
            useFactory: function LP() {
              return (
                (function aI(n) {
                  Qd = n;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Lw = new C(""),
        Vw = [
          {
            provide: ol,
            useClass: class xP {
              addToWindow(t) {
                (ve.getAngularTestability = (i, r = !0) => {
                  const o = t.findTestabilityInTree(i, r);
                  if (null == o)
                    throw new Error("Could not find testability for element.");
                  return o;
                }),
                  (ve.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (ve.getAllAngularRootElements = () => t.getAllRootElements()),
                  ve.frameworkStabilizers || (ve.frameworkStabilizers = []),
                  ve.frameworkStabilizers.push((i) => {
                    const r = ve.getAllAngularTestabilities();
                    let o = r.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), o--, 0 == o && i(s);
                    };
                    r.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, e, i) {
                return null == e
                  ? null
                  : t.getTestability(e) ??
                      (i
                        ? Gn().isShadowRoot(e)
                          ? this.findTestabilityInTree(t, e.host, !0)
                          : this.findTestabilityInTree(t, e.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: My, useClass: uh, deps: [re, hh, ol] },
          { provide: uh, useClass: uh, deps: [re, hh, ol] },
        ],
        Bw = [
          { provide: iu, useValue: "root" },
          {
            provide: ai,
            useFactory: function NP() {
              return new ai();
            },
            deps: [],
          },
          { provide: xl, useClass: kP, multi: !0, deps: [ge, re, ah] },
          { provide: xl, useClass: FP, multi: !0, deps: [ge] },
          { provide: Dl, useClass: Dl, deps: [Cl, hs, rs, Iw] },
          { provide: Ho, useExisting: Dl },
          { provide: Mw, useExisting: hs },
          { provide: hs, useClass: hs, deps: [ge] },
          { provide: Cl, useClass: Cl, deps: [xl, re] },
          { provide: class $F {}, useClass: CP, deps: [] },
          [],
        ];
      let jw = (() => {
          class n {
            constructor(e) {}
            static withServerTransition(e) {
              return {
                ngModule: n,
                providers: [
                  { provide: rs, useValue: e.appId },
                  { provide: Cw, useExisting: rs },
                  wP,
                ],
              };
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(D(Lw, 12));
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({ providers: [...Bw, ...Vw], imports: [cs, hO] })),
            n
          );
        })(),
        Hw = (() => {
          class n {
            constructor(e) {
              this._doc = e;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(e) {
              this._doc.title = e || "";
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(D(ge));
            }),
            (n.ɵprov = I({
              token: n,
              factory: function (e) {
                let i = null;
                return (
                  (i = e
                    ? new e()
                    : (function jP() {
                        return new Hw(D(ge));
                      })()),
                  i
                );
              },
              providedIn: "root",
            })),
            n
          );
        })();
      typeof window < "u" && window;
      const { isArray: GP } = Array,
        { getPrototypeOf: WP, prototype: KP, keys: QP } = Object;
      const { isArray: YP } = Array;
      const qt = new C("NgValueAccessor");
      let _m;
      try {
        _m = typeof Intl < "u" && Intl.v8BreakIterator;
      } catch {
        _m = !1;
      }
      let bs,
        bm,
        qi = (() => {
          class n {
            constructor(e) {
              (this._platformId = e),
                (this.isBrowser = this._platformId
                  ? (function jF(n) {
                      return n === _w;
                    })(this._platformId)
                  : "object" == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !_m) &&
                  typeof CSS < "u" &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !("MSStream" in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(D(ah));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      function Fl(n) {
        return (function tL() {
          if (null == bs && typeof window < "u")
            try {
              window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", { get: () => (bs = !0) })
              );
            } finally {
              bs = bs || !1;
            }
          return bs;
        })()
          ? n
          : !!n.capture;
      }
      function Qr(n) {
        return n.composedPath ? n.composedPath()[0] : n.target;
      }
      class Gt extends qe {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return !e.closed && t.next(this._value), e;
        }
        getValue() {
          const { hasError: t, thrownError: e, _value: i } = this;
          if (t) throw e;
          return this._throwIfClosed(), i;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function k(...n) {
        return Pe(n, _o(n));
      }
      function He(n, t, e) {
        const i = fe(n) || t || e ? { next: n, error: t, complete: e } : n;
        return i
          ? ke((r, o) => {
              var s;
              null === (s = i.subscribe) || void 0 === s || s.call(i);
              let a = !0;
              r.subscribe(
                Se(
                  o,
                  (l) => {
                    var c;
                    null === (c = i.next) || void 0 === c || c.call(i, l),
                      o.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = i.complete) || void 0 === l || l.call(i),
                      o.complete();
                  },
                  (l) => {
                    var c;
                    (a = !1),
                      null === (c = i.error) || void 0 === c || c.call(i, l),
                      o.error(l);
                  },
                  () => {
                    var l, c;
                    a &&
                      (null === (l = i.unsubscribe) ||
                        void 0 === l ||
                        l.call(i)),
                      null === (c = i.finalize) || void 0 === c || c.call(i);
                  }
                )
              );
            })
          : ni;
      }
      class ML extends tt {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      const Nl = {
        setInterval(n, t, ...e) {
          const { delegate: i } = Nl;
          return i?.setInterval
            ? i.setInterval(n, t, ...e)
            : setInterval(n, t, ...e);
        },
        clearInterval(n) {
          const { delegate: t } = Nl;
          return (t?.clearInterval || clearInterval)(n);
        },
        delegate: void 0,
      };
      class vm extends ML {
        constructor(t, e) {
          super(t, e),
            (this.scheduler = t),
            (this.work = e),
            (this.pending = !1);
        }
        schedule(t, e = 0) {
          var i;
          if (this.closed) return this;
          this.state = t;
          const r = this.id,
            o = this.scheduler;
          return (
            null != r && (this.id = this.recycleAsyncId(o, r, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id =
              null !== (i = this.id) && void 0 !== i
                ? i
                : this.requestAsyncId(o, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, i = 0) {
          return Nl.setInterval(t.flush.bind(t, this), i);
        }
        recycleAsyncId(t, e, i = 0) {
          if (null != i && this.delay === i && !1 === this.pending) return e;
          null != e && Nl.clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const i = this._execute(t, e);
          if (i) return i;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let r,
            i = !1;
          try {
            this.work(t);
          } catch (o) {
            (i = !0),
              (r = o || new Error("Scheduled action threw falsy error"));
          }
          if (i) return this.unsubscribe(), r;
        }
        unsubscribe() {
          if (!this.closed) {
            const { id: t, scheduler: e } = this,
              { actions: i } = e;
            (this.work = this.state = this.scheduler = null),
              (this.pending = !1),
              ir(i, this),
              null != t && (this.id = this.recycleAsyncId(e, t, null)),
              (this.delay = null),
              super.unsubscribe();
          }
        }
      }
      const tx = { now: () => (tx.delegate || Date).now(), delegate: void 0 };
      class vs {
        constructor(t, e = vs.now) {
          (this.schedulerActionCtor = t), (this.now = e);
        }
        schedule(t, e = 0, i) {
          return new this.schedulerActionCtor(this, t).schedule(i, e);
        }
      }
      vs.now = tx.now;
      class ym extends vs {
        constructor(t, e = vs.now) {
          super(t, e), (this.actions = []), (this._active = !1);
        }
        flush(t) {
          const { actions: e } = this;
          if (this._active) return void e.push(t);
          let i;
          this._active = !0;
          do {
            if ((i = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this._active = !1), i)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw i;
          }
        }
      }
      const EL = new ym(vm);
      function dn(n, t) {
        return ke((e, i) => {
          let r = 0;
          e.subscribe(Se(i, (o) => n.call(t, o, r++) && i.next(o)));
        });
      }
      function nx(n) {
        return dn((t, e) => n <= e);
      }
      function IL(n, t) {
        return n === t;
      }
      function Ll(n) {
        return ke((t, e) => {
          Lt(n).subscribe(Se(e, () => e.complete(), Pc)),
            !e.closed && t.subscribe(e);
        });
      }
      function Rt(n) {
        return null != n && "false" != `${n}`;
      }
      function ix(n) {
        return Array.isArray(n) ? n : [n];
      }
      function Zr(n) {
        return n instanceof Ae ? n.nativeElement : n;
      }
      function Cm(...n) {
        const t = _o(n),
          e = (function cp(n) {
            return fe(qc(n)) ? n.pop() : void 0;
          })(n),
          { args: i, keys: r } = (function qw(n) {
            if (1 === n.length) {
              const t = n[0];
              if (GP(t)) return { args: t, keys: null };
              if (
                (function ZP(n) {
                  return n && "object" == typeof n && WP(n) === KP;
                })(t)
              ) {
                const e = QP(t);
                return { args: e.map((i) => t[i]), keys: e };
              }
            }
            return { args: n, keys: null };
          })(n);
        if (0 === i.length) return Pe([], t);
        const o = new Ee(
          (function TL(n, t, e = ni) {
            return (i) => {
              rx(
                t,
                () => {
                  const { length: r } = n,
                    o = new Array(r);
                  let s = r,
                    a = r;
                  for (let l = 0; l < r; l++)
                    rx(
                      t,
                      () => {
                        const c = Pe(n[l], t);
                        let d = !1;
                        c.subscribe(
                          Se(
                            i,
                            (u) => {
                              (o[l] = u),
                                d || ((d = !0), a--),
                                a || i.next(e(o.slice()));
                            },
                            () => {
                              --s || i.complete();
                            }
                          )
                        );
                      },
                      i
                    );
                },
                i
              );
            };
          })(
            i,
            t,
            r
              ? (s) =>
                  (function Ww(n, t) {
                    return n.reduce((e, i, r) => ((e[i] = t[r]), e), {});
                  })(r, s)
              : ni
          )
        );
        return e
          ? o.pipe(
              (function Gw(n) {
                return V((t) =>
                  (function XP(n, t) {
                    return YP(t) ? n(...t) : n(t);
                  })(n, t)
                );
              })(e)
            )
          : o;
      }
      function rx(n, t, e) {
        n ? An(e, n, t) : t();
      }
      function Vl(...n) {
        return (function kL() {
          return rr(1);
        })()(Pe(n, _o(n)));
      }
      function Wi(n) {
        return n <= 0
          ? () => un
          : ke((t, e) => {
              let i = 0;
              t.subscribe(
                Se(e, (r) => {
                  ++i <= n && (e.next(r), n <= i && e.complete());
                })
              );
            });
      }
      function ox(...n) {
        const t = _o(n);
        return ke((e, i) => {
          (t ? Vl(n, e, t) : Vl(n, e)).subscribe(i);
        });
      }
      let RL = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵmod = we({ type: n })),
          (n.ɵinj = be({})),
          n
        );
      })();
      const sx = new Set();
      let Yr,
        OL = (() => {
          class n {
            constructor(e) {
              (this._platform = e),
                (this._matchMedia =
                  this._platform.isBrowser && window.matchMedia
                    ? window.matchMedia.bind(window)
                    : PL);
            }
            matchMedia(e) {
              return (
                (this._platform.WEBKIT || this._platform.BLINK) &&
                  (function FL(n) {
                    if (!sx.has(n))
                      try {
                        Yr ||
                          ((Yr = document.createElement("style")),
                          Yr.setAttribute("type", "text/css"),
                          document.head.appendChild(Yr)),
                          Yr.sheet &&
                            (Yr.sheet.insertRule(`@media ${n} {body{ }}`, 0),
                            sx.add(n));
                      } catch (t) {
                        console.error(t);
                      }
                  })(e),
                this._matchMedia(e)
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(D(qi));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      function PL(n) {
        return {
          matches: "all" === n || "" === n,
          media: n,
          addListener: () => {},
          removeListener: () => {},
        };
      }
      let NL = (() => {
        class n {
          constructor(e, i) {
            (this._mediaMatcher = e),
              (this._zone = i),
              (this._queries = new Map()),
              (this._destroySubject = new qe());
          }
          ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
          }
          isMatched(e) {
            return ax(ix(e)).some((r) => this._registerQuery(r).mql.matches);
          }
          observe(e) {
            let o = Cm(ax(ix(e)).map((s) => this._registerQuery(s).observable));
            return (
              (o = Vl(
                o.pipe(Wi(1)),
                o.pipe(
                  nx(1),
                  (function wm(n, t = EL) {
                    return ke((e, i) => {
                      let r = null,
                        o = null,
                        s = null;
                      const a = () => {
                        if (r) {
                          r.unsubscribe(), (r = null);
                          const c = o;
                          (o = null), i.next(c);
                        }
                      };
                      function l() {
                        const c = s + n,
                          d = t.now();
                        if (d < c)
                          return (
                            (r = this.schedule(void 0, c - d)), void i.add(r)
                          );
                        a();
                      }
                      e.subscribe(
                        Se(
                          i,
                          (c) => {
                            (o = c),
                              (s = t.now()),
                              r || ((r = t.schedule(l, n)), i.add(r));
                          },
                          () => {
                            a(), i.complete();
                          },
                          void 0,
                          () => {
                            o = r = null;
                          }
                        )
                      );
                    });
                  })(0)
                )
              )),
              o.pipe(
                V((s) => {
                  const a = { matches: !1, breakpoints: {} };
                  return (
                    s.forEach(({ matches: l, query: c }) => {
                      (a.matches = a.matches || l), (a.breakpoints[c] = l);
                    }),
                    a
                  );
                })
              )
            );
          }
          _registerQuery(e) {
            if (this._queries.has(e)) return this._queries.get(e);
            const i = this._mediaMatcher.matchMedia(e),
              o = {
                observable: new Ee((s) => {
                  const a = (l) => this._zone.run(() => s.next(l));
                  return (
                    i.addListener(a),
                    () => {
                      i.removeListener(a);
                    }
                  );
                }).pipe(
                  ox(i),
                  V(({ matches: s }) => ({ query: e, matches: s })),
                  Ll(this._destroySubject)
                ),
                mql: i,
              };
            return this._queries.set(e, o), o;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(OL), D(re));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function ax(n) {
        return n
          .map((t) => t.split(","))
          .reduce((t, e) => t.concat(e))
          .map((t) => t.trim());
      }
      function ux(n) {
        return 0 === n.buttons || (0 === n.offsetX && 0 === n.offsetY);
      }
      function hx(n) {
        const t =
          (n.touches && n.touches[0]) ||
          (n.changedTouches && n.changedTouches[0]);
        return !(
          !t ||
          -1 !== t.identifier ||
          (null != t.radiusX && 1 !== t.radiusX) ||
          (null != t.radiusY && 1 !== t.radiusY)
        );
      }
      const GL = new C("cdk-input-modality-detector-options"),
        WL = { ignoreKeys: [18, 17, 224, 91, 16] },
        Xr = Fl({ passive: !0, capture: !0 });
      let KL = (() => {
        class n {
          get mostRecentModality() {
            return this._modality.value;
          }
          constructor(e, i, r, o) {
            (this._platform = e),
              (this._mostRecentTarget = null),
              (this._modality = new Gt(null)),
              (this._lastTouchMs = 0),
              (this._onKeydown = (s) => {
                this._options?.ignoreKeys?.some((a) => a === s.keyCode) ||
                  (this._modality.next("keyboard"),
                  (this._mostRecentTarget = Qr(s)));
              }),
              (this._onMousedown = (s) => {
                Date.now() - this._lastTouchMs < 650 ||
                  (this._modality.next(ux(s) ? "keyboard" : "mouse"),
                  (this._mostRecentTarget = Qr(s)));
              }),
              (this._onTouchstart = (s) => {
                hx(s)
                  ? this._modality.next("keyboard")
                  : ((this._lastTouchMs = Date.now()),
                    this._modality.next("touch"),
                    (this._mostRecentTarget = Qr(s)));
              }),
              (this._options = { ...WL, ...o }),
              (this.modalityDetected = this._modality.pipe(nx(1))),
              (this.modalityChanged = this.modalityDetected.pipe(
                (function SL(n, t = ni) {
                  return (
                    (n = n ?? IL),
                    ke((e, i) => {
                      let r,
                        o = !0;
                      e.subscribe(
                        Se(i, (s) => {
                          const a = t(s);
                          (o || !n(r, a)) && ((o = !1), (r = a), i.next(s));
                        })
                      );
                    })
                  );
                })()
              )),
              e.isBrowser &&
                i.runOutsideAngular(() => {
                  r.addEventListener("keydown", this._onKeydown, Xr),
                    r.addEventListener("mousedown", this._onMousedown, Xr),
                    r.addEventListener("touchstart", this._onTouchstart, Xr);
                });
          }
          ngOnDestroy() {
            this._modality.complete(),
              this._platform.isBrowser &&
                (document.removeEventListener("keydown", this._onKeydown, Xr),
                document.removeEventListener(
                  "mousedown",
                  this._onMousedown,
                  Xr
                ),
                document.removeEventListener(
                  "touchstart",
                  this._onTouchstart,
                  Xr
                ));
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(qi), D(re), D(ge), D(GL, 8));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const ZL = new C("cdk-focus-monitor-default-options"),
        Bl = Fl({ passive: !0, capture: !0 });
      let YL = (() => {
        class n {
          constructor(e, i, r, o, s) {
            (this._ngZone = e),
              (this._platform = i),
              (this._inputModalityDetector = r),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._originFromTouchInteraction = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._rootNodeFocusListenerCount = new Map()),
              (this._windowFocusListener = () => {
                (this._windowFocused = !0),
                  (this._windowFocusTimeoutId = window.setTimeout(
                    () => (this._windowFocused = !1)
                  ));
              }),
              (this._stopInputModalityDetector = new qe()),
              (this._rootNodeFocusAndBlurListener = (a) => {
                for (let c = Qr(a); c; c = c.parentElement)
                  "focus" === a.type ? this._onFocus(a, c) : this._onBlur(a, c);
              }),
              (this._document = o),
              (this._detectionMode = s?.detectionMode || 0);
          }
          monitor(e, i = !1) {
            const r = Zr(e);
            if (!this._platform.isBrowser || 1 !== r.nodeType) return k(null);
            const o =
                (function iL(n) {
                  if (
                    (function nL() {
                      if (null == bm) {
                        const n = typeof document < "u" ? document.head : null;
                        bm = !(!n || (!n.createShadowRoot && !n.attachShadow));
                      }
                      return bm;
                    })()
                  ) {
                    const t = n.getRootNode ? n.getRootNode() : null;
                    if (
                      typeof ShadowRoot < "u" &&
                      ShadowRoot &&
                      t instanceof ShadowRoot
                    )
                      return t;
                  }
                  return null;
                })(r) || this._getDocument(),
              s = this._elementInfo.get(r);
            if (s) return i && (s.checkChildren = !0), s.subject;
            const a = { checkChildren: i, subject: new qe(), rootNode: o };
            return (
              this._elementInfo.set(r, a),
              this._registerGlobalListeners(a),
              a.subject
            );
          }
          stopMonitoring(e) {
            const i = Zr(e),
              r = this._elementInfo.get(i);
            r &&
              (r.subject.complete(),
              this._setClasses(i),
              this._elementInfo.delete(i),
              this._removeGlobalListeners(r));
          }
          focusVia(e, i, r) {
            const o = Zr(e);
            o === this._getDocument().activeElement
              ? this._getClosestElementsInfo(o).forEach(([a, l]) =>
                  this._originChanged(a, i, l)
                )
              : (this._setOrigin(i),
                "function" == typeof o.focus && o.focus(r));
          }
          ngOnDestroy() {
            this._elementInfo.forEach((e, i) => this.stopMonitoring(i));
          }
          _getDocument() {
            return this._document || document;
          }
          _getWindow() {
            return this._getDocument().defaultView || window;
          }
          _getFocusOrigin(e) {
            return this._origin
              ? this._originFromTouchInteraction
                ? this._shouldBeAttributedToTouch(e)
                  ? "touch"
                  : "program"
                : this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : e && this._isLastInteractionFromInputLabel(e)
              ? "mouse"
              : "program";
          }
          _shouldBeAttributedToTouch(e) {
            return (
              1 === this._detectionMode ||
              !!e?.contains(this._inputModalityDetector._mostRecentTarget)
            );
          }
          _setClasses(e, i) {
            e.classList.toggle("cdk-focused", !!i),
              e.classList.toggle("cdk-touch-focused", "touch" === i),
              e.classList.toggle("cdk-keyboard-focused", "keyboard" === i),
              e.classList.toggle("cdk-mouse-focused", "mouse" === i),
              e.classList.toggle("cdk-program-focused", "program" === i);
          }
          _setOrigin(e, i = !1) {
            this._ngZone.runOutsideAngular(() => {
              (this._origin = e),
                (this._originFromTouchInteraction = "touch" === e && i),
                0 === this._detectionMode &&
                  (clearTimeout(this._originTimeoutId),
                  (this._originTimeoutId = setTimeout(
                    () => (this._origin = null),
                    this._originFromTouchInteraction ? 650 : 1
                  )));
            });
          }
          _onFocus(e, i) {
            const r = this._elementInfo.get(i),
              o = Qr(e);
            !r ||
              (!r.checkChildren && i !== o) ||
              this._originChanged(i, this._getFocusOrigin(o), r);
          }
          _onBlur(e, i) {
            const r = this._elementInfo.get(i);
            !r ||
              (r.checkChildren &&
                e.relatedTarget instanceof Node &&
                i.contains(e.relatedTarget)) ||
              (this._setClasses(i), this._emitOrigin(r, null));
          }
          _emitOrigin(e, i) {
            e.subject.observers.length &&
              this._ngZone.run(() => e.subject.next(i));
          }
          _registerGlobalListeners(e) {
            if (!this._platform.isBrowser) return;
            const i = e.rootNode,
              r = this._rootNodeFocusListenerCount.get(i) || 0;
            r ||
              this._ngZone.runOutsideAngular(() => {
                i.addEventListener(
                  "focus",
                  this._rootNodeFocusAndBlurListener,
                  Bl
                ),
                  i.addEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    Bl
                  );
              }),
              this._rootNodeFocusListenerCount.set(i, r + 1),
              1 == ++this._monitoredElementCount &&
                (this._ngZone.runOutsideAngular(() => {
                  this._getWindow().addEventListener(
                    "focus",
                    this._windowFocusListener
                  );
                }),
                this._inputModalityDetector.modalityDetected
                  .pipe(Ll(this._stopInputModalityDetector))
                  .subscribe((o) => {
                    this._setOrigin(o, !0);
                  }));
          }
          _removeGlobalListeners(e) {
            const i = e.rootNode;
            if (this._rootNodeFocusListenerCount.has(i)) {
              const r = this._rootNodeFocusListenerCount.get(i);
              r > 1
                ? this._rootNodeFocusListenerCount.set(i, r - 1)
                : (i.removeEventListener(
                    "focus",
                    this._rootNodeFocusAndBlurListener,
                    Bl
                  ),
                  i.removeEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    Bl
                  ),
                  this._rootNodeFocusListenerCount.delete(i));
            }
            --this._monitoredElementCount ||
              (this._getWindow().removeEventListener(
                "focus",
                this._windowFocusListener
              ),
              this._stopInputModalityDetector.next(),
              clearTimeout(this._windowFocusTimeoutId),
              clearTimeout(this._originTimeoutId));
          }
          _originChanged(e, i, r) {
            this._setClasses(e, i),
              this._emitOrigin(r, i),
              (this._lastFocusOrigin = i);
          }
          _getClosestElementsInfo(e) {
            const i = [];
            return (
              this._elementInfo.forEach((r, o) => {
                (o === e || (r.checkChildren && o.contains(e))) &&
                  i.push([o, r]);
              }),
              i
            );
          }
          _isLastInteractionFromInputLabel(e) {
            const { _mostRecentTarget: i, mostRecentModality: r } =
              this._inputModalityDetector;
            if (
              "mouse" !== r ||
              !i ||
              i === e ||
              ("INPUT" !== e.nodeName && "TEXTAREA" !== e.nodeName) ||
              e.disabled
            )
              return !1;
            const o = e.labels;
            if (o)
              for (let s = 0; s < o.length; s++)
                if (o[s].contains(i)) return !0;
            return !1;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(re), D(qi), D(KL), D(ge, 8), D(ZL, 8));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const fx = "cdk-high-contrast-black-on-white",
        px = "cdk-high-contrast-white-on-black",
        Dm = "cdk-high-contrast-active";
      let XL = (() => {
          class n {
            constructor(e, i) {
              (this._platform = e),
                (this._document = i),
                (this._breakpointSubscription = q(NL)
                  .observe("(forced-colors: active)")
                  .subscribe(() => {
                    this._hasCheckedHighContrastMode &&
                      ((this._hasCheckedHighContrastMode = !1),
                      this._applyBodyHighContrastModeCssClasses());
                  }));
            }
            getHighContrastMode() {
              if (!this._platform.isBrowser) return 0;
              const e = this._document.createElement("div");
              (e.style.backgroundColor = "rgb(1,2,3)"),
                (e.style.position = "absolute"),
                this._document.body.appendChild(e);
              const i = this._document.defaultView || window,
                r = i && i.getComputedStyle ? i.getComputedStyle(e) : null,
                o = ((r && r.backgroundColor) || "").replace(/ /g, "");
              switch ((e.remove(), o)) {
                case "rgb(0,0,0)":
                case "rgb(45,50,54)":
                case "rgb(32,32,32)":
                  return 2;
                case "rgb(255,255,255)":
                case "rgb(255,250,239)":
                  return 1;
              }
              return 0;
            }
            ngOnDestroy() {
              this._breakpointSubscription.unsubscribe();
            }
            _applyBodyHighContrastModeCssClasses() {
              if (
                !this._hasCheckedHighContrastMode &&
                this._platform.isBrowser &&
                this._document.body
              ) {
                const e = this._document.body.classList;
                e.remove(Dm, fx, px), (this._hasCheckedHighContrastMode = !0);
                const i = this.getHighContrastMode();
                1 === i ? e.add(Dm, fx) : 2 === i && e.add(Dm, px);
              }
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(D(qi), D(ge));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        gx = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({})),
            n
          );
        })();
      const n2 = new C("mat-sanity-checks", {
        providedIn: "root",
        factory: function t2() {
          return !0;
        },
      });
      let at = (() => {
        class n {
          constructor(e, i, r) {
            (this._sanityChecks = i),
              (this._document = r),
              (this._hasDoneGlobalChecks = !1),
              e._applyBodyHighContrastModeCssClasses(),
              this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
          }
          _checkIsEnabled(e) {
            return (
              !(function oL() {
                return (
                  (typeof __karma__ < "u" && !!__karma__) ||
                  (typeof jasmine < "u" && !!jasmine) ||
                  (typeof jest < "u" && !!jest) ||
                  (typeof Mocha < "u" && !!Mocha)
                );
              })() &&
              ("boolean" == typeof this._sanityChecks
                ? this._sanityChecks
                : !!this._sanityChecks[e])
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(XL), D(n2, 8), D(ge));
          }),
          (n.ɵmod = we({ type: n })),
          (n.ɵinj = be({ imports: [gx, gx] })),
          n
        );
      })();
      function r2(n) {
        return class extends n {
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            this._disabled = Rt(t);
          }
          constructor(...t) {
            super(...t), (this._disabled = !1);
          }
        };
      }
      function o2(n, t) {
        return class extends n {
          get color() {
            return this._color;
          }
          set color(e) {
            const i = e || this.defaultColor;
            i !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  `mat-${this._color}`
                ),
              i && this._elementRef.nativeElement.classList.add(`mat-${i}`),
              (this._color = i));
          }
          constructor(...e) {
            super(...e), (this.defaultColor = t), (this.color = t);
          }
        };
      }
      function s2(n) {
        return class extends n {
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(t) {
            this._disableRipple = Rt(t);
          }
          constructor(...t) {
            super(...t), (this._disableRipple = !1);
          }
        };
      }
      function a2(n, t = 0) {
        return class extends n {
          get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
          }
          set tabIndex(e) {
            this._tabIndex =
              null != e
                ? (function xm(n, t = 0) {
                    return (function AL(n) {
                      return !isNaN(parseFloat(n)) && !isNaN(Number(n));
                    })(n)
                      ? Number(n)
                      : t;
                  })(e)
                : this.defaultTabIndex;
          }
          constructor(...e) {
            super(...e), (this._tabIndex = t), (this.defaultTabIndex = t);
          }
        };
      }
      class c2 {
        constructor(t, e, i, r = !1) {
          (this._renderer = t),
            (this.element = e),
            (this.config = i),
            (this._animationForciblyDisabledThroughCss = r),
            (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const vx = Fl({ passive: !0, capture: !0 });
      class d2 {
        constructor() {
          (this._events = new Map()),
            (this._delegateEventHandler = (t) => {
              const e = Qr(t);
              e &&
                this._events.get(t.type)?.forEach((i, r) => {
                  (r === e || r.contains(e)) &&
                    i.forEach((o) => o.handleEvent(t));
                });
            });
        }
        addHandler(t, e, i, r) {
          const o = this._events.get(e);
          if (o) {
            const s = o.get(i);
            s ? s.add(r) : o.set(i, new Set([r]));
          } else
            this._events.set(e, new Map([[i, new Set([r])]])),
              t.runOutsideAngular(() => {
                document.addEventListener(e, this._delegateEventHandler, vx);
              });
        }
        removeHandler(t, e, i) {
          const r = this._events.get(t);
          if (!r) return;
          const o = r.get(e);
          o &&
            (o.delete(i),
            0 === o.size && r.delete(e),
            0 === r.size &&
              (this._events.delete(t),
              document.removeEventListener(t, this._delegateEventHandler, vx)));
        }
      }
      const yx = { enterDuration: 225, exitDuration: 150 },
        wx = Fl({ passive: !0, capture: !0 }),
        xx = ["mousedown", "touchstart"],
        Cx = ["mouseup", "mouseleave", "touchend", "touchcancel"];
      class Jr {
        constructor(t, e, i, r) {
          (this._target = t),
            (this._ngZone = e),
            (this._platform = r),
            (this._isPointerDown = !1),
            (this._activeRipples = new Map()),
            (this._pointerUpEventsRegistered = !1),
            r.isBrowser && (this._containerElement = Zr(i));
        }
        fadeInRipple(t, e, i = {}) {
          const r = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            o = { ...yx, ...i.animation };
          i.centered &&
            ((t = r.left + r.width / 2), (e = r.top + r.height / 2));
          const s =
              i.radius ||
              (function h2(n, t, e) {
                const i = Math.max(Math.abs(n - e.left), Math.abs(n - e.right)),
                  r = Math.max(Math.abs(t - e.top), Math.abs(t - e.bottom));
                return Math.sqrt(i * i + r * r);
              })(t, e, r),
            a = t - r.left,
            l = e - r.top,
            c = o.enterDuration,
            d = document.createElement("div");
          d.classList.add("mat-ripple-element"),
            (d.style.left = a - s + "px"),
            (d.style.top = l - s + "px"),
            (d.style.height = 2 * s + "px"),
            (d.style.width = 2 * s + "px"),
            null != i.color && (d.style.backgroundColor = i.color),
            (d.style.transitionDuration = `${c}ms`),
            this._containerElement.appendChild(d);
          const u = window.getComputedStyle(d),
            m = u.transitionDuration,
            f =
              "none" === u.transitionProperty ||
              "0s" === m ||
              "0s, 0s" === m ||
              (0 === r.width && 0 === r.height),
            p = new c2(this, d, i, f);
          (d.style.transform = "scale3d(1, 1, 1)"),
            (p.state = 0),
            i.persistent || (this._mostRecentTransientRipple = p);
          let g = null;
          return (
            !f &&
              (c || o.exitDuration) &&
              this._ngZone.runOutsideAngular(() => {
                const y = () => this._finishRippleTransition(p),
                  x = () => this._destroyRipple(p);
                d.addEventListener("transitionend", y),
                  d.addEventListener("transitioncancel", x),
                  (g = { onTransitionEnd: y, onTransitionCancel: x });
              }),
            this._activeRipples.set(p, g),
            (f || !c) && this._finishRippleTransition(p),
            p
          );
        }
        fadeOutRipple(t) {
          if (2 === t.state || 3 === t.state) return;
          const e = t.element,
            i = { ...yx, ...t.config.animation };
          (e.style.transitionDuration = `${i.exitDuration}ms`),
            (e.style.opacity = "0"),
            (t.state = 2),
            (t._animationForciblyDisabledThroughCss || !i.exitDuration) &&
              this._finishRippleTransition(t);
        }
        fadeOutAll() {
          this._getActiveRipples().forEach((t) => t.fadeOut());
        }
        fadeOutAllNonPersistent() {
          this._getActiveRipples().forEach((t) => {
            t.config.persistent || t.fadeOut();
          });
        }
        setupTriggerEvents(t) {
          const e = Zr(t);
          !this._platform.isBrowser ||
            !e ||
            e === this._triggerElement ||
            (this._removeTriggerEvents(),
            (this._triggerElement = e),
            xx.forEach((i) => {
              Jr._eventManager.addHandler(this._ngZone, i, e, this);
            }));
        }
        handleEvent(t) {
          "mousedown" === t.type
            ? this._onMousedown(t)
            : "touchstart" === t.type
            ? this._onTouchStart(t)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._ngZone.runOutsideAngular(() => {
                Cx.forEach((e) => {
                  this._triggerElement.addEventListener(e, this, wx);
                });
              }),
              (this._pointerUpEventsRegistered = !0));
        }
        _finishRippleTransition(t) {
          0 === t.state
            ? this._startFadeOutTransition(t)
            : 2 === t.state && this._destroyRipple(t);
        }
        _startFadeOutTransition(t) {
          const e = t === this._mostRecentTransientRipple,
            { persistent: i } = t.config;
          (t.state = 1), !i && (!e || !this._isPointerDown) && t.fadeOut();
        }
        _destroyRipple(t) {
          const e = this._activeRipples.get(t) ?? null;
          this._activeRipples.delete(t),
            this._activeRipples.size || (this._containerRect = null),
            t === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            (t.state = 3),
            null !== e &&
              (t.element.removeEventListener(
                "transitionend",
                e.onTransitionEnd
              ),
              t.element.removeEventListener(
                "transitioncancel",
                e.onTransitionCancel
              )),
            t.element.remove();
        }
        _onMousedown(t) {
          const e = ux(t),
            i =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          !this._target.rippleDisabled &&
            !e &&
            !i &&
            ((this._isPointerDown = !0),
            this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
        }
        _onTouchStart(t) {
          if (!this._target.rippleDisabled && !hx(t)) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const e = t.changedTouches;
            for (let i = 0; i < e.length; i++)
              this.fadeInRipple(
                e[i].clientX,
                e[i].clientY,
                this._target.rippleConfig
              );
          }
        }
        _onPointerUp() {
          this._isPointerDown &&
            ((this._isPointerDown = !1),
            this._getActiveRipples().forEach((t) => {
              !t.config.persistent &&
                (1 === t.state ||
                  (t.config.terminateOnPointerUp && 0 === t.state)) &&
                t.fadeOut();
            }));
        }
        _getActiveRipples() {
          return Array.from(this._activeRipples.keys());
        }
        _removeTriggerEvents() {
          const t = this._triggerElement;
          t &&
            (xx.forEach((e) => Jr._eventManager.removeHandler(e, t, this)),
            this._pointerUpEventsRegistered &&
              Cx.forEach((e) => t.removeEventListener(e, this, wx)));
        }
      }
      Jr._eventManager = new d2();
      const Mm = new C("mat-ripple-global-options");
      let m2 = (() => {
          class n {
            get disabled() {
              return this._disabled;
            }
            set disabled(e) {
              e && this.fadeOutAllNonPersistent(),
                (this._disabled = e),
                this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(e) {
              (this._trigger = e), this._setupTriggerEventsIfEnabled();
            }
            constructor(e, i, r, o, s) {
              (this._elementRef = e),
                (this._animationMode = s),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = o || {}),
                (this._rippleRenderer = new Jr(this, i, e, r));
            }
            ngOnInit() {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents();
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll();
            }
            fadeOutAllNonPersistent() {
              this._rippleRenderer.fadeOutAllNonPersistent();
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: {
                  ...this._globalOptions.animation,
                  ...("NoopAnimations" === this._animationMode
                    ? { enterDuration: 0, exitDuration: 0 }
                    : {}),
                  ...this.animation,
                },
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
              };
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled;
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled &&
                this._isInitialized &&
                this._rippleRenderer.setupTriggerEvents(this.trigger);
            }
            launch(e, i = 0, r) {
              return "number" == typeof e
                ? this._rippleRenderer.fadeInRipple(e, i, {
                    ...this.rippleConfig,
                    ...r,
                  })
                : this._rippleRenderer.fadeInRipple(0, 0, {
                    ...this.rippleConfig,
                    ...e,
                  });
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(Ae), _(re), _(qi), _(Mm, 8), _($r, 8));
            }),
            (n.ɵdir = T({
              type: n,
              selectors: [
                ["", "mat-ripple", ""],
                ["", "matRipple", ""],
              ],
              hostAttrs: [1, "mat-ripple"],
              hostVars: 2,
              hostBindings: function (e, i) {
                2 & e && kt("mat-ripple-unbounded", i.unbounded);
              },
              inputs: {
                color: ["matRippleColor", "color"],
                unbounded: ["matRippleUnbounded", "unbounded"],
                centered: ["matRippleCentered", "centered"],
                radius: ["matRippleRadius", "radius"],
                animation: ["matRippleAnimation", "animation"],
                disabled: ["matRippleDisabled", "disabled"],
                trigger: ["matRippleTrigger", "trigger"],
              },
              exportAs: ["matRipple"],
            })),
            n
          );
        })(),
        Em = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({ imports: [at, at] })),
            n
          );
        })(),
        f2 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({ imports: [at] })),
            n
          );
        })();
      const p2 = ["switch"],
        g2 = ["*"],
        _2 = new C("mat-slide-toggle-default-options", {
          providedIn: "root",
          factory: () => ({ disableToggleValue: !1 }),
        }),
        b2 = { provide: qt, useExisting: le(() => Mx), multi: !0 };
      class Dx {
        constructor(t, e) {
          (this.source = t), (this.checked = e);
        }
      }
      let v2 = 0;
      const y2 = a2(
        o2(
          s2(
            r2(
              class {
                constructor(n) {
                  this._elementRef = n;
                }
              }
            )
          )
        )
      );
      let w2 = (() => {
          class n extends y2 {
            get required() {
              return this._required;
            }
            set required(e) {
              this._required = Rt(e);
            }
            get checked() {
              return this._checked;
            }
            set checked(e) {
              (this._checked = Rt(e)), this._changeDetectorRef.markForCheck();
            }
            get inputId() {
              return `${this.id || this._uniqueId}-input`;
            }
            constructor(e, i, r, o, s, a, l) {
              super(e),
                (this._focusMonitor = i),
                (this._changeDetectorRef = r),
                (this.defaults = s),
                (this._onChange = (c) => {}),
                (this._onTouched = () => {}),
                (this._required = !1),
                (this._checked = !1),
                (this.name = null),
                (this.labelPosition = "after"),
                (this.ariaLabel = null),
                (this.ariaLabelledby = null),
                (this.change = new me()),
                (this.toggleChange = new me()),
                (this.tabIndex = parseInt(o) || 0),
                (this.color = this.defaultColor = s.color || "accent"),
                (this._noopAnimations = "NoopAnimations" === a),
                (this.id = this._uniqueId = `${l}${++v2}`);
            }
            ngAfterContentInit() {
              this._focusMonitor
                .monitor(this._elementRef, !0)
                .subscribe((e) => {
                  "keyboard" === e || "program" === e
                    ? ((this._focused = !0),
                      this._changeDetectorRef.markForCheck())
                    : e ||
                      Promise.resolve().then(() => {
                        (this._focused = !1),
                          this._onTouched(),
                          this._changeDetectorRef.markForCheck();
                      });
                });
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            writeValue(e) {
              this.checked = !!e;
            }
            registerOnChange(e) {
              this._onChange = e;
            }
            registerOnTouched(e) {
              this._onTouched = e;
            }
            setDisabledState(e) {
              (this.disabled = e), this._changeDetectorRef.markForCheck();
            }
            toggle() {
              (this.checked = !this.checked), this._onChange(this.checked);
            }
            _emitChangeEvent() {
              this._onChange(this.checked),
                this.change.emit(this._createChangeEvent(this.checked));
            }
          }
          return (
            (n.ɵfac = function (e) {
              fu();
            }),
            (n.ɵdir = T({
              type: n,
              inputs: {
                name: "name",
                id: "id",
                labelPosition: "labelPosition",
                ariaLabel: ["aria-label", "ariaLabel"],
                ariaLabelledby: ["aria-labelledby", "ariaLabelledby"],
                ariaDescribedby: ["aria-describedby", "ariaDescribedby"],
                required: "required",
                checked: "checked",
              },
              outputs: { change: "change", toggleChange: "toggleChange" },
              features: [X],
            })),
            n
          );
        })(),
        Mx = (() => {
          class n extends w2 {
            get buttonId() {
              return `${this.id || this._uniqueId}-button`;
            }
            constructor(e, i, r, o, s, a) {
              super(e, i, r, o, s, a, "mat-mdc-slide-toggle-"),
                (this._labelId = this._uniqueId + "-label");
            }
            _handleClick() {
              this.toggleChange.emit(),
                this.defaults.disableToggleValue ||
                  ((this.checked = !this.checked),
                  this._onChange(this.checked),
                  this.change.emit(new Dx(this, this.checked)));
            }
            focus() {
              this._switchElement.nativeElement.focus();
            }
            _createChangeEvent(e) {
              return new Dx(this, e);
            }
            _getAriaLabelledBy() {
              return this.ariaLabelledby
                ? this.ariaLabelledby
                : this.ariaLabel
                ? null
                : this._labelId;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                _(Ae),
                _(YL),
                _(qr),
                Ao("tabindex"),
                _(_2),
                _($r, 8)
              );
            }),
            (n.ɵcmp = On({
              type: n,
              selectors: [["mat-slide-toggle"]],
              viewQuery: function (e, i) {
                if ((1 & e && eh(p2, 5), 2 & e)) {
                  let r;
                  zn(
                    (r = (function $n() {
                      return (function uR(n, t) {
                        return n[mn].queries[t].queryList;
                      })(w(), qp());
                    })())
                  ) && (i._switchElement = r.first);
                }
              },
              hostAttrs: [1, "mat-mdc-slide-toggle"],
              hostVars: 11,
              hostBindings: function (e, i) {
                2 & e &&
                  (Vu("id", i.id),
                  Ze("tabindex", null)("aria-label", null)("name", null)(
                    "aria-labelledby",
                    null
                  ),
                  kt("mat-mdc-slide-toggle-focused", i._focused)(
                    "mat-mdc-slide-toggle-checked",
                    i.checked
                  )("_mat-animation-noopable", i._noopAnimations));
              },
              inputs: {
                disabled: "disabled",
                disableRipple: "disableRipple",
                color: "color",
                tabIndex: "tabIndex",
              },
              exportAs: ["matSlideToggle"],
              features: [ue([b2]), X],
              ngContentSelectors: g2,
              decls: 17,
              vars: 24,
              consts: [
                [1, "mdc-form-field"],
                [
                  "role",
                  "switch",
                  "type",
                  "button",
                  1,
                  "mdc-switch",
                  3,
                  "tabIndex",
                  "disabled",
                  "click",
                ],
                ["switch", ""],
                [1, "mdc-switch__track"],
                [1, "mdc-switch__handle-track"],
                [1, "mdc-switch__handle"],
                [1, "mdc-switch__shadow"],
                [1, "mdc-elevation-overlay"],
                [1, "mdc-switch__ripple"],
                [
                  "mat-ripple",
                  "",
                  1,
                  "mat-mdc-slide-toggle-ripple",
                  "mat-mdc-focus-indicator",
                  3,
                  "matRippleTrigger",
                  "matRippleDisabled",
                  "matRippleCentered",
                ],
                [1, "mdc-switch__icons"],
                [
                  "viewBox",
                  "0 0 24 24",
                  1,
                  "mdc-switch__icon",
                  "mdc-switch__icon--on",
                ],
                [
                  "d",
                  "M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z",
                ],
                [
                  "viewBox",
                  "0 0 24 24",
                  1,
                  "mdc-switch__icon",
                  "mdc-switch__icon--off",
                ],
                ["d", "M20 13H4v-2h16v2z"],
                [3, "for", "click"],
              ],
              template: function (e, i) {
                if (
                  (1 & e &&
                    ((function $a(n) {
                      const t = w()[rt][it];
                      if (!t.projection) {
                        const i = (t.projection = Ro(n ? n.length : 1, null)),
                          r = i.slice();
                        let o = t.child;
                        for (; null !== o; ) {
                          const s = n ? VT(o, n) : 0;
                          null !== s &&
                            (r[s] ? (r[s].projectionNext = o) : (i[s] = o),
                            (r[s] = o)),
                            (o = o.next);
                        }
                      }
                    })(),
                    B(0, "div", 0)(1, "button", 1, 2),
                    Ve("click", function () {
                      return i._handleClick();
                    }),
                    de(3, "div", 3),
                    B(4, "div", 4)(5, "div", 5)(6, "div", 6),
                    de(7, "div", 7),
                    z(),
                    B(8, "div", 8),
                    de(9, "div", 9),
                    z(),
                    B(10, "div", 10),
                    (function pd() {
                      H.lFrame.currentNamespace = Op;
                    })(),
                    B(11, "svg", 11),
                    de(12, "path", 12),
                    z(),
                    B(13, "svg", 13),
                    de(14, "path", 14),
                    z()()()()(),
                    (function gd() {
                      !(function $E() {
                        H.lFrame.currentNamespace = null;
                      })();
                    })(),
                    B(15, "label", 15),
                    Ve("click", function (o) {
                      return o.stopPropagation();
                    }),
                    (function ci(n, t = 0, e) {
                      const i = w(),
                        r = J(),
                        o = Ir(r, ye + n, 16, null, e || null);
                      null === o.projection && (o.projection = t),
                        cd(),
                        32 != (32 & o.flags) &&
                          (function eI(n, t, e) {
                            Wg(
                              t[K],
                              0,
                              t,
                              e,
                              Vg(n, e, t),
                              Ug(e.parent || t[it], e, t)
                            );
                          })(r, i, o);
                    })(16),
                    z()()),
                  2 & e)
                ) {
                  const r = (function li(n) {
                    return (function ur(n, t) {
                      return n[t];
                    })(
                      (function NE() {
                        return H.lFrame.contextLView;
                      })(),
                      ye + n
                    );
                  })(2);
                  kt("mdc-form-field--align-end", "before" == i.labelPosition),
                    ce(1),
                    kt("mdc-switch--selected", i.checked)(
                      "mdc-switch--unselected",
                      !i.checked
                    )("mdc-switch--checked", i.checked)(
                      "mdc-switch--disabled",
                      i.disabled
                    ),
                    Le("tabIndex", i.tabIndex)("disabled", i.disabled),
                    Ze("id", i.buttonId)("name", i.name)(
                      "aria-label",
                      i.ariaLabel
                    )("aria-labelledby", i._getAriaLabelledBy())(
                      "aria-describedby",
                      i.ariaDescribedby
                    )("aria-required", i.required || null)(
                      "aria-checked",
                      i.checked
                    ),
                    ce(8),
                    Le("matRippleTrigger", r)(
                      "matRippleDisabled",
                      i.disableRipple || i.disabled
                    )("matRippleCentered", !0),
                    ce(6),
                    Le("for", i.buttonId),
                    Ze("id", i._labelId);
                }
              },
              dependencies: [m2],
              styles: [
                '.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field[hidden]{display:none}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative}.mdc-switch[hidden]{display:none}.mdc-switch:disabled{cursor:default;pointer-events:none}.mdc-switch__track{overflow:hidden;position:relative;width:100%}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%}@media screen and (forced-colors: active){.mdc-switch__track::before,.mdc-switch__track::after{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(-100%)}[dir=rtl] .mdc-switch__track::after,.mdc-switch__track[dir=rtl]::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track[dir=rtl]::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0)}[dir=rtl] .mdc-switch__handle-track,.mdc-switch__handle-track[dir=rtl]{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track,.mdc-switch--selected .mdc-switch__handle-track[dir=rtl]{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto}[dir=rtl] .mdc-switch__handle,.mdc-switch__handle[dir=rtl]{left:auto;right:0}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media screen and (forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-elevation-overlay{bottom:0;left:0;right:0;top:0}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1}.mdc-switch:disabled .mdc-switch__ripple{display:none}.mdc-switch__icons{height:100%;position:relative;width:100%;z-index:1}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mdc-switch{width:var(--mdc-switch-track-width, 36px)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-selected-handle-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-hover-handle-color, #310077)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-focus-handle-color, #310077)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-selected-pressed-handle-color, #310077)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-selected-handle-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-unselected-handle-color, #616161)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-hover-handle-color, #212121)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-focus-handle-color, #212121)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-unselected-pressed-handle-color, #212121)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-unselected-handle-color, #424242)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle::before{background:var(--mdc-switch-handle-surface-color, var(--mdc-theme-surface, #fff))}.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-handle-elevation, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-disabled-handle-elevation, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__focus-ring-wrapper,.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle{height:var(--mdc-switch-handle-height, 20px)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__handle::after{opacity:var(--mdc-switch-disabled-handle-opacity, 0.38)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle{border-radius:var(--mdc-switch-handle-shape, 10px)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle{width:var(--mdc-switch-handle-width, 20px)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle-track{width:calc(100% - var(--mdc-switch-handle-width, 20px))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:var(--mdc-switch-selected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-selected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:var(--mdc-switch-unselected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-unselected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:var(--mdc-switch-disabled-selected-icon-opacity, 0.38)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:var(--mdc-switch-disabled-unselected-icon-opacity, 0.38)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected .mdc-switch__icon{width:var(--mdc-switch-selected-icon-size, 18px);height:var(--mdc-switch-selected-icon-size, 18px)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected .mdc-switch__icon{width:var(--mdc-switch-unselected-icon-size, 18px);height:var(--mdc-switch-unselected-icon-size, 18px)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-hover-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-focus-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-pressed-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-hover-state-layer-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-focus-state-layer-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-pressed-state-layer-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:var(--mdc-switch-selected-hover-state-layer-opacity, 0.04)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:var(--mdc-switch-selected-focus-state-layer-opacity, 0.12)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:var(--mdc-switch-unselected-hover-state-layer-opacity, 0.04)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:var(--mdc-switch-unselected-focus-state-layer-opacity, 0.12)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__ripple{height:var(--mdc-switch-state-layer-size, 48px);width:var(--mdc-switch-state-layer-size, 48px)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__track{height:var(--mdc-switch-track-height, 14px)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__track{opacity:var(--mdc-switch-disabled-track-opacity, 0.12)}.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__track::after{background:var(--mdc-switch-selected-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-hover-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-focus-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mdc-switch-selected-pressed-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__track::after{background:var(--mdc-switch-disabled-selected-track-color, #424242)}.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__track::before{background:var(--mdc-switch-unselected-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-hover-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-focus-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mdc-switch-unselected-pressed-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__track::before{background:var(--mdc-switch-disabled-unselected-track-color, #424242)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__track{border-radius:var(--mdc-switch-track-shape, 7px)}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle .mdc-switch__ripple::after{content:"";opacity:0}.mat-mdc-slide-toggle .mdc-switch:hover .mdc-switch__ripple::after{opacity:.04;transition:opacity 75ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__ripple::after{opacity:.12}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-mdc-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-elevation-overlay,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        Ex = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({})),
            n
          );
        })(),
        D2 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({ imports: [Ex, at, Em, cs, Ex, at] })),
            n
          );
        })();
      const Sm = JSON.parse(
        '{"quizzes":[{"title":"HTML","icon":"/icon-html.svg","questions":[{"question":"What does HTML stand for?","options":["Hyper Trainer Marking Language","Hyper Text Marketing Language","Hyper Text Markup Language","Hyper Text Markup Leveler"],"answer":"Hyper Text Markup Language"},{"question":"Which of the following is the correct structure for an HTML document?","options":["<html><head></head><body></body></html>","<head><html></html><body></body></head>","<body><head></head><html></html></body>","<html><body></body><head></head></html>"],"answer":"<html><head></head><body></body></html>"},{"question":"Which HTML element is used to define the title of a document?","options":["<head>","<title>","<header>","<top>"],"answer":"<title>"},{"question":"What is the purpose of the <body> tag in HTML?","options":["It defines the document\'s head section.","It contains all the content such as text, images, and links.","It is used to define the main content of an HTML document.","It specifies the body of the email content in HTML."],"answer":"It contains all the content such as text, images, and links."},{"question":"Which HTML tag is used to create a hyperlink?","options":["<hyperlink>","<link>","<a>","<href>"],"answer":"<a>"},{"question":"Which tag is used to display images in HTML?","options":["<img>","<image>","<src>","<pic>"],"answer":"<img>"},{"question":"What attribute is used to provide the path of an image in the <img> tag?","options":["link","src","href","url"],"answer":"src"},{"question":"Which HTML tag is used to create an unordered list?","options":["<ul>","<ol>","<list>","<li>"],"answer":"<ul>"},{"question":"What does the <br> tag do?","options":["It breaks the text into two sections.","It creates a bold text.","It inserts a line break.","It adds a new row in a table."],"answer":"It inserts a line break."},{"question":"In HTML, what does the `fieldset` tag do?","options":["It is used to group related data in a form.","It sets the field to a fixed size.","It automatically validates the fields within a form.","It hides the fields in a form."],"answer":"It is used to group related data in a form."}]},{"title":"CSS","icon":"/icon-css.svg","questions":[{"question":"What does CSS stand for?","options":["Colorful Style Sheets","Computer Style Sheets","Cascading Style Sheets","Creative Style Sheets"],"answer":"Cascading Style Sheets"},{"question":"Which HTML attribute is used to define inline styles?","options":["styles","style","class","font-style"],"answer":"style"},{"question":"How do you insert a comment in a CSS file?","options":["// this is a comment //","/* this is a comment */","-- this is a comment --","\x3c!-- this is a comment --\x3e"],"answer":"/* this is a comment */"},{"question":"Which property is used to change the background color of an element?","options":["color","bgcolor","background-color","background"],"answer":"background-color"},{"question":"How do you apply a style to all <p> elements?","options":["p { }",".p { }","#p { }","all.p { }"],"answer":"p { }"},{"question":"Which property is used to change the font of an element?","options":["font-style","text-style","font-family","typeface"],"answer":"font-family"},{"question":"How do you make each word in a text start with a capital letter?","options":["text-transform: capitalize","text-transform: uppercase","text-style: capital","font-transform: capitalize"],"answer":"text-transform: capitalize"},{"question":"How do you select an element with the class name \'header\'?","options":[".header","#header","header","*header"],"answer":".header"},{"question":"What is the default value of the \'position\' property?","options":["relative","fixed","absolute","static"],"answer":"static"},{"question":"What is the purpose of the z-index property in CSS?","options":["To count the number of elements","To set the magnification level of an element","To specify the stack order of an element","To create a zoom effect"],"answer":"To specify the stack order of an element"}]},{"title":"JavaScript","icon":"/icon-js.svg","questions":[{"question":"Which syntax is correct to output \'Hello World\' in an alert box?","options":["alertBox(\'Hello World\');","msg(\'Hello World\');","alert(\'Hello World\');","msgBox(\'Hello World\');"],"answer":"alert(\'Hello World\');"},{"question":"How do you call a function named \'myFunction\'?","options":["call function myFunction()","call myFunction()","myFunction()","execute myFunction()"],"answer":"myFunction()"},{"question":"How to write an IF statement in JavaScript?","options":["if i = 5 then","if (i == 5)","if i == 5","if i = 5"],"answer":"if (i == 5)"},{"question":"How to write an IF statement for executing some code if \'i\' is NOT equal to 5?","options":["if (i <> 5)","if i =! 5 then","if (i != 5)","if i not = 5"],"answer":"if (i != 5)"},{"question":"How does a FOR loop start?","options":["for (i = 0; i <= 5)","for i = 1 to 5","for (i <= 5; i++)","for (i = 0; i <= 5; i++)"],"answer":"for (i = 0; i <= 5; i++)"},{"question":"How can you add a comment in a JavaScript?","options":["\'This is a comment","//This is a comment","\x3c!--This is a comment--\x3e","/* This is a comment */"],"answer":"//This is a comment"},{"question":"What is the correct way to write a JavaScript array?","options":["var colors = (1:\'red\', 2:\'green\', 3:\'blue\')","var colors = [\'red\', \'green\', \'blue\']","var colors = \'red\', \'green\', \'blue\'","var colors = 1 = (\'red\'), 2 = (\'green\'), 3 = (\'blue\')"],"answer":"var colors = [\'red\', \'green\', \'blue\']"},{"question":"How do you find the number with the highest value of x and y?","options":["Math.ceil(x, y)","top(x, y)","Math.max(x, y)","Math.highest(x, y)"],"answer":"Math.max(x, y)"},{"question":"Which operator is used to assign a value to a variable?","options":["-","*","=","x"],"answer":"="},{"question":"What is the correct way to write a JavaScript object?","options":["var person = {firstName: \'John\', lastName: \'Doe\'};","var person = {firstName = \'John\', lastName = \'Doe\'};","var person = (firstName: \'John\', lastName: \'Doe\');","var person = (firstName = \'John\', lastName = \'Doe\');"],"answer":"var person = {firstName: \'John\', lastName: \'Doe\'};"}]},{"title":"Accessibility","icon":"/icon-accessibility.svg","questions":[{"question":"What does \'WCAG\' stand for?","options":["Web Content Accessibility Guidelines","Web Compliance Accessibility Guide","Web Content Accessibility Goals","Website Compliance and Accessibility Guidelines"],"answer":"Web Content Accessibility Guidelines"},{"question":"Which element is used to provide alternative text for images for screen reader users?","options":["<alt>","<figcaption>","<description>","<img alt=\'description\'>"],"answer":"<img alt=\'description\'>"},{"question":"What does ARIA stand for in web development?","options":["Accessible Rich Internet Applications","Advanced Responsive Internet Assistance","Accessible Responsive Internet Applications","Automated Responsive Internet Actions"],"answer":"Accessible Rich Internet Applications"},{"question":"Which of the following is not a principle of the WCAG?","options":["Perceivable","Dependable","Operable","Understandable"],"answer":"Dependable"},{"question":"Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?","options":["3:1","4.5:1","7:1","2:1"],"answer":"4.5:1"},{"question":"Which of the following elements is inherently focusable, meaning it can receive focus without a \'tabindex\' attribute?","options":["<div>","<span>","<a href=\'...\'>","<p>"],"answer":"<a href=\'...\'>"},{"question":"What is the purpose of the \'lang\' attribute in an HTML page?","options":["To specify the scripting language","To define the character set","To indicate the language of the page content","To declare a language pack"],"answer":"To indicate the language of the page content"},{"question":"Which guideline ensures that content is accessible by keyboard as well as by mouse?","options":["Keyboard Accessible","Mouse Independence","Device Independence","Operable Controls"],"answer":"Keyboard Accessible"},{"question":"What is the role of \'skip navigation\' links in web accessibility?","options":["To skip over primary navigation to the main content","To provide shortcuts to different sections of the website","To help users skip unwanted sections like advertisements","To bypass broken links in the navigation"],"answer":"To skip over primary navigation to the main content"},{"question":"Which of these tools can help in checking the accessibility of a website?","options":["W3C Validator","Google Lighthouse","CSS Validator","JavaScript Console"],"answer":"Google Lighthouse"}]}]}'
      );
      let jl = (() => {
        class n {
          constructor() {
            this.questions = [];
          }
          setQuizzesData() {
            (this.quizzesData = Sm),
              localStorage.setItem("quizzes", JSON.stringify(this.quizzesData));
          }
          getQuizzesData() {
            return this.quizzesData;
          }
          setSubjectQuestions(e) {
            (this.questions = this.quizzesData.quizzes[e].questions),
              localStorage.setItem("questions", JSON.stringify(this.questions)),
              this.setIcon(this.quizzesData.quizzes[e].icon),
              this.setTitle(this.quizzesData.quizzes[e].title);
          }
          getSubjectQuestions() {
            return this.questions;
          }
          getScore() {
            return this.score;
          }
          setScore(e) {
            this.score = e;
          }
          getTitle() {
            return this.title;
          }
          setTitle(e) {
            this.title = e;
          }
          getIcon() {
            return this.icon;
          }
          setIcon(e) {
            this.icon = e;
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || n)();
          });
          static #t = (this.ɵprov = I({
            token: n,
            factory: n.ɵfac,
            providedIn: "root",
          }));
        }
        return n;
      })();
      const Hl = po(
        (n) =>
          function () {
            n(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function Sx(n) {
        return new Ee((t) => {
          Lt(n()).subscribe(t);
        });
      }
      function eo(n, t) {
        const e = fe(n) ? n : () => n,
          i = (r) => r.error(e());
        return new Ee(t ? (r) => t.schedule(i, 0, r) : i);
      }
      function Im() {
        return ke((n, t) => {
          let e = null;
          n._refCount++;
          const i = Se(t, void 0, void 0, void 0, () => {
            if (!n || n._refCount <= 0 || 0 < --n._refCount)
              return void (e = null);
            const r = n._connection,
              o = e;
            (e = null),
              r && (!o || r === o) && r.unsubscribe(),
              t.unsubscribe();
          });
          n.subscribe(i), i.closed || (e = n.connect());
        });
      }
      class Ix extends Ee {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Kf(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new tt();
            const e = this.getSubject();
            t.add(
              this.source.subscribe(
                Se(
                  e,
                  void 0,
                  () => {
                    this._teardown(), e.complete();
                  },
                  (i) => {
                    this._teardown(), e.error(i);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = tt.EMPTY));
          }
          return t;
        }
        refCount() {
          return Im()(this);
        }
      }
      function Dn(n, t) {
        return ke((e, i) => {
          let r = null,
            o = 0,
            s = !1;
          const a = () => s && !r && i.complete();
          e.subscribe(
            Se(
              i,
              (l) => {
                r?.unsubscribe();
                let c = 0;
                const d = o++;
                Lt(n(l, d)).subscribe(
                  (r = Se(
                    i,
                    (u) => i.next(t ? t(l, u, d, c++) : u),
                    () => {
                      (r = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Ul(n) {
        return ke((t, e) => {
          let i = !1;
          t.subscribe(
            Se(
              e,
              (r) => {
                (i = !0), e.next(r);
              },
              () => {
                i || e.next(n), e.complete();
              }
            )
          );
        });
      }
      function Ax(n = M2) {
        return ke((t, e) => {
          let i = !1;
          t.subscribe(
            Se(
              e,
              (r) => {
                (i = !0), e.next(r);
              },
              () => (i ? e.complete() : e.error(n()))
            )
          );
        });
      }
      function M2() {
        return new Hl();
      }
      function gi(n, t) {
        const e = arguments.length >= 2;
        return (i) =>
          i.pipe(
            n ? dn((r, o) => n(r, o, i)) : ni,
            Wi(1),
            e ? Ul(t) : Ax(() => new Hl())
          );
      }
      function _i(n, t) {
        return fe(t) ? We(n, t, 1) : We(n, 1);
      }
      function Qn(n) {
        return ke((t, e) => {
          let o,
            i = null,
            r = !1;
          (i = t.subscribe(
            Se(e, void 0, void 0, (s) => {
              (o = Lt(n(s, Qn(n)(t)))),
                i ? (i.unsubscribe(), (i = null), o.subscribe(e)) : (r = !0);
            })
          )),
            r && (i.unsubscribe(), (i = null), o.subscribe(e));
        });
      }
      function Tx(n, t) {
        return ke(
          (function E2(n, t, e, i, r) {
            return (o, s) => {
              let a = e,
                l = t,
                c = 0;
              o.subscribe(
                Se(
                  s,
                  (d) => {
                    const u = c++;
                    (l = a ? n(l, d, u) : ((a = !0), d)), i && s.next(l);
                  },
                  r &&
                    (() => {
                      a && s.next(l), s.complete();
                    })
                )
              );
            };
          })(n, t, arguments.length >= 2, !0)
        );
      }
      function Am(n) {
        return n <= 0
          ? () => un
          : ke((t, e) => {
              let i = [];
              t.subscribe(
                Se(
                  e,
                  (r) => {
                    i.push(r), n < i.length && i.shift();
                  },
                  () => {
                    for (const r of i) e.next(r);
                    e.complete();
                  },
                  void 0,
                  () => {
                    i = null;
                  }
                )
              );
            });
      }
      function kx(n, t) {
        const e = arguments.length >= 2;
        return (i) =>
          i.pipe(
            n ? dn((r, o) => n(r, o, i)) : ni,
            Am(1),
            e ? Ul(t) : Ax(() => new Hl())
          );
      }
      function zl(n) {
        return ke((t, e) => {
          try {
            t.subscribe(e);
          } finally {
            e.add(n);
          }
        });
      }
      const $ = "primary",
        ws = Symbol("RouteTitle");
      class A2 {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function to(n) {
        return new A2(n);
      }
      function T2(n, t, e) {
        const i = e.path.split("/");
        if (
          i.length > n.length ||
          ("full" === e.pathMatch && (t.hasChildren() || i.length < n.length))
        )
          return null;
        const r = {};
        for (let o = 0; o < i.length; o++) {
          const s = i[o],
            a = n[o];
          if (s.startsWith(":")) r[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: n.slice(0, i.length), posParams: r };
      }
      function Mn(n, t) {
        const e = n ? Object.keys(n) : void 0,
          i = t ? Object.keys(t) : void 0;
        if (!e || !i || e.length != i.length) return !1;
        let r;
        for (let o = 0; o < e.length; o++)
          if (((r = e[o]), !Rx(n[r], t[r]))) return !1;
        return !0;
      }
      function Rx(n, t) {
        if (Array.isArray(n) && Array.isArray(t)) {
          if (n.length !== t.length) return !1;
          const e = [...n].sort(),
            i = [...t].sort();
          return e.every((r, o) => i[o] === r);
        }
        return n === t;
      }
      function Ox(n) {
        return Array.prototype.concat.apply([], n);
      }
      function Fx(n) {
        return n.length > 0 ? n[n.length - 1] : null;
      }
      function Je(n, t) {
        for (const e in n) n.hasOwnProperty(e) && t(n[e], e);
      }
      function bi(n) {
        return Ru(n) ? n : Go(n) ? Pe(Promise.resolve(n)) : k(n);
      }
      const $l = !1,
        R2 = {
          exact: function Lx(n, t, e) {
            if (
              !Ki(n.segments, t.segments) ||
              !ql(n.segments, t.segments, e) ||
              n.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const i in t.children)
              if (!n.children[i] || !Lx(n.children[i], t.children[i], e))
                return !1;
            return !0;
          },
          subset: Vx,
        },
        Px = {
          exact: function O2(n, t) {
            return Mn(n, t);
          },
          subset: function F2(n, t) {
            return (
              Object.keys(t).length <= Object.keys(n).length &&
              Object.keys(t).every((e) => Rx(n[e], t[e]))
            );
          },
          ignored: () => !0,
        };
      function Nx(n, t, e) {
        return (
          R2[e.paths](n.root, t.root, e.matrixParams) &&
          Px[e.queryParams](n.queryParams, t.queryParams) &&
          !("exact" === e.fragment && n.fragment !== t.fragment)
        );
      }
      function Vx(n, t, e) {
        return Bx(n, t, t.segments, e);
      }
      function Bx(n, t, e, i) {
        if (n.segments.length > e.length) {
          const r = n.segments.slice(0, e.length);
          return !(!Ki(r, e) || t.hasChildren() || !ql(r, e, i));
        }
        if (n.segments.length === e.length) {
          if (!Ki(n.segments, e) || !ql(n.segments, e, i)) return !1;
          for (const r in t.children)
            if (!n.children[r] || !Vx(n.children[r], t.children[r], i))
              return !1;
          return !0;
        }
        {
          const r = e.slice(0, n.segments.length),
            o = e.slice(n.segments.length);
          return (
            !!(Ki(n.segments, r) && ql(n.segments, r, i) && n.children[$]) &&
            Bx(n.children[$], t, o, i)
          );
        }
      }
      function ql(n, t, e) {
        return t.every((i, r) => Px[e](n[r].parameters, i.parameters));
      }
      class vi {
        constructor(t = new Q([], {}), e = {}, i = null) {
          (this.root = t), (this.queryParams = e), (this.fragment = i);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = to(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return L2.serialize(this);
        }
      }
      class Q {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            Je(e, (i, r) => (i.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Gl(this);
        }
      }
      class xs {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = to(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Ux(this);
        }
      }
      function Ki(n, t) {
        return n.length === t.length && n.every((e, i) => e.path === t[i].path);
      }
      let Cs = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = I({
            token: n,
            factory: function () {
              return new Tm();
            },
            providedIn: "root",
          })),
          n
        );
      })();
      class Tm {
        parse(t) {
          const e = new G2(t);
          return new vi(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          const e = `/${Ds(t.root, !0)}`,
            i = (function j2(n) {
              const t = Object.keys(n)
                .map((e) => {
                  const i = n[e];
                  return Array.isArray(i)
                    ? i.map((r) => `${Wl(e)}=${Wl(r)}`).join("&")
                    : `${Wl(e)}=${Wl(i)}`;
                })
                .filter((e) => !!e);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${e}${i}${
            "string" == typeof t.fragment
              ? `#${(function V2(n) {
                  return encodeURI(n);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const L2 = new Tm();
      function Gl(n) {
        return n.segments.map((t) => Ux(t)).join("/");
      }
      function Ds(n, t) {
        if (!n.hasChildren()) return Gl(n);
        if (t) {
          const e = n.children[$] ? Ds(n.children[$], !1) : "",
            i = [];
          return (
            Je(n.children, (r, o) => {
              o !== $ && i.push(`${o}:${Ds(r, !1)}`);
            }),
            i.length > 0 ? `${e}(${i.join("//")})` : e
          );
        }
        {
          const e = (function N2(n, t) {
            let e = [];
            return (
              Je(n.children, (i, r) => {
                r === $ && (e = e.concat(t(i, r)));
              }),
              Je(n.children, (i, r) => {
                r !== $ && (e = e.concat(t(i, r)));
              }),
              e
            );
          })(n, (i, r) =>
            r === $ ? [Ds(n.children[$], !1)] : [`${r}:${Ds(i, !1)}`]
          );
          return 1 === Object.keys(n.children).length && null != n.children[$]
            ? `${Gl(n)}/${e[0]}`
            : `${Gl(n)}/(${e.join("//")})`;
        }
      }
      function jx(n) {
        return encodeURIComponent(n)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Wl(n) {
        return jx(n).replace(/%3B/gi, ";");
      }
      function km(n) {
        return jx(n)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Kl(n) {
        return decodeURIComponent(n);
      }
      function Hx(n) {
        return Kl(n.replace(/\+/g, "%20"));
      }
      function Ux(n) {
        return `${km(n.path)}${(function B2(n) {
          return Object.keys(n)
            .map((t) => `;${km(t)}=${km(n[t])}`)
            .join("");
        })(n.parameters)}`;
      }
      const H2 = /^[^\/()?;=#]+/;
      function Ql(n) {
        const t = n.match(H2);
        return t ? t[0] : "";
      }
      const U2 = /^[^=?&#]+/,
        $2 = /^[^&#]+/;
      class G2 {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Q([], {})
              : new Q([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
          let i = {};
          return (
            this.peekStartsWith("(") && (i = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) && (i[$] = new Q(t, e)),
            i
          );
        }
        parseSegment() {
          const t = Ql(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new v(4009, $l);
          return this.capture(t), new xs(Kl(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = Ql(this.remaining);
          if (!e) return;
          this.capture(e);
          let i = "";
          if (this.consumeOptional("=")) {
            const r = Ql(this.remaining);
            r && ((i = r), this.capture(i));
          }
          t[Kl(e)] = Kl(i);
        }
        parseQueryParam(t) {
          const e = (function z2(n) {
            const t = n.match(U2);
            return t ? t[0] : "";
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let i = "";
          if (this.consumeOptional("=")) {
            const s = (function q2(n) {
              const t = n.match($2);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((i = s), this.capture(i));
          }
          const r = Hx(e),
            o = Hx(i);
          if (t.hasOwnProperty(r)) {
            let s = t[r];
            Array.isArray(s) || ((s = [s]), (t[r] = s)), s.push(o);
          } else t[r] = o;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const i = Ql(this.remaining),
              r = this.remaining[i.length];
            if ("/" !== r && ")" !== r && ";" !== r) throw new v(4010, $l);
            let o;
            i.indexOf(":") > -1
              ? ((o = i.slice(0, i.indexOf(":"))),
                this.capture(o),
                this.capture(":"))
              : t && (o = $);
            const s = this.parseChildren();
            (e[o] = 1 === Object.keys(s).length ? s[$] : new Q([], s)),
              this.consumeOptional("//");
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new v(4011, $l);
        }
      }
      function Rm(n) {
        return n.segments.length > 0 ? new Q([], { [$]: n }) : n;
      }
      function Zl(n) {
        const t = {};
        for (const i of Object.keys(n.children)) {
          const o = Zl(n.children[i]);
          (o.segments.length > 0 || o.hasChildren()) && (t[i] = o);
        }
        return (function W2(n) {
          if (1 === n.numberOfChildren && n.children[$]) {
            const t = n.children[$];
            return new Q(n.segments.concat(t.segments), t.children);
          }
          return n;
        })(new Q(n.segments, t));
      }
      function Qi(n) {
        return n instanceof vi;
      }
      const Om = !1;
      function K2(n, t, e, i, r) {
        if (0 === e.length) return no(t.root, t.root, t.root, i, r);
        const o = (function Wx(n) {
          if ("string" == typeof n[0] && 1 === n.length && "/" === n[0])
            return new Gx(!0, 0, n);
          let t = 0,
            e = !1;
          const i = n.reduce((r, o, s) => {
            if ("object" == typeof o && null != o) {
              if (o.outlets) {
                const a = {};
                return (
                  Je(o.outlets, (l, c) => {
                    a[c] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...r, { outlets: a }]
                );
              }
              if (o.segmentPath) return [...r, o.segmentPath];
            }
            return "string" != typeof o
              ? [...r, o]
              : 0 === s
              ? (o.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (e = !0)
                      : ".." === a
                      ? t++
                      : "" != a && r.push(a));
                }),
                r)
              : [...r, o];
          }, []);
          return new Gx(e, t, i);
        })(e);
        return o.toRoot()
          ? no(t.root, t.root, new Q([], {}), i, r)
          : (function s(l) {
              const c = (function Z2(n, t, e, i) {
                  if (n.isAbsolute) return new io(t.root, !0, 0);
                  if (-1 === i) return new io(e, e === t.root, 0);
                  return (function Kx(n, t, e) {
                    let i = n,
                      r = t,
                      o = e;
                    for (; o > r; ) {
                      if (((o -= r), (i = i.parent), !i))
                        throw new v(4005, Om && "Invalid number of '../'");
                      r = i.segments.length;
                    }
                    return new io(i, !1, r - o);
                  })(e, i + (Ms(n.commands[0]) ? 0 : 1), n.numberOfDoubleDots);
                })(o, t, n.snapshot?._urlSegment, l),
                d = c.processChildren
                  ? ro(c.segmentGroup, c.index, o.commands)
                  : Fm(c.segmentGroup, c.index, o.commands);
              return no(t.root, c.segmentGroup, d, i, r);
            })(n.snapshot?._lastPathIndex);
      }
      function Ms(n) {
        return (
          "object" == typeof n && null != n && !n.outlets && !n.segmentPath
        );
      }
      function Es(n) {
        return "object" == typeof n && null != n && n.outlets;
      }
      function no(n, t, e, i, r) {
        let s,
          o = {};
        i &&
          Je(i, (l, c) => {
            o[c] = Array.isArray(l) ? l.map((d) => `${d}`) : `${l}`;
          }),
          (s = n === t ? e : qx(n, t, e));
        const a = Rm(Zl(s));
        return new vi(a, o, r);
      }
      function qx(n, t, e) {
        const i = {};
        return (
          Je(n.children, (r, o) => {
            i[o] = r === t ? e : qx(r, t, e);
          }),
          new Q(n.segments, i)
        );
      }
      class Gx {
        constructor(t, e, i) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = i),
            t && i.length > 0 && Ms(i[0]))
          )
            throw new v(
              4003,
              Om && "Root segment cannot have matrix parameters"
            );
          const r = i.find(Es);
          if (r && r !== Fx(i))
            throw new v(4004, Om && "{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class io {
        constructor(t, e, i) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = i);
        }
      }
      function Fm(n, t, e) {
        if (
          (n || (n = new Q([], {})), 0 === n.segments.length && n.hasChildren())
        )
          return ro(n, t, e);
        const i = (function X2(n, t, e) {
            let i = 0,
              r = t;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; r < n.segments.length; ) {
              if (i >= e.length) return o;
              const s = n.segments[r],
                a = e[i];
              if (Es(a)) break;
              const l = `${a}`,
                c = i < e.length - 1 ? e[i + 1] : null;
              if (r > 0 && void 0 === l) break;
              if (l && c && "object" == typeof c && void 0 === c.outlets) {
                if (!Zx(l, c, s)) return o;
                i += 2;
              } else {
                if (!Zx(l, {}, s)) return o;
                i++;
              }
              r++;
            }
            return { match: !0, pathIndex: r, commandIndex: i };
          })(n, t, e),
          r = e.slice(i.commandIndex);
        if (i.match && i.pathIndex < n.segments.length) {
          const o = new Q(n.segments.slice(0, i.pathIndex), {});
          return (
            (o.children[$] = new Q(n.segments.slice(i.pathIndex), n.children)),
            ro(o, 0, r)
          );
        }
        return i.match && 0 === r.length
          ? new Q(n.segments, {})
          : i.match && !n.hasChildren()
          ? Pm(n, t, e)
          : i.match
          ? ro(n, 0, r)
          : Pm(n, t, e);
      }
      function ro(n, t, e) {
        if (0 === e.length) return new Q(n.segments, {});
        {
          const i = (function Y2(n) {
              return Es(n[0]) ? n[0].outlets : { [$]: n };
            })(e),
            r = {};
          if (
            !i[$] &&
            n.children[$] &&
            1 === n.numberOfChildren &&
            0 === n.children[$].segments.length
          ) {
            const o = ro(n.children[$], t, e);
            return new Q(n.segments, o.children);
          }
          return (
            Je(i, (o, s) => {
              "string" == typeof o && (o = [o]),
                null !== o && (r[s] = Fm(n.children[s], t, o));
            }),
            Je(n.children, (o, s) => {
              void 0 === i[s] && (r[s] = o);
            }),
            new Q(n.segments, r)
          );
        }
      }
      function Pm(n, t, e) {
        const i = n.segments.slice(0, t);
        let r = 0;
        for (; r < e.length; ) {
          const o = e[r];
          if (Es(o)) {
            const l = J2(o.outlets);
            return new Q(i, l);
          }
          if (0 === r && Ms(e[0])) {
            i.push(new xs(n.segments[t].path, Qx(e[0]))), r++;
            continue;
          }
          const s = Es(o) ? o.outlets[$] : `${o}`,
            a = r < e.length - 1 ? e[r + 1] : null;
          s && a && Ms(a)
            ? (i.push(new xs(s, Qx(a))), (r += 2))
            : (i.push(new xs(s, {})), r++);
        }
        return new Q(i, {});
      }
      function J2(n) {
        const t = {};
        return (
          Je(n, (e, i) => {
            "string" == typeof e && (e = [e]),
              null !== e && (t[i] = Pm(new Q([], {}), 0, e));
          }),
          t
        );
      }
      function Qx(n) {
        const t = {};
        return Je(n, (e, i) => (t[i] = `${e}`)), t;
      }
      function Zx(n, t, e) {
        return n == e.path && Mn(t, e.parameters);
      }
      const Ss = "imperative";
      class En {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class Nm extends En {
        constructor(t, e, i = "imperative", r = null) {
          super(t, e),
            (this.type = 0),
            (this.navigationTrigger = i),
            (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Zi extends En {
        constructor(t, e, i) {
          super(t, e), (this.urlAfterRedirects = i), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Yl extends En {
        constructor(t, e, i, r) {
          super(t, e), (this.reason = i), (this.code = r), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Xl extends En {
        constructor(t, e, i, r) {
          super(t, e), (this.reason = i), (this.code = r), (this.type = 16);
        }
      }
      class Lm extends En {
        constructor(t, e, i, r) {
          super(t, e), (this.error = i), (this.target = r), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class eV extends En {
        constructor(t, e, i, r) {
          super(t, e),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class tV extends En {
        constructor(t, e, i, r) {
          super(t, e),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class nV extends En {
        constructor(t, e, i, r, o) {
          super(t, e),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.shouldActivate = o),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class iV extends En {
        constructor(t, e, i, r) {
          super(t, e),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class rV extends En {
        constructor(t, e, i, r) {
          super(t, e),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class oV {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class sV {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class aV {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class lV {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class cV {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class dV {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Yx {
        constructor(t, e, i) {
          (this.routerEvent = t),
            (this.position = e),
            (this.anchor = i),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let mV = (() => {
          class n {
            createUrlTree(e, i, r, o, s, a) {
              return K2(e || i.root, r, o, s, a);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        pV = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = I({
              token: n,
              factory: function (t) {
                return mV.ɵfac(t);
              },
              providedIn: "root",
            })),
            n
          );
        })();
      class Xx {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = Vm(t, this._root);
          return e ? e.children.map((i) => i.value) : [];
        }
        firstChild(t) {
          const e = Vm(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = Bm(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((r) => r.value)
                .filter((r) => r !== t);
        }
        pathFromRoot(t) {
          return Bm(t, this._root).map((e) => e.value);
        }
      }
      function Vm(n, t) {
        if (n === t.value) return t;
        for (const e of t.children) {
          const i = Vm(n, e);
          if (i) return i;
        }
        return null;
      }
      function Bm(n, t) {
        if (n === t.value) return [t];
        for (const e of t.children) {
          const i = Bm(n, e);
          if (i.length) return i.unshift(t), i;
        }
        return [];
      }
      class Zn {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function oo(n) {
        const t = {};
        return n && n.children.forEach((e) => (t[e.value.outlet] = e)), t;
      }
      class Jx extends Xx {
        constructor(t, e) {
          super(t), (this.snapshot = e), jm(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function eC(n, t) {
        const e = (function gV(n, t) {
            const s = new Jl([], {}, {}, "", {}, $, t, null, n.root, -1, {});
            return new nC("", new Zn(s, []));
          })(n, t),
          i = new Gt([new xs("", {})]),
          r = new Gt({}),
          o = new Gt({}),
          s = new Gt({}),
          a = new Gt(""),
          l = new so(i, r, s, a, o, $, t, e.root);
        return (l.snapshot = e.root), new Jx(new Zn(l, []), e);
      }
      class so {
        constructor(t, e, i, r, o, s, a, l) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = i),
            (this.fragment = r),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(V((c) => c[ws])) ?? k(void 0)),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(V((t) => to(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(V((t) => to(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function tC(n, t = "emptyOnly") {
        const e = n.pathFromRoot;
        let i = 0;
        if ("always" !== t)
          for (i = e.length - 1; i >= 1; ) {
            const r = e[i],
              o = e[i - 1];
            if (r.routeConfig && "" === r.routeConfig.path) i--;
            else {
              if (o.component) break;
              i--;
            }
          }
        return (function _V(n) {
          return n.reduce(
            (t, e) => ({
              params: { ...t.params, ...e.params },
              data: { ...t.data, ...e.data },
              resolve: {
                ...e.data,
                ...t.resolve,
                ...e.routeConfig?.data,
                ...e._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(e.slice(i));
      }
      class Jl {
        get title() {
          return this.data?.[ws];
        }
        constructor(t, e, i, r, o, s, a, l, c, d, u) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = i),
            (this.fragment = r),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = c),
            (this._lastPathIndex = d),
            (this._resolve = u);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = to(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = to(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((i) => i.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class nC extends Xx {
        constructor(t, e) {
          super(e), (this.url = t), jm(this, e);
        }
        toString() {
          return iC(this._root);
        }
      }
      function jm(n, t) {
        (t.value._routerState = n), t.children.forEach((e) => jm(n, e));
      }
      function iC(n) {
        const t =
          n.children.length > 0 ? ` { ${n.children.map(iC).join(", ")} } ` : "";
        return `${n.value}${t}`;
      }
      function Hm(n) {
        if (n.snapshot) {
          const t = n.snapshot,
            e = n._futureSnapshot;
          (n.snapshot = e),
            Mn(t.queryParams, e.queryParams) ||
              n.queryParams.next(e.queryParams),
            t.fragment !== e.fragment && n.fragment.next(e.fragment),
            Mn(t.params, e.params) || n.params.next(e.params),
            (function k2(n, t) {
              if (n.length !== t.length) return !1;
              for (let e = 0; e < n.length; ++e) if (!Mn(n[e], t[e])) return !1;
              return !0;
            })(t.url, e.url) || n.url.next(e.url),
            Mn(t.data, e.data) || n.data.next(e.data);
        } else
          (n.snapshot = n._futureSnapshot), n.data.next(n._futureSnapshot.data);
      }
      function Um(n, t) {
        const e =
          Mn(n.params, t.params) &&
          (function P2(n, t) {
            return (
              Ki(n, t) && n.every((e, i) => Mn(e.parameters, t[i].parameters))
            );
          })(n.url, t.url);
        return (
          e &&
          !(!n.parent != !t.parent) &&
          (!n.parent || Um(n.parent, t.parent))
        );
      }
      function Is(n, t, e) {
        if (e && n.shouldReuseRoute(t.value, e.value.snapshot)) {
          const i = e.value;
          i._futureSnapshot = t.value;
          const r = (function vV(n, t, e) {
            return t.children.map((i) => {
              for (const r of e.children)
                if (n.shouldReuseRoute(i.value, r.value.snapshot))
                  return Is(n, i, r);
              return Is(n, i);
            });
          })(n, t, e);
          return new Zn(i, r);
        }
        {
          if (n.shouldAttach(t.value)) {
            const o = n.retrieve(t.value);
            if (null !== o) {
              const s = o.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Is(n, a))),
                s
              );
            }
          }
          const i = (function yV(n) {
              return new so(
                new Gt(n.url),
                new Gt(n.params),
                new Gt(n.queryParams),
                new Gt(n.fragment),
                new Gt(n.data),
                n.outlet,
                n.component,
                n
              );
            })(t.value),
            r = t.children.map((o) => Is(n, o));
          return new Zn(i, r);
        }
      }
      const zm = "ngNavigationCancelingError";
      function rC(n, t) {
        const { redirectTo: e, navigationBehaviorOptions: i } = Qi(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          r = oC(!1, 0, t);
        return (r.url = e), (r.navigationBehaviorOptions = i), r;
      }
      function oC(n, t, e) {
        const i = new Error("NavigationCancelingError: " + (n || ""));
        return (i[zm] = !0), (i.cancellationCode = t), e && (i.url = e), i;
      }
      function sC(n) {
        return aC(n) && Qi(n.url);
      }
      function aC(n) {
        return n && n[zm];
      }
      class wV {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new As()),
            (this.attachRef = null);
        }
      }
      let As = (() => {
        class n {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(e, i) {
            const r = this.getOrCreateContext(e);
            (r.outlet = i), this.contexts.set(e, r);
          }
          onChildOutletDestroyed(e) {
            const i = this.getContext(e);
            i && ((i.outlet = null), (i.attachRef = null));
          }
          onOutletDeactivated() {
            const e = this.contexts;
            return (this.contexts = new Map()), e;
          }
          onOutletReAttached(e) {
            this.contexts = e;
          }
          getOrCreateContext(e) {
            let i = this.getContext(e);
            return i || ((i = new wV()), this.contexts.set(e, i)), i;
          }
          getContext(e) {
            return this.contexts.get(e) || null;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const ec = !1;
      let $m = (() => {
        class n {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = $),
              (this.activateEvents = new me()),
              (this.deactivateEvents = new me()),
              (this.attachEvents = new me()),
              (this.detachEvents = new me()),
              (this.parentContexts = q(As)),
              (this.location = q(sn)),
              (this.changeDetector = q(qr)),
              (this.environmentInjector = q(Vn));
          }
          ngOnChanges(e) {
            if (e.name) {
              const { firstChange: i, previousValue: r } = e.name;
              if (i) return;
              this.isTrackedInParentContexts(r) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(r)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(e) {
            return this.parentContexts.getContext(e)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const e = this.parentContexts.getContext(this.name);
            e?.route &&
              (e.attachRef
                ? this.attach(e.attachRef, e.route)
                : this.activateWith(e.route, e.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new v(4012, ec);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new v(4012, ec);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new v(4012, ec);
            this.location.detach();
            const e = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(e.instance),
              e
            );
          }
          attach(e, i) {
            (this.activated = e),
              (this._activatedRoute = i),
              this.location.insert(e.hostView),
              this.attachEvents.emit(e.instance);
          }
          deactivate() {
            if (this.activated) {
              const e = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(e);
            }
          }
          activateWith(e, i) {
            if (this.isActivated) throw new v(4013, ec);
            this._activatedRoute = e;
            const r = this.location,
              s = e.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new xV(e, a, r.injector);
            if (
              i &&
              (function CV(n) {
                return !!n.resolveComponentFactory;
              })(i)
            ) {
              const c = i.resolveComponentFactory(s);
              this.activated = r.createComponent(c, r.length, l);
            } else
              this.activated = r.createComponent(s, {
                index: r.length,
                injector: l,
                environmentInjector: i ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵdir = T({
            type: n,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [Et],
          })),
          n
        );
      })();
      class xV {
        constructor(t, e, i) {
          (this.route = t), (this.childContexts = e), (this.parent = i);
        }
        get(t, e) {
          return t === so
            ? this.route
            : t === As
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      let qm = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵcmp = On({
            type: n,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [Pv],
            decls: 1,
            vars: 0,
            template: function (e, i) {
              1 & e && de(0, "router-outlet");
            },
            dependencies: [$m],
            encapsulation: 2,
          })),
          n
        );
      })();
      function lC(n, t) {
        return (
          n.providers &&
            !n._injector &&
            (n._injector = Xa(n.providers, t, `Route: ${n.path}`)),
          n._injector ?? t
        );
      }
      function Wm(n) {
        const t = n.children && n.children.map(Wm),
          e = t ? { ...n, children: t } : { ...n };
        return (
          !e.component &&
            !e.loadComponent &&
            (t || e.loadChildren) &&
            e.outlet &&
            e.outlet !== $ &&
            (e.component = qm),
          e
        );
      }
      function Wt(n) {
        return n.outlet || $;
      }
      function cC(n, t) {
        const e = n.filter((i) => Wt(i) === t);
        return e.push(...n.filter((i) => Wt(i) !== t)), e;
      }
      function Ts(n) {
        if (!n) return null;
        if (n.routeConfig?._injector) return n.routeConfig._injector;
        for (let t = n.parent; t; t = t.parent) {
          const e = t.routeConfig;
          if (e?._loadedInjector) return e._loadedInjector;
          if (e?._injector) return e._injector;
        }
        return null;
      }
      class IV {
        constructor(t, e, i, r) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = i),
            (this.forwardEvent = r);
        }
        activate(t) {
          const e = this.futureState._root,
            i = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, i, t),
            Hm(this.futureState.root),
            this.activateChildRoutes(e, i, t);
        }
        deactivateChildRoutes(t, e, i) {
          const r = oo(e);
          t.children.forEach((o) => {
            const s = o.value.outlet;
            this.deactivateRoutes(o, r[s], i), delete r[s];
          }),
            Je(r, (o, s) => {
              this.deactivateRouteAndItsChildren(o, i);
            });
        }
        deactivateRoutes(t, e, i) {
          const r = t.value,
            o = e ? e.value : null;
          if (r === o)
            if (r.component) {
              const s = i.getContext(r.outlet);
              s && this.deactivateChildRoutes(t, e, s.children);
            } else this.deactivateChildRoutes(t, e, i);
          else o && this.deactivateRouteAndItsChildren(e, i);
        }
        deactivateRouteAndItsChildren(t, e) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const i = e.getContext(t.value.outlet),
            r = i && t.value.component ? i.children : e,
            o = oo(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], r);
          if (i && i.outlet) {
            const s = i.outlet.detach(),
              a = i.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const i = e.getContext(t.value.outlet),
            r = i && t.value.component ? i.children : e,
            o = oo(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], r);
          i &&
            (i.outlet &&
              (i.outlet.deactivate(), i.children.onOutletDeactivated()),
            (i.attachRef = null),
            (i.resolver = null),
            (i.route = null));
        }
        activateChildRoutes(t, e, i) {
          const r = oo(e);
          t.children.forEach((o) => {
            this.activateRoutes(o, r[o.value.outlet], i),
              this.forwardEvent(new dV(o.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new lV(t.value.snapshot));
        }
        activateRoutes(t, e, i) {
          const r = t.value,
            o = e ? e.value : null;
          if ((Hm(r), r === o))
            if (r.component) {
              const s = i.getOrCreateContext(r.outlet);
              this.activateChildRoutes(t, e, s.children);
            } else this.activateChildRoutes(t, e, i);
          else if (r.component) {
            const s = i.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Hm(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Ts(r.snapshot),
                l = a?.get(jo) ?? null;
              (s.attachRef = null),
                (s.route = r),
                (s.resolver = l),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(r, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, i);
        }
      }
      class dC {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class tc {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function AV(n, t, e) {
        const i = n._root;
        return ks(i, t ? t._root : null, e, [i.value]);
      }
      function ao(n, t) {
        const e = Symbol(),
          i = t.get(n, e);
        return i === e
          ? "function" != typeof n ||
            (function iE(n) {
              return null !== Xs(n);
            })(n)
            ? t.get(n)
            : n
          : i;
      }
      function ks(
        n,
        t,
        e,
        i,
        r = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const o = oo(t);
        return (
          n.children.forEach((s) => {
            (function kV(
              n,
              t,
              e,
              i,
              r = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const o = n.value,
                s = t ? t.value : null,
                a = e ? e.getContext(n.value.outlet) : null;
              if (s && o.routeConfig === s.routeConfig) {
                const l = (function RV(n, t, e) {
                  if ("function" == typeof e) return e(n, t);
                  switch (e) {
                    case "pathParamsChange":
                      return !Ki(n.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Ki(n.url, t.url) || !Mn(n.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Um(n, t) || !Mn(n.queryParams, t.queryParams);
                    default:
                      return !Um(n, t);
                  }
                })(s, o, o.routeConfig.runGuardsAndResolvers);
                l
                  ? r.canActivateChecks.push(new dC(i))
                  : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
                  ks(n, t, o.component ? (a ? a.children : null) : e, i, r),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    r.canDeactivateChecks.push(new tc(a.outlet.component, s));
              } else
                s && Rs(t, a, r),
                  r.canActivateChecks.push(new dC(i)),
                  ks(n, null, o.component ? (a ? a.children : null) : e, i, r);
            })(s, o[s.value.outlet], e, i.concat([s.value]), r),
              delete o[s.value.outlet];
          }),
          Je(o, (s, a) => Rs(s, e.getContext(a), r)),
          r
        );
      }
      function Rs(n, t, e) {
        const i = oo(n),
          r = n.value;
        Je(i, (o, s) => {
          Rs(o, r.component ? (t ? t.children.getContext(s) : null) : t, e);
        }),
          e.canDeactivateChecks.push(
            new tc(
              r.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              r
            )
          );
      }
      function Os(n) {
        return "function" == typeof n;
      }
      function Km(n) {
        return n instanceof Hl || "EmptyError" === n?.name;
      }
      const nc = Symbol("INITIAL_VALUE");
      function lo() {
        return Dn((n) =>
          Cm(n.map((t) => t.pipe(Wi(1), ox(nc)))).pipe(
            V((t) => {
              for (const e of t)
                if (!0 !== e) {
                  if (e === nc) return nc;
                  if (!1 === e || e instanceof vi) return e;
                }
              return !0;
            }),
            dn((t) => t !== nc),
            Wi(1)
          )
        );
      }
      function uC(n) {
        return (function lM(...n) {
          return qf(n);
        })(
          He((t) => {
            if (Qi(t)) throw rC(0, t);
          }),
          V((t) => !0 === t)
        );
      }
      const Qm = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function hC(n, t, e, i, r) {
        const o = Zm(n, t, e);
        return o.matched
          ? (function QV(n, t, e, i) {
              const r = t.canMatch;
              return r && 0 !== r.length
                ? k(
                    r.map((s) => {
                      const a = ao(s, n);
                      return bi(
                        (function VV(n) {
                          return n && Os(n.canMatch);
                        })(a)
                          ? a.canMatch(t, e)
                          : n.runInContext(() => a(t, e))
                      );
                    })
                  ).pipe(lo(), uC())
                : k(!0);
            })((i = lC(t, i)), t, e).pipe(V((s) => (!0 === s ? o : { ...Qm })))
          : k(o);
      }
      function Zm(n, t, e) {
        if ("" === t.path)
          return "full" === t.pathMatch && (n.hasChildren() || e.length > 0)
            ? { ...Qm }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: e,
                parameters: {},
                positionalParamSegments: {},
              };
        const r = (t.matcher || T2)(e, n, t);
        if (!r) return { ...Qm };
        const o = {};
        Je(r.posParams, (a, l) => {
          o[l] = a.path;
        });
        const s =
          r.consumed.length > 0
            ? { ...o, ...r.consumed[r.consumed.length - 1].parameters }
            : o;
        return {
          matched: !0,
          consumedSegments: r.consumed,
          remainingSegments: e.slice(r.consumed.length),
          parameters: s,
          positionalParamSegments: r.posParams ?? {},
        };
      }
      function ic(n, t, e, i) {
        if (
          e.length > 0 &&
          (function XV(n, t, e) {
            return e.some((i) => rc(n, t, i) && Wt(i) !== $);
          })(n, e, i)
        ) {
          const o = new Q(
            t,
            (function YV(n, t, e, i) {
              const r = {};
              (r[$] = i),
                (i._sourceSegment = n),
                (i._segmentIndexShift = t.length);
              for (const o of e)
                if ("" === o.path && Wt(o) !== $) {
                  const s = new Q([], {});
                  (s._sourceSegment = n),
                    (s._segmentIndexShift = t.length),
                    (r[Wt(o)] = s);
                }
              return r;
            })(n, t, i, new Q(e, n.children))
          );
          return (
            (o._sourceSegment = n),
            (o._segmentIndexShift = t.length),
            { segmentGroup: o, slicedSegments: [] }
          );
        }
        if (
          0 === e.length &&
          (function JV(n, t, e) {
            return e.some((i) => rc(n, t, i));
          })(n, e, i)
        ) {
          const o = new Q(
            n.segments,
            (function ZV(n, t, e, i, r) {
              const o = {};
              for (const s of i)
                if (rc(n, e, s) && !r[Wt(s)]) {
                  const a = new Q([], {});
                  (a._sourceSegment = n),
                    (a._segmentIndexShift = t.length),
                    (o[Wt(s)] = a);
                }
              return { ...r, ...o };
            })(n, t, e, i, n.children)
          );
          return (
            (o._sourceSegment = n),
            (o._segmentIndexShift = t.length),
            { segmentGroup: o, slicedSegments: e }
          );
        }
        const r = new Q(n.segments, n.children);
        return (
          (r._sourceSegment = n),
          (r._segmentIndexShift = t.length),
          { segmentGroup: r, slicedSegments: e }
        );
      }
      function rc(n, t, e) {
        return (
          (!(n.hasChildren() || t.length > 0) || "full" !== e.pathMatch) &&
          "" === e.path
        );
      }
      function mC(n, t, e, i) {
        return (
          !!(Wt(n) === i || (i !== $ && rc(t, e, n))) &&
          ("**" === n.path || Zm(t, n, e).matched)
        );
      }
      function fC(n, t, e) {
        return 0 === t.length && !n.children[e];
      }
      const oc = !1;
      class sc {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class pC {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Fs(n) {
        return eo(new sc(n));
      }
      function gC(n) {
        return eo(new pC(n));
      }
      class iB {
        constructor(t, e, i, r, o) {
          (this.injector = t),
            (this.configLoader = e),
            (this.urlSerializer = i),
            (this.urlTree = r),
            (this.config = o),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = ic(this.urlTree.root, [], [], this.config).segmentGroup,
            e = new Q(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, e, $)
            .pipe(
              V((o) =>
                this.createUrlTree(
                  Zl(o),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Qn((o) => {
                if (o instanceof pC)
                  return (this.allowRedirects = !1), this.match(o.urlTree);
                throw o instanceof sc ? this.noMatchError(o) : o;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, $)
            .pipe(
              V((r) => this.createUrlTree(Zl(r), t.queryParams, t.fragment))
            )
            .pipe(
              Qn((r) => {
                throw r instanceof sc ? this.noMatchError(r) : r;
              })
            );
        }
        noMatchError(t) {
          return new v(4002, oc);
        }
        createUrlTree(t, e, i) {
          const r = Rm(t);
          return new vi(r, e, i);
        }
        expandSegmentGroup(t, e, i, r) {
          return 0 === i.segments.length && i.hasChildren()
            ? this.expandChildren(t, e, i).pipe(V((o) => new Q([], o)))
            : this.expandSegment(t, i, e, i.segments, r, !0);
        }
        expandChildren(t, e, i) {
          const r = [];
          for (const o of Object.keys(i.children))
            "primary" === o ? r.unshift(o) : r.push(o);
          return Pe(r).pipe(
            _i((o) => {
              const s = i.children[o],
                a = cC(e, o);
              return this.expandSegmentGroup(t, a, s, o).pipe(
                V((l) => ({ segment: l, outlet: o }))
              );
            }),
            Tx((o, s) => ((o[s.outlet] = s.segment), o), {}),
            kx()
          );
        }
        expandSegment(t, e, i, r, o, s) {
          return Pe(i).pipe(
            _i((a) =>
              this.expandSegmentAgainstRoute(t, e, i, a, r, o, s).pipe(
                Qn((c) => {
                  if (c instanceof sc) return k(null);
                  throw c;
                })
              )
            ),
            gi((a) => !!a),
            Qn((a, l) => {
              if (Km(a)) return fC(e, r, o) ? k(new Q([], {})) : Fs(e);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, e, i, r, o, s, a) {
          return mC(r, e, o, s)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, e, r, o, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, e, i, r, o, s)
              : Fs(e)
            : Fs(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, i, r, o, s) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, i, r, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                i,
                r,
                o,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, i, r) {
          const o = this.applyRedirectCommands([], i.redirectTo, {});
          return i.redirectTo.startsWith("/")
            ? gC(o)
            : this.lineralizeSegments(i, o).pipe(
                We((s) => {
                  const a = new Q(s, {});
                  return this.expandSegment(t, a, e, s, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, i, r, o, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: c,
            positionalParamSegments: d,
          } = Zm(e, r, o);
          if (!a) return Fs(e);
          const u = this.applyRedirectCommands(l, r.redirectTo, d);
          return r.redirectTo.startsWith("/")
            ? gC(u)
            : this.lineralizeSegments(r, u).pipe(
                We((h) => this.expandSegment(t, e, i, h.concat(c), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, e, i, r, o) {
          return "**" === i.path
            ? ((t = lC(i, t)),
              i.loadChildren
                ? (i._loadedRoutes
                    ? k({
                        routes: i._loadedRoutes,
                        injector: i._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, i)
                  ).pipe(
                    V(
                      (a) => (
                        (i._loadedRoutes = a.routes),
                        (i._loadedInjector = a.injector),
                        new Q(r, {})
                      )
                    )
                  )
                : k(new Q(r, {})))
            : hC(e, i, r, t).pipe(
                Dn(
                  ({ matched: s, consumedSegments: a, remainingSegments: l }) =>
                    s
                      ? this.getChildConfig((t = i._injector ?? t), i, r).pipe(
                          We((d) => {
                            const u = d.injector ?? t,
                              h = d.routes,
                              { segmentGroup: m, slicedSegments: f } = ic(
                                e,
                                a,
                                l,
                                h
                              ),
                              p = new Q(m.segments, m.children);
                            if (0 === f.length && p.hasChildren())
                              return this.expandChildren(u, h, p).pipe(
                                V((b) => new Q(a, b))
                              );
                            if (0 === h.length && 0 === f.length)
                              return k(new Q(a, {}));
                            const g = Wt(i) === o;
                            return this.expandSegment(
                              u,
                              p,
                              h,
                              f,
                              g ? $ : o,
                              !0
                            ).pipe(
                              V((x) => new Q(a.concat(x.segments), x.children))
                            );
                          })
                        )
                      : Fs(e)
                )
              );
        }
        getChildConfig(t, e, i) {
          return e.children
            ? k({ routes: e.children, injector: t })
            : e.loadChildren
            ? void 0 !== e._loadedRoutes
              ? k({ routes: e._loadedRoutes, injector: e._loadedInjector })
              : (function KV(n, t, e, i) {
                  const r = t.canLoad;
                  return void 0 === r || 0 === r.length
                    ? k(!0)
                    : k(
                        r.map((s) => {
                          const a = ao(s, n);
                          return bi(
                            (function FV(n) {
                              return n && Os(n.canLoad);
                            })(a)
                              ? a.canLoad(t, e)
                              : n.runInContext(() => a(t, e))
                          );
                        })
                      ).pipe(lo(), uC());
                })(t, e, i).pipe(
                  We((r) =>
                    r
                      ? this.configLoader.loadChildren(t, e).pipe(
                          He((o) => {
                            (e._loadedRoutes = o.routes),
                              (e._loadedInjector = o.injector);
                          })
                        )
                      : (function tB(n) {
                          return eo(oC(oc, 3));
                        })()
                  )
                )
            : k({ routes: [], injector: t });
        }
        lineralizeSegments(t, e) {
          let i = [],
            r = e.root;
          for (;;) {
            if (((i = i.concat(r.segments)), 0 === r.numberOfChildren))
              return k(i);
            if (r.numberOfChildren > 1 || !r.children[$])
              return t.redirectTo, eo(new v(4e3, oc));
            r = r.children[$];
          }
        }
        applyRedirectCommands(t, e, i) {
          return this.applyRedirectCreateUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            i
          );
        }
        applyRedirectCreateUrlTree(t, e, i, r) {
          const o = this.createSegmentGroup(t, e.root, i, r);
          return new vi(
            o,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const i = {};
          return (
            Je(t, (r, o) => {
              if ("string" == typeof r && r.startsWith(":")) {
                const a = r.substring(1);
                i[o] = e[a];
              } else i[o] = r;
            }),
            i
          );
        }
        createSegmentGroup(t, e, i, r) {
          const o = this.createSegments(t, e.segments, i, r);
          let s = {};
          return (
            Je(e.children, (a, l) => {
              s[l] = this.createSegmentGroup(t, a, i, r);
            }),
            new Q(o, s)
          );
        }
        createSegments(t, e, i, r) {
          return e.map((o) =>
            o.path.startsWith(":")
              ? this.findPosParam(t, o, r)
              : this.findOrReturn(o, i)
          );
        }
        findPosParam(t, e, i) {
          const r = i[e.path.substring(1)];
          if (!r) throw new v(4001, oc);
          return r;
        }
        findOrReturn(t, e) {
          let i = 0;
          for (const r of e) {
            if (r.path === t.path) return e.splice(i), r;
            i++;
          }
          return t;
        }
      }
      class oB {}
      class lB {
        constructor(t, e, i, r, o, s, a) {
          (this.injector = t),
            (this.rootComponentType = e),
            (this.config = i),
            (this.urlTree = r),
            (this.url = o),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const t = ic(
            this.urlTree.root,
            [],
            [],
            this.config.filter((e) => void 0 === e.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            $
          ).pipe(
            V((e) => {
              if (null === e) return null;
              const i = new Jl(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  $,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                r = new Zn(i, e),
                o = new nC(this.url, r);
              return this.inheritParamsAndData(o._root), o;
            })
          );
        }
        inheritParamsAndData(t) {
          const e = t.value,
            i = tC(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(i.params)),
            (e.data = Object.freeze(i.data)),
            t.children.forEach((r) => this.inheritParamsAndData(r));
        }
        processSegmentGroup(t, e, i, r) {
          return 0 === i.segments.length && i.hasChildren()
            ? this.processChildren(t, e, i)
            : this.processSegment(t, e, i, i.segments, r);
        }
        processChildren(t, e, i) {
          return Pe(Object.keys(i.children)).pipe(
            _i((r) => {
              const o = i.children[r],
                s = cC(e, r);
              return this.processSegmentGroup(t, s, o, r);
            }),
            Tx((r, o) => (r && o ? (r.push(...o), r) : null)),
            (function S2(n, t = !1) {
              return ke((e, i) => {
                let r = 0;
                e.subscribe(
                  Se(i, (o) => {
                    const s = n(o, r++);
                    (s || t) && i.next(o), !s && i.complete();
                  })
                );
              });
            })((r) => null !== r),
            Ul(null),
            kx(),
            V((r) => {
              if (null === r) return null;
              const o = bC(r);
              return (
                (function cB(n) {
                  n.sort((t, e) =>
                    t.value.outlet === $
                      ? -1
                      : e.value.outlet === $
                      ? 1
                      : t.value.outlet.localeCompare(e.value.outlet)
                  );
                })(o),
                o
              );
            })
          );
        }
        processSegment(t, e, i, r, o) {
          return Pe(e).pipe(
            _i((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, i, r, o)
            ),
            gi((s) => !!s),
            Qn((s) => {
              if (Km(s)) return fC(i, r, o) ? k([]) : k(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, e, i, r, o) {
          if (e.redirectTo || !mC(e, i, r, o)) return k(null);
          let s;
          if ("**" === e.path) {
            const a = r.length > 0 ? Fx(r).parameters : {},
              l = yC(i) + r.length;
            s = k({
              snapshot: new Jl(
                r,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                wC(e),
                Wt(e),
                e.component ?? e._loadedComponent ?? null,
                e,
                vC(i),
                l,
                xC(e)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = hC(i, e, r, t).pipe(
              V(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: c,
                  parameters: d,
                }) => {
                  if (!a) return null;
                  const u = yC(i) + l.length;
                  return {
                    snapshot: new Jl(
                      l,
                      d,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      wC(e),
                      Wt(e),
                      e.component ?? e._loadedComponent ?? null,
                      e,
                      vC(i),
                      u,
                      xC(e)
                    ),
                    consumedSegments: l,
                    remainingSegments: c,
                  };
                }
              )
            );
          return s.pipe(
            Dn((a) => {
              if (null === a) return k(null);
              const {
                snapshot: l,
                consumedSegments: c,
                remainingSegments: d,
              } = a;
              t = e._injector ?? t;
              const u = e._loadedInjector ?? t,
                h = (function dB(n) {
                  return n.children
                    ? n.children
                    : n.loadChildren
                    ? n._loadedRoutes
                    : [];
                })(e),
                { segmentGroup: m, slicedSegments: f } = ic(
                  i,
                  c,
                  d,
                  h.filter((g) => void 0 === g.redirectTo)
                );
              if (0 === f.length && m.hasChildren())
                return this.processChildren(u, h, m).pipe(
                  V((g) => (null === g ? null : [new Zn(l, g)]))
                );
              if (0 === h.length && 0 === f.length) return k([new Zn(l, [])]);
              const p = Wt(e) === o;
              return this.processSegment(u, h, m, f, p ? $ : o).pipe(
                V((g) => (null === g ? null : [new Zn(l, g)]))
              );
            })
          );
        }
      }
      function uB(n) {
        const t = n.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function bC(n) {
        const t = [],
          e = new Set();
        for (const i of n) {
          if (!uB(i)) {
            t.push(i);
            continue;
          }
          const r = t.find((o) => i.value.routeConfig === o.value.routeConfig);
          void 0 !== r ? (r.children.push(...i.children), e.add(r)) : t.push(i);
        }
        for (const i of e) {
          const r = bC(i.children);
          t.push(new Zn(i.value, r));
        }
        return t.filter((i) => !e.has(i));
      }
      function vC(n) {
        let t = n;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function yC(n) {
        let t = n,
          e = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (e += t._segmentIndexShift ?? 0);
        return e - 1;
      }
      function wC(n) {
        return n.data || {};
      }
      function xC(n) {
        return n.resolve || {};
      }
      function CC(n) {
        return "string" == typeof n.title || null === n.title;
      }
      function Ym(n) {
        return Dn((t) => {
          const e = n(t);
          return e ? Pe(e).pipe(V(() => t)) : k(t);
        });
      }
      const co = new C("ROUTES");
      let Xm = (() => {
        class n {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = q(yy));
          }
          loadComponent(e) {
            if (this.componentLoaders.get(e))
              return this.componentLoaders.get(e);
            if (e._loadedComponent) return k(e._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(e);
            const i = bi(e.loadComponent()).pipe(
                V(MC),
                He((o) => {
                  this.onLoadEndListener && this.onLoadEndListener(e),
                    (e._loadedComponent = o);
                }),
                zl(() => {
                  this.componentLoaders.delete(e);
                })
              ),
              r = new Ix(i, () => new qe()).pipe(Im());
            return this.componentLoaders.set(e, r), r;
          }
          loadChildren(e, i) {
            if (this.childrenLoaders.get(i)) return this.childrenLoaders.get(i);
            if (i._loadedRoutes)
              return k({
                routes: i._loadedRoutes,
                injector: i._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(i);
            const o = this.loadModuleFactoryOrRoutes(i.loadChildren).pipe(
                V((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(i);
                  let l,
                    c,
                    d = !1;
                  Array.isArray(a)
                    ? (c = a)
                    : ((l = a.create(e).injector),
                      (c = Ox(l.get(co, [], P.Self | P.Optional))));
                  return { routes: c.map(Wm), injector: l };
                }),
                zl(() => {
                  this.childrenLoaders.delete(i);
                })
              ),
              s = new Ix(o, () => new qe()).pipe(Im());
            return this.childrenLoaders.set(i, s), s;
          }
          loadModuleFactoryOrRoutes(e) {
            return bi(e()).pipe(
              V(MC),
              We((i) =>
                i instanceof Ov || Array.isArray(i)
                  ? k(i)
                  : Pe(this.compiler.compileModuleAsync(i))
              )
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function MC(n) {
        return (function vB(n) {
          return n && "object" == typeof n && "default" in n;
        })(n)
          ? n.default
          : n;
      }
      let lc = (() => {
        class n {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new qe()),
              (this.configLoader = q(Xm)),
              (this.environmentInjector = q(Vn)),
              (this.urlSerializer = q(Cs)),
              (this.rootContexts = q(As)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => k(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (r) =>
                this.events.next(new sV(r))),
              (this.configLoader.onLoadStartListener = (r) =>
                this.events.next(new oV(r)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(e) {
            const i = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...e, id: i });
          }
          setupNavigations(e) {
            return (
              (this.transitions = new Gt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: e.currentUrlTree,
                currentRawUrl: e.currentUrlTree,
                extractedUrl: e.urlHandlingStrategy.extract(e.currentUrlTree),
                urlAfterRedirects: e.urlHandlingStrategy.extract(
                  e.currentUrlTree
                ),
                rawUrl: e.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Ss,
                restoredState: null,
                currentSnapshot: e.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: e.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                dn((i) => 0 !== i.id),
                V((i) => ({
                  ...i,
                  extractedUrl: e.urlHandlingStrategy.extract(i.rawUrl),
                })),
                Dn((i) => {
                  let r = !1,
                    o = !1;
                  return k(i).pipe(
                    He((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Dn((s) => {
                      const a = e.browserUrlTree.toString(),
                        l =
                          !e.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== e.currentUrlTree.toString();
                      if (
                        !l &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            e.onSameUrlNavigation)
                      ) {
                        const d = "";
                        return (
                          this.events.next(
                            new Xl(s.id, e.serializeUrl(i.rawUrl), d, 0)
                          ),
                          (e.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          un
                        );
                      }
                      if (e.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          EC(s.source) && (e.browserUrlTree = s.extractedUrl),
                          k(s).pipe(
                            Dn((d) => {
                              const u = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new Nm(
                                    d.id,
                                    this.urlSerializer.serialize(
                                      d.extractedUrl
                                    ),
                                    d.source,
                                    d.restoredState
                                  )
                                ),
                                u !== this.transitions?.getValue()
                                  ? un
                                  : Promise.resolve(d)
                              );
                            }),
                            (function rB(n, t, e, i) {
                              return Dn((r) =>
                                (function nB(n, t, e, i, r) {
                                  return new iB(n, t, e, i, r).apply();
                                })(n, t, e, r.extractedUrl, i).pipe(
                                  V((o) => ({ ...r, urlAfterRedirects: o }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              e.config
                            ),
                            He((d) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: d.urlAfterRedirects,
                              }),
                                (i.urlAfterRedirects = d.urlAfterRedirects);
                            }),
                            (function mB(n, t, e, i, r) {
                              return We((o) =>
                                (function aB(
                                  n,
                                  t,
                                  e,
                                  i,
                                  r,
                                  o,
                                  s = "emptyOnly"
                                ) {
                                  return new lB(n, t, e, i, r, s, o)
                                    .recognize()
                                    .pipe(
                                      Dn((a) =>
                                        null === a
                                          ? (function sB(n) {
                                              return new Ee((t) => t.error(n));
                                            })(new oB())
                                          : k(a)
                                      )
                                    );
                                })(
                                  n,
                                  t,
                                  e,
                                  o.urlAfterRedirects,
                                  i.serialize(o.urlAfterRedirects),
                                  i,
                                  r
                                ).pipe(V((s) => ({ ...o, targetSnapshot: s })))
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              e.config,
                              this.urlSerializer,
                              e.paramsInheritanceStrategy
                            ),
                            He((d) => {
                              if (
                                ((i.targetSnapshot = d.targetSnapshot),
                                "eager" === e.urlUpdateStrategy)
                              ) {
                                if (!d.extras.skipLocationChange) {
                                  const h = e.urlHandlingStrategy.merge(
                                    d.urlAfterRedirects,
                                    d.rawUrl
                                  );
                                  e.setBrowserUrl(h, d);
                                }
                                e.browserUrlTree = d.urlAfterRedirects;
                              }
                              const u = new eV(
                                d.id,
                                this.urlSerializer.serialize(d.extractedUrl),
                                this.urlSerializer.serialize(
                                  d.urlAfterRedirects
                                ),
                                d.targetSnapshot
                              );
                              this.events.next(u);
                            })
                          )
                        );
                      if (
                        l &&
                        e.urlHandlingStrategy.shouldProcessUrl(e.rawUrlTree)
                      ) {
                        const {
                            id: d,
                            extractedUrl: u,
                            source: h,
                            restoredState: m,
                            extras: f,
                          } = s,
                          p = new Nm(d, this.urlSerializer.serialize(u), h, m);
                        this.events.next(p);
                        const g = eC(u, this.rootComponentType).snapshot;
                        return k(
                          (i = {
                            ...s,
                            targetSnapshot: g,
                            urlAfterRedirects: u,
                            extras: {
                              ...f,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const d = "";
                        return (
                          this.events.next(
                            new Xl(s.id, e.serializeUrl(i.extractedUrl), d, 1)
                          ),
                          (e.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          un
                        );
                      }
                    }),
                    He((s) => {
                      const a = new tV(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    V(
                      (s) =>
                        (i = {
                          ...s,
                          guards: AV(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function jV(n, t) {
                      return We((e) => {
                        const {
                          targetSnapshot: i,
                          currentSnapshot: r,
                          guards: {
                            canActivateChecks: o,
                            canDeactivateChecks: s,
                          },
                        } = e;
                        return 0 === s.length && 0 === o.length
                          ? k({ ...e, guardsResult: !0 })
                          : (function HV(n, t, e, i) {
                              return Pe(n).pipe(
                                We((r) =>
                                  (function WV(n, t, e, i, r) {
                                    const o =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return o && 0 !== o.length
                                      ? k(
                                          o.map((a) => {
                                            const l = Ts(t) ?? r,
                                              c = ao(a, l);
                                            return bi(
                                              (function LV(n) {
                                                return n && Os(n.canDeactivate);
                                              })(c)
                                                ? c.canDeactivate(n, t, e, i)
                                                : l.runInContext(() =>
                                                    c(n, t, e, i)
                                                  )
                                            ).pipe(gi());
                                          })
                                        ).pipe(lo())
                                      : k(!0);
                                  })(r.component, r.route, e, t, i)
                                ),
                                gi((r) => !0 !== r, !0)
                              );
                            })(s, i, r, n).pipe(
                              We((a) =>
                                a &&
                                (function OV(n) {
                                  return "boolean" == typeof n;
                                })(a)
                                  ? (function UV(n, t, e, i) {
                                      return Pe(t).pipe(
                                        _i((r) =>
                                          Vl(
                                            (function $V(n, t) {
                                              return (
                                                null !== n && t && t(new aV(n)),
                                                k(!0)
                                              );
                                            })(r.route.parent, i),
                                            (function zV(n, t) {
                                              return (
                                                null !== n && t && t(new cV(n)),
                                                k(!0)
                                              );
                                            })(r.route, i),
                                            (function GV(n, t, e) {
                                              const i = t[t.length - 1],
                                                o = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function TV(n) {
                                                      const t = n.routeConfig
                                                        ? n.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: n, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    Sx(() =>
                                                      k(
                                                        s.guards.map((l) => {
                                                          const c =
                                                              Ts(s.node) ?? e,
                                                            d = ao(l, c);
                                                          return bi(
                                                            (function NV(n) {
                                                              return (
                                                                n &&
                                                                Os(
                                                                  n.canActivateChild
                                                                )
                                                              );
                                                            })(d)
                                                              ? d.canActivateChild(
                                                                  i,
                                                                  n
                                                                )
                                                              : c.runInContext(
                                                                  () => d(i, n)
                                                                )
                                                          ).pipe(gi());
                                                        })
                                                      ).pipe(lo())
                                                    )
                                                  );
                                              return k(o).pipe(lo());
                                            })(n, r.path, e),
                                            (function qV(n, t, e) {
                                              const i = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!i || 0 === i.length)
                                                return k(!0);
                                              const r = i.map((o) =>
                                                Sx(() => {
                                                  const s = Ts(t) ?? e,
                                                    a = ao(o, s);
                                                  return bi(
                                                    (function PV(n) {
                                                      return (
                                                        n && Os(n.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, n)
                                                      : s.runInContext(() =>
                                                          a(t, n)
                                                        )
                                                  ).pipe(gi());
                                                })
                                              );
                                              return k(r).pipe(lo());
                                            })(n, r.route, e)
                                          )
                                        ),
                                        gi((r) => !0 !== r, !0)
                                      );
                                    })(i, o, n, t)
                                  : k(a)
                              ),
                              V((a) => ({ ...e, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    He((s) => {
                      if (
                        ((i.guardsResult = s.guardsResult), Qi(s.guardsResult))
                      )
                        throw rC(0, s.guardsResult);
                      const a = new nV(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    dn(
                      (s) =>
                        !!s.guardsResult ||
                        (e.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    Ym((s) => {
                      if (s.guards.canActivateChecks.length)
                        return k(s).pipe(
                          He((a) => {
                            const l = new iV(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          }),
                          Dn((a) => {
                            let l = !1;
                            return k(a).pipe(
                              (function fB(n, t) {
                                return We((e) => {
                                  const {
                                    targetSnapshot: i,
                                    guards: { canActivateChecks: r },
                                  } = e;
                                  if (!r.length) return k(e);
                                  let o = 0;
                                  return Pe(r).pipe(
                                    _i((s) =>
                                      (function pB(n, t, e, i) {
                                        const r = n.routeConfig,
                                          o = n._resolve;
                                        return (
                                          void 0 !== r?.title &&
                                            !CC(r) &&
                                            (o[ws] = r.title),
                                          (function gB(n, t, e, i) {
                                            const r = (function _B(n) {
                                              return [
                                                ...Object.keys(n),
                                                ...Object.getOwnPropertySymbols(
                                                  n
                                                ),
                                              ];
                                            })(n);
                                            if (0 === r.length) return k({});
                                            const o = {};
                                            return Pe(r).pipe(
                                              We((s) =>
                                                (function bB(n, t, e, i) {
                                                  const r = Ts(t) ?? i,
                                                    o = ao(n, r);
                                                  return bi(
                                                    o.resolve
                                                      ? o.resolve(t, e)
                                                      : r.runInContext(() =>
                                                          o(t, e)
                                                        )
                                                  );
                                                })(n[s], t, e, i).pipe(
                                                  gi(),
                                                  He((a) => {
                                                    o[s] = a;
                                                  })
                                                )
                                              ),
                                              Am(1),
                                              (function I2(n) {
                                                return V(() => n);
                                              })(o),
                                              Qn((s) => (Km(s) ? un : eo(s)))
                                            );
                                          })(o, n, t, i).pipe(
                                            V(
                                              (s) => (
                                                (n._resolvedData = s),
                                                (n.data = tC(n, e).resolve),
                                                r &&
                                                  CC(r) &&
                                                  (n.data[ws] = r.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, i, n, t)
                                    ),
                                    He(() => o++),
                                    Am(1),
                                    We((s) => (o === r.length ? k(e) : un))
                                  );
                                });
                              })(
                                e.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              He({
                                next: () => (l = !0),
                                complete: () => {
                                  l ||
                                    (e.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          He((a) => {
                            const l = new rV(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          })
                        );
                    }),
                    Ym((s) => {
                      const a = (l) => {
                        const c = [];
                        l.routeConfig?.loadComponent &&
                          !l.routeConfig._loadedComponent &&
                          c.push(
                            this.configLoader.loadComponent(l.routeConfig).pipe(
                              He((d) => {
                                l.component = d;
                              }),
                              V(() => {})
                            )
                          );
                        for (const d of l.children) c.push(...a(d));
                        return c;
                      };
                      return Cm(a(s.targetSnapshot.root)).pipe(Ul(), Wi(1));
                    }),
                    Ym(() => this.afterPreactivation()),
                    V((s) => {
                      const a = (function bV(n, t, e) {
                        const i = Is(n, t._root, e ? e._root : void 0);
                        return new Jx(i, t);
                      })(
                        e.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (i = { ...s, targetRouterState: a });
                    }),
                    He((s) => {
                      (e.currentUrlTree = s.urlAfterRedirects),
                        (e.rawUrlTree = e.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (e.routerState = s.targetRouterState),
                        "deferred" === e.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            e.setBrowserUrl(e.rawUrlTree, s),
                          (e.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((n, t, e) =>
                      V(
                        (i) => (
                          new IV(
                            t,
                            i.targetRouterState,
                            i.currentRouterState,
                            e
                          ).activate(n),
                          i
                        )
                      ))(this.rootContexts, e.routeReuseStrategy, (s) =>
                      this.events.next(s)
                    ),
                    Wi(1),
                    He({
                      next: (s) => {
                        (r = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (e.navigated = !0),
                          this.events.next(
                            new Zi(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(e.currentUrlTree)
                            )
                          ),
                          e.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        r = !0;
                      },
                    }),
                    zl(() => {
                      r || o || this.cancelNavigationTransition(i, "", 1),
                        this.currentNavigation?.id === i.id &&
                          (this.currentNavigation = null);
                    }),
                    Qn((s) => {
                      if (((o = !0), aC(s))) {
                        sC(s) || ((e.navigated = !0), e.restoreHistory(i, !0));
                        const a = new Yl(
                          i.id,
                          this.urlSerializer.serialize(i.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), sC(s))) {
                          const l = e.urlHandlingStrategy.merge(
                              s.url,
                              e.rawUrlTree
                            ),
                            c = {
                              skipLocationChange: i.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === e.urlUpdateStrategy || EC(i.source),
                            };
                          e.scheduleNavigation(l, Ss, null, c, {
                            resolve: i.resolve,
                            reject: i.reject,
                            promise: i.promise,
                          });
                        } else i.resolve(!1);
                      } else {
                        e.restoreHistory(i, !0);
                        const a = new Lm(
                          i.id,
                          this.urlSerializer.serialize(i.extractedUrl),
                          s,
                          i.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          i.resolve(e.errorHandler(s));
                        } catch (l) {
                          i.reject(l);
                        }
                      }
                      return un;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(e, i, r) {
            const o = new Yl(
              e.id,
              this.urlSerializer.serialize(e.extractedUrl),
              i,
              r
            );
            this.events.next(o), e.resolve(!1);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function EC(n) {
        return n !== Ss;
      }
      let SC = (() => {
          class n {
            buildTitle(e) {
              let i,
                r = e.root;
              for (; void 0 !== r; )
                (i = this.getResolvedTitleForRoute(r) ?? i),
                  (r = r.children.find((o) => o.outlet === $));
              return i;
            }
            getResolvedTitleForRoute(e) {
              return e.data[ws];
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = I({
              token: n,
              factory: function () {
                return q(yB);
              },
              providedIn: "root",
            })),
            n
          );
        })(),
        yB = (() => {
          class n extends SC {
            constructor(e) {
              super(), (this.title = e);
            }
            updateTitle(e) {
              const i = this.buildTitle(e);
              void 0 !== i && this.title.setTitle(i);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(D(Hw));
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        wB = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = I({
              token: n,
              factory: function () {
                return q(CB);
              },
              providedIn: "root",
            })),
            n
          );
        })();
      class xB {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      }
      let CB = (() => {
        class n extends xB {}
        return (
          (n.ɵfac = (function () {
            let t;
            return function (i) {
              return (
                t ||
                (t = (function Ne(n) {
                  return Tn(() => {
                    const t = n.prototype.constructor,
                      e = t[Rn] || Dd(t),
                      i = Object.prototype;
                    let r = Object.getPrototypeOf(n.prototype).constructor;
                    for (; r && r !== i; ) {
                      const o = r[Rn] || Dd(r);
                      if (o && o !== e) return o;
                      r = Object.getPrototypeOf(r);
                    }
                    return (o) => new o();
                  });
                })(n))
              )(i || n);
            };
          })()),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const cc = new C("", { providedIn: "root", factory: () => ({}) });
      let MB = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = I({
              token: n,
              factory: function () {
                return q(EB);
              },
              providedIn: "root",
            })),
            n
          );
        })(),
        EB = (() => {
          class n {
            shouldProcessUrl(e) {
              return !0;
            }
            extract(e) {
              return e;
            }
            merge(e, i) {
              return e;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      function SB(n) {
        throw n;
      }
      function IB(n, t, e) {
        return t.parse("/");
      }
      const AB = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        TB = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let lt = (() => {
          class n {
            get navigationId() {
              return this.navigationTransitions.navigationId;
            }
            get browserPageId() {
              if ("computed" === this.canceledNavigationResolution)
                return this.location.getState()?.ɵrouterPageId;
            }
            get events() {
              return this.navigationTransitions.events;
            }
            constructor() {
              (this.disposed = !1),
                (this.currentPageId = 0),
                (this.console = q(RR)),
                (this.isNgZoneEnabled = !1),
                (this.options = q(cc, { optional: !0 }) || {}),
                (this.errorHandler = this.options.errorHandler || SB),
                (this.malformedUriErrorHandler =
                  this.options.malformedUriErrorHandler || IB),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.urlHandlingStrategy = q(MB)),
                (this.routeReuseStrategy = q(wB)),
                (this.urlCreationStrategy = q(pV)),
                (this.titleStrategy = q(SC)),
                (this.onSameUrlNavigation =
                  this.options.onSameUrlNavigation || "ignore"),
                (this.paramsInheritanceStrategy =
                  this.options.paramsInheritanceStrategy || "emptyOnly"),
                (this.urlUpdateStrategy =
                  this.options.urlUpdateStrategy || "deferred"),
                (this.canceledNavigationResolution =
                  this.options.canceledNavigationResolution || "replace"),
                (this.config = Ox(q(co, { optional: !0 }) ?? [])),
                (this.navigationTransitions = q(lc)),
                (this.urlSerializer = q(Cs)),
                (this.location = q(Ch)),
                (this.isNgZoneEnabled =
                  q(re) instanceof re && re.isInAngularZone()),
                this.resetConfig(this.config),
                (this.currentUrlTree = new vi()),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.routerState = eC(this.currentUrlTree, null)),
                this.navigationTransitions.setupNavigations(this).subscribe(
                  (e) => {
                    (this.lastSuccessfulId = e.id),
                      (this.currentPageId = this.browserPageId ?? 0);
                  },
                  (e) => {
                    this.console.warn(`Unhandled Navigation Error: ${e}`);
                  }
                );
            }
            resetRootComponentType(e) {
              (this.routerState.root.component = e),
                (this.navigationTransitions.rootComponentType = e);
            }
            initialNavigation() {
              if (
                (this.setUpLocationChangeListener(),
                !this.navigationTransitions.hasRequestedNavigation)
              ) {
                const e = this.location.getState();
                this.navigateToSyncWithBrowser(this.location.path(!0), Ss, e);
              }
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((e) => {
                  const i = "popstate" === e.type ? "popstate" : "hashchange";
                  "popstate" === i &&
                    setTimeout(() => {
                      this.navigateToSyncWithBrowser(e.url, i, e.state);
                    }, 0);
                }));
            }
            navigateToSyncWithBrowser(e, i, r) {
              const o = { replaceUrl: !0 },
                s = r?.navigationId ? r : null;
              if (r) {
                const l = { ...r };
                delete l.navigationId,
                  delete l.ɵrouterPageId,
                  0 !== Object.keys(l).length && (o.state = l);
              }
              const a = this.parseUrl(e);
              this.scheduleNavigation(a, i, s, o);
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.navigationTransitions.currentNavigation;
            }
            resetConfig(e) {
              (this.config = e.map(Wm)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.navigationTransitions.complete(),
                this.locationSubscription &&
                  (this.locationSubscription.unsubscribe(),
                  (this.locationSubscription = void 0)),
                (this.disposed = !0);
            }
            createUrlTree(e, i = {}) {
              const {
                  relativeTo: r,
                  queryParams: o,
                  fragment: s,
                  queryParamsHandling: a,
                  preserveFragment: l,
                } = i,
                c = l ? this.currentUrlTree.fragment : s;
              let d = null;
              switch (a) {
                case "merge":
                  d = { ...this.currentUrlTree.queryParams, ...o };
                  break;
                case "preserve":
                  d = this.currentUrlTree.queryParams;
                  break;
                default:
                  d = o || null;
              }
              return (
                null !== d && (d = this.removeEmptyProps(d)),
                this.urlCreationStrategy.createUrlTree(
                  r,
                  this.routerState,
                  this.currentUrlTree,
                  e,
                  d,
                  c ?? null
                )
              );
            }
            navigateByUrl(e, i = { skipLocationChange: !1 }) {
              const r = Qi(e) ? e : this.parseUrl(e),
                o = this.urlHandlingStrategy.merge(r, this.rawUrlTree);
              return this.scheduleNavigation(o, Ss, null, i);
            }
            navigate(e, i = { skipLocationChange: !1 }) {
              return (
                (function kB(n) {
                  for (let t = 0; t < n.length; t++) {
                    const e = n[t];
                    if (null == e) throw new v(4008, false);
                  }
                })(e),
                this.navigateByUrl(this.createUrlTree(e, i), i)
              );
            }
            serializeUrl(e) {
              return this.urlSerializer.serialize(e);
            }
            parseUrl(e) {
              let i;
              try {
                i = this.urlSerializer.parse(e);
              } catch (r) {
                i = this.malformedUriErrorHandler(r, this.urlSerializer, e);
              }
              return i;
            }
            isActive(e, i) {
              let r;
              if (
                ((r = !0 === i ? { ...AB } : !1 === i ? { ...TB } : i), Qi(e))
              )
                return Nx(this.currentUrlTree, e, r);
              const o = this.parseUrl(e);
              return Nx(this.currentUrlTree, o, r);
            }
            removeEmptyProps(e) {
              return Object.keys(e).reduce((i, r) => {
                const o = e[r];
                return null != o && (i[r] = o), i;
              }, {});
            }
            scheduleNavigation(e, i, r, o, s) {
              if (this.disposed) return Promise.resolve(!1);
              let a, l, c, d;
              return (
                s
                  ? ((a = s.resolve), (l = s.reject), (c = s.promise))
                  : (c = new Promise((u, h) => {
                      (a = u), (l = h);
                    })),
                (d =
                  "computed" === this.canceledNavigationResolution
                    ? r && r.ɵrouterPageId
                      ? r.ɵrouterPageId
                      : (this.browserPageId ?? 0) + 1
                    : 0),
                this.navigationTransitions.handleNavigationRequest({
                  targetPageId: d,
                  source: i,
                  restoredState: r,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  rawUrl: e,
                  extras: o,
                  resolve: a,
                  reject: l,
                  promise: c,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                c.catch((u) => Promise.reject(u))
              );
            }
            setBrowserUrl(e, i) {
              const r = this.urlSerializer.serialize(e);
              if (
                this.location.isCurrentPathEqualTo(r) ||
                i.extras.replaceUrl
              ) {
                const s = {
                  ...i.extras.state,
                  ...this.generateNgRouterState(i.id, this.browserPageId),
                };
                this.location.replaceState(r, "", s);
              } else {
                const o = {
                  ...i.extras.state,
                  ...this.generateNgRouterState(i.id, i.targetPageId),
                };
                this.location.go(r, "", o);
              }
            }
            restoreHistory(e, i = !1) {
              if ("computed" === this.canceledNavigationResolution) {
                const o =
                  this.currentPageId -
                  (this.browserPageId ?? this.currentPageId);
                0 !== o
                  ? this.location.historyGo(o)
                  : this.currentUrlTree ===
                      this.getCurrentNavigation()?.finalUrl &&
                    0 === o &&
                    (this.resetState(e),
                    (this.browserUrlTree = e.currentUrlTree),
                    this.resetUrlToCurrentUrlTree());
              } else
                "replace" === this.canceledNavigationResolution &&
                  (i && this.resetState(e), this.resetUrlToCurrentUrlTree());
            }
            resetState(e) {
              (this.routerState = e.currentRouterState),
                (this.currentUrlTree = e.currentUrlTree),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  e.rawUrl
                ));
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                this.generateNgRouterState(
                  this.lastSuccessfulId,
                  this.currentPageId
                )
              );
            }
            generateNgRouterState(e, i) {
              return "computed" === this.canceledNavigationResolution
                ? { navigationId: e, ɵrouterPageId: i }
                : { navigationId: e };
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        dc = (() => {
          class n {
            constructor(e, i, r, o, s, a) {
              (this.router = e),
                (this.route = i),
                (this.tabIndexAttribute = r),
                (this.renderer = o),
                (this.el = s),
                (this.locationStrategy = a),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.href = null),
                (this.commands = null),
                (this.onChanges = new qe());
              const l = s.nativeElement.tagName?.toLowerCase();
              (this.isAnchorElement = "a" === l || "area" === l),
                this.isAnchorElement
                  ? (this.subscription = e.events.subscribe((c) => {
                      c instanceof Zi && this.updateHref();
                    }))
                  : this.setTabIndexIfNotOnNativeEl("0");
            }
            set preserveFragment(e) {
              this._preserveFragment = Gr(e);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(e) {
              this._skipLocationChange = Gr(e);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(e) {
              this._replaceUrl = Gr(e);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            setTabIndexIfNotOnNativeEl(e) {
              null != this.tabIndexAttribute ||
                this.isAnchorElement ||
                this.applyAttributeValue("tabindex", e);
            }
            ngOnChanges(e) {
              this.isAnchorElement && this.updateHref(),
                this.onChanges.next(this);
            }
            set routerLink(e) {
              null != e
                ? ((this.commands = Array.isArray(e) ? e : [e]),
                  this.setTabIndexIfNotOnNativeEl("0"))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick(e, i, r, o, s) {
              return (
                !!(
                  null === this.urlTree ||
                  (this.isAnchorElement &&
                    (0 !== e ||
                      i ||
                      r ||
                      o ||
                      s ||
                      ("string" == typeof this.target &&
                        "_self" != this.target)))
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !this.isAnchorElement)
              );
            }
            ngOnDestroy() {
              this.subscription?.unsubscribe();
            }
            updateHref() {
              this.href =
                null !== this.urlTree && this.locationStrategy
                  ? this.locationStrategy?.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
              const e =
                null === this.href
                  ? null
                  : (function l_(n, t, e) {
                      return (function OI(n, t) {
                        return ("src" === t &&
                          ("embed" === n ||
                            "frame" === n ||
                            "iframe" === n ||
                            "media" === n ||
                            "script" === n)) ||
                          ("href" === t && ("base" === n || "link" === n))
                          ? a_
                          : Ta;
                      })(
                        t,
                        e
                      )(n);
                    })(
                      this.href,
                      this.el.nativeElement.tagName.toLowerCase(),
                      "href"
                    );
              this.applyAttributeValue("href", e);
            }
            applyAttributeValue(e, i) {
              const r = this.renderer,
                o = this.el.nativeElement;
              null !== i ? r.setAttribute(o, e, i) : r.removeAttribute(o, e);
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                _(lt),
                _(so),
                Ao("tabindex"),
                _(Bn),
                _(Ae),
                _(Ui)
              );
            }),
            (n.ɵdir = T({
              type: n,
              selectors: [["", "routerLink", ""]],
              hostVars: 1,
              hostBindings: function (e, i) {
                1 & e &&
                  Ve("click", function (o) {
                    return i.onClick(
                      o.button,
                      o.ctrlKey,
                      o.shiftKey,
                      o.altKey,
                      o.metaKey
                    );
                  }),
                  2 & e && Ze("target", i.target);
              },
              inputs: {
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [Et],
            })),
            n
          );
        })();
      class IC {}
      let FB = (() => {
        class n {
          constructor(e, i, r, o, s) {
            (this.router = e),
              (this.injector = r),
              (this.preloadingStrategy = o),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                dn((e) => e instanceof Zi),
                _i(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(e, i) {
            const r = [];
            for (const o of i) {
              o.providers &&
                !o._injector &&
                (o._injector = Xa(o.providers, e, `Route: ${o.path}`));
              const s = o._injector ?? e,
                a = o._loadedInjector ?? s;
              ((o.loadChildren && !o._loadedRoutes && void 0 === o.canLoad) ||
                (o.loadComponent && !o._loadedComponent)) &&
                r.push(this.preloadConfig(s, o)),
                (o.children || o._loadedRoutes) &&
                  r.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
            }
            return Pe(r).pipe(rr());
          }
          preloadConfig(e, i) {
            return this.preloadingStrategy.preload(i, () => {
              let r;
              r =
                i.loadChildren && void 0 === i.canLoad
                  ? this.loader.loadChildren(e, i)
                  : k(null);
              const o = r.pipe(
                We((s) =>
                  null === s
                    ? k(void 0)
                    : ((i._loadedRoutes = s.routes),
                      (i._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? e, s.routes))
                )
              );
              return i.loadComponent && !i._loadedComponent
                ? Pe([o, this.loader.loadComponent(i)]).pipe(rr())
                : o;
            });
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(lt), D(yy), D(Vn), D(IC), D(Xm));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const ef = new C("");
      let AC = (() => {
        class n {
          constructor(e, i, r, o, s = {}) {
            (this.urlSerializer = e),
              (this.transitions = i),
              (this.viewportScroller = r),
              (this.zone = o),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((e) => {
              e instanceof Nm
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = e.navigationTrigger),
                  (this.restoredId = e.restoredState
                    ? e.restoredState.navigationId
                    : 0))
                : e instanceof Zi &&
                  ((this.lastId = e.id),
                  this.scheduleScrollEvent(
                    e,
                    this.urlSerializer.parse(e.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((e) => {
              e instanceof Yx &&
                (e.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(e.position)
                  : e.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(e.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(e, i) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new Yx(
                      e,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      i
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (n.ɵfac = function (e) {
            fu();
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      var Ot = (() => (
        ((Ot = Ot || {})[(Ot.COMPLETE = 0)] = "COMPLETE"),
        (Ot[(Ot.FAILED = 1)] = "FAILED"),
        (Ot[(Ot.REDIRECTING = 2)] = "REDIRECTING"),
        Ot
      ))();
      const uo = !1;
      function yi(n, t) {
        return { ɵkind: n, ɵproviders: t };
      }
      const tf = new C("", { providedIn: "root", factory: () => !1 });
      function kC() {
        const n = q(nn);
        return (t) => {
          const e = n.get(os);
          if (t !== e.components[0]) return;
          const i = n.get(lt),
            r = n.get(RC);
          1 === n.get(nf) && i.initialNavigation(),
            n.get(OC, null, P.Optional)?.setUpPreloading(),
            n.get(ef, null, P.Optional)?.init(),
            i.resetRootComponentType(e.componentTypes[0]),
            r.closed || (r.next(), r.complete(), r.unsubscribe());
        };
      }
      const RC = new C(uo ? "bootstrap done indicator" : "", {
          factory: () => new qe(),
        }),
        nf = new C(uo ? "initial navigation" : "", {
          providedIn: "root",
          factory: () => 1,
        });
      function BB() {
        let n = [];
        return (
          (n = uo
            ? [
                {
                  provide: ka,
                  multi: !0,
                  useFactory: () => {
                    const t = q(lt);
                    return () =>
                      t.events.subscribe((e) => {
                        console.group?.(`Router Event: ${e.constructor.name}`),
                          console.log(
                            (function uV(n) {
                              if (!("type" in n))
                                return `Unknown Router Event: ${n.constructor.name}`;
                              switch (n.type) {
                                case 14:
                                  return `ActivationEnd(path: '${
                                    n.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 13:
                                  return `ActivationStart(path: '${
                                    n.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 12:
                                  return `ChildActivationEnd(path: '${
                                    n.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 11:
                                  return `ChildActivationStart(path: '${
                                    n.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 8:
                                  return `GuardsCheckEnd(id: ${n.id}, url: '${n.url}', urlAfterRedirects: '${n.urlAfterRedirects}', state: ${n.state}, shouldActivate: ${n.shouldActivate})`;
                                case 7:
                                  return `GuardsCheckStart(id: ${n.id}, url: '${n.url}', urlAfterRedirects: '${n.urlAfterRedirects}', state: ${n.state})`;
                                case 2:
                                  return `NavigationCancel(id: ${n.id}, url: '${n.url}')`;
                                case 16:
                                  return `NavigationSkipped(id: ${n.id}, url: '${n.url}')`;
                                case 1:
                                  return `NavigationEnd(id: ${n.id}, url: '${n.url}', urlAfterRedirects: '${n.urlAfterRedirects}')`;
                                case 3:
                                  return `NavigationError(id: ${n.id}, url: '${n.url}', error: ${n.error})`;
                                case 0:
                                  return `NavigationStart(id: ${n.id}, url: '${n.url}')`;
                                case 6:
                                  return `ResolveEnd(id: ${n.id}, url: '${n.url}', urlAfterRedirects: '${n.urlAfterRedirects}', state: ${n.state})`;
                                case 5:
                                  return `ResolveStart(id: ${n.id}, url: '${n.url}', urlAfterRedirects: '${n.urlAfterRedirects}', state: ${n.state})`;
                                case 10:
                                  return `RouteConfigLoadEnd(path: ${n.route.path})`;
                                case 9:
                                  return `RouteConfigLoadStart(path: ${n.route.path})`;
                                case 4:
                                  return `RoutesRecognized(id: ${n.id}, url: '${n.url}', urlAfterRedirects: '${n.urlAfterRedirects}', state: ${n.state})`;
                                case 15:
                                  return `Scroll(anchor: '${
                                    n.anchor
                                  }', position: '${
                                    n.position
                                      ? `${n.position[0]}, ${n.position[1]}`
                                      : null
                                  }')`;
                              }
                            })(e)
                          ),
                          console.log(e),
                          console.groupEnd?.();
                      });
                  },
                },
              ]
            : []),
          yi(1, n)
        );
      }
      const OC = new C(uo ? "router preloader" : "");
      function jB(n) {
        return yi(0, [
          { provide: OC, useExisting: FB },
          { provide: IC, useExisting: n },
        ]);
      }
      const Ps = !1,
        FC = new C(
          Ps ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD"
        ),
        HB = [
          Ch,
          { provide: Cs, useClass: Tm },
          lt,
          As,
          {
            provide: so,
            useFactory: function TC(n) {
              return n.routerState.root;
            },
            deps: [lt],
          },
          Xm,
          Ps ? { provide: tf, useValue: !0 } : [],
        ];
      function UB() {
        return new Iy("Router", lt);
      }
      let rf = (() => {
        class n {
          constructor(e) {}
          static forRoot(e, i) {
            return {
              ngModule: n,
              providers: [
                HB,
                Ps && i?.enableTracing ? BB().ɵproviders : [],
                { provide: co, multi: !0, useValue: e },
                {
                  provide: FC,
                  useFactory: GB,
                  deps: [[lt, new si(), new yr()]],
                },
                { provide: cc, useValue: i || {} },
                i?.useHash
                  ? { provide: Ui, useClass: vO }
                  : { provide: Ui, useClass: Yy },
                {
                  provide: ef,
                  useFactory: () => {
                    const n = q(HF),
                      t = q(re),
                      e = q(cc),
                      i = q(lc),
                      r = q(Cs);
                    return (
                      e.scrollOffset && n.setOffset(e.scrollOffset),
                      new AC(r, i, n, t, e)
                    );
                  },
                },
                i?.preloadingStrategy
                  ? jB(i.preloadingStrategy).ɵproviders
                  : [],
                { provide: Iy, multi: !0, useFactory: UB },
                i?.initialNavigation ? WB(i) : [],
                [
                  { provide: PC, useFactory: kC },
                  { provide: Sy, multi: !0, useExisting: PC },
                ],
              ],
            };
          }
          static forChild(e) {
            return {
              ngModule: n,
              providers: [{ provide: co, multi: !0, useValue: e }],
            };
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(FC, 8));
          }),
          (n.ɵmod = we({ type: n })),
          (n.ɵinj = be({ imports: [qm] })),
          n
        );
      })();
      function GB(n) {
        if (Ps && n)
          throw new v(
            4007,
            "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function WB(n) {
        return [
          "disabled" === n.initialNavigation
            ? yi(3, [
                {
                  provide: il,
                  multi: !0,
                  useFactory: () => {
                    const t = q(lt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: nf, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === n.initialNavigation
            ? yi(2, [
                { provide: nf, useValue: 0 },
                {
                  provide: il,
                  multi: !0,
                  deps: [nn],
                  useFactory: (t) => {
                    const e = t.get(_O, Promise.resolve());
                    return () =>
                      e.then(
                        () =>
                          new Promise((i) => {
                            const r = t.get(lt),
                              o = t.get(RC);
                            (function PB(n, t) {
                              n.events
                                .pipe(
                                  dn(
                                    (e) =>
                                      e instanceof Zi ||
                                      e instanceof Yl ||
                                      e instanceof Lm ||
                                      e instanceof Xl
                                  ),
                                  V((e) =>
                                    e instanceof Zi || e instanceof Xl
                                      ? Ot.COMPLETE
                                      : e instanceof Yl &&
                                        (0 === e.code || 1 === e.code)
                                      ? Ot.REDIRECTING
                                      : Ot.FAILED
                                  ),
                                  dn((e) => e !== Ot.REDIRECTING),
                                  Wi(1)
                                )
                                .subscribe(() => {
                                  t();
                                });
                            })(r, () => {
                              i(!0);
                            }),
                              (t.get(lc).afterPreactivation = () => (
                                i(!0), o.closed ? k(void 0) : o
                              )),
                              r.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const PC = new C(Ps ? "Router Initializer" : "");
      let QB = (() => {
        class n {
          constructor(e) {
            (this.quizService = e),
              (this.title = "quiz-app"),
              (this.data = Sm.quizzes);
          }
          toggleDarkTheme() {
            document.body.classList.toggle("dark-theme");
          }
          ngOnInit() {
            this.quizService.setQuizzesData();
          }
          getTitleAndIcon() {
            (this.icon = this.quizService.getIcon()),
              (this.quizTitle = this.quizService.getTitle());
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || n)(_(jl));
          });
          static #t = (this.ɵcmp = On({
            type: n,
            selectors: [["app-root"]],
            decls: 10,
            vars: 1,
            consts: [
              [1, "header"],
              [1, "subjectIcon"],
              [1, "themeSwitch"],
              [1, "lightMode"],
              ["color", "primary", 1, "themeChange", 3, "change"],
              [1, "darkMode"],
            ],
            template: function (i, r) {
              1 & i &&
                (B(0, "div", 0)(1, "div", 1),
                de(2, "img"),
                B(3, "b"),
                Ce(4),
                z()(),
                B(5, "div", 2),
                de(6, "img", 3),
                B(7, "mat-slide-toggle", 4),
                Ve("change", function () {
                  return r.toggleDarkTheme();
                }),
                z(),
                de(8, "img", 5),
                z()(),
                de(9, "router-outlet")),
                2 & i && (ce(4), xn(r.quizTitle));
            },
            dependencies: [Mx, $m],
          }));
        }
        return n;
      })();
      class NC {}
      class ZB {}
      const Yn = "*";
      function VC(n, t = null) {
        return { type: 2, steps: n, options: t };
      }
      function uc(n) {
        return { type: 6, styles: n, offset: null };
      }
      function HC(n) {
        Promise.resolve().then(n);
      }
      class Ns {
        constructor(t = 0, e = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = t + e);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          HC(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          (this._started = !1),
            (this._finished = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(t) {
          this._position = this.totalTime ? t * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((i) => i()), (e.length = 0);
        }
      }
      class UC {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let e = 0,
            i = 0,
            r = 0;
          const o = this.players.length;
          0 == o
            ? HC(() => this._onFinish())
            : this.players.forEach((s) => {
                s.onDone(() => {
                  ++e == o && this._onFinish();
                }),
                  s.onDestroy(() => {
                    ++i == o && this._onDestroy();
                  }),
                  s.onStart(() => {
                    ++r == o && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (s, a) => Math.max(s, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((t) => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((t) => t()),
            (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((t) => t.play());
        }
        pause() {
          this.players.forEach((t) => t.pause());
        }
        restart() {
          this.players.forEach((t) => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((t) => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((t) => t.destroy()),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((t) => t.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(t) {
          const e = t * this.totalTime;
          this.players.forEach((i) => {
            const r = i.totalTime ? Math.min(1, e / i.totalTime) : 1;
            i.setPosition(r);
          });
        }
        getPosition() {
          const t = this.players.reduce(
            (e, i) => (null === e || i.totalTime > e.totalTime ? i : e),
            null
          );
          return null != t ? t.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((t) => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((i) => i()), (e.length = 0);
        }
      }
      const sf = "!";
      function zC(n) {
        return new v(3e3, !1);
      }
      function Rj() {
        return typeof window < "u" && typeof window.document < "u";
      }
      function af() {
        return (
          typeof process < "u" &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function wi(n) {
        switch (n.length) {
          case 0:
            return new Ns();
          case 1:
            return n[0];
          default:
            return new UC(n);
        }
      }
      function $C(n, t, e, i, r = new Map(), o = new Map()) {
        const s = [],
          a = [];
        let l = -1,
          c = null;
        if (
          (i.forEach((d) => {
            const u = d.get("offset"),
              h = u == l,
              m = (h && c) || new Map();
            d.forEach((f, p) => {
              let g = p,
                y = f;
              if ("offset" !== p)
                switch (((g = t.normalizePropertyName(g, s)), y)) {
                  case sf:
                    y = r.get(p);
                    break;
                  case Yn:
                    y = o.get(p);
                    break;
                  default:
                    y = t.normalizeStyleValue(p, g, y, s);
                }
              m.set(g, y);
            }),
              h || a.push(m),
              (c = m),
              (l = u);
          }),
          s.length)
        )
          throw (function yj(n) {
            return new v(3502, !1);
          })();
        return a;
      }
      function lf(n, t, e, i) {
        switch (t) {
          case "start":
            n.onStart(() => i(e && cf(e, "start", n)));
            break;
          case "done":
            n.onDone(() => i(e && cf(e, "done", n)));
            break;
          case "destroy":
            n.onDestroy(() => i(e && cf(e, "destroy", n)));
        }
      }
      function cf(n, t, e) {
        const o = df(
            n.element,
            n.triggerName,
            n.fromState,
            n.toState,
            t || n.phaseName,
            e.totalTime ?? n.totalTime,
            !!e.disabled
          ),
          s = n._data;
        return null != s && (o._data = s), o;
      }
      function df(n, t, e, i, r = "", o = 0, s) {
        return {
          element: n,
          triggerName: t,
          fromState: e,
          toState: i,
          phaseName: r,
          totalTime: o,
          disabled: !!s,
        };
      }
      function Ft(n, t, e) {
        let i = n.get(t);
        return i || n.set(t, (i = e)), i;
      }
      function qC(n) {
        const t = n.indexOf(":");
        return [n.substring(1, t), n.slice(t + 1)];
      }
      let uf = (n, t) => !1,
        GC = (n, t, e) => [],
        WC = null;
      function hf(n) {
        const t = n.parentNode || n.host;
        return t === WC ? null : t;
      }
      (af() || typeof Element < "u") &&
        (Rj()
          ? ((WC = (() => document.documentElement)()),
            (uf = (n, t) => {
              for (; t; ) {
                if (t === n) return !0;
                t = hf(t);
              }
              return !1;
            }))
          : (uf = (n, t) => n.contains(t)),
        (GC = (n, t, e) => {
          if (e) return Array.from(n.querySelectorAll(t));
          const i = n.querySelector(t);
          return i ? [i] : [];
        }));
      let Yi = null,
        KC = !1;
      const QC = uf,
        ZC = GC;
      let YC = (() => {
          class n {
            validateStyleProperty(e) {
              return (function Fj(n) {
                Yi ||
                  ((Yi =
                    (function Pj() {
                      return typeof document < "u" ? document.body : null;
                    })() || {}),
                  (KC = !!Yi.style && "WebkitAppearance" in Yi.style));
                let t = !0;
                return (
                  Yi.style &&
                    !(function Oj(n) {
                      return "ebkit" == n.substring(1, 6);
                    })(n) &&
                    ((t = n in Yi.style),
                    !t &&
                      KC &&
                      (t =
                        "Webkit" + n.charAt(0).toUpperCase() + n.slice(1) in
                        Yi.style)),
                  t
                );
              })(e);
            }
            matchesElement(e, i) {
              return !1;
            }
            containsElement(e, i) {
              return QC(e, i);
            }
            getParentElement(e) {
              return hf(e);
            }
            query(e, i, r) {
              return ZC(e, i, r);
            }
            computeStyle(e, i, r) {
              return r || "";
            }
            animate(e, i, r, o, s, a = [], l) {
              return new Ns(r, o);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        mf = (() => {
          class n {}
          return (n.NOOP = new YC()), n;
        })();
      const Nj = 1e3,
        ff = "ng-enter",
        hc = "ng-leave",
        mc = "ng-trigger",
        fc = ".ng-trigger",
        JC = "ng-animating",
        pf = ".ng-animating";
      function Xn(n) {
        if ("number" == typeof n) return n;
        const t = n.match(/^(-?[\.\d]+)(m?s)/);
        return !t || t.length < 2 ? 0 : gf(parseFloat(t[1]), t[2]);
      }
      function gf(n, t) {
        return "s" === t ? n * Nj : n;
      }
      function pc(n, t, e) {
        return n.hasOwnProperty("duration")
          ? n
          : (function Vj(n, t, e) {
              let r,
                o = 0,
                s = "";
              if ("string" == typeof n) {
                const a = n.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return t.push(zC()), { duration: 0, delay: 0, easing: "" };
                r = gf(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (o = gf(parseFloat(l), a[4]));
                const c = a[5];
                c && (s = c);
              } else r = n;
              if (!e) {
                let a = !1,
                  l = t.length;
                r < 0 &&
                  (t.push(
                    (function XB() {
                      return new v(3100, !1);
                    })()
                  ),
                  (a = !0)),
                  o < 0 &&
                    (t.push(
                      (function JB() {
                        return new v(3101, !1);
                      })()
                    ),
                    (a = !0)),
                  a && t.splice(l, 0, zC());
              }
              return { duration: r, delay: o, easing: s };
            })(n, t, e);
      }
      function Ls(n, t = {}) {
        return (
          Object.keys(n).forEach((e) => {
            t[e] = n[e];
          }),
          t
        );
      }
      function eD(n) {
        const t = new Map();
        return (
          Object.keys(n).forEach((e) => {
            t.set(e, n[e]);
          }),
          t
        );
      }
      function xi(n, t = new Map(), e) {
        if (e) for (let [i, r] of e) t.set(i, r);
        for (let [i, r] of n) t.set(i, r);
        return t;
      }
      function nD(n, t, e) {
        return e ? t + ":" + e + ";" : "";
      }
      function iD(n) {
        let t = "";
        for (let e = 0; e < n.style.length; e++) {
          const i = n.style.item(e);
          t += nD(0, i, n.style.getPropertyValue(i));
        }
        for (const e in n.style)
          n.style.hasOwnProperty(e) &&
            !e.startsWith("_") &&
            (t += nD(0, Uj(e), n.style[e]));
        n.setAttribute("style", t);
      }
      function Sn(n, t, e) {
        n.style &&
          (t.forEach((i, r) => {
            const o = bf(r);
            e && !e.has(r) && e.set(r, n.style[o]), (n.style[o] = i);
          }),
          af() && iD(n));
      }
      function Xi(n, t) {
        n.style &&
          (t.forEach((e, i) => {
            const r = bf(i);
            n.style[r] = "";
          }),
          af() && iD(n));
      }
      function Vs(n) {
        return Array.isArray(n) ? (1 == n.length ? n[0] : VC(n)) : n;
      }
      const _f = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function rD(n) {
        let t = [];
        if ("string" == typeof n) {
          let e;
          for (; (e = _f.exec(n)); ) t.push(e[1]);
          _f.lastIndex = 0;
        }
        return t;
      }
      function Bs(n, t, e) {
        const i = n.toString(),
          r = i.replace(_f, (o, s) => {
            let a = t[s];
            return (
              null == a &&
                (e.push(
                  (function tj(n) {
                    return new v(3003, !1);
                  })()
                ),
                (a = "")),
              a.toString()
            );
          });
        return r == i ? n : r;
      }
      function gc(n) {
        const t = [];
        let e = n.next();
        for (; !e.done; ) t.push(e.value), (e = n.next());
        return t;
      }
      const Hj = /-+([a-z0-9])/g;
      function bf(n) {
        return n.replace(Hj, (...t) => t[1].toUpperCase());
      }
      function Uj(n) {
        return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function Pt(n, t, e) {
        switch (t.type) {
          case 7:
            return n.visitTrigger(t, e);
          case 0:
            return n.visitState(t, e);
          case 1:
            return n.visitTransition(t, e);
          case 2:
            return n.visitSequence(t, e);
          case 3:
            return n.visitGroup(t, e);
          case 4:
            return n.visitAnimate(t, e);
          case 5:
            return n.visitKeyframes(t, e);
          case 6:
            return n.visitStyle(t, e);
          case 8:
            return n.visitReference(t, e);
          case 9:
            return n.visitAnimateChild(t, e);
          case 10:
            return n.visitAnimateRef(t, e);
          case 11:
            return n.visitQuery(t, e);
          case 12:
            return n.visitStagger(t, e);
          default:
            throw (function nj(n) {
              return new v(3004, !1);
            })();
        }
      }
      function oD(n, t) {
        return window.getComputedStyle(n)[t];
      }
      const vc = "*";
      function Kj(n, t) {
        const e = [];
        return (
          "string" == typeof n
            ? n.split(/\s*,\s*/).forEach((i) =>
                (function Qj(n, t, e) {
                  if (":" == n[0]) {
                    const l = (function Zj(n, t) {
                      switch (n) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (e, i) => parseFloat(i) > parseFloat(e);
                        case ":decrement":
                          return (e, i) => parseFloat(i) < parseFloat(e);
                        default:
                          return (
                            t.push(
                              (function gj(n) {
                                return new v(3016, !1);
                              })()
                            ),
                            "* => *"
                          );
                      }
                    })(n, e);
                    if ("function" == typeof l) return void t.push(l);
                    n = l;
                  }
                  const i = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == i || i.length < 4)
                    return (
                      e.push(
                        (function pj(n) {
                          return new v(3015, !1);
                        })()
                      ),
                      t
                    );
                  const r = i[1],
                    o = i[2],
                    s = i[3];
                  t.push(sD(r, s));
                  "<" == o[0] && !(r == vc && s == vc) && t.push(sD(s, r));
                })(i, e, t)
              )
            : e.push(n),
          e
        );
      }
      const yc = new Set(["true", "1"]),
        wc = new Set(["false", "0"]);
      function sD(n, t) {
        const e = yc.has(n) || wc.has(n),
          i = yc.has(t) || wc.has(t);
        return (r, o) => {
          let s = n == vc || n == r,
            a = t == vc || t == o;
          return (
            !s && e && "boolean" == typeof r && (s = r ? yc.has(n) : wc.has(n)),
            !a && i && "boolean" == typeof o && (a = o ? yc.has(t) : wc.has(t)),
            s && a
          );
        };
      }
      const Yj = new RegExp("s*:selfs*,?", "g");
      function vf(n, t, e, i) {
        return new Xj(n).build(t, e, i);
      }
      class Xj {
        constructor(t) {
          this._driver = t;
        }
        build(t, e, i) {
          const r = new tH(e);
          return this._resetContextStyleTimingState(r), Pt(this, Vs(t), r);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ""),
            (t.collectedStyles = new Map()),
            t.collectedStyles.set("", new Map()),
            (t.currentTime = 0);
        }
        visitTrigger(t, e) {
          let i = (e.queryCount = 0),
            r = (e.depCount = 0);
          const o = [],
            s = [];
          return (
            "@" == t.name.charAt(0) &&
              e.errors.push(
                (function rj() {
                  return new v(3006, !1);
                })()
              ),
            t.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(e), 0 == a.type)) {
                const l = a,
                  c = l.name;
                c
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((d) => {
                    (l.name = d), o.push(this.visitState(l, e));
                  }),
                  (l.name = c);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, e);
                (i += l.queryCount), (r += l.depCount), s.push(l);
              } else
                e.errors.push(
                  (function oj() {
                    return new v(3007, !1);
                  })()
                );
            }),
            {
              type: 7,
              name: t.name,
              states: o,
              transitions: s,
              queryCount: i,
              depCount: r,
              options: null,
            }
          );
        }
        visitState(t, e) {
          const i = this.visitStyle(t.styles, e),
            r = (t.options && t.options.params) || null;
          if (i.containsDynamicStyles) {
            const o = new Set(),
              s = r || {};
            i.styles.forEach((a) => {
              a instanceof Map &&
                a.forEach((l) => {
                  rD(l).forEach((c) => {
                    s.hasOwnProperty(c) || o.add(c);
                  });
                });
            }),
              o.size &&
                (gc(o.values()),
                e.errors.push(
                  (function sj(n, t) {
                    return new v(3008, !1);
                  })()
                ));
          }
          return {
            type: 0,
            name: t.name,
            style: i,
            options: r ? { params: r } : null,
          };
        }
        visitTransition(t, e) {
          (e.queryCount = 0), (e.depCount = 0);
          const i = Pt(this, Vs(t.animation), e);
          return {
            type: 1,
            matchers: Kj(t.expr, e.errors),
            animation: i,
            queryCount: e.queryCount,
            depCount: e.depCount,
            options: Ji(t.options),
          };
        }
        visitSequence(t, e) {
          return {
            type: 2,
            steps: t.steps.map((i) => Pt(this, i, e)),
            options: Ji(t.options),
          };
        }
        visitGroup(t, e) {
          const i = e.currentTime;
          let r = 0;
          const o = t.steps.map((s) => {
            e.currentTime = i;
            const a = Pt(this, s, e);
            return (r = Math.max(r, e.currentTime)), a;
          });
          return (
            (e.currentTime = r), { type: 3, steps: o, options: Ji(t.options) }
          );
        }
        visitAnimate(t, e) {
          const i = (function iH(n, t) {
            if (n.hasOwnProperty("duration")) return n;
            if ("number" == typeof n) return yf(pc(n, t).duration, 0, "");
            const e = n;
            if (
              e
                .split(/\s+/)
                .some((o) => "{" == o.charAt(0) && "{" == o.charAt(1))
            ) {
              const o = yf(0, 0, "");
              return (o.dynamic = !0), (o.strValue = e), o;
            }
            const r = pc(e, t);
            return yf(r.duration, r.delay, r.easing);
          })(t.timings, e.errors);
          e.currentAnimateTimings = i;
          let r,
            o = t.styles ? t.styles : uc({});
          if (5 == o.type) r = this.visitKeyframes(o, e);
          else {
            let s = t.styles,
              a = !1;
            if (!s) {
              a = !0;
              const c = {};
              i.easing && (c.easing = i.easing), (s = uc(c));
            }
            e.currentTime += i.duration + i.delay;
            const l = this.visitStyle(s, e);
            (l.isEmptyStep = a), (r = l);
          }
          return (
            (e.currentAnimateTimings = null),
            { type: 4, timings: i, style: r, options: null }
          );
        }
        visitStyle(t, e) {
          const i = this._makeStyleAst(t, e);
          return this._validateStyleAst(i, e), i;
        }
        _makeStyleAst(t, e) {
          const i = [],
            r = Array.isArray(t.styles) ? t.styles : [t.styles];
          for (let a of r)
            "string" == typeof a
              ? a === Yn
                ? i.push(a)
                : e.errors.push(new v(3002, !1))
              : i.push(eD(a));
          let o = !1,
            s = null;
          return (
            i.forEach((a) => {
              if (
                a instanceof Map &&
                (a.has("easing") && ((s = a.get("easing")), a.delete("easing")),
                !o)
              )
                for (let l of a.values())
                  if (l.toString().indexOf("{{") >= 0) {
                    o = !0;
                    break;
                  }
            }),
            {
              type: 6,
              styles: i,
              easing: s,
              offset: t.offset,
              containsDynamicStyles: o,
              options: null,
            }
          );
        }
        _validateStyleAst(t, e) {
          const i = e.currentAnimateTimings;
          let r = e.currentTime,
            o = e.currentTime;
          i && o > 0 && (o -= i.duration + i.delay),
            t.styles.forEach((s) => {
              "string" != typeof s &&
                s.forEach((a, l) => {
                  const c = e.collectedStyles.get(e.currentQuerySelector),
                    d = c.get(l);
                  let u = !0;
                  d &&
                    (o != r &&
                      o >= d.startTime &&
                      r <= d.endTime &&
                      (e.errors.push(
                        (function lj(n, t, e, i, r) {
                          return new v(3010, !1);
                        })()
                      ),
                      (u = !1)),
                    (o = d.startTime)),
                    u && c.set(l, { startTime: o, endTime: r }),
                    e.options &&
                      (function jj(n, t, e) {
                        const i = t.params || {},
                          r = rD(n);
                        r.length &&
                          r.forEach((o) => {
                            i.hasOwnProperty(o) ||
                              e.push(
                                (function ej(n) {
                                  return new v(3001, !1);
                                })()
                              );
                          });
                      })(a, e.options, e.errors);
                });
            });
        }
        visitKeyframes(t, e) {
          const i = { type: 5, styles: [], options: null };
          if (!e.currentAnimateTimings)
            return (
              e.errors.push(
                (function cj() {
                  return new v(3011, !1);
                })()
              ),
              i
            );
          let o = 0;
          const s = [];
          let a = !1,
            l = !1,
            c = 0;
          const d = t.steps.map((y) => {
            const x = this._makeStyleAst(y, e);
            let b =
                null != x.offset
                  ? x.offset
                  : (function nH(n) {
                      if ("string" == typeof n) return null;
                      let t = null;
                      if (Array.isArray(n))
                        n.forEach((e) => {
                          if (e instanceof Map && e.has("offset")) {
                            const i = e;
                            (t = parseFloat(i.get("offset"))),
                              i.delete("offset");
                          }
                        });
                      else if (n instanceof Map && n.has("offset")) {
                        const e = n;
                        (t = parseFloat(e.get("offset"))), e.delete("offset");
                      }
                      return t;
                    })(x.styles),
              E = 0;
            return (
              null != b && (o++, (E = x.offset = b)),
              (l = l || E < 0 || E > 1),
              (a = a || E < c),
              (c = E),
              s.push(E),
              x
            );
          });
          l &&
            e.errors.push(
              (function dj() {
                return new v(3012, !1);
              })()
            ),
            a &&
              e.errors.push(
                (function uj() {
                  return new v(3200, !1);
                })()
              );
          const u = t.steps.length;
          let h = 0;
          o > 0 && o < u
            ? e.errors.push(
                (function hj() {
                  return new v(3202, !1);
                })()
              )
            : 0 == o && (h = 1 / (u - 1));
          const m = u - 1,
            f = e.currentTime,
            p = e.currentAnimateTimings,
            g = p.duration;
          return (
            d.forEach((y, x) => {
              const b = h > 0 ? (x == m ? 1 : h * x) : s[x],
                E = b * g;
              (e.currentTime = f + p.delay + E),
                (p.duration = E),
                this._validateStyleAst(y, e),
                (y.offset = b),
                i.styles.push(y);
            }),
            i
          );
        }
        visitReference(t, e) {
          return {
            type: 8,
            animation: Pt(this, Vs(t.animation), e),
            options: Ji(t.options),
          };
        }
        visitAnimateChild(t, e) {
          return e.depCount++, { type: 9, options: Ji(t.options) };
        }
        visitAnimateRef(t, e) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, e),
            options: Ji(t.options),
          };
        }
        visitQuery(t, e) {
          const i = e.currentQuerySelector,
            r = t.options || {};
          e.queryCount++, (e.currentQuery = t);
          const [o, s] = (function Jj(n) {
            const t = !!n.split(/\s*,\s*/).find((e) => ":self" == e);
            return (
              t && (n = n.replace(Yj, "")),
              (n = n
                .replace(/@\*/g, fc)
                .replace(/@\w+/g, (e) => fc + "-" + e.slice(1))
                .replace(/:animating/g, pf)),
              [n, t]
            );
          })(t.selector);
          (e.currentQuerySelector = i.length ? i + " " + o : o),
            Ft(e.collectedStyles, e.currentQuerySelector, new Map());
          const a = Pt(this, Vs(t.animation), e);
          return (
            (e.currentQuery = null),
            (e.currentQuerySelector = i),
            {
              type: 11,
              selector: o,
              limit: r.limit || 0,
              optional: !!r.optional,
              includeSelf: s,
              animation: a,
              originalSelector: t.selector,
              options: Ji(t.options),
            }
          );
        }
        visitStagger(t, e) {
          e.currentQuery ||
            e.errors.push(
              (function mj() {
                return new v(3013, !1);
              })()
            );
          const i =
            "full" === t.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : pc(t.timings, e.errors, !0);
          return {
            type: 12,
            animation: Pt(this, Vs(t.animation), e),
            timings: i,
            options: null,
          };
        }
      }
      class tH {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
        }
      }
      function Ji(n) {
        return (
          n
            ? (n = Ls(n)).params &&
              (n.params = (function eH(n) {
                return n ? Ls(n) : null;
              })(n.params))
            : (n = {}),
          n
        );
      }
      function yf(n, t, e) {
        return { duration: n, delay: t, easing: e };
      }
      function wf(n, t, e, i, r, o, s = null, a = !1) {
        return {
          type: 1,
          element: n,
          keyframes: t,
          preStyleProps: e,
          postStyleProps: i,
          duration: r,
          delay: o,
          totalTime: r + o,
          easing: s,
          subTimeline: a,
        };
      }
      class xc {
        constructor() {
          this._map = new Map();
        }
        get(t) {
          return this._map.get(t) || [];
        }
        append(t, e) {
          let i = this._map.get(t);
          i || this._map.set(t, (i = [])), i.push(...e);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const sH = new RegExp(":enter", "g"),
        lH = new RegExp(":leave", "g");
      function xf(n, t, e, i, r, o = new Map(), s = new Map(), a, l, c = []) {
        return new cH().buildKeyframes(n, t, e, i, r, o, s, a, l, c);
      }
      class cH {
        buildKeyframes(t, e, i, r, o, s, a, l, c, d = []) {
          c = c || new xc();
          const u = new Cf(t, e, c, r, o, d, []);
          u.options = l;
          const h = l.delay ? Xn(l.delay) : 0;
          u.currentTimeline.delayNextStep(h),
            u.currentTimeline.setStyles([s], null, u.errors, l),
            Pt(this, i, u);
          const m = u.timelines.filter((f) => f.containsAnimation());
          if (m.length && a.size) {
            let f;
            for (let p = m.length - 1; p >= 0; p--) {
              const g = m[p];
              if (g.element === e) {
                f = g;
                break;
              }
            }
            f &&
              !f.allowOnlyTimelineStyles() &&
              f.setStyles([a], null, u.errors, l);
          }
          return m.length
            ? m.map((f) => f.buildKeyframes())
            : [wf(e, [], [], [], 0, h, "", !1)];
        }
        visitTrigger(t, e) {}
        visitState(t, e) {}
        visitTransition(t, e) {}
        visitAnimateChild(t, e) {
          const i = e.subInstructions.get(e.element);
          if (i) {
            const r = e.createSubContext(t.options),
              o = e.currentTimeline.currentTime,
              s = this._visitSubInstructions(i, r, r.options);
            o != s && e.transformIntoNewTimeline(s);
          }
          e.previousNode = t;
        }
        visitAnimateRef(t, e) {
          const i = e.createSubContext(t.options);
          i.transformIntoNewTimeline(),
            this._applyAnimationRefDelays(
              [t.options, t.animation.options],
              e,
              i
            ),
            this.visitReference(t.animation, i),
            e.transformIntoNewTimeline(i.currentTimeline.currentTime),
            (e.previousNode = t);
        }
        _applyAnimationRefDelays(t, e, i) {
          for (const r of t) {
            const o = r?.delay;
            if (o) {
              const s =
                "number" == typeof o ? o : Xn(Bs(o, r?.params ?? {}, e.errors));
              i.delayNextStep(s);
            }
          }
        }
        _visitSubInstructions(t, e, i) {
          let o = e.currentTimeline.currentTime;
          const s = null != i.duration ? Xn(i.duration) : null,
            a = null != i.delay ? Xn(i.delay) : null;
          return (
            0 !== s &&
              t.forEach((l) => {
                const c = e.appendInstructionToTimeline(l, s, a);
                o = Math.max(o, c.duration + c.delay);
              }),
            o
          );
        }
        visitReference(t, e) {
          e.updateOptions(t.options, !0),
            Pt(this, t.animation, e),
            (e.previousNode = t);
        }
        visitSequence(t, e) {
          const i = e.subContextCount;
          let r = e;
          const o = t.options;
          if (
            o &&
            (o.params || o.delay) &&
            ((r = e.createSubContext(o)),
            r.transformIntoNewTimeline(),
            null != o.delay)
          ) {
            6 == r.previousNode.type &&
              (r.currentTimeline.snapshotCurrentStyles(),
              (r.previousNode = Cc));
            const s = Xn(o.delay);
            r.delayNextStep(s);
          }
          t.steps.length &&
            (t.steps.forEach((s) => Pt(this, s, r)),
            r.currentTimeline.applyStylesToKeyframe(),
            r.subContextCount > i && r.transformIntoNewTimeline()),
            (e.previousNode = t);
        }
        visitGroup(t, e) {
          const i = [];
          let r = e.currentTimeline.currentTime;
          const o = t.options && t.options.delay ? Xn(t.options.delay) : 0;
          t.steps.forEach((s) => {
            const a = e.createSubContext(t.options);
            o && a.delayNextStep(o),
              Pt(this, s, a),
              (r = Math.max(r, a.currentTimeline.currentTime)),
              i.push(a.currentTimeline);
          }),
            i.forEach((s) => e.currentTimeline.mergeTimelineCollectedStyles(s)),
            e.transformIntoNewTimeline(r),
            (e.previousNode = t);
        }
        _visitTiming(t, e) {
          if (t.dynamic) {
            const i = t.strValue;
            return pc(e.params ? Bs(i, e.params, e.errors) : i, e.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, e) {
          const i = (e.currentAnimateTimings = this._visitTiming(t.timings, e)),
            r = e.currentTimeline;
          i.delay && (e.incrementTime(i.delay), r.snapshotCurrentStyles());
          const o = t.style;
          5 == o.type
            ? this.visitKeyframes(o, e)
            : (e.incrementTime(i.duration),
              this.visitStyle(o, e),
              r.applyStylesToKeyframe()),
            (e.currentAnimateTimings = null),
            (e.previousNode = t);
        }
        visitStyle(t, e) {
          const i = e.currentTimeline,
            r = e.currentAnimateTimings;
          !r && i.hasCurrentStyleProperties() && i.forwardFrame();
          const o = (r && r.easing) || t.easing;
          t.isEmptyStep
            ? i.applyEmptyStep(o)
            : i.setStyles(t.styles, o, e.errors, e.options),
            (e.previousNode = t);
        }
        visitKeyframes(t, e) {
          const i = e.currentAnimateTimings,
            r = e.currentTimeline.duration,
            o = i.duration,
            a = e.createSubContext().currentTimeline;
          (a.easing = i.easing),
            t.styles.forEach((l) => {
              a.forwardTime((l.offset || 0) * o),
                a.setStyles(l.styles, l.easing, e.errors, e.options),
                a.applyStylesToKeyframe();
            }),
            e.currentTimeline.mergeTimelineCollectedStyles(a),
            e.transformIntoNewTimeline(r + o),
            (e.previousNode = t);
        }
        visitQuery(t, e) {
          const i = e.currentTimeline.currentTime,
            r = t.options || {},
            o = r.delay ? Xn(r.delay) : 0;
          o &&
            (6 === e.previousNode.type ||
              (0 == i && e.currentTimeline.hasCurrentStyleProperties())) &&
            (e.currentTimeline.snapshotCurrentStyles(), (e.previousNode = Cc));
          let s = i;
          const a = e.invokeQuery(
            t.selector,
            t.originalSelector,
            t.limit,
            t.includeSelf,
            !!r.optional,
            e.errors
          );
          e.currentQueryTotal = a.length;
          let l = null;
          a.forEach((c, d) => {
            e.currentQueryIndex = d;
            const u = e.createSubContext(t.options, c);
            o && u.delayNextStep(o),
              c === e.element && (l = u.currentTimeline),
              Pt(this, t.animation, u),
              u.currentTimeline.applyStylesToKeyframe(),
              (s = Math.max(s, u.currentTimeline.currentTime));
          }),
            (e.currentQueryIndex = 0),
            (e.currentQueryTotal = 0),
            e.transformIntoNewTimeline(s),
            l &&
              (e.currentTimeline.mergeTimelineCollectedStyles(l),
              e.currentTimeline.snapshotCurrentStyles()),
            (e.previousNode = t);
        }
        visitStagger(t, e) {
          const i = e.parentContext,
            r = e.currentTimeline,
            o = t.timings,
            s = Math.abs(o.duration),
            a = s * (e.currentQueryTotal - 1);
          let l = s * e.currentQueryIndex;
          switch (o.duration < 0 ? "reverse" : o.easing) {
            case "reverse":
              l = a - l;
              break;
            case "full":
              l = i.currentStaggerTime;
          }
          const d = e.currentTimeline;
          l && d.delayNextStep(l);
          const u = d.currentTime;
          Pt(this, t.animation, e),
            (e.previousNode = t),
            (i.currentStaggerTime =
              r.currentTime - u + (r.startTime - i.currentTimeline.startTime));
        }
      }
      const Cc = {};
      class Cf {
        constructor(t, e, i, r, o, s, a, l) {
          (this._driver = t),
            (this.element = e),
            (this.subInstructions = i),
            (this._enterClassName = r),
            (this._leaveClassName = o),
            (this.errors = s),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = Cc),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new Dc(this._driver, e, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, e) {
          if (!t) return;
          const i = t;
          let r = this.options;
          null != i.duration && (r.duration = Xn(i.duration)),
            null != i.delay && (r.delay = Xn(i.delay));
          const o = i.params;
          if (o) {
            let s = r.params;
            s || (s = this.options.params = {}),
              Object.keys(o).forEach((a) => {
                (!e || !s.hasOwnProperty(a)) &&
                  (s[a] = Bs(o[a], s, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const e = this.options.params;
            if (e) {
              const i = (t.params = {});
              Object.keys(e).forEach((r) => {
                i[r] = e[r];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, e, i) {
          const r = e || this.element,
            o = new Cf(
              this._driver,
              r,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(r, i || 0)
            );
          return (
            (o.previousNode = this.previousNode),
            (o.currentAnimateTimings = this.currentAnimateTimings),
            (o.options = this._copyOptions()),
            o.updateOptions(t),
            (o.currentQueryIndex = this.currentQueryIndex),
            (o.currentQueryTotal = this.currentQueryTotal),
            (o.parentContext = this),
            this.subContextCount++,
            o
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = Cc),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, e, i) {
          const r = {
              duration: e ?? t.duration,
              delay: this.currentTimeline.currentTime + (i ?? 0) + t.delay,
              easing: "",
            },
            o = new dH(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              r,
              t.stretchStartingKeyframe
            );
          return this.timelines.push(o), r;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, e, i, r, o, s) {
          let a = [];
          if ((r && a.push(this.element), t.length > 0)) {
            t = (t = t.replace(sH, "." + this._enterClassName)).replace(
              lH,
              "." + this._leaveClassName
            );
            let c = this._driver.query(this.element, t, 1 != i);
            0 !== i &&
              (c = i < 0 ? c.slice(c.length + i, c.length) : c.slice(0, i)),
              a.push(...c);
          }
          return (
            !o &&
              0 == a.length &&
              s.push(
                (function fj(n) {
                  return new v(3014, !1);
                })()
              ),
            a
          );
        }
      }
      class Dc {
        constructor(t, e, i, r) {
          (this._driver = t),
            (this.element = e),
            (this.startTime = i),
            (this._elementTimelineStylesLookup = r),
            (this.duration = 0),
            (this.easing = null),
            (this._previousKeyframe = new Map()),
            (this._currentKeyframe = new Map()),
            (this._keyframes = new Map()),
            (this._styleSummary = new Map()),
            (this._localTimelineStyles = new Map()),
            (this._pendingStyles = new Map()),
            (this._backFill = new Map()),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(e)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                e,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.hasCurrentStyleProperties();
            default:
              return !0;
          }
        }
        hasCurrentStyleProperties() {
          return this._currentKeyframe.size > 0;
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const e = 1 === this._keyframes.size && this._pendingStyles.size;
          this.duration || e
            ? (this.forwardTime(this.currentTime + t),
              e && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, e) {
          return (
            this.applyStylesToKeyframe(),
            new Dc(
              this._driver,
              t,
              e || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = new Map()),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(),
            (this.duration = t),
            this._loadKeyframe();
        }
        _updateStyle(t, e) {
          this._localTimelineStyles.set(t, e),
            this._globalTimelineStyles.set(t, e),
            this._styleSummary.set(t, { time: this.currentTime, value: e });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && this._previousKeyframe.set("easing", t);
          for (let [e, i] of this._globalTimelineStyles)
            this._backFill.set(e, i || Yn), this._currentKeyframe.set(e, Yn);
          this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(t, e, i, r) {
          e && this._previousKeyframe.set("easing", e);
          const o = (r && r.params) || {},
            s = (function uH(n, t) {
              const e = new Map();
              let i;
              return (
                n.forEach((r) => {
                  if ("*" === r) {
                    i = i || t.keys();
                    for (let o of i) e.set(o, Yn);
                  } else xi(r, e);
                }),
                e
              );
            })(t, this._globalTimelineStyles);
          for (let [a, l] of s) {
            const c = Bs(l, o, i);
            this._pendingStyles.set(a, c),
              this._localTimelineStyles.has(a) ||
                this._backFill.set(a, this._globalTimelineStyles.get(a) ?? Yn),
              this._updateStyle(a, c);
          }
        }
        applyStylesToKeyframe() {
          0 != this._pendingStyles.size &&
            (this._pendingStyles.forEach((t, e) => {
              this._currentKeyframe.set(e, t);
            }),
            this._pendingStyles.clear(),
            this._localTimelineStyles.forEach((t, e) => {
              this._currentKeyframe.has(e) || this._currentKeyframe.set(e, t);
            }));
        }
        snapshotCurrentStyles() {
          for (let [t, e] of this._localTimelineStyles)
            this._pendingStyles.set(t, e), this._updateStyle(t, e);
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let e in this._currentKeyframe) t.push(e);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          t._styleSummary.forEach((e, i) => {
            const r = this._styleSummary.get(i);
            (!r || e.time > r.time) && this._updateStyle(i, e.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            e = new Set(),
            i = 1 === this._keyframes.size && 0 === this.duration;
          let r = [];
          this._keyframes.forEach((a, l) => {
            const c = xi(a, new Map(), this._backFill);
            c.forEach((d, u) => {
              d === sf ? t.add(u) : d === Yn && e.add(u);
            }),
              i || c.set("offset", l / this.duration),
              r.push(c);
          });
          const o = t.size ? gc(t.values()) : [],
            s = e.size ? gc(e.values()) : [];
          if (i) {
            const a = r[0],
              l = new Map(a);
            a.set("offset", 0), l.set("offset", 1), (r = [a, l]);
          }
          return wf(
            this.element,
            r,
            o,
            s,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class dH extends Dc {
        constructor(t, e, i, r, o, s, a = !1) {
          super(t, e, s.delay),
            (this.keyframes = i),
            (this.preStyleProps = r),
            (this.postStyleProps = o),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: s.duration,
              delay: s.delay,
              easing: s.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: e, duration: i, easing: r } = this.timings;
          if (this._stretchStartingKeyframe && e) {
            const o = [],
              s = i + e,
              a = e / s,
              l = xi(t[0]);
            l.set("offset", 0), o.push(l);
            const c = xi(t[0]);
            c.set("offset", cD(a)), o.push(c);
            const d = t.length - 1;
            for (let u = 1; u <= d; u++) {
              let h = xi(t[u]);
              const m = h.get("offset");
              h.set("offset", cD((e + m * i) / s)), o.push(h);
            }
            (i = s), (e = 0), (r = ""), (t = o);
          }
          return wf(
            this.element,
            t,
            this.preStyleProps,
            this.postStyleProps,
            i,
            e,
            r,
            !0
          );
        }
      }
      function cD(n, t = 3) {
        const e = Math.pow(10, t - 1);
        return Math.round(n * e) / e;
      }
      class Df {}
      const hH = new Set([
        "width",
        "height",
        "minWidth",
        "minHeight",
        "maxWidth",
        "maxHeight",
        "left",
        "top",
        "bottom",
        "right",
        "fontSize",
        "outlineWidth",
        "outlineOffset",
        "paddingTop",
        "paddingLeft",
        "paddingBottom",
        "paddingRight",
        "marginTop",
        "marginLeft",
        "marginBottom",
        "marginRight",
        "borderRadius",
        "borderWidth",
        "borderTopWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "textIndent",
        "perspective",
      ]);
      class mH extends Df {
        normalizePropertyName(t, e) {
          return bf(t);
        }
        normalizeStyleValue(t, e, i, r) {
          let o = "";
          const s = i.toString().trim();
          if (hH.has(e) && 0 !== i && "0" !== i)
            if ("number" == typeof i) o = "px";
            else {
              const a = i.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                r.push(
                  (function ij(n, t) {
                    return new v(3005, !1);
                  })()
                );
            }
          return s + o;
        }
      }
      function dD(n, t, e, i, r, o, s, a, l, c, d, u, h) {
        return {
          type: 0,
          element: n,
          triggerName: t,
          isRemovalTransition: r,
          fromState: e,
          fromStyles: o,
          toState: i,
          toStyles: s,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: d,
          totalTime: u,
          errors: h,
        };
      }
      const Mf = {};
      class uD {
        constructor(t, e, i) {
          (this._triggerName = t), (this.ast = e), (this._stateStyles = i);
        }
        match(t, e, i, r) {
          return (function fH(n, t, e, i, r) {
            return n.some((o) => o(t, e, i, r));
          })(this.ast.matchers, t, e, i, r);
        }
        buildStyles(t, e, i) {
          let r = this._stateStyles.get("*");
          return (
            void 0 !== t && (r = this._stateStyles.get(t?.toString()) || r),
            r ? r.buildStyles(e, i) : new Map()
          );
        }
        build(t, e, i, r, o, s, a, l, c, d) {
          const u = [],
            h = (this.ast.options && this.ast.options.params) || Mf,
            f = this.buildStyles(i, (a && a.params) || Mf, u),
            p = (l && l.params) || Mf,
            g = this.buildStyles(r, p, u),
            y = new Set(),
            x = new Map(),
            b = new Map(),
            E = "void" === r,
            Z = { params: pH(p, h), delay: this.ast.options?.delay },
            te = d ? [] : xf(t, e, this.ast.animation, o, s, f, g, Z, c, u);
          let ct = 0;
          if (
            (te.forEach((ei) => {
              ct = Math.max(ei.duration + ei.delay, ct);
            }),
            u.length)
          )
            return dD(e, this._triggerName, i, r, E, f, g, [], [], x, b, ct, u);
          te.forEach((ei) => {
            const ti = ei.element,
              ZD = Ft(x, ti, new Set());
            ei.preStyleProps.forEach((tr) => ZD.add(tr));
            const $s = Ft(b, ti, new Set());
            ei.postStyleProps.forEach((tr) => $s.add(tr)),
              ti !== e && y.add(ti);
          });
          const Jn = gc(y.values());
          return dD(e, this._triggerName, i, r, E, f, g, te, Jn, x, b, ct);
        }
      }
      function pH(n, t) {
        const e = Ls(t);
        for (const i in n) n.hasOwnProperty(i) && null != n[i] && (e[i] = n[i]);
        return e;
      }
      class gH {
        constructor(t, e, i) {
          (this.styles = t), (this.defaultParams = e), (this.normalizer = i);
        }
        buildStyles(t, e) {
          const i = new Map(),
            r = Ls(this.defaultParams);
          return (
            Object.keys(t).forEach((o) => {
              const s = t[o];
              null !== s && (r[o] = s);
            }),
            this.styles.styles.forEach((o) => {
              "string" != typeof o &&
                o.forEach((s, a) => {
                  s && (s = Bs(s, r, e));
                  const l = this.normalizer.normalizePropertyName(a, e);
                  (s = this.normalizer.normalizeStyleValue(a, l, s, e)),
                    i.set(a, s);
                });
            }),
            i
          );
        }
      }
      class bH {
        constructor(t, e, i) {
          (this.name = t),
            (this.ast = e),
            (this._normalizer = i),
            (this.transitionFactories = []),
            (this.states = new Map()),
            e.states.forEach((r) => {
              this.states.set(
                r.name,
                new gH(r.style, (r.options && r.options.params) || {}, i)
              );
            }),
            hD(this.states, "true", "1"),
            hD(this.states, "false", "0"),
            e.transitions.forEach((r) => {
              this.transitionFactories.push(new uD(t, r, this.states));
            }),
            (this.fallbackTransition = (function vH(n, t, e) {
              return new uD(
                n,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(s, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                t
              );
            })(t, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, e, i, r) {
          return (
            this.transitionFactories.find((s) => s.match(t, e, i, r)) || null
          );
        }
        matchStyles(t, e, i) {
          return this.fallbackTransition.buildStyles(t, e, i);
        }
      }
      function hD(n, t, e) {
        n.has(t)
          ? n.has(e) || n.set(e, n.get(t))
          : n.has(e) && n.set(t, n.get(e));
      }
      const yH = new xc();
      class wH {
        constructor(t, e, i) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = i),
            (this._animations = new Map()),
            (this._playersById = new Map()),
            (this.players = []);
        }
        register(t, e) {
          const i = [],
            r = [],
            o = vf(this._driver, e, i, r);
          if (i.length)
            throw (function wj(n) {
              return new v(3503, !1);
            })();
          this._animations.set(t, o);
        }
        _buildPlayer(t, e, i) {
          const r = t.element,
            o = $C(0, this._normalizer, 0, t.keyframes, e, i);
          return this._driver.animate(
            r,
            o,
            t.duration,
            t.delay,
            t.easing,
            [],
            !0
          );
        }
        create(t, e, i = {}) {
          const r = [],
            o = this._animations.get(t);
          let s;
          const a = new Map();
          if (
            (o
              ? ((s = xf(
                  this._driver,
                  e,
                  o,
                  ff,
                  hc,
                  new Map(),
                  new Map(),
                  i,
                  yH,
                  r
                )),
                s.forEach((d) => {
                  const u = Ft(a, d.element, new Map());
                  d.postStyleProps.forEach((h) => u.set(h, null));
                }))
              : (r.push(
                  (function xj() {
                    return new v(3300, !1);
                  })()
                ),
                (s = [])),
            r.length)
          )
            throw (function Cj(n) {
              return new v(3504, !1);
            })();
          a.forEach((d, u) => {
            d.forEach((h, m) => {
              d.set(m, this._driver.computeStyle(u, m, Yn));
            });
          });
          const c = wi(
            s.map((d) => {
              const u = a.get(d.element);
              return this._buildPlayer(d, new Map(), u);
            })
          );
          return (
            this._playersById.set(t, c),
            c.onDestroy(() => this.destroy(t)),
            this.players.push(c),
            c
          );
        }
        destroy(t) {
          const e = this._getPlayer(t);
          e.destroy(), this._playersById.delete(t);
          const i = this.players.indexOf(e);
          i >= 0 && this.players.splice(i, 1);
        }
        _getPlayer(t) {
          const e = this._playersById.get(t);
          if (!e)
            throw (function Dj(n) {
              return new v(3301, !1);
            })();
          return e;
        }
        listen(t, e, i, r) {
          const o = df(e, "", "", "");
          return lf(this._getPlayer(t), i, o, r), () => {};
        }
        command(t, e, i, r) {
          if ("register" == i) return void this.register(t, r[0]);
          if ("create" == i) return void this.create(t, e, r[0] || {});
          const o = this._getPlayer(t);
          switch (i) {
            case "play":
              o.play();
              break;
            case "pause":
              o.pause();
              break;
            case "reset":
              o.reset();
              break;
            case "restart":
              o.restart();
              break;
            case "finish":
              o.finish();
              break;
            case "init":
              o.init();
              break;
            case "setPosition":
              o.setPosition(parseFloat(r[0]));
              break;
            case "destroy":
              this.destroy(t);
          }
        }
      }
      const mD = "ng-animate-queued",
        Ef = "ng-animate-disabled",
        EH = [],
        fD = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        SH = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        Kt = "__ng_removed";
      class Sf {
        get params() {
          return this.options.params;
        }
        constructor(t, e = "") {
          this.namespaceId = e;
          const i = t && t.hasOwnProperty("value");
          if (
            ((this.value = (function kH(n) {
              return n ?? null;
            })(i ? t.value : t)),
            i)
          ) {
            const o = Ls(t);
            delete o.value, (this.options = o);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        absorbOptions(t) {
          const e = t.params;
          if (e) {
            const i = this.options.params;
            Object.keys(e).forEach((r) => {
              null == i[r] && (i[r] = e[r]);
            });
          }
        }
      }
      const js = "void",
        If = new Sf(js);
      class IH {
        constructor(t, e, i) {
          (this.id = t),
            (this.hostElement = e),
            (this._engine = i),
            (this.players = []),
            (this._triggers = new Map()),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + t),
            Qt(e, this._hostClassName);
        }
        listen(t, e, i, r) {
          if (!this._triggers.has(e))
            throw (function Mj(n, t) {
              return new v(3302, !1);
            })();
          if (null == i || 0 == i.length)
            throw (function Ej(n) {
              return new v(3303, !1);
            })();
          if (
            !(function RH(n) {
              return "start" == n || "done" == n;
            })(i)
          )
            throw (function Sj(n, t) {
              return new v(3400, !1);
            })();
          const o = Ft(this._elementListeners, t, []),
            s = { name: e, phase: i, callback: r };
          o.push(s);
          const a = Ft(this._engine.statesByElement, t, new Map());
          return (
            a.has(e) || (Qt(t, mc), Qt(t, mc + "-" + e), a.set(e, If)),
            () => {
              this._engine.afterFlush(() => {
                const l = o.indexOf(s);
                l >= 0 && o.splice(l, 1), this._triggers.has(e) || a.delete(e);
              });
            }
          );
        }
        register(t, e) {
          return !this._triggers.has(t) && (this._triggers.set(t, e), !0);
        }
        _getTrigger(t) {
          const e = this._triggers.get(t);
          if (!e)
            throw (function Ij(n) {
              return new v(3401, !1);
            })();
          return e;
        }
        trigger(t, e, i, r = !0) {
          const o = this._getTrigger(e),
            s = new Af(this.id, e, t);
          let a = this._engine.statesByElement.get(t);
          a ||
            (Qt(t, mc),
            Qt(t, mc + "-" + e),
            this._engine.statesByElement.set(t, (a = new Map())));
          let l = a.get(e);
          const c = new Sf(i, this.id);
          if (
            (!(i && i.hasOwnProperty("value")) &&
              l &&
              c.absorbOptions(l.options),
            a.set(e, c),
            l || (l = If),
            c.value !== js && l.value === c.value)
          ) {
            if (
              !(function PH(n, t) {
                const e = Object.keys(n),
                  i = Object.keys(t);
                if (e.length != i.length) return !1;
                for (let r = 0; r < e.length; r++) {
                  const o = e[r];
                  if (!t.hasOwnProperty(o) || n[o] !== t[o]) return !1;
                }
                return !0;
              })(l.params, c.params)
            ) {
              const p = [],
                g = o.matchStyles(l.value, l.params, p),
                y = o.matchStyles(c.value, c.params, p);
              p.length
                ? this._engine.reportError(p)
                : this._engine.afterFlush(() => {
                    Xi(t, g), Sn(t, y);
                  });
            }
            return;
          }
          const h = Ft(this._engine.playersByElement, t, []);
          h.forEach((p) => {
            p.namespaceId == this.id &&
              p.triggerName == e &&
              p.queued &&
              p.destroy();
          });
          let m = o.matchTransition(l.value, c.value, t, c.params),
            f = !1;
          if (!m) {
            if (!r) return;
            (m = o.fallbackTransition), (f = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: e,
              transition: m,
              fromState: l,
              toState: c,
              player: s,
              isFallbackTransition: f,
            }),
            f ||
              (Qt(t, mD),
              s.onStart(() => {
                ho(t, mD);
              })),
            s.onDone(() => {
              let p = this.players.indexOf(s);
              p >= 0 && this.players.splice(p, 1);
              const g = this._engine.playersByElement.get(t);
              if (g) {
                let y = g.indexOf(s);
                y >= 0 && g.splice(y, 1);
              }
            }),
            this.players.push(s),
            h.push(s),
            s
          );
        }
        deregister(t) {
          this._triggers.delete(t),
            this._engine.statesByElement.forEach((e) => e.delete(t)),
            this._elementListeners.forEach((e, i) => {
              this._elementListeners.set(
                i,
                e.filter((r) => r.name != t)
              );
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t),
            this._elementListeners.delete(t);
          const e = this._engine.playersByElement.get(t);
          e &&
            (e.forEach((i) => i.destroy()),
            this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, e) {
          const i = this._engine.driver.query(t, fc, !0);
          i.forEach((r) => {
            if (r[Kt]) return;
            const o = this._engine.fetchNamespacesByElement(r);
            o.size
              ? o.forEach((s) => s.triggerLeaveAnimation(r, e, !1, !0))
              : this.clearElementCache(r);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              i.forEach((r) => this.clearElementCache(r))
            );
        }
        triggerLeaveAnimation(t, e, i, r) {
          const o = this._engine.statesByElement.get(t),
            s = new Map();
          if (o) {
            const a = [];
            if (
              (o.forEach((l, c) => {
                if ((s.set(c, l.value), this._triggers.has(c))) {
                  const d = this.trigger(t, c, js, r);
                  d && a.push(d);
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, e, s),
                i && wi(a).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const e = this._elementListeners.get(t),
            i = this._engine.statesByElement.get(t);
          if (e && i) {
            const r = new Set();
            e.forEach((o) => {
              const s = o.name;
              if (r.has(s)) return;
              r.add(s);
              const l = this._triggers.get(s).fallbackTransition,
                c = i.get(s) || If,
                d = new Sf(js),
                u = new Af(this.id, s, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: s,
                  transition: l,
                  fromState: c,
                  toState: d,
                  player: u,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(t, e) {
          const i = this._engine;
          if (
            (t.childElementCount && this._signalRemovalForInnerTriggers(t, e),
            this.triggerLeaveAnimation(t, e, !0))
          )
            return;
          let r = !1;
          if (i.totalAnimations) {
            const o = i.players.length ? i.playersByQueriedElement.get(t) : [];
            if (o && o.length) r = !0;
            else {
              let s = t;
              for (; (s = s.parentNode); )
                if (i.statesByElement.get(s)) {
                  r = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), r))
            i.markElementAsRemoved(this.id, t, !1, e);
          else {
            const o = t[Kt];
            (!o || o === fD) &&
              (i.afterFlush(() => this.clearElementCache(t)),
              i.destroyInnerAnimations(t),
              i._onRemovalComplete(t, e));
          }
        }
        insertNode(t, e) {
          Qt(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const e = [];
          return (
            this._queue.forEach((i) => {
              const r = i.player;
              if (r.destroyed) return;
              const o = i.element,
                s = this._elementListeners.get(o);
              s &&
                s.forEach((a) => {
                  if (a.name == i.triggerName) {
                    const l = df(
                      o,
                      i.triggerName,
                      i.fromState.value,
                      i.toState.value
                    );
                    (l._data = t), lf(i.player, a.phase, l, a.callback);
                  }
                }),
                r.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      r.destroy();
                    })
                  : e.push(i);
            }),
            (this._queue = []),
            e.sort((i, r) => {
              const o = i.transition.ast.depCount,
                s = r.transition.ast.depCount;
              return 0 == o || 0 == s
                ? o - s
                : this._engine.driver.containsElement(i.element, r.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach((e) => e.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
        elementContainsData(t) {
          let e = !1;
          return (
            this._elementListeners.has(t) && (e = !0),
            (e = !!this._queue.find((i) => i.element === t) || e),
            e
          );
        }
      }
      class AH {
        _onRemovalComplete(t, e) {
          this.onRemovalComplete(t, e);
        }
        constructor(t, e, i) {
          (this.bodyNode = t),
            (this.driver = e),
            (this._normalizer = i),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (r, o) => {});
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach((e) => {
              e.players.forEach((i) => {
                i.queued && t.push(i);
              });
            }),
            t
          );
        }
        createNamespace(t, e) {
          const i = new IH(t, e, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, e)
              ? this._balanceNamespaceList(i, e)
              : (this.newHostElements.set(e, i), this.collectEnterElement(e)),
            (this._namespaceLookup[t] = i)
          );
        }
        _balanceNamespaceList(t, e) {
          const i = this._namespaceList,
            r = this.namespacesByHostElement;
          if (i.length - 1 >= 0) {
            let s = !1,
              a = this.driver.getParentElement(e);
            for (; a; ) {
              const l = r.get(a);
              if (l) {
                const c = i.indexOf(l);
                i.splice(c + 1, 0, t), (s = !0);
                break;
              }
              a = this.driver.getParentElement(a);
            }
            s || i.unshift(t);
          } else i.push(t);
          return r.set(e, t), t;
        }
        register(t, e) {
          let i = this._namespaceLookup[t];
          return i || (i = this.createNamespace(t, e)), i;
        }
        registerTrigger(t, e, i) {
          let r = this._namespaceLookup[t];
          r && r.register(e, i) && this.totalAnimations++;
        }
        destroy(t, e) {
          if (!t) return;
          const i = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(i.hostElement),
              delete this._namespaceLookup[t];
            const r = this._namespaceList.indexOf(i);
            r >= 0 && this._namespaceList.splice(r, 1);
          }),
            this.afterFlushAnimationsDone(() => i.destroy(e));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const e = new Set(),
            i = this.statesByElement.get(t);
          if (i)
            for (let r of i.values())
              if (r.namespaceId) {
                const o = this._fetchNamespace(r.namespaceId);
                o && e.add(o);
              }
          return e;
        }
        trigger(t, e, i, r) {
          if (Mc(e)) {
            const o = this._fetchNamespace(t);
            if (o) return o.trigger(e, i, r), !0;
          }
          return !1;
        }
        insertNode(t, e, i, r) {
          if (!Mc(e)) return;
          const o = e[Kt];
          if (o && o.setForRemoval) {
            (o.setForRemoval = !1), (o.setForMove = !0);
            const s = this.collectedLeaveElements.indexOf(e);
            s >= 0 && this.collectedLeaveElements.splice(s, 1);
          }
          if (t) {
            const s = this._fetchNamespace(t);
            s && s.insertNode(e, i);
          }
          r && this.collectEnterElement(e);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, e) {
          e
            ? this.disabledNodes.has(t) ||
              (this.disabledNodes.add(t), Qt(t, Ef))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), ho(t, Ef));
        }
        removeNode(t, e, i, r) {
          if (Mc(e)) {
            const o = t ? this._fetchNamespace(t) : null;
            if (
              (o ? o.removeNode(e, r) : this.markElementAsRemoved(t, e, !1, r),
              i)
            ) {
              const s = this.namespacesByHostElement.get(e);
              s && s.id !== t && s.removeNode(e, r);
            }
          } else this._onRemovalComplete(e, r);
        }
        markElementAsRemoved(t, e, i, r, o) {
          this.collectedLeaveElements.push(e),
            (e[Kt] = {
              namespaceId: t,
              setForRemoval: r,
              hasAnimation: i,
              removedBeforeQueried: !1,
              previousTriggersValues: o,
            });
        }
        listen(t, e, i, r, o) {
          return Mc(e) ? this._fetchNamespace(t).listen(e, i, r, o) : () => {};
        }
        _buildInstruction(t, e, i, r, o) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            i,
            r,
            t.fromState.options,
            t.toState.options,
            e,
            o
          );
        }
        destroyInnerAnimations(t) {
          let e = this.driver.query(t, fc, !0);
          e.forEach((i) => this.destroyActiveAnimationsForElement(i)),
            0 != this.playersByQueriedElement.size &&
              ((e = this.driver.query(t, pf, !0)),
              e.forEach((i) => this.finishActiveQueriedAnimationOnElement(i)));
        }
        destroyActiveAnimationsForElement(t) {
          const e = this.playersByElement.get(t);
          e &&
            e.forEach((i) => {
              i.queued ? (i.markedForDestroy = !0) : i.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const e = this.playersByQueriedElement.get(t);
          e && e.forEach((i) => i.finish());
        }
        whenRenderingDone() {
          return new Promise((t) => {
            if (this.players.length) return wi(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const e = t[Kt];
          if (e && e.setForRemoval) {
            if (((t[Kt] = fD), e.namespaceId)) {
              this.destroyInnerAnimations(t);
              const i = this._fetchNamespace(e.namespaceId);
              i && i.clearElementCache(t);
            }
            this._onRemovalComplete(t, e.setForRemoval);
          }
          t.classList?.contains(Ef) && this.markElementAsDisabled(t, !1),
            this.driver.query(t, ".ng-animate-disabled", !0).forEach((i) => {
              this.markElementAsDisabled(i, !1);
            });
        }
        flush(t = -1) {
          let e = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((i, r) =>
                this._balanceNamespaceList(i, r)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let i = 0; i < this.collectedEnterElements.length; i++)
              Qt(this.collectedEnterElements[i], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const i = [];
            try {
              e = this._flushAnimations(i, t);
            } finally {
              for (let r = 0; r < i.length; r++) i[r]();
            }
          } else
            for (let i = 0; i < this.collectedLeaveElements.length; i++)
              this.processLeaveNode(this.collectedLeaveElements[i]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((i) => i()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const i = this._whenQuietFns;
            (this._whenQuietFns = []),
              e.length
                ? wi(e).onDone(() => {
                    i.forEach((r) => r());
                  })
                : i.forEach((r) => r());
          }
        }
        reportError(t) {
          throw (function Aj(n) {
            return new v(3402, !1);
          })();
        }
        _flushAnimations(t, e) {
          const i = new xc(),
            r = [],
            o = new Map(),
            s = [],
            a = new Map(),
            l = new Map(),
            c = new Map(),
            d = new Set();
          this.disabledNodes.forEach((A) => {
            d.add(A);
            const R = this.driver.query(A, ".ng-animate-queued", !0);
            for (let L = 0; L < R.length; L++) d.add(R[L]);
          });
          const u = this.bodyNode,
            h = Array.from(this.statesByElement.keys()),
            m = _D(h, this.collectedEnterElements),
            f = new Map();
          let p = 0;
          m.forEach((A, R) => {
            const L = ff + p++;
            f.set(R, L), A.forEach((ee) => Qt(ee, L));
          });
          const g = [],
            y = new Set(),
            x = new Set();
          for (let A = 0; A < this.collectedLeaveElements.length; A++) {
            const R = this.collectedLeaveElements[A],
              L = R[Kt];
            L &&
              L.setForRemoval &&
              (g.push(R),
              y.add(R),
              L.hasAnimation
                ? this.driver
                    .query(R, ".ng-star-inserted", !0)
                    .forEach((ee) => y.add(ee))
                : x.add(R));
          }
          const b = new Map(),
            E = _D(h, Array.from(y));
          E.forEach((A, R) => {
            const L = hc + p++;
            b.set(R, L), A.forEach((ee) => Qt(ee, L));
          }),
            t.push(() => {
              m.forEach((A, R) => {
                const L = f.get(R);
                A.forEach((ee) => ho(ee, L));
              }),
                E.forEach((A, R) => {
                  const L = b.get(R);
                  A.forEach((ee) => ho(ee, L));
                }),
                g.forEach((A) => {
                  this.processLeaveNode(A);
                });
            });
          const Z = [],
            te = [];
          for (let A = this._namespaceList.length - 1; A >= 0; A--)
            this._namespaceList[A].drainQueuedTransitions(e).forEach((L) => {
              const ee = L.player,
                Ge = L.element;
              if ((Z.push(ee), this.collectedEnterElements.length)) {
                const dt = Ge[Kt];
                if (dt && dt.setForMove) {
                  if (
                    dt.previousTriggersValues &&
                    dt.previousTriggersValues.has(L.triggerName)
                  ) {
                    const nr = dt.previousTriggersValues.get(L.triggerName),
                      Zt = this.statesByElement.get(L.element);
                    if (Zt && Zt.has(L.triggerName)) {
                      const Fc = Zt.get(L.triggerName);
                      (Fc.value = nr), Zt.set(L.triggerName, Fc);
                    }
                  }
                  return void ee.destroy();
                }
              }
              const In = !u || !this.driver.containsElement(u, Ge),
                Nt = b.get(Ge),
                Mi = f.get(Ge),
                Me = this._buildInstruction(L, i, Mi, Nt, In);
              if (Me.errors && Me.errors.length) return void te.push(Me);
              if (In)
                return (
                  ee.onStart(() => Xi(Ge, Me.fromStyles)),
                  ee.onDestroy(() => Sn(Ge, Me.toStyles)),
                  void r.push(ee)
                );
              if (L.isFallbackTransition)
                return (
                  ee.onStart(() => Xi(Ge, Me.fromStyles)),
                  ee.onDestroy(() => Sn(Ge, Me.toStyles)),
                  void r.push(ee)
                );
              const JD = [];
              Me.timelines.forEach((dt) => {
                (dt.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(dt.element) || JD.push(dt);
              }),
                (Me.timelines = JD),
                i.append(Ge, Me.timelines),
                s.push({ instruction: Me, player: ee, element: Ge }),
                Me.queriedElements.forEach((dt) => Ft(a, dt, []).push(ee)),
                Me.preStyleProps.forEach((dt, nr) => {
                  if (dt.size) {
                    let Zt = l.get(nr);
                    Zt || l.set(nr, (Zt = new Set())),
                      dt.forEach((Fc, jf) => Zt.add(jf));
                  }
                }),
                Me.postStyleProps.forEach((dt, nr) => {
                  let Zt = c.get(nr);
                  Zt || c.set(nr, (Zt = new Set())),
                    dt.forEach((Fc, jf) => Zt.add(jf));
                });
            });
          if (te.length) {
            const A = [];
            te.forEach((R) => {
              A.push(
                (function Tj(n, t) {
                  return new v(3505, !1);
                })()
              );
            }),
              Z.forEach((R) => R.destroy()),
              this.reportError(A);
          }
          const ct = new Map(),
            Jn = new Map();
          s.forEach((A) => {
            const R = A.element;
            i.has(R) &&
              (Jn.set(R, R),
              this._beforeAnimationBuild(
                A.player.namespaceId,
                A.instruction,
                ct
              ));
          }),
            r.forEach((A) => {
              const R = A.element;
              this._getPreviousPlayers(
                R,
                !1,
                A.namespaceId,
                A.triggerName,
                null
              ).forEach((ee) => {
                Ft(ct, R, []).push(ee), ee.destroy();
              });
            });
          const ei = g.filter((A) => vD(A, l, c)),
            ti = new Map();
          gD(ti, this.driver, x, c, Yn).forEach((A) => {
            vD(A, l, c) && ei.push(A);
          });
          const $s = new Map();
          m.forEach((A, R) => {
            gD($s, this.driver, new Set(A), l, sf);
          }),
            ei.forEach((A) => {
              const R = ti.get(A),
                L = $s.get(A);
              ti.set(
                A,
                new Map([
                  ...Array.from(R?.entries() ?? []),
                  ...Array.from(L?.entries() ?? []),
                ])
              );
            });
          const tr = [],
            YD = [],
            XD = {};
          s.forEach((A) => {
            const { element: R, player: L, instruction: ee } = A;
            if (i.has(R)) {
              if (d.has(R))
                return (
                  L.onDestroy(() => Sn(R, ee.toStyles)),
                  (L.disabled = !0),
                  L.overrideTotalTime(ee.totalTime),
                  void r.push(L)
                );
              let Ge = XD;
              if (Jn.size > 1) {
                let Nt = R;
                const Mi = [];
                for (; (Nt = Nt.parentNode); ) {
                  const Me = Jn.get(Nt);
                  if (Me) {
                    Ge = Me;
                    break;
                  }
                  Mi.push(Nt);
                }
                Mi.forEach((Me) => Jn.set(Me, Ge));
              }
              const In = this._buildAnimation(L.namespaceId, ee, ct, o, $s, ti);
              if ((L.setRealPlayer(In), Ge === XD)) tr.push(L);
              else {
                const Nt = this.playersByElement.get(Ge);
                Nt && Nt.length && (L.parentPlayer = wi(Nt)), r.push(L);
              }
            } else
              Xi(R, ee.fromStyles),
                L.onDestroy(() => Sn(R, ee.toStyles)),
                YD.push(L),
                d.has(R) && r.push(L);
          }),
            YD.forEach((A) => {
              const R = o.get(A.element);
              if (R && R.length) {
                const L = wi(R);
                A.setRealPlayer(L);
              }
            }),
            r.forEach((A) => {
              A.parentPlayer ? A.syncPlayerEvents(A.parentPlayer) : A.destroy();
            });
          for (let A = 0; A < g.length; A++) {
            const R = g[A],
              L = R[Kt];
            if ((ho(R, hc), L && L.hasAnimation)) continue;
            let ee = [];
            if (a.size) {
              let In = a.get(R);
              In && In.length && ee.push(...In);
              let Nt = this.driver.query(R, pf, !0);
              for (let Mi = 0; Mi < Nt.length; Mi++) {
                let Me = a.get(Nt[Mi]);
                Me && Me.length && ee.push(...Me);
              }
            }
            const Ge = ee.filter((In) => !In.destroyed);
            Ge.length ? OH(this, R, Ge) : this.processLeaveNode(R);
          }
          return (
            (g.length = 0),
            tr.forEach((A) => {
              this.players.push(A),
                A.onDone(() => {
                  A.destroy();
                  const R = this.players.indexOf(A);
                  this.players.splice(R, 1);
                }),
                A.play();
            }),
            tr
          );
        }
        elementContainsData(t, e) {
          let i = !1;
          const r = e[Kt];
          return (
            r && r.setForRemoval && (i = !0),
            this.playersByElement.has(e) && (i = !0),
            this.playersByQueriedElement.has(e) && (i = !0),
            this.statesByElement.has(e) && (i = !0),
            this._fetchNamespace(t).elementContainsData(e) || i
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, e, i, r, o) {
          let s = [];
          if (e) {
            const a = this.playersByQueriedElement.get(t);
            a && (s = a);
          } else {
            const a = this.playersByElement.get(t);
            if (a) {
              const l = !o || o == js;
              a.forEach((c) => {
                c.queued || (!l && c.triggerName != r) || s.push(c);
              });
            }
          }
          return (
            (i || r) &&
              (s = s.filter(
                (a) => !((i && i != a.namespaceId) || (r && r != a.triggerName))
              )),
            s
          );
        }
        _beforeAnimationBuild(t, e, i) {
          const o = e.element,
            s = e.isRemovalTransition ? void 0 : t,
            a = e.isRemovalTransition ? void 0 : e.triggerName;
          for (const l of e.timelines) {
            const c = l.element,
              d = c !== o,
              u = Ft(i, c, []);
            this._getPreviousPlayers(c, d, s, a, e.toState).forEach((m) => {
              const f = m.getRealPlayer();
              f.beforeDestroy && f.beforeDestroy(), m.destroy(), u.push(m);
            });
          }
          Xi(o, e.fromStyles);
        }
        _buildAnimation(t, e, i, r, o, s) {
          const a = e.triggerName,
            l = e.element,
            c = [],
            d = new Set(),
            u = new Set(),
            h = e.timelines.map((f) => {
              const p = f.element;
              d.add(p);
              const g = p[Kt];
              if (g && g.removedBeforeQueried)
                return new Ns(f.duration, f.delay);
              const y = p !== l,
                x = (function FH(n) {
                  const t = [];
                  return bD(n, t), t;
                })((i.get(p) || EH).map((ct) => ct.getRealPlayer())).filter(
                  (ct) => !!ct.element && ct.element === p
                ),
                b = o.get(p),
                E = s.get(p),
                Z = $C(0, this._normalizer, 0, f.keyframes, b, E),
                te = this._buildPlayer(f, Z, x);
              if ((f.subTimeline && r && u.add(p), y)) {
                const ct = new Af(t, a, p);
                ct.setRealPlayer(te), c.push(ct);
              }
              return te;
            });
          c.forEach((f) => {
            Ft(this.playersByQueriedElement, f.element, []).push(f),
              f.onDone(() =>
                (function TH(n, t, e) {
                  let i = n.get(t);
                  if (i) {
                    if (i.length) {
                      const r = i.indexOf(e);
                      i.splice(r, 1);
                    }
                    0 == i.length && n.delete(t);
                  }
                  return i;
                })(this.playersByQueriedElement, f.element, f)
              );
          }),
            d.forEach((f) => Qt(f, JC));
          const m = wi(h);
          return (
            m.onDestroy(() => {
              d.forEach((f) => ho(f, JC)), Sn(l, e.toStyles);
            }),
            u.forEach((f) => {
              Ft(r, f, []).push(m);
            }),
            m
          );
        }
        _buildPlayer(t, e, i) {
          return e.length > 0
            ? this.driver.animate(
                t.element,
                e,
                t.duration,
                t.delay,
                t.easing,
                i
              )
            : new Ns(t.duration, t.delay);
        }
      }
      class Af {
        constructor(t, e, i) {
          (this.namespaceId = t),
            (this.triggerName = e),
            (this.element = i),
            (this._player = new Ns()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = new Map()),
            (this.destroyed = !1),
            (this.parentPlayer = null),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            this._queuedCallbacks.forEach((e, i) => {
              e.forEach((r) => lf(t, i, void 0, r));
            }),
            this._queuedCallbacks.clear(),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const e = this._player;
          e.triggerCallback && t.onStart(() => e.triggerCallback("start")),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, e) {
          Ft(this._queuedCallbacks, t, []).push(e);
        }
        onDone(t) {
          this.queued && this._queueEvent("done", t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent("start", t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent("destroy", t),
            this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const e = this._player;
          e.triggerCallback && e.triggerCallback(t);
        }
      }
      function Mc(n) {
        return n && 1 === n.nodeType;
      }
      function pD(n, t) {
        const e = n.style.display;
        return (n.style.display = t ?? "none"), e;
      }
      function gD(n, t, e, i, r) {
        const o = [];
        e.forEach((l) => o.push(pD(l)));
        const s = [];
        i.forEach((l, c) => {
          const d = new Map();
          l.forEach((u) => {
            const h = t.computeStyle(c, u, r);
            d.set(u, h), (!h || 0 == h.length) && ((c[Kt] = SH), s.push(c));
          }),
            n.set(c, d);
        });
        let a = 0;
        return e.forEach((l) => pD(l, o[a++])), s;
      }
      function _D(n, t) {
        const e = new Map();
        if ((n.forEach((a) => e.set(a, [])), 0 == t.length)) return e;
        const i = 1,
          r = new Set(t),
          o = new Map();
        function s(a) {
          if (!a) return i;
          let l = o.get(a);
          if (l) return l;
          const c = a.parentNode;
          return (l = e.has(c) ? c : r.has(c) ? i : s(c)), o.set(a, l), l;
        }
        return (
          t.forEach((a) => {
            const l = s(a);
            l !== i && e.get(l).push(a);
          }),
          e
        );
      }
      function Qt(n, t) {
        n.classList?.add(t);
      }
      function ho(n, t) {
        n.classList?.remove(t);
      }
      function OH(n, t, e) {
        wi(e).onDone(() => n.processLeaveNode(t));
      }
      function bD(n, t) {
        for (let e = 0; e < n.length; e++) {
          const i = n[e];
          i instanceof UC ? bD(i.players, t) : t.push(i);
        }
      }
      function vD(n, t, e) {
        const i = e.get(n);
        if (!i) return !1;
        let r = t.get(n);
        return r ? i.forEach((o) => r.add(o)) : t.set(n, i), e.delete(n), !0;
      }
      class Ec {
        constructor(t, e, i) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = i),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (r, o) => {}),
            (this._transitionEngine = new AH(t, e, i)),
            (this._timelineEngine = new wH(t, e, i)),
            (this._transitionEngine.onRemovalComplete = (r, o) =>
              this.onRemovalComplete(r, o));
        }
        registerTrigger(t, e, i, r, o) {
          const s = t + "-" + r;
          let a = this._triggerCache[s];
          if (!a) {
            const l = [],
              c = [],
              d = vf(this._driver, o, l, c);
            if (l.length)
              throw (function vj(n, t) {
                return new v(3404, !1);
              })();
            (a = (function _H(n, t, e) {
              return new bH(n, t, e);
            })(r, d, this._normalizer)),
              (this._triggerCache[s] = a);
          }
          this._transitionEngine.registerTrigger(e, r, a);
        }
        register(t, e) {
          this._transitionEngine.register(t, e);
        }
        destroy(t, e) {
          this._transitionEngine.destroy(t, e);
        }
        onInsert(t, e, i, r) {
          this._transitionEngine.insertNode(t, e, i, r);
        }
        onRemove(t, e, i, r) {
          this._transitionEngine.removeNode(t, e, r || !1, i);
        }
        disableAnimations(t, e) {
          this._transitionEngine.markElementAsDisabled(t, e);
        }
        process(t, e, i, r) {
          if ("@" == i.charAt(0)) {
            const [o, s] = qC(i);
            this._timelineEngine.command(o, e, s, r);
          } else this._transitionEngine.trigger(t, e, i, r);
        }
        listen(t, e, i, r, o) {
          if ("@" == i.charAt(0)) {
            const [s, a] = qC(i);
            return this._timelineEngine.listen(s, e, a, o);
          }
          return this._transitionEngine.listen(t, e, i, r, o);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      let LH = (() => {
        class n {
          constructor(e, i, r) {
            (this._element = e),
              (this._startStyles = i),
              (this._endStyles = r),
              (this._state = 0);
            let o = n.initialStylesByElement.get(e);
            o || n.initialStylesByElement.set(e, (o = new Map())),
              (this._initialStyles = o);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Sn(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Sn(this._element, this._initialStyles),
                this._endStyles &&
                  (Sn(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (n.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (Xi(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (Xi(this._element, this._endStyles),
                  (this._endStyles = null)),
                Sn(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (n.initialStylesByElement = new WeakMap()), n;
      })();
      function Tf(n) {
        let t = null;
        return (
          n.forEach((e, i) => {
            (function VH(n) {
              return "display" === n || "position" === n;
            })(i) && ((t = t || new Map()), t.set(i, e));
          }),
          t
        );
      }
      class yD {
        constructor(t, e, i, r) {
          (this.element = t),
            (this.keyframes = e),
            (this.options = i),
            (this._specialStyles = r),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = new Map()),
            (this._duration = i.duration),
            (this._delay = i.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            t,
            this.options
          )),
            (this._finalKeyframe = t.length ? t[t.length - 1] : new Map()),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(t) {
          const e = [];
          return (
            t.forEach((i) => {
              e.push(Object.fromEntries(i));
            }),
            e
          );
        }
        _triggerWebAnimation(t, e, i) {
          return t.animate(this._convertKeyframesToObject(e), i);
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((t) => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = t * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = new Map();
          this.hasStarted() &&
            this._finalKeyframe.forEach((i, r) => {
              "offset" !== r &&
                t.set(r, this._finished ? i : oD(this.element, r));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const e = "start" === t ? this._onStartFns : this._onDoneFns;
          e.forEach((i) => i()), (e.length = 0);
        }
      }
      class BH {
        validateStyleProperty(t) {
          return !0;
        }
        validateAnimatableStyleProperty(t) {
          return !0;
        }
        matchesElement(t, e) {
          return !1;
        }
        containsElement(t, e) {
          return QC(t, e);
        }
        getParentElement(t) {
          return hf(t);
        }
        query(t, e, i) {
          return ZC(t, e, i);
        }
        computeStyle(t, e, i) {
          return window.getComputedStyle(t)[e];
        }
        animate(t, e, i, r, o, s = []) {
          const l = {
            duration: i,
            delay: r,
            fill: 0 == r ? "both" : "forwards",
          };
          o && (l.easing = o);
          const c = new Map(),
            d = s.filter((m) => m instanceof yD);
          (function zj(n, t) {
            return 0 === n || 0 === t;
          })(i, r) &&
            d.forEach((m) => {
              m.currentSnapshot.forEach((f, p) => c.set(p, f));
            });
          let u = (function Bj(n) {
            return n.length
              ? n[0] instanceof Map
                ? n
                : n.map((t) => eD(t))
              : [];
          })(e).map((m) => xi(m));
          u = (function $j(n, t, e) {
            if (e.size && t.length) {
              let i = t[0],
                r = [];
              if (
                (e.forEach((o, s) => {
                  i.has(s) || r.push(s), i.set(s, o);
                }),
                r.length)
              )
                for (let o = 1; o < t.length; o++) {
                  let s = t[o];
                  r.forEach((a) => s.set(a, oD(n, a)));
                }
            }
            return t;
          })(t, u, c);
          const h = (function NH(n, t) {
            let e = null,
              i = null;
            return (
              Array.isArray(t) && t.length
                ? ((e = Tf(t[0])), t.length > 1 && (i = Tf(t[t.length - 1])))
                : t instanceof Map && (e = Tf(t)),
              e || i ? new LH(n, e, i) : null
            );
          })(t, u);
          return new yD(t, u, l, h);
        }
      }
      let jH = (() => {
        class n extends NC {
          constructor(e, i) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = e.createRenderer(i.body, {
                id: "0",
                encapsulation: Yt.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(e) {
            const i = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const r = Array.isArray(e) ? VC(e) : e;
            return (
              wD(this._renderer, null, i, "register", [r]),
              new HH(i, this._renderer)
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(Ho), D(ge));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class HH extends ZB {
        constructor(t, e) {
          super(), (this._id = t), (this._renderer = e);
        }
        create(t, e) {
          return new UH(this._id, t, e || {}, this._renderer);
        }
      }
      class UH {
        constructor(t, e, i, r) {
          (this.id = t),
            (this.element = e),
            (this._renderer = r),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", i);
        }
        _listen(t, e) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, e);
        }
        _command(t, ...e) {
          return wD(this._renderer, this.element, this.id, t, e);
        }
        onDone(t) {
          this._listen("done", t);
        }
        onStart(t) {
          this._listen("start", t);
        }
        onDestroy(t) {
          this._listen("destroy", t);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(t) {
          this._command("setPosition", t);
        }
        getPosition() {
          return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
        }
      }
      function wD(n, t, e, i, r) {
        return n.setProperty(t, `@@${e}:${i}`, r);
      }
      const xD = "@.disabled";
      let zH = (() => {
        class n {
          constructor(e, i, r) {
            (this.delegate = e),
              (this.engine = i),
              (this._zone = r),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (i.onRemovalComplete = (o, s) => {
                const a = s?.parentNode(o);
                a && s.removeChild(a, o);
              });
          }
          createRenderer(e, i) {
            const o = this.delegate.createRenderer(e, i);
            if (!(e && i && i.data && i.data.animation)) {
              let d = this._rendererCache.get(o);
              return (
                d ||
                  ((d = new CD("", o, this.engine, () =>
                    this._rendererCache.delete(o)
                  )),
                  this._rendererCache.set(o, d)),
                d
              );
            }
            const s = i.id,
              a = i.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, e);
            const l = (d) => {
              Array.isArray(d)
                ? d.forEach(l)
                : this.engine.registerTrigger(s, a, e, d.name, d);
            };
            return i.data.animation.forEach(l), new $H(this, a, o, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(e, i, r) {
            e >= 0 && e < this._microtaskId
              ? this._zone.run(() => i(r))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((o) => {
                        const [s, a] = o;
                        s(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([i, r]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(D(Ho), D(Ec), D(re));
          }),
          (n.ɵprov = I({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class CD {
        constructor(t, e, i, r) {
          (this.namespaceId = t),
            (this.delegate = e),
            (this.engine = i),
            (this._onDestroy = r),
            (this.destroyNode = this.delegate.destroyNode
              ? (o) => e.destroyNode(o)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy(),
            this._onDestroy?.();
        }
        createElement(t, e) {
          return this.delegate.createElement(t, e);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, e) {
          this.delegate.appendChild(t, e),
            this.engine.onInsert(this.namespaceId, e, t, !1);
        }
        insertBefore(t, e, i, r = !0) {
          this.delegate.insertBefore(t, e, i),
            this.engine.onInsert(this.namespaceId, e, t, r);
        }
        removeChild(t, e, i) {
          this.engine.onRemove(this.namespaceId, e, this.delegate, i);
        }
        selectRootElement(t, e) {
          return this.delegate.selectRootElement(t, e);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, e, i, r) {
          this.delegate.setAttribute(t, e, i, r);
        }
        removeAttribute(t, e, i) {
          this.delegate.removeAttribute(t, e, i);
        }
        addClass(t, e) {
          this.delegate.addClass(t, e);
        }
        removeClass(t, e) {
          this.delegate.removeClass(t, e);
        }
        setStyle(t, e, i, r) {
          this.delegate.setStyle(t, e, i, r);
        }
        removeStyle(t, e, i) {
          this.delegate.removeStyle(t, e, i);
        }
        setProperty(t, e, i) {
          "@" == e.charAt(0) && e == xD
            ? this.disableAnimations(t, !!i)
            : this.delegate.setProperty(t, e, i);
        }
        setValue(t, e) {
          this.delegate.setValue(t, e);
        }
        listen(t, e, i) {
          return this.delegate.listen(t, e, i);
        }
        disableAnimations(t, e) {
          this.engine.disableAnimations(t, e);
        }
      }
      class $H extends CD {
        constructor(t, e, i, r, o) {
          super(e, i, r, o), (this.factory = t), (this.namespaceId = e);
        }
        setProperty(t, e, i) {
          "@" == e.charAt(0)
            ? "." == e.charAt(1) && e == xD
              ? this.disableAnimations(t, (i = void 0 === i || !!i))
              : this.engine.process(this.namespaceId, t, e.slice(1), i)
            : this.delegate.setProperty(t, e, i);
        }
        listen(t, e, i) {
          if ("@" == e.charAt(0)) {
            const r = (function qH(n) {
              switch (n) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return n;
              }
            })(t);
            let o = e.slice(1),
              s = "";
            return (
              "@" != o.charAt(0) &&
                ([o, s] = (function GH(n) {
                  const t = n.indexOf(".");
                  return [n.substring(0, t), n.slice(t + 1)];
                })(o)),
              this.engine.listen(this.namespaceId, r, o, s, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, i, a);
              })
            );
          }
          return this.delegate.listen(t, e, i);
        }
      }
      const DD = [
          { provide: NC, useClass: jH },
          {
            provide: Df,
            useFactory: function KH() {
              return new mH();
            },
          },
          {
            provide: Ec,
            useClass: (() => {
              class n extends Ec {
                constructor(e, i, r, o) {
                  super(e.body, i, r);
                }
                ngOnDestroy() {
                  this.flush();
                }
              }
              return (
                (n.ɵfac = function (e) {
                  return new (e || n)(D(ge), D(mf), D(Df), D(os));
                }),
                (n.ɵprov = I({ token: n, factory: n.ɵfac })),
                n
              );
            })(),
          },
          {
            provide: Ho,
            useFactory: function QH(n, t, e) {
              return new zH(n, t, e);
            },
            deps: [Dl, Ec, re],
          },
        ],
        kf = [
          { provide: mf, useFactory: () => new BH() },
          { provide: $r, useValue: "BrowserAnimations" },
          ...DD,
        ],
        MD = [
          { provide: mf, useClass: YC },
          { provide: $r, useValue: "NoopAnimations" },
          ...DD,
        ];
      let ZH = (() => {
          class n {
            static withConfig(e) {
              return { ngModule: n, providers: e.disableAnimations ? MD : kf };
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({ providers: kf, imports: [jw] })),
            n
          );
        })(),
        YH = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({ imports: [at, at] })),
            n
          );
        })(),
        eU = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({ imports: [at, Em, at] })),
            n
          );
        })();
      const Hs = {
        schedule(n) {
          let t = requestAnimationFrame,
            e = cancelAnimationFrame;
          const { delegate: i } = Hs;
          i && ((t = i.requestAnimationFrame), (e = i.cancelAnimationFrame));
          const r = t((o) => {
            (e = void 0), n(o);
          });
          return new tt(() => e?.(r));
        },
        requestAnimationFrame(...n) {
          const { delegate: t } = Hs;
          return (t?.requestAnimationFrame || requestAnimationFrame)(...n);
        },
        cancelAnimationFrame(...n) {
          const { delegate: t } = Hs;
          return (t?.cancelAnimationFrame || cancelAnimationFrame)(...n);
        },
        delegate: void 0,
      };
      new (class nU extends ym {
        flush(t) {
          this._active = !0;
          const e = this._scheduled;
          this._scheduled = void 0;
          const { actions: i } = this;
          let r;
          t = t || i.shift();
          do {
            if ((r = t.execute(t.state, t.delay))) break;
          } while ((t = i[0]) && t.id === e && i.shift());
          if (((this._active = !1), r)) {
            for (; (t = i[0]) && t.id === e && i.shift(); ) t.unsubscribe();
            throw r;
          }
        }
      })(
        class tU extends vm {
          constructor(t, e) {
            super(t, e), (this.scheduler = t), (this.work = e);
          }
          requestAsyncId(t, e, i = 0) {
            return null !== i && i > 0
              ? super.requestAsyncId(t, e, i)
              : (t.actions.push(this),
                t._scheduled ||
                  (t._scheduled = Hs.requestAnimationFrame(() =>
                    t.flush(void 0)
                  )));
          }
          recycleAsyncId(t, e, i = 0) {
            var r;
            if (null != i ? i > 0 : this.delay > 0)
              return super.recycleAsyncId(t, e, i);
            const { actions: o } = t;
            null != e &&
              (null === (r = o[o.length - 1]) || void 0 === r
                ? void 0
                : r.id) !== e &&
              (Hs.cancelAnimationFrame(e), (t._scheduled = void 0));
          }
        }
      );
      let Rf,
        rU = 1;
      const Ic = {};
      function ED(n) {
        return n in Ic && (delete Ic[n], !0);
      }
      const oU = {
          setImmediate(n) {
            const t = rU++;
            return (
              (Ic[t] = !0),
              Rf || (Rf = Promise.resolve()),
              Rf.then(() => ED(t) && n()),
              t
            );
          },
          clearImmediate(n) {
            ED(n);
          },
        },
        { setImmediate: sU, clearImmediate: aU } = oU,
        Ac = {
          setImmediate(...n) {
            const { delegate: t } = Ac;
            return (t?.setImmediate || sU)(...n);
          },
          clearImmediate(n) {
            const { delegate: t } = Ac;
            return (t?.clearImmediate || aU)(n);
          },
          delegate: void 0,
        };
      new (class cU extends ym {
        flush(t) {
          this._active = !0;
          const e = this._scheduled;
          this._scheduled = void 0;
          const { actions: i } = this;
          let r;
          t = t || i.shift();
          do {
            if ((r = t.execute(t.state, t.delay))) break;
          } while ((t = i[0]) && t.id === e && i.shift());
          if (((this._active = !1), r)) {
            for (; (t = i[0]) && t.id === e && i.shift(); ) t.unsubscribe();
            throw r;
          }
        }
      })(
        class lU extends vm {
          constructor(t, e) {
            super(t, e), (this.scheduler = t), (this.work = e);
          }
          requestAsyncId(t, e, i = 0) {
            return null !== i && i > 0
              ? super.requestAsyncId(t, e, i)
              : (t.actions.push(this),
                t._scheduled ||
                  (t._scheduled = Ac.setImmediate(t.flush.bind(t, void 0))));
          }
          recycleAsyncId(t, e, i = 0) {
            var r;
            if (null != i ? i > 0 : this.delay > 0)
              return super.recycleAsyncId(t, e, i);
            const { actions: o } = t;
            null != e &&
              (null === (r = o[o.length - 1]) || void 0 === r
                ? void 0
                : r.id) !== e &&
              (Ac.clearImmediate(e), (t._scheduled = void 0));
          }
        }
      );
      let SD = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({})),
            n
          );
        })(),
        hU = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({ imports: [cs, at, SD, SD, at] })),
            n
          );
        })(),
        VU = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({ imports: [at, at] })),
            n
          );
        })(),
        $D = (() => {
          class n {
            create(e) {
              return typeof MutationObserver > "u"
                ? null
                : new MutationObserver(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = I({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        HU = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({ providers: [$D] })),
            n
          );
        })(),
        UU = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({ imports: [at, at] })),
            n
          );
        })(),
        bz = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = we({ type: n })),
            (n.ɵinj = be({ imports: [HU, cs, at, Em, f2, UU] })),
            n
          );
        })(),
        vz = (() => {
          class n {
            constructor(e, i) {
              (this.router = e),
                (this.quizService = i),
                (this.selectedAnswer = document.querySelector(".active")),
                (this.next = !0),
                (this.i = 0),
                (this.score = 0);
            }
            ngOnInit() {
              (this.header = document.querySelector(".header")),
                (this.subjectIcon = this.header.children[0]),
                (this.options = document.querySelectorAll(".option")),
                (this.submitBtn = document.querySelector(".submitBtn")),
                (this.questionsData = JSON.parse(
                  localStorage.getItem("questions")
                )),
                (this.questions = this.questionsData[this.i]),
                (this.icon = this.quizService.getIcon()),
                (this.title = this.quizService.getTitle()),
                (this.subjectIcon.children[0].src =
                  "assets/icons/" + this.icon),
                (this.subjectIcon.children[1].innerHTML = this.title),
                console.log(this.subjectIcon.children[0]),
                this.options.forEach((e) => {
                  e.addEventListener("click", (i) => {
                    this.submitBtn?.removeAttribute("disabled"),
                      this.options.forEach(function (r) {
                        r.classList.remove("active");
                      }),
                      (this.selectedAnswer = i.target.parentNode),
                      this.selectedAnswer?.classList.add("active");
                  });
                }),
                this.submitBtn?.addEventListener("click", () => {
                  (this.correctAnswerIndex = this.getCorrectAnswerIndex()),
                    this.checkAnswer(
                      this.correctAnswerIndex,
                      this.selectedAnswer
                    );
                });
            }
            nextQuestion(e) {
              this.i < 9
                ? ((this.i += 1), (this.questions = this.questionsData[this.i]))
                : 9 == this.i && this.router.navigate(["score"]);
            }
            checkAnswer(e, i) {
              "Submit Answer" == this.submitBtn?.innerHTML
                ? (i.children[1].id == e
                    ? (i.classList.add("correct"),
                      (this.score += 1),
                      this.quizService.setScore(this.score))
                    : (i.classList.add("wrong"),
                      document
                        .querySelector(".options")
                        ?.children[e].classList.add("correct")),
                  (this.submitBtn.innerHTML = "Next Question"))
                : this.i < 9
                ? ((this.submitBtn.innerHTML = "Submit Answer"),
                  this.submitBtn.setAttribute("disabled", ""),
                  (this.i += 1),
                  (this.questions = this.questionsData[this.i]),
                  this.restartQuiz())
                : 9 == this.i
                ? this.router.navigate(["score"])
                : 8 == this.i && (this.submitBtn.innerHTML = "Submit Quiz");
            }
            increaseScore(e) {}
            getCorrectAnswerIndex() {
              let e;
              for (let i = 0; i < this.questions.options.length; i++)
                this.questions.answer == this.questions.options[i] && (e = i);
              return e;
            }
            restartQuiz() {
              this.options.forEach((e) => {
                this.options.forEach(function (i) {
                  i.classList.remove("active"),
                    i.classList.remove("correct"),
                    i.classList.remove("wrong");
                });
              });
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || n)(_(lt), _(jl));
            });
            static #t = (this.ɵcmp = On({
              type: n,
              selectors: [["app-quiz"]],
              decls: 38,
              vars: 6,
              consts: [
                [1, "main"],
                [1, "question"],
                [1, "optionsSection"],
                [1, "options"],
                [1, "option"],
                ["type", "radio", "id", "0", "autocomplete", "off"],
                ["for", "answer_a"],
                ["type", "radio", "id", "1", "autocomplete", "off"],
                ["for", "answer_b"],
                ["type", "radio", "id", "2", "autocomplete", "off"],
                ["for", "answer_c"],
                ["type", "radio", "id", "3", "autocomplete", "off"],
                ["for", "answer_d"],
                ["disabled", "", 1, "submitBtn"],
              ],
              template: function (i, r) {
                1 & i &&
                  (B(0, "div", 0)(1, "div", 1)(2, "h1"),
                  Ce(3),
                  z(),
                  B(4, "b"),
                  Ce(5),
                  z()(),
                  B(6, "div", 2)(7, "div", 3)(8, "div", 4)(9, "b"),
                  Ce(10, "A"),
                  z(),
                  de(11, "input", 5),
                  B(12, "label", 6),
                  Ce(13),
                  z(),
                  de(14, "img"),
                  z(),
                  B(15, "div", 4)(16, "b"),
                  Ce(17, "B"),
                  z(),
                  de(18, "input", 7),
                  B(19, "label", 8),
                  Ce(20),
                  z(),
                  de(21, "img"),
                  z(),
                  B(22, "div", 4)(23, "b"),
                  Ce(24, "C"),
                  z(),
                  de(25, "input", 9),
                  B(26, "label", 10),
                  Ce(27),
                  z(),
                  de(28, "img"),
                  z(),
                  B(29, "div", 4)(30, "b"),
                  Ce(31, "D"),
                  z(),
                  de(32, "input", 11),
                  B(33, "label", 12),
                  Ce(34),
                  z(),
                  de(35, "img"),
                  z()(),
                  B(36, "button", 13),
                  Ce(37, "Submit Answer"),
                  z()()()),
                  2 & i &&
                    (ce(3),
                    Ko("Question ", r.i + 1, " of 10"),
                    ce(2),
                    xn(r.questions.question),
                    ce(8),
                    xn(r.questions.options[0]),
                    ce(7),
                    xn(r.questions.options[1]),
                    ce(7),
                    xn(r.questions.options[2]),
                    ce(7),
                    xn(r.questions.options[3]));
              },
              styles: [
                ".main[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.main[_ngcontent-%COMP%]   .question[_ngcontent-%COMP%]{margin-top:2rem}.main[_ngcontent-%COMP%]   .question[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{margin:0 2rem 0 0;letter-spacing:3px}.main[_ngcontent-%COMP%]   .question[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{align-self:baseline}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:1rem;border-color:transparent;padding:1.2rem 0;border-radius:15px;text-align:center;transition:all .2s ease-in-out;cursor:pointer;outline:none;font-weight:300;display:block}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]{margin-bottom:1rem;border-color:transparent;padding:1.2rem 0;border-radius:15px;text-align:center;transition:all .2s ease-in-out;cursor:pointer;outline:none;font-weight:300;display:block;display:flex;align-items:baseline;justify-content:flex-start}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{visibility:hidden}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:#626c7f;padding:.8rem;border-radius:8px;margin:0 .5rem;background-color:#f4f6fa}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.5rem}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-right:0;align-self:center}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .submitBtn[_ngcontent-%COMP%]{background-color:#7986cb;text-align:center}@media screen and (max-width: 768px){.main[_ngcontent-%COMP%]{flex-direction:column;width:100%}.main[_ngcontent-%COMP%]   .question[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:5vw}.main[_ngcontent-%COMP%]   .question[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{font-size:4.5vw;line-height:2rem}.main[_ngcontent-%COMP%]   .question[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:2.5vw}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]{margin-top:1rem}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]{margin:.5rem}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]{font-size:5vw}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:5vw;font-weight:500}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]:hover{border:solid 2px;border-color:#7986cb;color:#7986cb}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]:hover   b[_ngcontent-%COMP%]{background-color:#7a88cc80}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .disabled[_ngcontent-%COMP%]{cursor:not-allowed}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .correct[_ngcontent-%COMP%]{border-color:green}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .correct[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{background-color:green}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .correct[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{content:url(icon-correct.b0c1a3e60ac157da.svg)}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]{border:solid 2px;border-color:#7986cb;color:#7986cb}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{background-color:#7a88cc80}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .wrong[_ngcontent-%COMP%]{border-color:red}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .wrong[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{background-color:red}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .wrong[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{content:url(icon-error.b2f3f223276066cd.svg)}}@media screen and (min-width: 770px){.main[_ngcontent-%COMP%]{margin:4rem}.main[_ngcontent-%COMP%]   .question[_ngcontent-%COMP%]{width:45%}.main[_ngcontent-%COMP%]   .question[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-bottom:2rem}.main[_ngcontent-%COMP%]   .question[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{font-size:2rem;width:70%;line-height:2.5rem}.main[_ngcontent-%COMP%]   .question[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.5rem}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]{width:50%}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:90%;font-size:1.7rem}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]{margin:.5rem}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]{width:90%;font-size:1.7rem}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:1.7rem;font-weight:500}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]:hover{border:solid 2px;border-color:#7986cb;color:#7986cb}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]:hover   b[_ngcontent-%COMP%]{background-color:#7a88cc80}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .disabled[_ngcontent-%COMP%]{cursor:not-allowed}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .correct[_ngcontent-%COMP%]{border-color:green}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .correct[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{background-color:green}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .correct[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{content:url(icon-correct.b0c1a3e60ac157da.svg)}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]{border:solid 2px;border-color:#7986cb;color:#7986cb}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{background-color:#7a88cc80}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .wrong[_ngcontent-%COMP%]{border-color:red}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .wrong[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{background-color:red}.main[_ngcontent-%COMP%]   .optionsSection[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   .wrong[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{content:url(icon-error.b2f3f223276066cd.svg)}}",
              ],
            }));
          }
          return n;
        })();
      function yz(n, t) {
        if (1 & n) {
          const e = (function mb() {
            return w();
          })();
          B(0, "div", 4)(1, "button", 5),
            Ve("click", function (r) {
              const s = (function Bp(n) {
                return (H.lFrame.contextLView = n), n[Re];
              })(e).index;
              return (function jp(n) {
                return (H.lFrame.contextLView = null), n;
              })(vn().getQuizQuestions(r, s));
            }),
            de(2, "img", 6),
            B(3, "b"),
            Ce(4),
            z()()();
        }
        if (2 & n) {
          const e = t.$implicit;
          ce(2),
            qa("src", "../../assets/icons/", e.icon, "", Ta),
            ce(2),
            xn(e.title);
        }
      }
      const wz = [
        {
          path: "",
          component: (() => {
            class n {
              constructor(e, i) {
                (this.router = e),
                  (this.quizService = i),
                  (this.data = Sm.quizzes);
              }
              getQuizQuestions(e, i) {
                this.quizService.setSubjectQuestions(i),
                  this.router.navigate(["quiz"]);
              }
              toggleDarkTheme() {
                document.body.classList.toggle("dark-theme");
              }
              static #e = (this.ɵfac = function (i) {
                return new (i || n)(_(lt), _(jl));
              });
              static #t = (this.ɵcmp = On({
                type: n,
                selectors: [["app-welcome"]],
                decls: 10,
                vars: 1,
                consts: [
                  [1, "main"],
                  [1, "welcome"],
                  [1, "subjects"],
                  ["class", "buttons", 4, "ngFor", "ngForOf"],
                  [1, "buttons"],
                  [3, "click"],
                  ["alt", "quiz icon", "routerLink", "quiz", 3, "src"],
                ],
                template: function (i, r) {
                  1 & i &&
                    (B(0, "div", 0)(1, "div", 1)(2, "h2"),
                    Ce(3, "Welcome to the "),
                    B(4, "b"),
                    Ce(5, "Frontend Quiz!"),
                    z()(),
                    B(6, "em"),
                    Ce(7, "Pick a subject to get started."),
                    z()(),
                    B(8, "div", 2),
                    (function Ye(n, t, e, i, r, o, s, a) {
                      const l = w(),
                        c = J(),
                        d = n + ye,
                        u = c.firstCreatePass
                          ? (function OT(n, t, e, i, r, o, s, a, l) {
                              const c = t.consts,
                                d = Ir(t, n, 4, s || null, oi(c, a));
                              wu(t, e, d, oi(c, l)), ua(t, d);
                              const u = (d.tView = yu(
                                2,
                                d,
                                i,
                                r,
                                o,
                                t.directiveRegistry,
                                t.pipeRegistry,
                                null,
                                t.schemas,
                                c
                              ));
                              return (
                                null !== t.queries &&
                                  (t.queries.template(t, d),
                                  (u.queries = t.queries.embeddedTView(d))),
                                d
                              );
                            })(d, c, l, t, e, i, r, o, s)
                          : c.data[d];
                      fn(u, !1);
                      const h = l[K].createComment("");
                      Da(c, l, h, u),
                        ot(h, l),
                        La(l, (l[d] = G_(h, l, h, u))),
                        la(u) && bu(c, l, u),
                        null != s && vu(l, u, a);
                    })(9, yz, 5, 2, "div", 3),
                    z()()),
                    2 & i && (ce(9), Le("ngForOf", r.data));
                },
                dependencies: [dw, dc],
                styles: [
                  "@media screen and (max-width: 768px){.main[_ngcontent-%COMP%]{display:flex;justify-content:space-between;flex-direction:column;margin:4rem 0;height:60%}.main[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]{width:100%}.main[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:2.5rem;margin-top:1rem;margin-bottom:2rem;line-height:3rem;font-weight:100}.main[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:1.2rem}.main[_ngcontent-%COMP%]   .subjects[_ngcontent-%COMP%]{margin-top:2rem;display:flex;flex-direction:column;width:100%}.main[_ngcontent-%COMP%]   .subjects[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-start;width:100%;margin-bottom:1rem;border:none;padding:1.5rem 0;border-radius:15px;text-align:center;transition:all .2s ease-in-out;cursor:pointer;outline:none;font-size:1.7rem;font-weight:300}.main[_ngcontent-%COMP%]   .subjects[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin:0 1rem}}@media screen and (min-width: 770px){.main[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin:8rem 3rem 3rem;height:60%}.main[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]{width:50%}.main[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:4rem;margin-top:1rem;margin-bottom:3rem;line-height:4rem;font-weight:100}.main[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:1.5rem}.main[_ngcontent-%COMP%]   .subjects[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:50%}.main[_ngcontent-%COMP%]   .subjects[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-start;width:90%;margin-bottom:1rem;border:none;padding:1.2rem 0;border-radius:15px;text-align:center;transition:all .2s ease-in-out;cursor:pointer;outline:none;font-size:1.7rem;font-weight:300}.main[_ngcontent-%COMP%]   .subjects[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin:0 1rem}}",
                ],
              }));
            }
            return n;
          })(),
        },
        { path: "quiz", component: vz },
        {
          path: "score",
          component: (() => {
            class n {
              constructor(e, i) {
                (this.quizService = e), (this.router = i);
              }
              ngOnInit() {
                (this.score = this.quizService.getScore()),
                  (this.title = this.quizService.getTitle()),
                  (this.icon = this.quizService.getIcon());
              }
              playAgain() {
                this.router.navigate(["/"]);
              }
              static #e = (this.ɵfac = function (i) {
                return new (i || n)(_(jl), _(lt));
              });
              static #t = (this.ɵcmp = On({
                type: n,
                selectors: [["app-score"]],
                decls: 17,
                vars: 3,
                consts: [
                  [1, "main"],
                  [1, "left"],
                  [1, "right"],
                  [1, "scoreCard"],
                  [1, "icon"],
                  ["alt", "quiz icon", 3, "src"],
                  [1, "playAgain", 3, "click"],
                ],
                template: function (i, r) {
                  1 & i &&
                    (B(0, "div", 0)(1, "div", 1)(2, "p"),
                    Ce(3, "Quiz completed"),
                    z(),
                    B(4, "b"),
                    Ce(5, "You scored..."),
                    z()(),
                    B(6, "div", 2)(7, "div", 3)(8, "div", 4),
                    de(9, "img", 5),
                    Ce(10),
                    z(),
                    B(11, "b"),
                    Ce(12),
                    z(),
                    B(13, "p"),
                    Ce(14, "out of 10"),
                    z()(),
                    B(15, "button", 6),
                    Ve("click", function () {
                      return r.playAgain();
                    }),
                    Ce(16, "Play Again"),
                    z()()()),
                    2 & i &&
                      (ce(9),
                      Ou("src", "assets/icons/" + r.icon, Ta),
                      ce(1),
                      Ko(" ", r.title, " "),
                      ce(2),
                      xn(r.score));
                },
                styles: [
                  "@media screen and (max-width: 768px){.main[_ngcontent-%COMP%]{margin:4rem 1rem;display:flex;flex-direction:column;justify-content:space-between;width:100%}.main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{font-size:12vw}.main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:15vw;line-height:3rem}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]{margin-top:2rem;width:90%;height:auto}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   .scoreCard[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;width:100%;border-radius:8px}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   .scoreCard[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{padding:1rem;font-size:1rem;display:flex;align-items:center}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   .scoreCard[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{font-size:9rem;align-self:center;margin:3rem 0}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   .scoreCard[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:3rem;align-self:center;margin:5rem 0 2rem}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;margin:1rem 0;border-color:transparent;padding:1.2rem 0;border-radius:15px;text-align:center;transition:all .2s ease-in-out;cursor:pointer;outline:none;font-size:1.7rem;font-weight:300;display:block}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:gray;cursor:pointer}}@media screen and (min-width: 770px){.main[_ngcontent-%COMP%]{margin:6rem 4rem;display:flex;justify-content:space-between}.main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]{width:50%}.main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{font-size:4rem}.main[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:3rem}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]{width:40%;height:auto;margin-left:5rem}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   .scoreCard[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;width:100%;border-radius:8px}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   .scoreCard[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{padding:1rem;font-size:1rem;display:flex;align-items:center}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   .scoreCard[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{font-size:9rem;align-self:center;margin:3rem 0}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   .scoreCard[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:3rem;align-self:center;margin:5rem 0 2rem}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;margin:1rem 0;border-color:transparent;padding:1.2rem 0;border-radius:15px;text-align:center;transition:all .2s ease-in-out;cursor:pointer;outline:none;font-size:1.7rem;font-weight:300;display:block}.main[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:gray;cursor:pointer}}",
                ],
              }));
            }
            return n;
          })(),
        },
      ];
      let xz = (() => {
          class n {
            static #e = (this.ɵfac = function (i) {
              return new (i || n)();
            });
            static #t = (this.ɵmod = we({ type: n }));
            static #n = (this.ɵinj = be({ imports: [cs, rf.forRoot(wz), rf] }));
          }
          return n;
        })(),
        Cz = (() => {
          class n {
            static #e = (this.ɵfac = function (i) {
              return new (i || n)();
            });
            static #t = (this.ɵmod = we({ type: n, bootstrap: [QB] }));
            static #n = (this.ɵinj = be({
              imports: [jw, ZH, RL, YH, eU, hU, VU, bz, D2, xz, rf],
            }));
          }
          return n;
        })();
      VP()
        .bootstrapModule(Cz)
        .catch((n) => console.error(n));
    },
  },
  (fe) => {
    fe((fe.s = 99));
  },
]);
