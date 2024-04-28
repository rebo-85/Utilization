/* 
*******************************************************************************************************************************
DISCLAIMER: 
  This code is provided "as is" without warranty of any kind, either express or implied, including but not limited to 
  the implied warranties of merchantability and fitness for a particular purpose. ReBo and any contributors provide 
  this code for educational and informational purposes only. Users are encouraged to freely use, modify, and distribute 
  this code for non-commercial purposes. Any commercial use of this code or derivative works thereof is strictly prohibited 
  unless explicit permission is obtained from ReBo and any contributors.
******************************************************************************************************************************* 
*/

import { Cutscene, Scene, Fade, TimedCommand } from "Modules";

const cutscene1Timeline = [
  new TimedCommand(0.0, [
        "effect @a blindness 0 0",
        "playsound eternal.jingle @a",
  ]),
  new TimedCommand(4.0, [
    "event entity @e[family=cinematic] e:add-instant_despawn",
    "playsound music.intro @a",
    "summon eternal:fawk_cinematic 49962 181 -267 facing @p",
  ]),
  new TimedCommand(12.1, [
    "event entity @e[family=cinematic] e:add-instant_despawn",
    "execute as @p positioned 50080 135 288 run event entity @e[type=eternal:snail,r=20] e:add-instant_despawn",
    "execute as @p positioned 50080 135 288 run summon eternal:snail",
    "execute as @p positioned 50069.32 166.62 300.47 run event entity @e[type=eternal:pixie,r=20] e:add-instant_despawn",
    "execute as @p positioned 50069.32 166.62 300.47 run summon eternal:pixie",
    "execute as @p positioned 50057.74 168.27 301.34 run event entity @e[type=eternal:butterfly,r=20] e:add-instant_despawn",
    "execute as @p positioned 50057.74 168.27 301.34 run summon eternal:butterfly",
    "execute as @p positioned 50057.74 168.27 301.34 run summon eternal:butterfly",
  ]),
  new TimedCommand(23.1, [
    "execute as @p positioned 49217 133 -130 run event entity @e[type=eternal:golden_pony,r=20] e:add-instant_despawn",
    "execute as @p positioned 49217 133 -130 run summon eternal:golden_pony",
    "execute as @p positioned 49217 133 -130 run summon eternal:golden_pony",
  ]),
  new TimedCommand(29.1, [
    "execute as @p positioned 49871 130 -797 run event entity @e[family=white_deer,r=20] e:add-instant_despawn",
    "execute as @p positioned 49870 130 -797 run summon eternal:female_white_deer",
    "execute as @p positioned 49871 130 -797 run summon eternal:male_white_deer",
  ]),

  new TimedCommand(37.1, [
    "execute as @p positioned 50432 142 -417 run event entity @e[type=eternal:rhino,r=20] e:add-instant_despawn",
    "execute as @p positioned 50432 142 -417 run summon eternal:rhino",
  ]),
];

const cutscene1 = [
    new Scene(
      "49951.94 171.28 -248.87",
      "49950.34 178.41 -260.84",
      "49943 195 -309",
      7.0,
    "in_sine",
    new Fade(0.0, 4.0, 0.5)
    ),
  new Scene(
    "50094.03 123.56 271.57",
    "50050.95 166.77 286.06",
    "50080 163 357",
    7.0,
    "in_out_sine",
    new Fade(0.5, 1.5, 0.5)
  ),
  new Scene(
    "49263.8 102.12 -180.28",
    "49226.62 147.87 -122.78",
    "49160.68 119.27 -177.89",
    7.0,
    "in_sine",
    new Fade(0.5, 1.5, 0.5)
  ),
  new Scene(
    "49875.24 118.19 -776.02",
    "49857.2 183.81 -833.16",
    "49824.42 128.81 -937.28",
    7.0,
    "in_sine",
    new Fade(0.5, 1.5, 0.5)
  ),
  new Scene(
    "50421.54 138.14 -406.23",
    "50457.87 147.52 -400.49",
    "50439.48 117.82 -447.68",
    7.0,
    "in_sine",
    new Fade(0.5, 1.5, 0.5)
  ),
];

class CutsceneController {
  constructor() {
    new Cutscene(
      "cutscene1",
      "@a",
      cutscene1,
      true,
      [
        "tag @a add stop_sequence",
        "title @a title eternal.cutscene.ui",
        "scoreboard players set @a s-intro 730",
        "inputpermission set @a camera disabled",
        "inputpermission set @a movement disabled",
        "title @a actionbar eternal.actionbar.hide",
        "event entity @e[type=eternal:pointer] e:add-instant_despawn",
        "event entity @e[type=eternal:theia_guide] e:add-instant_despawn",
      ],
      [
        "effect @a blindness 0 0",
        "inputpermission set @a camera enabled",
        "inputpermission set @a movement enabled",
        "tag @a remove stop_sequence",
      ],
      cutscene1Timeline
    );
  }
}
export const cutsceneController = new CutsceneController();
