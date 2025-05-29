const _0x3c86cb = _0x7107; function _0x362b() { const _0x5c1f8d = [ "runTimeout", "9171169MQnXax", "144076uIccdO", "gamemode ", " @s", "animationId", "min", ". Skipping scene.", "inputpermission set @s movement enabled", "sizeCenter", "location", "entityOption", "setGamemode", "belowCenter", "defineProperty", "14092160lWLVlR", "playAnimation", "sourceType", "Block", "getRotation", "', found ", "sin", "center", "hud @s reset", "clearRun", "9GBtvyS", "interpolation", "commandRun", "scriptEventReceive", "get", "rotation", "NPCDialogue", "camera @s clear", "linear", "cos", "easeInOut", "coordinates", "floor", "6VJRDHd", "set", "abs", "65qaJUDy", "sourceBlock", "step", "time", "Vectors must be either Vector2 or Vector3", "2576105mTugAe", "effect @s invisibility infinite 1 true", "gamemode spectator @s", "getAllPlayers", "getGameMode", "hud @s hide all", "subscribe", "effect @s invisibility 0", "toVector2", "69445739zBDWop", "69LSsojb", "length", "sendMessage", "13190gFqOAN", "_roundToNearestHalf", "inputpermission set @s movement disabled", "inputpermission set @s camera enabled", "sizeBelowCenter", "offset", "data_points", "flat", "toFixed", "inputpermission set @s camera disabled", "sceneId", "initiator", "teleport", "prototype", "getEntities", "7805656ZDiZYZ", "check", "object", "dimension", "sqrt", "gamemode", "easeOut", "runCommand", "teleport @s ", "successCount", ]; _0x362b = function () { return _0x5c1f8d; }; return _0x362b(); } (function (_0x437e12, _0x75779) { const _0x3be5dc = _0x7107, _0x2669ff = _0x437e12(); while (!![]) { try { const _0x49ec76 = (parseInt(_0x3be5dc(0x84)) / 0x1) * (-parseInt(_0x3be5dc(0x96)) / 0x2) + (-parseInt(_0x3be5dc(0x93)) / 0x3) * (parseInt(_0x3be5dc(0xb1)) / 0x4) + (parseInt(_0x3be5dc(0x89)) / 0x5) * (-parseInt(_0x3be5dc(0x81)) / 0x6) + -parseInt(_0x3be5dc(0xb0)) / 0x7 + (parseInt(_0x3be5dc(0xa5)) / 0x8) * (-parseInt(_0x3be5dc(0xc8)) / 0x9) + -parseInt(_0x3be5dc(0xbe)) / 0xa + parseInt(_0x3be5dc(0x92)) / 0xb; if (_0x49ec76 === _0x75779) break; else _0x2669ff["push"](_0x2669ff["shift"]()); } catch (_0xc0772a) { _0x2669ff["push"](_0x2669ff["shift"]()); } } })(_0x362b, 0xce802);
function _0x7107(_0x221037, _0x4cb78a) { const _0x362bd5 = _0x362b(); return ( (_0x7107 = function (_0x710753, _0x2dac37) { _0x710753 = _0x710753 - 0x7d; let _0x4d07b4 = _0x362bd5[_0x710753]; return _0x4d07b4; }), _0x7107(_0x221037, _0x4cb78a) ); }
import { system, world, ScriptEventSource, Player, Entity } from "@minecraft/server";

