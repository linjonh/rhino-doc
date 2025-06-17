---
title: Rhino 1.7.10
parent: Releases
nav_order: 23
---

# Rhino 1.7.10


This release fixes a [regression](https://github.com/mozilla/rhino/issues/415) introduced in version 1.7.7.2 that caused the `propertyIsEnumerable` to throw an exception when used with String and typed array objects, and possibly with custom user-written objects as well.

It contains a few other fixes:

Attila Szegedi (2):
- Make as many CallFrame fields as possible final, initialize them in constructor
- `frame.debuggerFrame != null || frame.idata.itsNeedActivation` is identical to frame.useActivation.

Jeremy Whitlock (1):
- Missing properties are not enumerable when checking enumerability