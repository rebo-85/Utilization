const _0x279a47 = _0x8daf;
(function (_0x417d74, _0x2c06db) {
  const _0x3698f0 = _0x8daf,
    _0x30ab0d = _0x417d74();
  while (!![]) {
    try {
      const _0x179b0b =
        parseInt(_0x3698f0(0xa5)) / 0x1 +
        parseInt(_0x3698f0(0xb2)) / 0x2 +
        (parseInt(_0x3698f0(0x6d)) / 0x3) * (-parseInt(_0x3698f0(0x75)) / 0x4) +
        parseInt(_0x3698f0(0x8e)) / 0x5 +
        -parseInt(_0x3698f0(0x80)) / 0x6 +
        (parseInt(_0x3698f0(0xb1)) / 0x7) * (parseInt(_0x3698f0(0x95)) / 0x8) +
        -parseInt(_0x3698f0(0x7b)) / 0x9;
      if (_0x179b0b === _0x2c06db) break;
      else _0x30ab0d["push"](_0x30ab0d["shift"]());
    } catch (_0x4a4ad3) {
      _0x30ab0d["push"](_0x30ab0d["shift"]());
    }
  }
})(_0x4a3f, 0x5a0f6);
import { system, world, ScriptEventSource, Player, Entity } from "@minecraft/server";
function _0x8daf(_0x39ef2f, _0x32a024) {
  const _0x4a3f17 = _0x4a3f();
  return (
    (_0x8daf = function (_0x8daf0f, _0x309875) {
      _0x8daf0f = _0x8daf0f - 0x6b;
      let _0x1b063e = _0x4a3f17[_0x8daf0f];
      return _0x1b063e;
    }),
    _0x8daf(_0x39ef2f, _0x32a024)
  );
}

