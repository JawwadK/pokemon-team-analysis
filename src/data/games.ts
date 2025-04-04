// src/data/games.ts
import { GameData } from "@/types/pokemon";

// Helper function to create continuous ranges of IDs
const createRange = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

export const GAME_DATA: Record<string, GameData> = {
  // Generation 1
  "Red/Blue/Yellow": {
    name: "Red/Blue/Yellow",
    generation: 1,
    regionalDex: createRange(1, 151),
    nationalDex: false,
    availablePokemon: createRange(1, 151),
  },

  // Generation 2
  "Gold/Silver/Crystal": {
    name: "Gold/Silver/Crystal",
    generation: 2,
    regionalDex: createRange(1, 251),
    nationalDex: true,
    availablePokemon: createRange(1, 251),
  },

  // Generation 3
  "Ruby/Sapphire/Emerald": {
    name: "Ruby/Sapphire/Emerald",
    generation: 3,
    regionalDex: createRange(1, 202), // Hoenn dex
    nationalDex: true,
    availablePokemon: createRange(1, 386),
  },
  "FireRed/LeafGreen": {
    name: "FireRed/LeafGreen",
    generation: 3,
    regionalDex: createRange(1, 151), // Kanto dex
    nationalDex: true,
    availablePokemon: createRange(1, 386),
  },

  // Generation 4
  "Diamond/Pearl/Platinum": {
    name: "Diamond/Pearl/Platinum",
    generation: 4,
    regionalDex: createRange(1, 210), // Sinnoh dex
    nationalDex: true,
    availablePokemon: createRange(1, 493),
  },
  "HeartGold/SoulSilver": {
    name: "HeartGold/SoulSilver",
    generation: 4,
    regionalDex: createRange(1, 256), // Johto dex
    nationalDex: true,
    availablePokemon: createRange(1, 493),
  },

  // Generation 5
  "Black/White": {
    name: "Black/White",
    generation: 5,
    regionalDex: createRange(1, 156), // Unova dex
    nationalDex: true,
    availablePokemon: createRange(1, 649),
  },
  "Black 2/White 2": {
    name: "Black 2/White 2",
    generation: 5,
    regionalDex: createRange(1, 301), // Extended Unova dex
    nationalDex: true,
    availablePokemon: createRange(1, 649),
  },

  // Generation 6
  "X/Y": {
    name: "X/Y",
    generation: 6,
    regionalDex: createRange(1, 457), // Kalos dex (Central + Coastal + Mountain)
    nationalDex: true,
    availablePokemon: createRange(1, 721),
  },
  "Omega Ruby/Alpha Sapphire": {
    name: "Omega Ruby/Alpha Sapphire",
    generation: 6,
    regionalDex: createRange(1, 211), // Hoenn dex
    nationalDex: true,
    availablePokemon: createRange(1, 721),
  },

  // Generation 7
  "Sun/Moon": {
    name: "Sun/Moon",
    generation: 7,
    regionalDex: createRange(1, 302), // Alola dex
    nationalDex: false,
    availablePokemon: [
      // Instead of a continuous range, list actual available National Dex numbers
      // Note: This is an abbreviated list - would need to be expanded with all available Pokémon
      1,
      2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      25, 26,
      // More Gen 1 Pokémon...

      // Gen 7 Pokémon
      722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736,
      737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750,
      // Through 802 (Marshadow)
    ],
  },
  "Ultra Sun/Ultra Moon": {
    name: "Ultra Sun/Ultra Moon",
    generation: 7,
    regionalDex: createRange(1, 403), // Extended Alola dex
    nationalDex: false,
    availablePokemon: [
      // Similar to Sun/Moon but with additions up to #807
      // Note: This is an abbreviated list - would need to be expanded with all available Pokémon
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      25, 26,
      // More Gen 1-6 Pokémon...

      // Gen 7 Pokémon including Ultra additions
      722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736,
      737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750,
      // Through 807 (Zeraora)
    ],
  },

  // Generation 8
  "Sword/Shield": {
    name: "Sword/Shield",
    generation: 8,
    regionalDex: createRange(1, 400), // Galar dex
    nationalDex: false,
    availablePokemon: [
      // Kanto Pokémon (Gen 1)
      1, 2, 3, 4, 5, 6, 7, 8, 9, 25, 26, 35, 36, 37, 38, 39, 40, 50, 51, 52, 53,
      54, 55, 58, 59, 77, 78, 79, 80, 81, 82, 90, 91, 92, 93, 94, 95, 98, 99,
      106, 107, 108, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 122, 123,
      124, 125, 126, 127, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139,
      140, 141, 142, 143, 144, 145, 146, 149, 150, 151,

      // Johto Pokémon (Gen 2)
      163, 164, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 182, 183, 184,
      185, 186, 194, 195, 196, 197, 199, 202, 206, 208, 211, 212, 213, 214, 215,
      220, 221, 222, 223, 224, 225, 226, 227, 230, 233, 236, 237, 238, 239, 240,
      241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251,

      // Hoenn Pokémon (Gen 3)
      252, 253, 254, 255, 256, 257, 258, 259, 260, 263, 264, 270, 271, 272, 273,
      274, 275, 278, 279, 280, 281, 282, 290, 291, 292, 293, 294, 295, 298, 302,
      303, 304, 305, 306, 309, 310, 315, 318, 319, 320, 321, 324, 328, 329, 330,
      331, 332, 333, 334, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347,
      348, 349, 350, 359, 360, 361, 362, 363, 364, 365, 369, 371, 372, 373, 374,
      375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385,

      // Sinnoh Pokémon (Gen 4)
      387, 388, 389, 390, 391, 392, 393, 394, 395, 399, 400, 401, 402, 405, 406,
      407, 415, 416, 420, 421, 422, 423, 425, 426, 427, 428, 429, 430, 434, 435,
      436, 437, 438, 439, 440, 442, 443, 444, 445, 447, 448, 449, 450, 451, 452,
      453, 454, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 470, 471,
      473, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488,
      489, 490, 491, 492, 493,

      // Unova Pokémon (Gen 5)
      506, 507, 508, 509, 510, 517, 518, 519, 520, 521, 524, 525, 526, 527, 528,
      529, 530, 532, 533, 534, 535, 536, 537, 538, 539, 543, 544, 545, 546, 547,
      548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562,
      563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577,
      578, 579, 582, 583, 584, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596,
      597, 598, 599, 600, 601, 605, 606, 608, 609, 610, 611, 612, 613, 614, 615,
      616, 617, 618, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632,
      633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647,
      648, 649,

      // Kalos Pokémon (Gen 6)
      650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 674,
      675, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690,
      691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705,
      706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720,
      721,

      // Alola Pokémon (Gen 7)
      722, 723, 724, 725, 726, 727, 728, 729, 730, 736, 737, 738, 742, 743, 744,
      745, 747, 748, 749, 750, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762,
      763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 777, 778, 780, 781,
      782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796,
      797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809,

      // Galar Pokémon (Gen 8)
      810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824,
      825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839,
      840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854,
      855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869,
      870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884,
      885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898,
    ],
  },
  "Brilliant Diamond/Shining Pearl": {
    name: "Brilliant Diamond/Shining Pearl",
    generation: 8,
    regionalDex: createRange(1, 151), // Sinnoh dex
    nationalDex: true,
    availablePokemon: createRange(1, 493), // Only includes Pokémon up to Gen 4
  },
  "Legends: Arceus": {
    name: "Legends: Arceus",
    generation: 8,
    regionalDex: createRange(1, 242), // Hisui dex
    nationalDex: false,
    availablePokemon: [
      // Kanto Pokémon (Gen 1)
      25, 26, 35, 36, 37, 38, 41, 42, 46, 47, 54, 55, 58, 59, 63, 64, 65, 66,
      67, 68, 72, 73, 74, 75, 76, 77, 78, 82, 83, 84, 85, 86, 87, 88, 89, 90,
      91, 92, 93, 94, 95, 100, 101, 108, 111, 112, 113, 114, 115, 120, 121, 122,
      123, 125, 126, 129, 130, 133, 134, 135, 136, 137, 142, 143, 144, 145, 146,
      149, 150, 151,

      // Johto Pokémon (Gen 2)
      155, 156, 157, 172, 173, 174, 175, 176, 182, 184, 190, 196, 197, 198, 199,
      200, 201, 202, 203, 207, 208, 211, 212, 214, 215, 216, 217, 219, 220, 221,
      222, 223, 224, 225, 226, 227, 228, 229, 233, 234, 235, 241, 242, 243, 244,
      245, 249, 250,

      // Hoenn Pokémon (Gen 3)
      255, 256, 257, 287, 288, 289, 298, 299, 359, 361, 362, 363, 364, 365, 371,
      372, 373,

      // Sinnoh Pokémon (Gen 4)
      387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401,
      402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416,
      417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431,
      432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446,
      447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461,
      462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476,
      477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491,
      492, 493,

      // Unova Pokémon (Gen 5)
      570, 571,

      // Kalos Pokémon (Gen 6)
      700,

      // Hisuian Forms and New Evolutions (Gen 8)
      899, 900, 901, 902, 903, 904, 905,
    ],
  },

  // Generation 9
  "Scarlet/Violet": {
    name: "Scarlet/Violet",
    generation: 9,
    regionalDex: createRange(1, 400), // Paldea dex (approx size)
    nationalDex: false,
    availablePokemon: [
      // Kanto Pokémon (Gen 1)
      1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 25, 26, 35, 36, 39, 40, 50, 51, 52, 53, 54,
      55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 72, 73, 79, 80,
      81, 82, 88, 89, 90, 91, 92, 93, 94, 95, 98, 99, 100, 101, 102, 103, 108,
      113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127,
      128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 142, 143, 144, 145, 146,
      147, 148, 149, 150, 151,

      // Johto Pokémon (Gen 2)
      152, 153, 154, 155, 156, 157, 158, 159, 160, 172, 173, 174, 175, 176, 179,
      180, 181, 185, 186, 196, 197, 198, 199, 200, 207, 212, 213, 214, 215, 216,
      217, 219, 222, 223, 224, 225, 226, 227, 228, 229, 231, 232, 234, 235, 236,
      237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251,

      // Hoenn Pokémon (Gen 3)
      252, 253, 254, 255, 256, 257, 258, 259, 260, 263, 264, 270, 271, 272, 273,
      274, 275, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292,
      293, 294, 295, 298, 302, 303, 304, 305, 306, 309, 310, 313, 314, 316, 317,
      318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 332, 333,
      334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348,
      349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363,
      364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378,
      379, 380, 381, 382, 383, 384, 385, 386,

      // Sinnoh Pokémon (Gen 4)
      387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401,
      402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 415, 416, 417, 418, 419,
      420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434,
      435, 436, 437, 438, 439, 440, 442, 443, 444, 445, 446, 447, 448, 449, 450,
      451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465,
      466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480,
      481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493,

      // Unova Pokémon (Gen 5)
      494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508,
      509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523,
      524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538,
      539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553,
      554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568,
      569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583,
      584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598,
      599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613,
      614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628,
      629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643,
      644, 645, 646, 647, 648, 649,

      // Kalos Pokémon (Gen 6)
      650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664,
      665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679,
      680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694,
      695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709,
      710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721,

      // Alola Pokémon (Gen 7)
      722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736,
      737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751,
      752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766,
      767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781,
      782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796,
      797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807,

      // Galar Pokémon (Gen 8)
      808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822,
      823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837,
      838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852,
      853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867,
      868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882,
      883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897,
      898, 899, 900, 901, 902, 903, 904, 905,

      // Paldea Pokémon (Gen 9)
      906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920,
      921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935,
      936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950,
      951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965,
      966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980,
      981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995,
      996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008,

      // DLC Pokémon (Teal Mask and Indigo Disk)
      1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020,
      1021, 1022, 1023, 1024, 1025,
    ],
  },
};