const content = {
  "positions": [
    {
      "data_points": {
        "x": -5.4625,
        "y": 1.0575,
        "z": -10
      },
      "channel": "position",
      "time": 0,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": -5.4625,
        "y": 1.0575,
        "z": -10.815625
      },
      "channel": "position",
      "time": 2.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": -5.4625,
        "y": 1.0575,
        "z": -10.875
      },
      "channel": "position",
      "time": 2.2,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": 0.7875,
        "y": 1.995,
        "z": -9.69375
      },
      "channel": "position",
      "time": 2.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.49187499999999995,
        "y": 2.124375,
        "z": 5.24375
      },
      "channel": "position",
      "time": 4.5,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": -0.275,
        "y": 1.495,
        "z": 8.3125
      },
      "channel": "position",
      "time": 4.55,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": -0.32062500000000005,
        "y": 1.563125,
        "z": 12.403125
      },
      "channel": "position",
      "time": 5.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": -0.4,
        "y": 1.6825,
        "z": 12.6875
      },
      "channel": "position",
      "time": 6.45,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": -0.23721169044375012,
        "y": 0.9763233892625001,
        "z": 12.44535292229375
      },
      "channel": "position",
      "time": 6.5,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": -0.23359229156250005,
        "y": 1.0375171156187502,
        "z": 12.3798616801
      },
      "channel": "position",
      "time": 8.9,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": 0.8518749999999999,
        "y": 1.12,
        "z": 10.301875
      },
      "channel": "position",
      "time": 8.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.826875,
        "y": 1.12,
        "z": 10.626875
      },
      "channel": "position",
      "time": 15.55,
      "interpolation": "step"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.1081250000000002,
        "z": 3.999375
      },
      "channel": "position",
      "time": 15.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.12125,
        "z": 3.908125
      },
      "channel": "position",
      "time": 15.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.13125,
        "z": 3.819375
      },
      "channel": "position",
      "time": 15.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.1425,
        "z": 3.691875
      },
      "channel": "position",
      "time": 15.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.148125,
        "z": 3.610625
      },
      "channel": "position",
      "time": 16.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.1525,
        "z": 3.494375
      },
      "channel": "position",
      "time": 16.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.15375,
        "z": 3.38375
      },
      "channel": "position",
      "time": 16.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.15375,
        "z": 3.313125
      },
      "channel": "position",
      "time": 16.45,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.151875,
        "z": 3.211875
      },
      "channel": "position",
      "time": 16.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.1500000000000001,
        "z": 3.1475
      },
      "channel": "position",
      "time": 16.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.146875,
        "z": 3.055625
      },
      "channel": "position",
      "time": 16.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.145,
        "z": 2.9975
      },
      "channel": "position",
      "time": 16.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.14375,
        "z": 2.94125
      },
      "channel": "position",
      "time": 17.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.1425,
        "z": 2.86125
      },
      "channel": "position",
      "time": 17.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.14375,
        "z": 2.785625
      },
      "channel": "position",
      "time": 17.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.149375,
        "z": 2.691875
      },
      "channel": "position",
      "time": 17.55,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.155,
        "z": 2.6481250000000003
      },
      "channel": "position",
      "time": 17.65,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.1675,
        "z": 2.585
      },
      "channel": "position",
      "time": 17.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.185,
        "z": 2.52625
      },
      "channel": "position",
      "time": 17.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.2081250000000001,
        "z": 2.47125
      },
      "channel": "position",
      "time": 18.1,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.2175,
        "z": 2.4537500000000003
      },
      "channel": "position",
      "time": 18.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.23875,
        "z": 2.419375
      },
      "channel": "position",
      "time": 18.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.263125,
        "z": 2.386875
      },
      "channel": "position",
      "time": 18.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.2912500000000002,
        "z": 2.355625
      },
      "channel": "position",
      "time": 18.45,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.323125,
        "z": 2.325625
      },
      "channel": "position",
      "time": 18.55,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.3587500000000001,
        "z": 2.296875
      },
      "channel": "position",
      "time": 18.65,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.3787500000000001,
        "z": 2.2824999999999998
      },
      "channel": "position",
      "time": 18.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.4212500000000001,
        "z": 2.255625
      },
      "channel": "position",
      "time": 18.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.44375,
        "z": 2.2424999999999997
      },
      "channel": "position",
      "time": 18.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.4681250000000001,
        "z": 2.23
      },
      "channel": "position",
      "time": 18.9,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.52,
        "z": 2.205
      },
      "channel": "position",
      "time": 19,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.5775000000000001,
        "z": 2.18125
      },
      "channel": "position",
      "time": 19.1,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.6075000000000002,
        "z": 2.169375
      },
      "channel": "position",
      "time": 19.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.639375,
        "z": 2.158125
      },
      "channel": "position",
      "time": 19.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.7075,
        "z": 2.135625
      },
      "channel": "position",
      "time": 19.3,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.7437500000000001,
        "z": 2.125
      },
      "channel": "position",
      "time": 19.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.78125,
        "z": 2.114375
      },
      "channel": "position",
      "time": 19.4,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.86125,
        "z": 2.09375
      },
      "channel": "position",
      "time": 19.5,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 1.9475000000000002,
        "z": 2.07375
      },
      "channel": "position",
      "time": 19.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 2.04,
        "z": 2.0543750000000003
      },
      "channel": "position",
      "time": 19.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 2.08875,
        "z": 2.045
      },
      "channel": "position",
      "time": 19.75,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 2.1393750000000002,
        "z": 2.035625
      },
      "channel": "position",
      "time": 19.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 2.245625,
        "z": 2.0175
      },
      "channel": "position",
      "time": 19.9,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 2.359375,
        "z": 1.9993750000000001
      },
      "channel": "position",
      "time": 20,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 2.40375,
        "z": 1.99375
      },
      "channel": "position",
      "time": 20.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.9525,
        "y": 2.45,
        "z": 1.98875
      },
      "channel": "position",
      "time": 20.1,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.95375,
        "y": 2.4987500000000002,
        "z": 1.985625
      },
      "channel": "position",
      "time": 20.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.955,
        "y": 2.5500000000000003,
        "z": 1.983125
      },
      "channel": "position",
      "time": 20.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.95625,
        "y": 2.6037500000000002,
        "z": 1.9825
      },
      "channel": "position",
      "time": 20.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.958125,
        "y": 2.659375,
        "z": 1.9825
      },
      "channel": "position",
      "time": 20.3,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.960625,
        "y": 2.716875,
        "z": 1.9837500000000001
      },
      "channel": "position",
      "time": 20.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.963125,
        "y": 2.7768750000000004,
        "z": 1.98625
      },
      "channel": "position",
      "time": 20.4,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.9662499999999999,
        "y": 2.83875,
        "z": 1.99
      },
      "channel": "position",
      "time": 20.45,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.9724999999999999,
        "y": 2.96875,
        "z": 2
      },
      "channel": "position",
      "time": 20.55,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.980625,
        "y": 3.10625,
        "z": 2.01375
      },
      "channel": "position",
      "time": 20.65,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.984375,
        "y": 3.1775,
        "z": 2.021875
      },
      "channel": "position",
      "time": 20.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.98875,
        "y": 3.25125,
        "z": 2.03125
      },
      "channel": "position",
      "time": 20.75,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.9937499999999999,
        "y": 3.32625,
        "z": 2.041875
      },
      "channel": "position",
      "time": 20.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.99875,
        "y": 3.4025,
        "z": 2.0525
      },
      "channel": "position",
      "time": 20.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.009375,
        "y": 3.5612500000000002,
        "z": 2.0768750000000002
      },
      "channel": "position",
      "time": 20.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.015,
        "y": 3.6425,
        "z": 2.090625
      },
      "channel": "position",
      "time": 21,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.020625,
        "y": 3.725625,
        "z": 2.104375
      },
      "channel": "position",
      "time": 21.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.0325,
        "y": 3.895625,
        "z": 2.135
      },
      "channel": "position",
      "time": 21.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.0387499999999998,
        "y": 3.9825,
        "z": 2.150625
      },
      "channel": "position",
      "time": 21.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.051875,
        "y": 4.160625,
        "z": 2.185
      },
      "channel": "position",
      "time": 21.3,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.0587499999999999,
        "y": 4.251250000000001,
        "z": 2.203125
      },
      "channel": "position",
      "time": 21.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.079375,
        "y": 4.530625000000001,
        "z": 2.259375
      },
      "channel": "position",
      "time": 21.5,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.09375,
        "y": 4.721875000000001,
        "z": 2.3
      },
      "channel": "position",
      "time": 21.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.108125,
        "y": 4.9175,
        "z": 2.34125
      },
      "channel": "position",
      "time": 21.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.130625,
        "y": 5.215625,
        "z": 2.40625
      },
      "channel": "position",
      "time": 21.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.153125,
        "y": 5.520625,
        "z": 2.47375
      },
      "channel": "position",
      "time": 22,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.1837499999999999,
        "y": 5.934375,
        "z": 2.565625
      },
      "channel": "position",
      "time": 22.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.213125,
        "y": 6.35375,
        "z": 2.65875
      },
      "channel": "position",
      "time": 22.4,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.248125,
        "y": 6.881875,
        "z": 2.7737499999999997
      },
      "channel": "position",
      "time": 22.65,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.27375,
        "y": 7.3025,
        "z": 2.861875
      },
      "channel": "position",
      "time": 22.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.2974999999999999,
        "y": 7.719375,
        "z": 2.9456249999999997
      },
      "channel": "position",
      "time": 23.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.308125,
        "y": 7.925625,
        "z": 2.9850000000000003
      },
      "channel": "position",
      "time": 23.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.3175,
        "y": 8.129375,
        "z": 3.021875
      },
      "channel": "position",
      "time": 23.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.32625,
        "y": 8.330625000000001,
        "z": 3.0575
      },
      "channel": "position",
      "time": 23.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.33375,
        "y": 8.52875,
        "z": 3.090625
      },
      "channel": "position",
      "time": 23.45,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.3375,
        "y": 8.626875,
        "z": 3.105625
      },
      "channel": "position",
      "time": 23.5,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.34375,
        "y": 8.82,
        "z": 3.135
      },
      "channel": "position",
      "time": 23.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.348125,
        "y": 9.009375,
        "z": 3.160625
      },
      "channel": "position",
      "time": 23.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.3518750000000002,
        "y": 9.194375,
        "z": 3.18375
      },
      "channel": "position",
      "time": 23.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.353125,
        "y": 9.285,
        "z": 3.19375
      },
      "channel": "position",
      "time": 23.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.354375,
        "y": 9.4625,
        "z": 3.211875
      },
      "channel": "position",
      "time": 23.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.355,
        "y": 9.55,
        "z": 3.219375
      },
      "channel": "position",
      "time": 24,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.3537499999999998,
        "y": 9.719999999999999,
        "z": 3.23125
      },
      "channel": "position",
      "time": 24.1,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.3518750000000002,
        "y": 9.88375,
        "z": 3.239375
      },
      "channel": "position",
      "time": 24.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.35,
        "y": 9.963750000000001,
        "z": 3.241875
      },
      "channel": "position",
      "time": 24.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.345,
        "y": 10.118749999999999,
        "z": 3.24375
      },
      "channel": "position",
      "time": 24.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.341875,
        "y": 10.193750000000001,
        "z": 3.2425
      },
      "channel": "position",
      "time": 24.4,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.338125,
        "y": 10.266874999999999,
        "z": 3.240625
      },
      "channel": "position",
      "time": 24.45,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.334375,
        "y": 10.338125000000002,
        "z": 3.236875
      },
      "channel": "position",
      "time": 24.5,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.325,
        "y": 10.475625,
        "z": 3.226875
      },
      "channel": "position",
      "time": 24.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.319375,
        "y": 10.541250000000002,
        "z": 3.219375
      },
      "channel": "position",
      "time": 24.65,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.31375,
        "y": 10.605,
        "z": 3.21125
      },
      "channel": "position",
      "time": 24.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.306875,
        "y": 10.666875000000001,
        "z": 3.20125
      },
      "channel": "position",
      "time": 24.75,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.2999999999999998,
        "y": 10.726875,
        "z": 3.190625
      },
      "channel": "position",
      "time": 24.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.2925,
        "y": 10.784375,
        "z": 3.1775
      },
      "channel": "position",
      "time": 24.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.2843749999999998,
        "y": 10.84,
        "z": 3.16375
      },
      "channel": "position",
      "time": 24.9,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.275625,
        "y": 10.893125000000001,
        "z": 3.148125
      },
      "channel": "position",
      "time": 24.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.266875,
        "y": 10.944375,
        "z": 3.13125
      },
      "channel": "position",
      "time": 25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.256875,
        "y": 10.993125,
        "z": 3.113125
      },
      "channel": "position",
      "time": 25.05,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.246875,
        "y": 11.039375,
        "z": 3.093125
      },
      "channel": "position",
      "time": 25.1,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.235625,
        "y": 11.083124999999999,
        "z": 3.07125
      },
      "channel": "position",
      "time": 25.15,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.224375,
        "y": 11.125,
        "z": 3.048125
      },
      "channel": "position",
      "time": 25.2,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.211875,
        "y": 11.164375,
        "z": 3.02375
      },
      "channel": "position",
      "time": 25.25,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.1993749999999999,
        "y": 11.200624999999999,
        "z": 2.996875
      },
      "channel": "position",
      "time": 25.3,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.1862499999999998,
        "y": 11.234375,
        "z": 2.96875
      },
      "channel": "position",
      "time": 25.35,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.171875,
        "y": 11.26625,
        "z": 2.9387499999999998
      },
      "channel": "position",
      "time": 25.4,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.1575,
        "y": 11.295000000000002,
        "z": 2.9074999999999998
      },
      "channel": "position",
      "time": 25.45,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.1425,
        "y": 11.320625,
        "z": 2.8737500000000002
      },
      "channel": "position",
      "time": 25.5,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.12625,
        "y": 11.34375,
        "z": 2.83875
      },
      "channel": "position",
      "time": 25.55,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.1099999999999999,
        "y": 11.364374999999999,
        "z": 2.801875
      },
      "channel": "position",
      "time": 25.6,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.0925,
        "y": 11.381875,
        "z": 2.763125
      },
      "channel": "position",
      "time": 25.65,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.0743749999999999,
        "y": 11.396249999999998,
        "z": 2.7225
      },
      "channel": "position",
      "time": 25.7,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.05625,
        "y": 11.408125000000002,
        "z": 2.6799999999999997
      },
      "channel": "position",
      "time": 25.75,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.036875,
        "y": 11.416875000000001,
        "z": 2.635
      },
      "channel": "position",
      "time": 25.8,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 1.0162499999999999,
        "y": 11.4225,
        "z": 2.58875
      },
      "channel": "position",
      "time": 25.85,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.995625,
        "y": 11.425,
        "z": 2.54
      },
      "channel": "position",
      "time": 25.9,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.974375,
        "y": 11.424375000000001,
        "z": 2.489375
      },
      "channel": "position",
      "time": 25.95,
      "interpolation": "linear"
    },
    {
      "data_points": {
        "x": 0.951875,
        "y": 11.420625000000001,
        "z": 2.4368749999999997
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

let scene;
function load() { const _0x7b0205 = _0x7107; for (const _0x1db8a3 of world[_0x7b0205(0x8c)]()) { _0x1db8a3[_0x7b0205(0xca)](_0x7b0205(0xcf), "hud @s reset", _0x7b0205(0x99), _0x7b0205(0xb7)); } }
function runScene(_0x3502a3) { const _0x53ba8e = _0x7107; if (scene) system[_0x53ba8e(0xc7)](scene); const { positions: _0x59d387, rotations: _0x3ebe22 } = content, _0x40fd14 = _0x3502a3[_0x53ba8e(0xa8)], _0x376726 = _0x40fd14[_0x53ba8e(0xa4)](content["playerOption"]), _0x3a4079 = _0x40fd14[_0x53ba8e(0xa4)](content["entityOption"]); if (_0x3a4079[_0x53ba8e(0x94)] !== 0x1) { world[_0x53ba8e(0x95)]( "§cExpected 1 model entity: '" + content[_0x53ba8e(0xba)]["type"] + _0x53ba8e(0xc3) + _0x3a4079[_0x53ba8e(0x94)] + _0x53ba8e(0xb6) ); return; } const _0x39c2c8 = _0x3a4079[0x0], _0x420c11 = new Map(), _0x403575 = new Map(); for (const _0xecb709 of _0x376726) { _0x420c11[_0x53ba8e(0x82)](_0xecb709["id"], _0xecb709["gamemode"]), _0x403575["set"](_0xecb709["id"], { location: _0xecb709[_0x53ba8e(0xb9)], rotation: _0xecb709[_0x53ba8e(0xc2)](), }), _0xecb709[_0x53ba8e(0xca)]( _0x53ba8e(0xcf), _0x53ba8e(0x8a), _0x53ba8e(0x8e), _0x53ba8e(0x9f), _0x53ba8e(0x98), _0x53ba8e(0x8b) ), _0x39c2c8[_0x53ba8e(0xbf)](content[_0x53ba8e(0xb4)]); let _0xf24bb4 = 0x0; const _0x53c98c = 0x14; scene = system["runInterval"](() => { const _0x34cc12 = _0x53ba8e; _0xf24bb4 += 0x1 / _0x53c98c; const [_0x35efe4, _0x52e456] = getKeyframePair(_0x59d387, _0xf24bb4), _0x43edf9 = (_0xf24bb4 - _0x35efe4["time"]) / (_0x52e456[_0x34cc12(0x87)] - _0x35efe4[_0x34cc12(0x87)]), _0x4b99a5 = applyEasing(Math[_0x34cc12(0xb5)](_0x43edf9, 0x1), _0x35efe4[_0x34cc12(0xc9)]), _0x92321f = _0x39c2c8[_0x34cc12(0x7f)], _0x4a59b9 = new Vector3(_0x35efe4[_0x34cc12(0x9c)])[_0x34cc12(0x9b)](_0x92321f), _0x525d60 = new Vector3(_0x52e456[_0x34cc12(0x9c)])[_0x34cc12(0x9b)](_0x92321f), _0xc1e9b = _0x35efe4[_0x34cc12(0xc9)] === _0x34cc12(0x86) ? _0x4a59b9 : lerpVector(_0x4a59b9, _0x525d60, _0x4b99a5), [_0x467c6c, _0x28240b] = getKeyframePair(_0x3ebe22, _0xf24bb4), _0x120df8 = (_0xf24bb4 - _0x467c6c[_0x34cc12(0x87)]) / (_0x28240b[_0x34cc12(0x87)] - _0x467c6c[_0x34cc12(0x87)]), _0x1075fc = applyEasing(Math[_0x34cc12(0xb5)](_0x120df8, 0x1), _0x467c6c[_0x34cc12(0xc9)]), _0x47d11e = new Vector2(+_0x467c6c["data_points"]["x"], +_0x467c6c["data_points"]["y"]), _0x29024d = new Vector2(+_0x28240b["data_points"]["x"], +_0x28240b[_0x34cc12(0x9c)]["y"]); let _0x2a96fc = _0x467c6c[_0x34cc12(0xc9)] === _0x34cc12(0x86) ? _0x47d11e : lerpVector(_0x47d11e, _0x29024d, _0x1075fc); const _0x51dab0 = 0.000001; (_0x2a96fc["x"] = Math[_0x34cc12(0x83)](_0x2a96fc["x"]) < _0x51dab0 ? 0x0 : _0x2a96fc["x"]), (_0x2a96fc["y"] = Math[_0x34cc12(0x83)](_0x2a96fc["y"]) < _0x51dab0 ? 0x0 : _0x2a96fc["y"]); if (Math[_0x34cc12(0x83)](_0x2a96fc["x"]) < _0x51dab0) _0x2a96fc["x"] = 0x0; if (Math[_0x34cc12(0x83)](_0x2a96fc["y"]) < _0x51dab0) _0x2a96fc["y"] = 0x0; const _0x38a747 = _0x39c2c8[_0x34cc12(0xb9)], _0x2f7328 = _0x39c2c8[_0x34cc12(0xc2)]()["y"], _0x4895a7 = _0xc1e9b[_0x34cc12(0x9b)](-_0x38a747["x"], -_0x38a747["y"], -_0x38a747["z"]), _0x5c9a10 = rotatePosition(_0x4895a7, _0x2f7328), _0x4b58e4 = _0x5c9a10["offset"](_0x38a747); (_0x2a96fc["y"] += _0x2f7328), (_0x2a96fc["y"] = normalizeRotation(_0x2a96fc["y"])), _0xecb709[_0x34cc12(0xa2)](_0x4b58e4); const _0x2d6efe = (_0x37bcdb) => { const _0x413145 = _0x34cc12, _0x525648 = Number(_0x37bcdb); return _0x525648 % 0x1 === 0x0 ? _0x525648[_0x413145(0x9e)](0x1) : _0x525648[_0x413145(0x9e)](0x4); }; _0xecb709["commandRun"]( "execute as @e[type=armor_stand] run teleport @s " + _0x2d6efe(_0x4b58e4["x"]) + " " + _0x2d6efe(_0x4b58e4["y"]) + " " + _0x2d6efe(_0x4b58e4["z"]) + " " + _0x2d6efe(_0x2a96fc["y"]) + " " + _0x2d6efe(_0x2a96fc["x"]) ); const _0x3a72f8 = "camera @s set minecraft:free ease 0.05 linear pos " + _0x2d6efe(_0x4b58e4["x"]) + " " + _0x2d6efe(_0x4b58e4["y"]) + " " + _0x2d6efe(_0x4b58e4["z"]) + " rot " + _0x2a96fc["x"] + " " + _0x2a96fc["y"]; _0xecb709["runCommand"](_0x3a72f8), _0xf24bb4 > _0x59d387["at"](-0x1)[_0x34cc12(0x87)] && _0xf24bb4 > _0x3ebe22["at"](-0x1)[_0x34cc12(0x87)] && system[_0x34cc12(0xaf)](() => { const _0x4caccc = _0x34cc12; system[_0x4caccc(0xc7)](scene); const _0x167f49 = _0x420c11[_0x4caccc(0xcc)](_0xecb709["id"]), _0x10fedb = _0x403575["get"](_0xecb709["id"]); _0xecb709[_0x4caccc(0xca)]( _0x4caccc(0xcf), _0x4caccc(0x90), _0x4caccc(0xc6), _0x4caccc(0x99), _0x4caccc(0xb7), _0x4caccc(0xb2) + _0x167f49 + _0x4caccc(0xb3), _0x4caccc(0xad) + _0x10fedb["location"]["x"] + " " + _0x10fedb[_0x4caccc(0xb9)]["y"] + " " + _0x10fedb[_0x4caccc(0xb9)]["z"] + " " + _0x10fedb[_0x4caccc(0xcd)]["y"] + " " + _0x10fedb[_0x4caccc(0xcd)]["x"] ); }, 0x1); }, 0x1); } }
system["afterEvents"][_0x3c86cb(0xcb)][_0x3c86cb(0x8f)]((_0x2b9e3f) => { const _0x2d10cb = _0x3c86cb; let _0x542de2; switch (_0x2b9e3f[_0x2d10cb(0xc0)]) { case ScriptEventSource[_0x2d10cb(0xc1)]: _0x542de2 = _0x2b9e3f[_0x2d10cb(0x85)]; break; case ScriptEventSource["Entity"]: _0x542de2 = _0x2b9e3f["sourceEntity"]; break; case ScriptEventSource[_0x2d10cb(0xce)]: _0x542de2 = _0x2b9e3f[_0x2d10cb(0xa1)]; break; default: return; } switch (_0x2b9e3f["id"]) { case content[_0x2d10cb(0xa0)]: runScene(_0x542de2); break; default: break; } });
function rotatePosition(_0x19d036, _0x9b974d) { const _0x5cc080 = _0x3c86cb, _0x59b68c = (_0x9b974d * Math["PI"]) / 0xb4, _0x5071fb = Math[_0x5cc080(0x7d)](_0x59b68c), _0x3d0b41 = Math[_0x5cc080(0xc4)](_0x59b68c), _0x53a42e = _0x19d036["x"] * _0x5071fb - _0x19d036["z"] * _0x3d0b41, _0x230339 = _0x19d036["x"] * _0x3d0b41 + _0x19d036["z"] * _0x5071fb; return new Vector3(_0x53a42e, _0x19d036["y"], _0x230339); }
function getKeyframePair(_0x27ab0c, _0x14e9e2) { const _0xc916f5 = _0x3c86cb; let _0x1516ec = 0x0, _0x4aa29d = _0x27ab0c[_0xc916f5(0x94)] - 0x1; while (_0x1516ec < _0x4aa29d) { const _0xfa215e = Math[_0xc916f5(0x80)]((_0x1516ec + _0x4aa29d) / 0x2); if (_0x27ab0c[_0xfa215e][_0xc916f5(0x87)] < _0x14e9e2) _0x1516ec = _0xfa215e + 0x1; else _0x4aa29d = _0xfa215e; } return [_0x27ab0c[_0x1516ec - 0x1] || _0x27ab0c[_0x1516ec], _0x27ab0c[_0x1516ec]]; }
function lerpVector(_0x854268, _0x29ef32, _0x22c65e) { const _0x5be341 = _0x3c86cb; if (_0x854268 instanceof Vector3 && _0x29ef32 instanceof Vector3) return lerpVector3(_0x854268, _0x29ef32, _0x22c65e); else { if (_0x854268 instanceof Vector2 && _0x29ef32 instanceof Vector2) return lerpVector2(_0x854268, _0x29ef32, _0x22c65e); } throw new Error(_0x5be341(0x88)); }
function lerp(_0x32a92f, _0x39ba5f, _0x56dd17) { return _0x32a92f + (_0x39ba5f - _0x32a92f) * _0x56dd17; }
function lerpVector3(_0x1cedf7, _0xaa40b5, _0x4cc96b) { const _0x156a67 = lerp(_0x1cedf7["x"], _0xaa40b5["x"], _0x4cc96b), _0x35ded0 = lerp(_0x1cedf7["y"], _0xaa40b5["y"], _0x4cc96b), _0x2a37e3 = lerp(_0x1cedf7["z"], _0xaa40b5["z"], _0x4cc96b); return new Vector3(_0x156a67, _0x35ded0, _0x2a37e3); }
function lerpVector2(_0x389326, _0xf64fc, _0x252daa) { const _0x14a8e1 = lerp(_0x389326["x"], _0xf64fc["x"], _0x252daa), _0x3021d8 = lerp(_0x389326["y"], _0xf64fc["y"], _0x252daa); return new Vector2(_0x14a8e1, _0x3021d8); }
function applyEasing(_0x23f371, _0x2d75ed = _0x3c86cb(0xd0)) { const _0x174e66 = _0x3c86cb; switch (_0x2d75ed) { case "easeIn": return _0x23f371 * _0x23f371; case _0x174e66(0xab): return _0x23f371 * (0x2 - _0x23f371); case _0x174e66(0x7e): return _0x23f371 < 0.5 ? 0x2 * _0x23f371 * _0x23f371 : -0x1 + (0x4 - 0x2 * _0x23f371) * _0x23f371; default: return _0x23f371; } }
function normalizeRotation(_0x39a132) { return ((_0x39a132 + 0xb4) % 0x168) - 0xb4; }
class Vector2 { constructor(_0x542165, _0x17af22) { const _0x4ae273 = _0x3c86cb; typeof _0x542165 === _0x4ae273(0xa7) && _0x542165 !== null && "x" in _0x542165 && "y" in _0x542165 ? ((this["x"] = _0x542165["x"]), (this["_y"] = _0x542165["y"]), (this["z"] = _0x542165["z"] !== undefined ? _0x542165["z"] : _0x542165["y"])) : ((this["x"] = _0x542165), (this["_y"] = _0x17af22), (this["z"] = _0x17af22)); } set ["y"](_0x4a9a77) { (this["_y"] = _0x4a9a77), (this["z"] = _0x4a9a77); } get ["y"]() { return this["_y"]; } ["toString"]() { return this["x"] + " " + this["y"]; } [_0x3c86cb(0x9b)](_0x52b0be, _0x467b95) { const _0x5dd8b1 = _0x3c86cb; if (typeof _0x52b0be === _0x5dd8b1(0xa7) && _0x52b0be !== null && "x" in _0x52b0be && "y" in _0x52b0be) return new Vector2(this["x"] + _0x52b0be["x"], this["y"] + _0x52b0be["y"]); return new Vector2(this["x"] + _0x52b0be, this["y"] + _0x467b95); } [_0x3c86cb(0xa6)](_0x2976c5, _0x3957a7) { return this["x"] === _0x2976c5 && this["y"] === _0x3957a7; } ["normalized"]() { const _0x2f48e4 = _0x3c86cb, _0x32f891 = Math[_0x2f48e4(0xa9)](this["x"] * this["x"] + this["y"] * this["y"]); return new Vector2(this["x"] / _0x32f891, this["y"] / _0x32f891); } }
class Vector3 extends Vector2 { constructor(_0x33e253, _0x36d333, _0x4a0342) { typeof _0x33e253 === "object" && _0x33e253 !== null && "x" in _0x33e253 && "y" in _0x33e253 ? (super(_0x33e253["x"], _0x33e253["y"]), (this["z"] = _0x33e253["z"] !== undefined ? _0x33e253["z"] : _0x33e253["y"])) : (super(_0x33e253, _0x36d333), (this["z"] = _0x4a0342)); } ["offset"](_0x468e50, _0xf86122, _0xcbc991) { const _0x162655 = _0x3c86cb; if (typeof _0x468e50 === _0x162655(0xa7) && _0x468e50 !== null && "x" in _0x468e50 && "y" in _0x468e50) return new Vector3( this["x"] + _0x468e50["x"], this["y"] + _0x468e50["y"], this["z"] + (_0x468e50["z"] !== undefined ? _0x468e50["z"] : _0x468e50["y"]) ); return new Vector3(this["x"] + _0x468e50, this["y"] + _0xf86122, this["z"] + _0xcbc991); } [_0x3c86cb(0xa6)](_0x4f7cb9, _0x14e934, _0x44a0cd) { return this["x"] === _0x4f7cb9 && this["y"] === _0x14e934 && this["z"] === _0x44a0cd; } [_0x3c86cb(0x91)]() { return new Vector2(this["x"], this["y"]); } ["toString"]() { return this["x"] + " " + this["y"] + " " + this["z"]; } [_0x3c86cb(0xbc)]() { const _0xa862d1 = _0x3c86cb, _0x26d778 = this[_0xa862d1(0x97)](this["x"]), _0x36c456 = this["y"], _0x27e028 = this[_0xa862d1(0x97)](this["z"]); return new Vector3(_0x26d778, _0x36c456, _0x27e028); } [_0x3c86cb(0xc5)]() { const _0x1c3977 = _0x3c86cb, _0x43204f = this[_0x1c3977(0x97)](this["x"]), _0x6df483 = this[_0x1c3977(0x97)](this["y"]), _0x3f16e4 = this[_0x1c3977(0x97)](this["z"]); return new Vector3(_0x43204f, _0x6df483, _0x3f16e4); } [_0x3c86cb(0xb8)]() { const _0x4eebd3 = _0x3c86cb, _0x54407c = Math[_0x4eebd3(0x80)](this["x"] / 0x2), _0x82ac35 = Math["floor"](this["z"] / 0x2), _0x2912e3 = Math["floor"](this["z"] / 0x2); return new Vector3(_0x54407c, _0x82ac35, _0x2912e3); } [_0x3c86cb(0x9a)]() { const _0xd3ed19 = _0x3c86cb, _0x47bace = Math[_0xd3ed19(0x80)](this["x"] / 0x2), _0x1d2956 = 0x0, _0x3412ce = Math[_0xd3ed19(0x80)](this["z"] / 0x2); return new Vector3(_0x47bace, _0x1d2956, _0x3412ce); } ["_roundToNearestHalf"](_0x547bc0) { return Math["round"](_0x547bc0 * 0x2) / 0x2; } ["normalized"]() { const _0x21739e = _0x3c86cb, _0x2d6305 = Math[_0x21739e(0xa9)](this["x"] * this["x"] + this["y"] * this["y"] + this["z"] * this["z"]); return new Vector3(this["x"] / _0x2d6305, this["y"] / _0x2d6305, this["z"] / _0x2d6305); } }
Object["defineProperty"](Entity[_0x3c86cb(0xa3)], _0x3c86cb(0x7f), { get: function () { const _0x12fd84 = _0x3c86cb; return new Vector3( Math[_0x12fd84(0x80)](this[_0x12fd84(0xb9)]["x"]), Math["floor"](this[_0x12fd84(0xb9)]["y"]), Math[_0x12fd84(0x80)](this[_0x12fd84(0xb9)]["z"]) ); }, enumerable: !![], }), Object[_0x3c86cb(0xbd)](Entity["prototype"], "commandRun", { value: function (..._0x66ef87) { const _0x3c1c81 = _0x3c86cb, _0x5ac4b9 = _0x66ef87[_0x3c1c81(0x9d)](), _0x24ab34 = { successCount: 0x0 }; for (const _0x3d2ee4 of _0x5ac4b9) { const _0x11c39c = this[_0x3c1c81(0xac)](_0x3d2ee4); if (_0x11c39c[_0x3c1c81(0xae)] > 0x0) _0x24ab34["successCount"]++; } return _0x24ab34; }, enumerable: !![], }), Object[_0x3c86cb(0xbd)](Player[_0x3c86cb(0xa3)], _0x3c86cb(0xaa), { get: function () { const _0x296fed = _0x3c86cb; return this[_0x296fed(0x8d)](); }, set: function (_0x23bb85) { const _0x4eecbe = _0x3c86cb; this[_0x4eecbe(0xbb)](_0x23bb85); }, enumerable: !![], }), load();