const content = {
  "positions": [
    {
      "data_points": {
        "x": -5.0625,
        "y": 1.0575,
        "z": -9.7
      },
      "channel": "position",
      "time": 0,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": -5.0625,
        "y": 1.0575,
        "z": -10.515625
      },
      "channel": "position",
      "time": 2.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": -5.0625,
        "y": 1.0575,
        "z": -10.575
      },
      "channel": "position",
      "time": 2.2,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": 1.1875,
        "y": 1.995,
        "z": -9.393749999999999
      },
      "channel": "position",
      "time": 2.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.891875,
        "y": 2.124375,
        "z": 5.54375
      },
      "channel": "position",
      "time": 4.5,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": 0.125,
        "y": 1.495,
        "z": 8.6125
      },
      "channel": "position",
      "time": 4.55,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.07937499999999997,
        "y": 1.563125,
        "z": 12.703125
      },
      "channel": "position",
      "time": 5.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0,
        "y": 1.6825,
        "z": 12.9875
      },
      "channel": "position",
      "time": 6.45,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": 0.1627883095562499,
        "y": 0.9763233892625001,
        "z": 12.745352922293751
      },
      "channel": "position",
      "time": 6.5,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.16640770843749997,
        "y": 1.0375171156187502,
        "z": 12.6798616801
      },
      "channel": "position",
      "time": 8.9,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": 1.251875,
        "y": 1.12,
        "z": 10.601875000000001
      },
      "channel": "position",
      "time": 8.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.226875,
        "y": 1.12,
        "z": 10.926875
      },
      "channel": "position",
      "time": 15.55,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.1081250000000002,
        "z": 4.299375
      },
      "channel": "position",
      "time": 15.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.12125,
        "z": 4.208125
      },
      "channel": "position",
      "time": 15.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.13125,
        "z": 4.119375
      },
      "channel": "position",
      "time": 15.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.1425,
        "z": 3.9918750000000003
      },
      "channel": "position",
      "time": 15.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.148125,
        "z": 3.9106250000000005
      },
      "channel": "position",
      "time": 16.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.1525,
        "z": 3.7943749999999996
      },
      "channel": "position",
      "time": 16.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.15375,
        "z": 3.68375
      },
      "channel": "position",
      "time": 16.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.15375,
        "z": 3.613125
      },
      "channel": "position",
      "time": 16.45,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.151875,
        "z": 3.511875
      },
      "channel": "position",
      "time": 16.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.1500000000000001,
        "z": 3.4475
      },
      "channel": "position",
      "time": 16.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.146875,
        "z": 3.355625
      },
      "channel": "position",
      "time": 16.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.145,
        "z": 3.2975000000000003
      },
      "channel": "position",
      "time": 16.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.14375,
        "z": 3.24125
      },
      "channel": "position",
      "time": 17.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.1425,
        "z": 3.16125
      },
      "channel": "position",
      "time": 17.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.14375,
        "z": 3.0856250000000003
      },
      "channel": "position",
      "time": 17.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.149375,
        "z": 2.9918750000000003
      },
      "channel": "position",
      "time": 17.55,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.155,
        "z": 2.948125
      },
      "channel": "position",
      "time": 17.65,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.1675,
        "z": 2.885
      },
      "channel": "position",
      "time": 17.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.185,
        "z": 2.82625
      },
      "channel": "position",
      "time": 17.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.2081250000000001,
        "z": 2.77125
      },
      "channel": "position",
      "time": 18.1,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.2175,
        "z": 2.75375
      },
      "channel": "position",
      "time": 18.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.23875,
        "z": 2.7193750000000003
      },
      "channel": "position",
      "time": 18.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.263125,
        "z": 2.686875
      },
      "channel": "position",
      "time": 18.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.2912500000000002,
        "z": 2.655625
      },
      "channel": "position",
      "time": 18.45,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.323125,
        "z": 2.6256250000000003
      },
      "channel": "position",
      "time": 18.55,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.3587500000000001,
        "z": 2.596875
      },
      "channel": "position",
      "time": 18.65,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.3787500000000001,
        "z": 2.5825
      },
      "channel": "position",
      "time": 18.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.4212500000000001,
        "z": 2.555625
      },
      "channel": "position",
      "time": 18.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.44375,
        "z": 2.5425
      },
      "channel": "position",
      "time": 18.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.4681250000000001,
        "z": 2.5300000000000002
      },
      "channel": "position",
      "time": 18.9,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.52,
        "z": 2.505
      },
      "channel": "position",
      "time": 19,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.5775000000000001,
        "z": 2.48125
      },
      "channel": "position",
      "time": 19.1,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.6075000000000002,
        "z": 2.4693750000000003
      },
      "channel": "position",
      "time": 19.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.639375,
        "z": 2.458125
      },
      "channel": "position",
      "time": 19.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.7075,
        "z": 2.435625
      },
      "channel": "position",
      "time": 19.3,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.7437500000000001,
        "z": 2.425
      },
      "channel": "position",
      "time": 19.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.78125,
        "z": 2.4143749999999997
      },
      "channel": "position",
      "time": 19.4,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.86125,
        "z": 2.39375
      },
      "channel": "position",
      "time": 19.5,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 1.9475000000000002,
        "z": 2.3737500000000002
      },
      "channel": "position",
      "time": 19.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 2.04,
        "z": 2.354375
      },
      "channel": "position",
      "time": 19.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 2.08875,
        "z": 2.3449999999999998
      },
      "channel": "position",
      "time": 19.75,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 2.1393750000000002,
        "z": 2.3356250000000003
      },
      "channel": "position",
      "time": 19.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 2.245625,
        "z": 2.3175
      },
      "channel": "position",
      "time": 19.9,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 2.359375,
        "z": 2.299375
      },
      "channel": "position",
      "time": 20,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 2.40375,
        "z": 2.29375
      },
      "channel": "position",
      "time": 20.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.3525,
        "y": 2.45,
        "z": 2.2887500000000003
      },
      "channel": "position",
      "time": 20.1,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.35375,
        "y": 2.4987500000000002,
        "z": 2.285625
      },
      "channel": "position",
      "time": 20.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.355,
        "y": 2.5500000000000003,
        "z": 2.283125
      },
      "channel": "position",
      "time": 20.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.35625,
        "y": 2.6037500000000002,
        "z": 2.2825
      },
      "channel": "position",
      "time": 20.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.358125,
        "y": 2.659375,
        "z": 2.2825
      },
      "channel": "position",
      "time": 20.3,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.360625,
        "y": 2.716875,
        "z": 2.28375
      },
      "channel": "position",
      "time": 20.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.3631250000000001,
        "y": 2.7768750000000004,
        "z": 2.28625
      },
      "channel": "position",
      "time": 20.4,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.36625,
        "y": 2.83875,
        "z": 2.29
      },
      "channel": "position",
      "time": 20.45,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.3725,
        "y": 2.96875,
        "z": 2.3
      },
      "channel": "position",
      "time": 20.55,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.380625,
        "y": 3.10625,
        "z": 2.3137499999999998
      },
      "channel": "position",
      "time": 20.65,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.384375,
        "y": 3.1775,
        "z": 2.3218750000000004
      },
      "channel": "position",
      "time": 20.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.38875,
        "y": 3.25125,
        "z": 2.33125
      },
      "channel": "position",
      "time": 20.75,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.39375,
        "y": 3.32625,
        "z": 2.341875
      },
      "channel": "position",
      "time": 20.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.39875,
        "y": 3.4025,
        "z": 2.3525
      },
      "channel": "position",
      "time": 20.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.409375,
        "y": 3.5612500000000002,
        "z": 2.376875
      },
      "channel": "position",
      "time": 20.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.415,
        "y": 3.6425,
        "z": 2.390625
      },
      "channel": "position",
      "time": 21,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.420625,
        "y": 3.725625,
        "z": 2.404375
      },
      "channel": "position",
      "time": 21.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.4325,
        "y": 3.895625,
        "z": 2.435
      },
      "channel": "position",
      "time": 21.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.43875,
        "y": 3.9825,
        "z": 2.450625
      },
      "channel": "position",
      "time": 21.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.451875,
        "y": 4.160625,
        "z": 2.4850000000000003
      },
      "channel": "position",
      "time": 21.3,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.45875,
        "y": 4.251250000000001,
        "z": 2.503125
      },
      "channel": "position",
      "time": 21.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.479375,
        "y": 4.530625000000001,
        "z": 2.559375
      },
      "channel": "position",
      "time": 21.5,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.49375,
        "y": 4.721875000000001,
        "z": 2.6
      },
      "channel": "position",
      "time": 21.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.5081250000000002,
        "y": 4.9175,
        "z": 2.6412500000000003
      },
      "channel": "position",
      "time": 21.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.5306250000000001,
        "y": 5.215625,
        "z": 2.70625
      },
      "channel": "position",
      "time": 21.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.553125,
        "y": 5.520625,
        "z": 2.7737499999999997
      },
      "channel": "position",
      "time": 22,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.58375,
        "y": 5.934375,
        "z": 2.865625
      },
      "channel": "position",
      "time": 22.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.6131250000000001,
        "y": 6.35375,
        "z": 2.95875
      },
      "channel": "position",
      "time": 22.4,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.648125,
        "y": 6.881875,
        "z": 3.07375
      },
      "channel": "position",
      "time": 22.65,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.67375,
        "y": 7.3025,
        "z": 3.161875
      },
      "channel": "position",
      "time": 22.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.6975,
        "y": 7.719375,
        "z": 3.245625
      },
      "channel": "position",
      "time": 23.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.708125,
        "y": 7.925625,
        "z": 3.285
      },
      "channel": "position",
      "time": 23.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.7175,
        "y": 8.129375,
        "z": 3.3218750000000004
      },
      "channel": "position",
      "time": 23.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.72625,
        "y": 8.330625000000001,
        "z": 3.3575
      },
      "channel": "position",
      "time": 23.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.7337500000000001,
        "y": 8.52875,
        "z": 3.390625
      },
      "channel": "position",
      "time": 23.45,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.7375,
        "y": 8.626875,
        "z": 3.4056249999999997
      },
      "channel": "position",
      "time": 23.5,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.74375,
        "y": 8.82,
        "z": 3.4349999999999996
      },
      "channel": "position",
      "time": 23.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.748125,
        "y": 9.009375,
        "z": 3.4606250000000003
      },
      "channel": "position",
      "time": 23.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.751875,
        "y": 9.194375,
        "z": 3.4837499999999997
      },
      "channel": "position",
      "time": 23.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.753125,
        "y": 9.285,
        "z": 3.4937500000000004
      },
      "channel": "position",
      "time": 23.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.754375,
        "y": 9.4625,
        "z": 3.511875
      },
      "channel": "position",
      "time": 23.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.755,
        "y": 9.55,
        "z": 3.519375
      },
      "channel": "position",
      "time": 24,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.75375,
        "y": 9.719999999999999,
        "z": 3.53125
      },
      "channel": "position",
      "time": 24.1,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.751875,
        "y": 9.88375,
        "z": 3.5393749999999997
      },
      "channel": "position",
      "time": 24.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.75,
        "y": 9.963750000000001,
        "z": 3.541875
      },
      "channel": "position",
      "time": 24.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.745,
        "y": 10.118749999999999,
        "z": 3.54375
      },
      "channel": "position",
      "time": 24.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.741875,
        "y": 10.193750000000001,
        "z": 3.5425000000000004
      },
      "channel": "position",
      "time": 24.4,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.7381250000000001,
        "y": 10.266874999999999,
        "z": 3.5406250000000004
      },
      "channel": "position",
      "time": 24.45,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.734375,
        "y": 10.338125000000002,
        "z": 3.536875
      },
      "channel": "position",
      "time": 24.5,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.725,
        "y": 10.475625,
        "z": 3.5268750000000004
      },
      "channel": "position",
      "time": 24.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.7193749999999999,
        "y": 10.541250000000002,
        "z": 3.519375
      },
      "channel": "position",
      "time": 24.65,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.71375,
        "y": 10.605,
        "z": 3.5112500000000004
      },
      "channel": "position",
      "time": 24.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.7068750000000001,
        "y": 10.666875000000001,
        "z": 3.5012499999999998
      },
      "channel": "position",
      "time": 24.75,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.7,
        "y": 10.726875,
        "z": 3.4906249999999996
      },
      "channel": "position",
      "time": 24.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.6925,
        "y": 10.784375,
        "z": 3.4775
      },
      "channel": "position",
      "time": 24.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.684375,
        "y": 10.84,
        "z": 3.46375
      },
      "channel": "position",
      "time": 24.9,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.6756250000000001,
        "y": 10.893125000000001,
        "z": 3.448125
      },
      "channel": "position",
      "time": 24.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.666875,
        "y": 10.944375,
        "z": 3.4312500000000004
      },
      "channel": "position",
      "time": 25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.6568749999999999,
        "y": 10.993125,
        "z": 3.413125
      },
      "channel": "position",
      "time": 25.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.646875,
        "y": 11.039375,
        "z": 3.3931250000000004
      },
      "channel": "position",
      "time": 25.1,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.635625,
        "y": 11.083124999999999,
        "z": 3.37125
      },
      "channel": "position",
      "time": 25.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.6243750000000001,
        "y": 11.125,
        "z": 3.3481250000000005
      },
      "channel": "position",
      "time": 25.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.611875,
        "y": 11.164375,
        "z": 3.3237500000000004
      },
      "channel": "position",
      "time": 25.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.599375,
        "y": 11.200624999999999,
        "z": 3.296875
      },
      "channel": "position",
      "time": 25.3,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.58625,
        "y": 11.234375,
        "z": 3.26875
      },
      "channel": "position",
      "time": 25.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.571875,
        "y": 11.26625,
        "z": 3.23875
      },
      "channel": "position",
      "time": 25.4,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.5575,
        "y": 11.295000000000002,
        "z": 3.2075
      },
      "channel": "position",
      "time": 25.45,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.5425,
        "y": 11.320625,
        "z": 3.17375
      },
      "channel": "position",
      "time": 25.5,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.52625,
        "y": 11.34375,
        "z": 3.13875
      },
      "channel": "position",
      "time": 25.55,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.51,
        "y": 11.364374999999999,
        "z": 3.1018749999999997
      },
      "channel": "position",
      "time": 25.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.4925,
        "y": 11.381875,
        "z": 3.0631250000000003
      },
      "channel": "position",
      "time": 25.65,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.474375,
        "y": 11.396249999999998,
        "z": 3.0225
      },
      "channel": "position",
      "time": 25.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.45625,
        "y": 11.408125000000002,
        "z": 2.98
      },
      "channel": "position",
      "time": 25.75,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.4368750000000001,
        "y": 11.416875000000001,
        "z": 2.935
      },
      "channel": "position",
      "time": 25.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.41625,
        "y": 11.4225,
        "z": 2.88875
      },
      "channel": "position",
      "time": 25.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.395625,
        "y": 11.425,
        "z": 2.84
      },
      "channel": "position",
      "time": 25.9,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.3743750000000001,
        "y": 11.424375000000001,
        "z": 2.7893749999999997
      },
      "channel": "position",
      "time": 25.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.351875,
        "y": 11.420625000000001,
        "z": 2.736875
      },
      "channel": "position",
      "time": 26,
      "interpolation": "linear"
    }
  ],
  "rotations": [
    {
      "data_points": {
        "x": 0,
        "y": -90,
        "z": 0
      },
      "channel": "rotation",
      "time": 2.2,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": 17.5,
        "y": 0,
        "z": 0
      },
      "channel": "rotation",
      "time": 2.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 8.84,
        "y": 0,
        "z": 0
      },
      "channel": "rotation",
      "time": 4.5,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": 0,
        "y": -90,
        "z": 0
      },
      "channel": "rotation",
      "time": 4.55,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0,
        "y": -90,
        "z": 0
      },
      "channel": "rotation",
      "time": 5.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 7.5,
        "y": -90,
        "z": null
      },
      "channel": "rotation",
      "time": 5.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 10,
        "y": -90,
        "z": 0
      },
      "channel": "rotation",
      "time": 5.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0,
        "y": -90,
        "z": 0
      },
      "channel": "rotation",
      "time": 5.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0,
        "y": -90,
        "z": 0
      },
      "channel": "rotation",
      "time": 6.45,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": 12.5,
        "y": -135,
        "z": 0
      },
      "channel": "rotation",
      "time": 6.5,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 12.5,
        "y": -135,
        "z": 0
      },
      "channel": "rotation",
      "time": 8.9,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0,
        "y": 0,
        "z": 0
      },
      "channel": "rotation",
      "time": 8.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": -48.1,
        "y": -5,
        "z": 0
      },
      "channel": "rotation",
      "time": 15.55,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": -5,
        "y": 0,
        "z": 0
      },
      "channel": "rotation",
      "time": 15.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 2.5,
        "y": 0,
        "z": 0
      },
      "channel": "rotation",
      "time": 20.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": -5,
        "y": 0,
        "z": 0
      },
      "channel": "rotation",
      "time": 26,
      "interpolation": "linear"
    }
  ],
  "times": [
    0,
    2.05,
    2.2,
    2.25,
    4.5,
    4.55,
    5.15,
    5.2,
    5.25,
    5.35,
    5.6,
    6.45,
    6.5,
    8.9,
    8.95,
    15.55,
    15.6,
    15.7,
    15.8,
    15.95,
    16.05,
    16.2,
    16.35,
    16.45,
    16.6,
    16.7,
    16.85,
    16.95,
    17.05,
    17.2,
    17.35,
    17.55,
    17.65,
    17.8,
    17.95,
    18.1,
    18.15,
    18.25,
    18.35,
    18.45,
    18.55,
    18.65,
    18.7,
    18.8,
    18.85,
    18.9,
    19,
    19.1,
    19.15,
    19.2,
    19.3,
    19.35,
    19.4,
    19.5,
    19.6,
    19.7,
    19.75,
    19.8,
    19.9,
    20,
    20.05,
    20.1,
    20.15,
    20.2,
    20.25,
    20.3,
    20.35,
    20.4,
    20.45,
    20.55,
    20.65,
    20.7,
    20.75,
    20.8,
    20.85,
    20.95,
    21,
    21.05,
    21.15,
    21.2,
    21.3,
    21.35,
    21.5,
    21.6,
    21.7,
    21.85,
    22,
    22.2,
    22.4,
    22.65,
    22.85,
    23.05,
    23.15,
    23.25,
    23.35,
    23.45,
    23.5,
    23.6,
    23.7,
    23.8,
    23.85,
    23.95,
    24,
    24.1,
    24.2,
    24.25,
    24.35,
    24.4,
    24.45,
    24.5,
    24.6,
    24.65,
    24.7,
    24.75,
    24.8,
    24.85,
    24.9,
    24.95,
    25,
    25.05,
    25.1,
    25.15,
    25.2,
    25.25,
    25.3,
    25.35,
    25.4,
    25.45,
    25.5,
    25.55,
    25.6,
    25.65,
    25.7,
    25.75,
    25.8,
    25.85,
    25.9,
    25.95,
    26
  ],
  "sceneId": "namespace:scene_name",
  "entityOption": {
    "location": {
      "x": 0,
      "y": 0,
      "z": 0
    },
    "type": "rebo:forest_teaser",
    "closest": 1
  },
  "playerOption": {
    "location": {
      "x": 0,
      "y": 0,
      "z": 0
    },
    "type": "minecraft:player"
  },
  "animationId": "animation.player.forest_teaser_animation"
}; 

function load() {
  const _0x1e8006 = _0x8daf;
  for (const _0x3ce315 of world[_0x1e8006(0xaa)]()) {
    _0x3ce315["commandRun"](
      "camera @s clear",
      _0x1e8006(0x9e),
      "inputpermission set @s camera enabled",
      _0x1e8006(0x8d)
    );
  }
}
function runScene(_0x293bb5) {
  const _0x2f7f2e = _0x8daf,
    { positions: _0x392432, rotations: _0x404c3b } = content,
    _0x2b4501 = _0x293bb5["dimension"],
    _0x4448d6 = _0x2b4501[_0x2f7f2e(0x7a)](content[_0x2f7f2e(0x86)]),
    _0x3983a1 = _0x2b4501["getEntities"](content[_0x2f7f2e(0xb6)]);
  if (_0x3983a1[_0x2f7f2e(0x84)] !== 0x1) {
    world[_0x2f7f2e(0xab)](
      _0x2f7f2e(0x87) +
        content["entityOption"][_0x2f7f2e(0x7f)] +
        "', found " +
        _0x3983a1[_0x2f7f2e(0x84)] +
        ". Skipping scene."
    );
    return;
  }
  const _0x419fac = _0x3983a1[0x0],
    _0x476d43 = new Map();
  for (const _0x582271 of _0x4448d6) {
    _0x476d43[_0x2f7f2e(0x7d)](_0x582271["id"], _0x582271[_0x2f7f2e(0xa0)]),
      _0x582271[_0x2f7f2e(0x9a)](
        "camera @s clear",
        _0x2f7f2e(0x8c),
        _0x2f7f2e(0xb5),
        _0x2f7f2e(0x78),
        _0x2f7f2e(0x9d),
        _0x2f7f2e(0x89)
      ),
      _0x419fac[_0x2f7f2e(0xaf)](content[_0x2f7f2e(0xb3)]);
    let _0x48abf6 = 0x0;
    const _0x4b1c2e = 0x14,
      _0x31153d = system[_0x2f7f2e(0x91)](() => {
        const _0x375276 = _0x2f7f2e;
        _0x48abf6 += 0x1 / _0x4b1c2e;
        const [_0x213c7a, _0x2bfa22] = getKeyframePair(_0x392432, _0x48abf6),
          _0x484043 =
            (_0x48abf6 - _0x213c7a[_0x375276(0x94)]) / (_0x2bfa22[_0x375276(0x94)] - _0x213c7a[_0x375276(0x94)]),
          _0x2b26a4 = applyEasing(Math[_0x375276(0x90)](_0x484043, 0x1), _0x213c7a[_0x375276(0x83)]),
          _0x26e3f0 = _0x419fac["coordinates"],
          _0x5e38cd = new Vector3(_0x213c7a["data_points"])[_0x375276(0x73)](_0x26e3f0),
          _0xf17eba = new Vector3(_0x2bfa22["data_points"])[_0x375276(0x73)](_0x26e3f0),
          _0x4be8e4 =
            _0x213c7a[_0x375276(0x83)] === _0x375276(0x77) ? _0x5e38cd : lerpVector(_0x5e38cd, _0xf17eba, _0x2b26a4),
          [_0x296902, _0x2010d0] = getKeyframePair(_0x404c3b, _0x48abf6),
          _0x130b5f = (_0x48abf6 - _0x296902["time"]) / (_0x2010d0[_0x375276(0x94)] - _0x296902[_0x375276(0x94)]),
          _0x379490 = applyEasing(Math[_0x375276(0x90)](_0x130b5f, 0x1), _0x296902[_0x375276(0x83)]),
          _0x971230 = new Vector2(+_0x296902[_0x375276(0x72)]["x"], +_0x296902[_0x375276(0x72)]["y"]),
          _0x4a8004 = new Vector2(+_0x2010d0["data_points"]["x"], +_0x2010d0["data_points"]["y"]);
        let _0x541572 =
          _0x296902[_0x375276(0x83)] === _0x375276(0x77) ? _0x971230 : lerpVector(_0x971230, _0x4a8004, _0x379490);
        const _0xeaf7 = 0.000001;
        (_0x541572["x"] = Math[_0x375276(0x7c)](_0x541572["x"]) < _0xeaf7 ? 0x0 : _0x541572["x"]),
          (_0x541572["y"] = Math[_0x375276(0x7c)](_0x541572["y"]) < _0xeaf7 ? 0x0 : _0x541572["y"]);
        if (Math[_0x375276(0x7c)](_0x541572["x"]) < _0xeaf7) _0x541572["x"] = 0x0;
        if (Math["abs"](_0x541572["y"]) < _0xeaf7) _0x541572["y"] = 0x0;
        _0x582271[_0x375276(0x93)](_0x4be8e4);
        const _0x5313d7 = (_0x20d486) => {
            const _0x2e17fa = _0x375276,
              _0x57f56e = Number(_0x20d486);
            return _0x57f56e % 0x1 === 0x0 ? _0x57f56e["toFixed"](0x1) : _0x57f56e[_0x2e17fa(0x6b)](0x4);
          },
          _0x5073fa =
            "camera @s set minecraft:free ease 0.05 linear pos " +
            _0x5313d7(_0x4be8e4["x"]) +
            " " +
            _0x5313d7(_0x4be8e4["y"]) +
            " " +
            _0x5313d7(_0x4be8e4["z"]) +
            _0x375276(0x79) +
            _0x541572["x"] +
            " " +
            _0x541572["y"];
        _0x582271[_0x375276(0x81)](_0x5073fa),
          _0x48abf6 > _0x392432["at"](-0x1)[_0x375276(0x94)] &&
            _0x48abf6 > _0x404c3b["at"](-0x1)[_0x375276(0x94)] &&
            system[_0x375276(0xac)](() => {
              const _0x36e20c = _0x375276;
              system[_0x36e20c(0x70)](_0x31153d);
              const _0x40e985 = _0x476d43[_0x36e20c(0x9c)](_0x582271["id"]);
              _0x582271[_0x36e20c(0x9a)](
                "camera @s clear",
                "effect @s invisibility 0",
                _0x36e20c(0x9e),
                "inputpermission set @s camera enabled",
                _0x36e20c(0x8d),
                _0x36e20c(0xae) + _0x40e985 + _0x36e20c(0x88)
              );
            }, 0x1);
      }, 0x1);
  }
}
system[_0x279a47(0x6e)][_0x279a47(0x76)]["subscribe"]((_0x549765) => {
  const _0x75d7d8 = _0x279a47;
  let _0x2f1744;
  switch (_0x549765[_0x75d7d8(0x7e)]) {
    case ScriptEventSource["Block"]:
      _0x2f1744 = _0x549765[_0x75d7d8(0xb0)];
      break;
    case ScriptEventSource["Entity"]:
      _0x2f1744 = _0x549765["sourceEntity"];
      break;
    case ScriptEventSource[_0x75d7d8(0xa7)]:
      _0x2f1744 = _0x549765[_0x75d7d8(0x8a)];
      break;
    default:
      return;
  }
  switch (_0x549765["id"]) {
    case content[_0x75d7d8(0x74)]:
      runScene(_0x2f1744);
      break;
    default:
      break;
  }
});
function getKeyframePair(_0x338b53, _0x35f996) {
  const _0x5c7fc2 = _0x279a47;
  let _0x5e1a92 = 0x0,
    _0x12a1d1 = _0x338b53[_0x5c7fc2(0x84)] - 0x1;
  while (_0x5e1a92 < _0x12a1d1) {
    const _0x3aae2f = Math[_0x5c7fc2(0x92)]((_0x5e1a92 + _0x12a1d1) / 0x2);
    if (_0x338b53[_0x3aae2f][_0x5c7fc2(0x94)] < _0x35f996) _0x5e1a92 = _0x3aae2f + 0x1;
    else _0x12a1d1 = _0x3aae2f;
  }
  return [_0x338b53[_0x5e1a92 - 0x1] || _0x338b53[_0x5e1a92], _0x338b53[_0x5e1a92]];
}
function lerpVector(_0x2e1bb8, _0x8a8376, _0x2d39da) {
  if (_0x2e1bb8 instanceof Vector3 && _0x8a8376 instanceof Vector3) return lerpVector3(_0x2e1bb8, _0x8a8376, _0x2d39da);
  else {
    if (_0x2e1bb8 instanceof Vector2 && _0x8a8376 instanceof Vector2)
      return lerpVector2(_0x2e1bb8, _0x8a8376, _0x2d39da);
  }
  throw new Error("Vectors must be either Vector2 or Vector3");
}
function lerp(_0x13f7d0, _0x31ce82, _0x54bde2) {
  return _0x13f7d0 + (_0x31ce82 - _0x13f7d0) * _0x54bde2;
}
function lerpVector3(_0x432243, _0x4cb449, _0x5bd9a9) {
  const _0x5179a6 = lerp(_0x432243["x"], _0x4cb449["x"], _0x5bd9a9),
    _0x429c11 = lerp(_0x432243["y"], _0x4cb449["y"], _0x5bd9a9),
    _0x193d04 = lerp(_0x432243["z"], _0x4cb449["z"], _0x5bd9a9);
  return new Vector3(_0x5179a6, _0x429c11, _0x193d04);
}
function lerpVector2(_0x46e4f1, _0x5744d9, _0x581e3a) {
  const _0xdb6a34 = lerp(_0x46e4f1["x"], _0x5744d9["x"], _0x581e3a),
    _0x20b25c = lerp(_0x46e4f1["y"], _0x5744d9["y"], _0x581e3a);
  return new Vector2(_0xdb6a34, _0x20b25c);
}
function applyEasing(_0x47dff2, _0x4186f7 = _0x279a47(0x9f)) {
  const _0x5898f4 = _0x279a47;
  switch (_0x4186f7) {
    case _0x5898f4(0xa2):
      return _0x47dff2 * _0x47dff2;
    case _0x5898f4(0x6f):
      return _0x47dff2 * (0x2 - _0x47dff2);
    case "easeInOut":
      return _0x47dff2 < 0.5 ? 0x2 * _0x47dff2 * _0x47dff2 : -0x1 + (0x4 - 0x2 * _0x47dff2) * _0x47dff2;
    default:
      return _0x47dff2;
  }
}
class Vector2 {
  constructor(_0x52a13c, _0x11e3de) {
    const _0xce706e = _0x279a47;
    typeof _0x52a13c === _0xce706e(0x6c) && _0x52a13c !== null && "x" in _0x52a13c && "y" in _0x52a13c
      ? ((this["x"] = _0x52a13c["x"]),
        (this["_y"] = _0x52a13c["y"]),
        (this["z"] = _0x52a13c["z"] !== undefined ? _0x52a13c["z"] : _0x52a13c["y"]))
      : ((this["x"] = _0x52a13c), (this["_y"] = _0x11e3de), (this["z"] = _0x11e3de));
  }
  set ["y"](_0x312773) {
    (this["_y"] = _0x312773), (this["z"] = _0x312773);
  }
  get ["y"]() {
    return this["_y"];
  }
  [_0x279a47(0x71)]() {
    return this["x"] + " " + this["y"];
  }
  [_0x279a47(0x73)](_0x1f6480, _0x26eba3) {
    const _0x122bcb = _0x279a47;
    if (typeof _0x1f6480 === _0x122bcb(0x6c) && _0x1f6480 !== null && "x" in _0x1f6480 && "y" in _0x1f6480)
      return new Vector2(this["x"] + _0x1f6480["x"], this["y"] + _0x1f6480["y"]);
    return new Vector2(this["x"] + _0x1f6480, this["y"] + _0x26eba3);
  }
  [_0x279a47(0x97)](_0x37b124, _0x1001aa) {
    return this["x"] === _0x37b124 && this["y"] === _0x1001aa;
  }
  [_0x279a47(0xad)]() {
    const _0x4bc396 = _0x279a47,
      _0x14d0bb = Math[_0x4bc396(0x9b)](this["x"] * this["x"] + this["y"] * this["y"]);
    return new Vector2(this["x"] / _0x14d0bb, this["y"] / _0x14d0bb);
  }
}
function _0x4a3f() {
  const _0x349624 = [
    "defineProperty",
    "commandRun",
    "sqrt",
    "get",
    "inputpermission set @s movement disabled",
    "hud @s reset",
    "linear",
    "gamemode",
    "round",
    "easeIn",
    "flat",
    "_roundToNearestHalf",
    "378249QidzYK",
    "location",
    "NPCDialogue",
    "center",
    "sizeCenter",
    "getAllPlayers",
    "sendMessage",
    "runTimeout",
    "normalized",
    "gamemode ",
    "playAnimation",
    "sourceBlock",
    "91amYImX",
    "1152410jEmnVD",
    "animationId",
    "coordinates",
    "hud @s hide all",
    "entityOption",
    "toFixed",
    "object",
    "3VrmcyH",
    "afterEvents",
    "easeOut",
    "clearRun",
    "toString",
    "data_points",
    "offset",
    "sceneId",
    "2251408XRdxLu",
    "scriptEventReceive",
    "step",
    "inputpermission set @s camera disabled",
    " rot ",
    "getEntities",
    "3655152FufOlB",
    "abs",
    "set",
    "sourceType",
    "type",
    "1655586gfUboM",
    "runCommand",
    "successCount",
    "interpolation",
    "length",
    "prototype",
    "playerOption",
    "§cExpected 1 model entity: '",
    " @s",
    "gamemode spectator @s",
    "initiator",
    "toVector2",
    "effect @s invisibility infinite 1 true",
    "inputpermission set @s movement enabled",
    "2013420rykikS",
    "sizeBelowCenter",
    "min",
    "runInterval",
    "floor",
    "teleport",
    "time",
    "157944BWuuTX",
    "belowCenter",
    "check",
    "setGamemode",
  ];
  _0x4a3f = function () {
    return _0x349624;
  };
  return _0x4a3f();
}
class Vector3 extends Vector2 {
  constructor(_0x3cc07e, _0x18d612, _0xa7f2df) {
    typeof _0x3cc07e === "object" && _0x3cc07e !== null && "x" in _0x3cc07e && "y" in _0x3cc07e
      ? (super(_0x3cc07e["x"], _0x3cc07e["y"]),
        (this["z"] = _0x3cc07e["z"] !== undefined ? _0x3cc07e["z"] : _0x3cc07e["y"]))
      : (super(_0x3cc07e, _0x18d612), (this["z"] = _0xa7f2df));
  }
  [_0x279a47(0x73)](_0x3b6d03, _0x460034, _0x31abab) {
    const _0x4c94a4 = _0x279a47;
    if (typeof _0x3b6d03 === _0x4c94a4(0x6c) && _0x3b6d03 !== null && "x" in _0x3b6d03 && "y" in _0x3b6d03)
      return new Vector3(
        this["x"] + _0x3b6d03["x"],
        this["y"] + _0x3b6d03["y"],
        this["z"] + (_0x3b6d03["z"] !== undefined ? _0x3b6d03["z"] : _0x3b6d03["y"])
      );
    return new Vector3(this["x"] + _0x3b6d03, this["y"] + _0x460034, this["z"] + _0x31abab);
  }
  [_0x279a47(0x97)](_0x4259f4, _0x1883fc, _0x25e019) {
    return this["x"] === _0x4259f4 && this["y"] === _0x1883fc && this["z"] === _0x25e019;
  }
  [_0x279a47(0x8b)]() {
    return new Vector2(this["x"], this["y"]);
  }
  [_0x279a47(0x71)]() {
    return this["x"] + " " + this["y"] + " " + this["z"];
  }
  [_0x279a47(0x96)]() {
    const _0x2545e4 = _0x279a47,
      _0x50811e = this["_roundToNearestHalf"](this["x"]),
      _0x46e13e = this["y"],
      _0x3a68c3 = this[_0x2545e4(0xa4)](this["z"]);
    return new Vector3(_0x50811e, _0x46e13e, _0x3a68c3);
  }
  [_0x279a47(0xa8)]() {
    const _0x49e3b9 = _0x279a47,
      _0x4b4e65 = this[_0x49e3b9(0xa4)](this["x"]),
      _0x56009f = this["_roundToNearestHalf"](this["y"]),
      _0x355a17 = this["_roundToNearestHalf"](this["z"]);
    return new Vector3(_0x4b4e65, _0x56009f, _0x355a17);
  }
  [_0x279a47(0xa9)]() {
    const _0x1f2cbb = _0x279a47,
      _0x53de41 = Math[_0x1f2cbb(0x92)](this["x"] / 0x2),
      _0x13f42f = Math[_0x1f2cbb(0x92)](this["z"] / 0x2),
      _0x2d4ed5 = Math[_0x1f2cbb(0x92)](this["z"] / 0x2);
    return new Vector3(_0x53de41, _0x13f42f, _0x2d4ed5);
  }
  [_0x279a47(0x8f)]() {
    const _0x47d70b = _0x279a47,
      _0x34fdba = Math[_0x47d70b(0x92)](this["x"] / 0x2),
      _0x4644bf = 0x0,
      _0x4555d9 = Math[_0x47d70b(0x92)](this["z"] / 0x2);
    return new Vector3(_0x34fdba, _0x4644bf, _0x4555d9);
  }
  [_0x279a47(0xa4)](_0x165a6d) {
    const _0x26c9ad = _0x279a47;
    return Math[_0x26c9ad(0xa1)](_0x165a6d * 0x2) / 0x2;
  }
  [_0x279a47(0xad)]() {
    const _0x4ded4a = Math["sqrt"](this["x"] * this["x"] + this["y"] * this["y"] + this["z"] * this["z"]);
    return new Vector3(this["x"] / _0x4ded4a, this["y"] / _0x4ded4a, this["z"] / _0x4ded4a);
  }
}
Object[_0x279a47(0x99)](Entity[_0x279a47(0x85)], _0x279a47(0xb4), {
  get: function () {
    const _0x2ef242 = _0x279a47;
    return new Vector3(
      Math["floor"](this[_0x2ef242(0xa6)]["x"]),
      Math[_0x2ef242(0x92)](this[_0x2ef242(0xa6)]["y"]),
      Math[_0x2ef242(0x92)](this[_0x2ef242(0xa6)]["z"])
    );
  },
  enumerable: !![],
}),
  Object[_0x279a47(0x99)](Entity[_0x279a47(0x85)], _0x279a47(0x9a), {
    value: function (..._0x3ac7ec) {
      const _0xf01b39 = _0x279a47,
        _0x10d242 = _0x3ac7ec[_0xf01b39(0xa3)](),
        _0x47af32 = { successCount: 0x0 };
      for (const _0x20b6bd of _0x10d242) {
        const _0x32331a = this[_0xf01b39(0x81)](_0x20b6bd);
        if (_0x32331a["successCount"] > 0x0) _0x47af32[_0xf01b39(0x82)]++;
      }
      return _0x47af32;
    },
    enumerable: !![],
  }),
  Object[_0x279a47(0x99)](Player["prototype"], _0x279a47(0xa0), {
    get: function () {
      return this["getGameMode"]();
    },
    set: function (_0x4226a9) {
      const _0x870445 = _0x279a47;
      this[_0x870445(0x98)](_0x4226a9);
    },
    enumerable: !![],
  }),
  load();
