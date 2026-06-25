// book1_content.js — adapted teaching content (grammar sections + worked
// example sentences) for Madinah Book 1, sourced and adapted from the free
// Madinah Arabic course (madinaharabic.com) and merged into BOOK1 at load.
// Lessons whose original topic was inaccurate also carry titleEnglish/grammar/
// vocab overrides realigned to the source course. Arabic is taken verbatim.

export const LESSON_CONTENT = {
  "4": {
    "sections": [
      {
        "heading": "Prepositions (حُرُوفُ الجَرِّ)",
        "body": "Prepositions are little words that link one thing to another and usually tell you where something is. The three most common ones here are فِي (\"in\"), عَلَى (\"on\"), and مِنْ (\"from\"). So مُحَمَّدٌ فِي الْغُرْفَةِ means \"Muhammad is in the room\" and الْكِتَابُ عَلَى الْمَكْتَبِ means \"the book is on the desk\"."
      },
      {
        "heading": "The genitive case (الْجَرِّ)",
        "body": "Any noun that comes right after a preposition shifts into the genitive case, called مَجْرُور. In practice this means its ending changes to a kasrah sound. A definite noun (with الـ) takes a single kasrah, which is why الْغُرْفَةُ becomes الْغُرْفَةِ after فِي. An indefinite noun instead takes a double kasrah (tanwīn al-kasr, written ـٍ)."
      },
      {
        "heading": "Asking \"where?\" with أَيْنَ",
        "body": "To ask about location, start the question with أَيْنَ (\"where?\"): أَيْنَ الْكِتَابُ؟ means \"where is the book?\". You answer with the same noun plus a preposition phrase, as in الْكِتَابُ عَلَى الْمَكْتَبِ. Notice the noun in the answer stays nominative until a preposition pulls it into the genitive."
      },
      {
        "heading": "Other question words",
        "body": "You can also ask مَنْ (\"who?\") for a person, as in مَنْ فِي الْمَطْبَخِ؟ (\"who is in the kitchen?\"), and مَاذَا (\"what?\") for a thing, as in مَاذَا عَلَى السَّرِيرِ؟ (\"what is on the bed?\"). To make a yes/no question, prefix أَ: أَمُحَمَّدٌ فِي الْحَمَّامِ؟ means \"is Muhammad in the bathroom?\""
      }
    ],
    "sentences": [
      {
        "ar": "أَيْنَ مُحَمَّدٌ؟",
        "translit": "ayna muḥammadun",
        "en": "Where is Muhammad?"
      },
      {
        "ar": "مُحَمَّدٌ فِي الْغُرْفَةِ.",
        "translit": "muḥammadun fī al-ghurfati",
        "en": "Muhammad is in the room."
      },
      {
        "ar": "يَاسِرٌ فِي الحَمَّامِ.",
        "translit": "yāsirun fī al-ḥammāmi",
        "en": "Yasir is in the bathroom."
      },
      {
        "ar": "أَيْنَ الْكِتَابُ؟",
        "translit": "ayna al-kitābu",
        "en": "Where is the book?"
      },
      {
        "ar": "الْكِتَابُ عَلَى الْمَكْتَبِ.",
        "translit": "al-kitābu ʿalā al-maktabi",
        "en": "The book is on the desk."
      },
      {
        "ar": "السَّاعَةُ عَلَى السَّرِيرِ.",
        "translit": "al-sāʿatu ʿalā al-sarīri",
        "en": "The watch is on the bed."
      },
      {
        "ar": "أَمُحَمَّدٌ فِي الْحَمَّامِ؟",
        "translit": "a-muḥammadun fī al-ḥammāmi",
        "en": "Is Muhammad in the bathroom?"
      },
      {
        "ar": "لا، بَلْ فِي الْغُرْفَةِ.",
        "translit": "lā, bal fī al-ghurfati",
        "en": "No, but in the room."
      },
      {
        "ar": "مَنْ فِي الْمَطْبَخِ؟",
        "translit": "man fī al-maṭbakhi",
        "en": "Who is in the kitchen?"
      },
      {
        "ar": "مَاذَا عَلَى السَّرِيرِ؟",
        "translit": "mādhā ʿalā al-sarīri",
        "en": "What is on the bed?"
      },
      {
        "ar": "ذَهَبَ الرَّجُلُ إِلَى الْبَيْتِ.",
        "translit": "dhahaba al-rajulu ilā al-bayti",
        "en": "The man went to the home."
      }
    ]
  },
  "5": {
    "sections": [
      {
        "heading": "The iḍāfah (الإِضَافَةُ)",
        "body": "An iḍāfah is a two-word phrase that links one noun to another to show possession or belonging, like \"the teacher's book\". The first noun is the thing possessed (the مُضَاف) and the second is the owner (the مُضَافٌ إِلَيْهِ). So كِتَابُ الْمُدَرِّسِ literally stacks \"book\" + \"the-teacher\" to mean \"the teacher's book\"."
      },
      {
        "heading": "Rules for the first noun",
        "body": "The first noun (the possessed thing) never wears the definite article الـ and never takes tanwīn (the doubled ending). That is why we say بَيْتُ حَامِدٍ with a single ـُ on بَيْت, not بَيْتٌ. Even though it has no الـ, the phrase still counts as definite because of the owner that follows."
      },
      {
        "heading": "The owner is genitive",
        "body": "The second noun (the owner) goes into the genitive case, which usually shows up as a kasrah ending: مُحَمَّدٍ, الْمُدَرِّسِ, اللهِ. Whether the owner is a name, a place, or a noun with الـ, it keeps this genitive ending."
      },
      {
        "heading": "Asking \"whose?\"",
        "body": "To ask who something belongs to, build the iḍāfah with مَنْ (\"who\") as the owner: قَلَمُ مَنْ هَذَا؟ means \"whose pen is this?\". You answer with a normal iḍāfah, e.g. هَذَا قَلَمُ الْمُدَرِّسِ (\"this is the teacher's pen\")."
      }
    ],
    "sentences": [
      {
        "ar": "كِتَابُ الْمُدَرِّسِ",
        "translit": "kitābu l-mudarrisi",
        "en": "The teacher's book"
      },
      {
        "ar": "قَلَمُ مُحَمَّدٍ",
        "translit": "qalamu muḥammadin",
        "en": "Muhammad's pen"
      },
      {
        "ar": "مَدِينَةُ رُومَا",
        "translit": "madīnatu rūmā",
        "en": "The city of Rome"
      },
      {
        "ar": "قِمَّةُ الْجَبَلِ",
        "translit": "qimmatu l-jabali",
        "en": "The top of the mountain"
      },
      {
        "ar": "الْقُرْآنُ كِتَابُ اللهِ.",
        "translit": "al-qurʾānu kitābu llāhi",
        "en": "The Quran is the Book of Allah."
      },
      {
        "ar": "الْكَعْبَةُ بَيْتُ اللهِ.",
        "translit": "al-kaʿbatu baytu llāhi",
        "en": "The Ka'ba is the house of Allah."
      },
      {
        "ar": "سَيَّارَةُ عَبَّاسٍ فِي الشَّارِعِ.",
        "translit": "sayyāratu ʿabbāsin fī sh-shāriʿi",
        "en": "Abbas's car is in the street."
      },
      {
        "ar": "أَيْنَ بَيْتُ الْمُدَرِّسِ؟",
        "translit": "ayna baytu l-mudarrisi",
        "en": "Where is the teacher's house?"
      },
      {
        "ar": "خَرَجَ الْمُدَرِّسُ مِنْ غُرْفَةِ الْمُدِيرِ.",
        "translit": "kharaja l-mudarrisu min ghurfati l-mudīri",
        "en": "The teacher went out of the principal's room."
      },
      {
        "ar": "بَابُ الْمَسْجِدِ مَفْتُوحٌ.",
        "translit": "bābu l-masjidi maftūḥun",
        "en": "The door of the mosque is open."
      }
    ]
  },
  "8": {
    "sections": [
      {
        "heading": "Calling someone with يَا",
        "body": "When you want to call or address a person directly, you put the vocative particle يَا (\"O\") in front of their name or title. So \"O Ahmad\" becomes يَا أَحْمَدُ, and \"O professor\" becomes يَا أُسْتَاذُ. It works like the way English used to say \"O\" before a name, but in Arabic it is the normal, everyday way to get someone's attention."
      },
      {
        "heading": "The feminine ending ـة",
        "body": "Many nouns are made feminine by adding the tāʾ marbūṭah (ـة) to the end of the masculine form. This little rounded letter is the most common signal that a word refers to a female. You will hear it on words like طَالِبَةٌ (\"a female student\") and سَيِّدَةٌ (\"a lady\")."
      },
      {
        "heading": "Masculine / feminine word pairs",
        "body": "Lots of words for people come in matched pairs: a masculine form and a feminine form that simply adds ـة. For example مُدَرِّسٌ is a male teacher and مُدَرِّسَةٌ is a female teacher; طَبِيبٌ is a male doctor and طَبِيبَةٌ is a female doctor. Once you know the pattern, you can predict the feminine form just by adding the ending."
      },
      {
        "heading": "Family and people words",
        "body": "This revision also gathers useful words for people and family. Notice the pairs أُمٌّ (\"mother\") and أَبٌ (\"father\"), and words like أُخْتٌ (\"sister\"), ابْنَةٌ (\"daughter\"), and زَوْجَةٌ (\"wife\") — several of which carry that same feminine feel. Combine them with يَا to address family members directly."
      }
    ],
    "sentences": [
      {
        "ar": "بِنْتُ الْفَلَّاحِ",
        "translit": "bintu al-fallāḥi",
        "en": "Daughter of the farmer"
      }
    ]
  },
  "9": {
    "sections": [
      {
        "heading": "Describing a noun (الصِّفَة)",
        "body": "An adjective in Arabic is called الصِّفَة, and it comes AFTER the noun it describes, not before it. So \"a small boy\" becomes وَلَدٌ صَغِيرٌ, literally \"a boy small\". When the noun is indefinite (no \"the\"), the adjective is indefinite too, and both carry the \"-un\" tanwīn ending."
      },
      {
        "heading": "Agreement in definiteness and case",
        "body": "The adjective must match its noun. If the noun has الـ (\"the\"), the adjective takes الـ as well: الْغُرْفَةُ النَّظِيفَةُ (\"the clean room\"). It also matches in case ending, which is why both words in الْحَقِيبَةُ الْجَدِيدَةُ share the same final vowel."
      },
      {
        "heading": "Matching gender",
        "body": "A feminine noun needs a feminine adjective, usually formed by adding ـة to the masculine. That is why الْجَدِيدُ (\"new\") becomes الْجَدِيدَةُ to describe the feminine الْحَقِيبَة (\"bag\") or الْمِرْوَحَة (\"fan\")."
      },
      {
        "heading": "The relative pronoun الَّذِي",
        "body": "To say \"the one who\" or \"which\" for a single masculine noun, use الَّذِي. It links a noun to a whole describing clause: هَذَا مُحَمَّدٌ الَّذِي نَجَحَ (\"this is Muhammad who passed\"). The clause after الَّذِي tells you more about the noun, just like an adjective does."
      }
    ],
    "sentences": [
      {
        "ar": "وَلَدٌ صَغِيرٌ",
        "translit": "waladun ṣaghīrun",
        "en": "A small boy"
      },
      {
        "ar": "الْحَقِيبَةُ الْجَدِيدَةُ",
        "translit": "al-ḥaqībatu l-jadīdatu",
        "en": "The new bag"
      },
      {
        "ar": "أَمْرِيكَا بَلَدٌ كَبِيرٌ.",
        "translit": "amrīkā baladun kabīrun",
        "en": "America is a big country."
      },
      {
        "ar": "هَذِهِ الْمِرْوَحَةُ الْجَدِيدَةُ.",
        "translit": "hādhihi l-mirwaḥatu l-jadīdatu",
        "en": "This is the new fan."
      },
      {
        "ar": "النَّوْرَسُ طَيْرٌ جَمِيلٌ.",
        "translit": "an-nawrasu ṭayrun jamīlun",
        "en": "A seagull is a beautiful bird."
      },
      {
        "ar": "هَذَا طَرِيقٌ مُزْدَحِمٌ.",
        "translit": "hādhā ṭarīqun muzdaḥimun",
        "en": "This is a crowded road."
      },
      {
        "ar": "الْغُرْفَةُ النَّظِيفَةُ.",
        "translit": "al-ghurfatu n-naẓīfatu",
        "en": "The clean room."
      },
      {
        "ar": "هَذَا مُحَمَّدٌ الَّذِي نَجَحَ",
        "translit": "hādhā muḥammadun alladhī najaḥa",
        "en": "This is Muhammad who has passed."
      },
      {
        "ar": "هَذَا الْقِطُّ الَّذِي جَلَسَ",
        "translit": "hādhā l-qiṭṭu alladhī jalasa",
        "en": "This is the cat that has sat."
      },
      {
        "ar": "السَّرِيْرُ الَّذِي فِي غُرْفَةِ خَالِدٍ مَكْسُورٌ.",
        "translit": "as-sarīru alladhī fī ghurfati khālidin maksūrun",
        "en": "The bed that is in Khalid's room is broken."
      },
      {
        "ar": "الطَّالِبُ الَّذِي هُوَ جَالِسٌ مِنْ إِنْدُونِيسِيَا.",
        "translit": "aṭ-ṭālibu alladhī huwa jālisun min indūnīsiyā",
        "en": "The student who is sitting is from Indonesia."
      },
      {
        "ar": "الطَّرِيقُ الَّذِي عِنْدَ الْمَدْرَسَةِ مُزْدَحِمٌ.",
        "translit": "aṭ-ṭarīqu alladhī ʿinda l-madrasati muzdaḥimun",
        "en": "The road that is near the school is crowded."
      }
    ]
  },
  "10": {
    "sections": [
      {
        "heading": "The past-tense verb ذَهَبَ",
        "body": "The perfect (past) tense describes an action that already happened. The base form ذَهَبَ means \"he went\", with خَرَجَ (\"he went out\") and رَجَعَ (\"he returned\") following the same pattern. You will often see it followed by a subject, as in ذَهَبَ أَحْمَدُ إِلَى الْعِرَاقِ (\"Ahmad went to Iraq\"). For a female subject, a small ـتْ is added to the verb: خَرَجَتْ آمِنَةُ (\"Amina went out\")."
      },
      {
        "heading": "Addressing a man vs. a woman",
        "body": "To say \"you went\", attach an ending to the verb. Speaking to a male, add ـتَ: ذَهَبْتَ (\"you [m.] went\"), as in لِمَاذَا خَرَجْتَ (\"why did you [m.] go out?\"). Speaking to a female, add ـتِ: ذَهَبْتِ (\"you [f.] went\"), as in أَيْنَ ذَهَبْتِ يَا عَائِشَةُ (\"where did you go, Aisha?\"). To speak about yourself, use ـتُ: ذَهَبْتُ (\"I went\"), and for \"we\" use ـنَا: خَرَجْنَا (\"we went out\")."
      },
      {
        "heading": "Going \"to\" with إِلَى",
        "body": "With verbs of motion like ذَهَبَ, use the preposition إِلَى (\"to / towards\") to name the destination: ذَهَبْتُ إِلَى الْمُسْتَشْفَى (\"I went to the hospital\"). The opposite idea, \"out of / from\", uses مِنْ, as in خَرَجْنَا مِنَ الْجَامِعَةِ (\"we went out of the university\")."
      },
      {
        "heading": "Asking why and when",
        "body": "Two new question words let you probe past actions. لِمَاذَا means \"why?\" and مَتَى means \"when?\". You can also turn a verb into a yes/no question by prefixing أَ, as in أَذَهَبَتْ بِلْقِيسُ إِلَى الْمَطْبَخِ؟ (\"did Bilquees go to the kitchen?\")."
      }
    ],
    "sentences": [
      {
        "ar": "ذَهَبَ أَحْمَدُ إِلَى الْعِرَاقِ.",
        "translit": "dhahaba aḥmadu ilā al-ʿirāqi",
        "en": "Ahmad went to Iraq."
      },
      {
        "ar": "خَرَجَتْ آمِنَةُ مِنَ الْفَصْلِ.",
        "translit": "kharajat āminatu mina al-faṣli",
        "en": "Amina went out of the classroom."
      },
      {
        "ar": "أَيْنَ ذَهَبْتِ يَا عَائِشَةُ؟",
        "translit": "ayna dhahabti yā ʿāʾishatu",
        "en": "Where did you go, O Aisha?"
      },
      {
        "ar": "لِمَاذَا خَرَجْتَ مِن الْمَسْجِدِ؟",
        "translit": "limādhā kharajta mina al-masjidi",
        "en": "Why did you go out of the mosque?"
      },
      {
        "ar": "أَذَهَبَتْ بِلْقِيسُ إِلَى الْمَطْبَخِ؟",
        "translit": "a-dhahabat bilqīsu ilā al-maṭbakhi",
        "en": "Did Bilquees go to the kitchen?"
      },
      {
        "ar": "ذَهَبْتُ إِلَى الْمُسْتَشْفَى.",
        "translit": "dhahabtu ilā al-mustashfā",
        "en": "I went to the hospital."
      },
      {
        "ar": "خَرَجْنَا مِن الْجَامِعَةِ.",
        "translit": "kharajnā mina al-jāmiʿati",
        "en": "We went out of the university."
      },
      {
        "ar": "خَرَجَ خَالِدٌ مَعَ طَلْحَةَ.",
        "translit": "kharaja khālidun maʿa ṭalḥata",
        "en": "Khalid went out with Talha."
      },
      {
        "ar": "ذَهَبْتُ إِلَى حَمْزَةَ.",
        "translit": "dhahabtu ilā ḥamzata",
        "en": "I went to Hamza."
      },
      {
        "ar": "أَذَهَبْتَ عِنْدَ خَالِدٍ؟",
        "translit": "a-dhahabta ʿinda khālidin",
        "en": "Did you go to Khalid?"
      },
      {
        "ar": "لاَ، ذَهَبْتُ عِنْدَ حَنْظَلَةَ.",
        "translit": "lā, dhahabtu ʿinda ḥanẓalata",
        "en": "No, I went to Hanzala."
      }
    ]
  },
  "11": {
    "sections": [
      {
        "heading": "Pronouns stuck onto prepositions",
        "body": "In Arabic you don't say \"in it\" as two separate words. Instead you attach a tiny pronoun to the end of the preposition. So فِي (\"in\") plus \"it\" becomes فِيهِ (\"in it\") for a masculine thing and فِيهَا (\"in it\") for a feminine thing. The same idea gives you عَلَيْهِ (\"on it\"). For example, فِيهِ حَدِيقَةٌ صَغِيرَةٌ means \"in it there is a small garden\"."
      },
      {
        "heading": "Showing possession with عِنْدَ and لِ",
        "body": "Arabic has no verb \"to have\". Instead it uses عِنْدَ (\"with / at\") or لِ (\"for, belonging to\") plus an attached pronoun to express ownership. So عِنْدَهُ and لَهُ both mean \"he has\". When لِ takes the \"I\" ending it becomes لِي (\"I have\"), as in لِي أَخٌ وَاحِدٌ (\"I have one brother\")."
      },
      {
        "heading": "Attaching pronouns to nouns",
        "body": "The same attached endings turn a noun into a possessive: بَيْتِي means \"my house\" and غُرْفَتِي means \"my room\". You can also add endings for other people, such as اسْمُهُ (\"his name\") and اسْمُهَا (\"her name\"). This lets you describe who owns what without any extra words."
      },
      {
        "heading": "The present-tense verb (الْفِعْلُ الْمُضَارِعُ)",
        "body": "This lesson also introduces the present tense, where the verb changes its prefix to match the doer. From أُحِبُّ (\"I love\") you get يُحِبُّ (\"he likes\"), تُحِبُّ (\"she likes / you like\"), and نُحِبُّ (\"we love\"). Notice how the front of the verb signals who is performing the action."
      }
    ],
    "sentences": [
      {
        "ar": "هَذَا بَيْتِي.",
        "translit": "hādhā baytī",
        "en": "This is my house."
      },
      {
        "ar": "فِيهِ حَدِيقَةٌ صَغِيرَةٌ.",
        "translit": "fīhi ḥadīqatun ṣaghīratun",
        "en": "In it there is a small garden."
      },
      {
        "ar": "فِيهَا نَافِذَةٌ كَبِيرَةٌ وَمِرْوَحَةٌ جَمِيلَةٌ.",
        "translit": "fīhā nāfidhatun kabīratun wa-mirwaḥatun jamīlatun",
        "en": "In it is a big window and a beautiful fan."
      },
      {
        "ar": "سَاعَتِي وَقَلَمِي وَكِتَابِي عَلَى الْمَكْتَبِ.",
        "translit": "sāʿatī wa-qalamī wa-kitābī ʿalā l-maktabi",
        "en": "My watch and my pen and my book are on the desk."
      },
      {
        "ar": "هَذِهِ غُرْفَةُ أَخِي وَتِلْكَ غُرْفَةُ أُخْتِي.",
        "translit": "hādhihi ghurfatu akhī wa-tilka ghurfatu ukhtī",
        "en": "This is my brother's room and that is my sister's room."
      },
      {
        "ar": "لِي أَخٌ وَاحِدٌ اسْمُهُ أُسَامَةُ، وَلِي أُخْتٌ وَاحِدَةٌ اسْمُهَا سَنَاءُ.",
        "translit": "lī akhun wāḥidun ismuhu Usāmatu, wa-lī ukhtun wāḥidatun ismuhā Sanāʾu",
        "en": "I have one brother and his name is Usama, and I have one sister and her name is Sana."
      },
      {
        "ar": "أُحِبُّ اللهَ.",
        "translit": "uḥibbu llāha",
        "en": "I love Allah (God)."
      },
      {
        "ar": "يُحِبُّ خَالِدٌ اللُّغَةَ الْعَرَبِيَّةَ.",
        "translit": "yuḥibbu Khālidun al-lughata l-ʿarabiyyata",
        "en": "Khalid likes the Arabic language."
      },
      {
        "ar": "تُحِبُّ فَاطِمَةُ الْقِرَاءَةَ.",
        "translit": "tuḥibbu Fāṭimatu l-qirāʾata",
        "en": "Fatimah likes reading."
      },
      {
        "ar": "نُحِبُّ دِينَنَا.",
        "translit": "nuḥibbu dīnanā",
        "en": "We love our religion."
      },
      {
        "ar": "ذَلِكَ أَبِي أَنَا أُحِبُّهُ.",
        "translit": "dhālika abī anā uḥibbuhu",
        "en": "That is my father, I like him."
      },
      {
        "ar": "تِلْكَ أُمِي أَنَا أُحِبُّهَا.",
        "translit": "tilka ummī anā uḥibbuhā",
        "en": "That is my mother, I like her."
      }
    ]
  },
  "12": {
    "sections": [
      {
        "heading": "Joining clauses with الَّذِي / الَّتِي",
        "body": "Arabic uses a relative pronoun (الاسْمُ الْمَوْصُولُ) to attach a describing clause to a noun, just like English \"who\", \"which\" or \"that\". Use الَّذِي for a single masculine noun and الَّتِي for a single feminine noun. So الرَّجُلُ الَّذِي خَرَجَ means \"the man who went out\", and هَذِهِ فَاطِمَةُ الَّتِي خَرَجَتْ means \"this is Fatima who went out\"."
      },
      {
        "heading": "Only with definite nouns",
        "body": "A key rule: the relative pronoun only appears when the noun it describes is definite (carries الـ or is a name). With an indefinite noun, Arabic drops the pronoun entirely and the clause simply follows the noun. That is why you see الْقَلَمُ الَّذِي... and الْفَتَاةُ الَّتِي... — the nouns are all definite."
      },
      {
        "heading": "The describing clause (صِلَة)",
        "body": "Whatever follows the pronoun is the relative clause, called the صِلَة. It can be a verb (الَّتِي خَرَجَتْ، \"who went out\") or a place phrase (الَّتِي تَحْتَ الْمَكْتَبِ، \"which is under the desk\"). Notice the verb agrees with the noun's gender: a masculine subject takes خَرَجَ, while a feminine one takes خَرَجَتْ with the -at ending."
      }
    ],
    "sentences": [
      {
        "ar": "هَذِهِ فَاطِمَةُ الَّتِي خَرَجَتْ.",
        "translit": "hādhihi fāṭimatu llatī kharajat",
        "en": "This is Fatima who went out."
      },
      {
        "ar": "هَذِهِ النَّافِذَةُ الَّتِي فُتِحَتْ.",
        "translit": "hādhihi n-nāfidhatu llatī futiḥat",
        "en": "This is the window which is open."
      },
      {
        "ar": "هَذِهِ هِيَ الْحَقِيبَةُ الَّتِي تَحْتَ الْمَكْتَبِ.",
        "translit": "hādhihi hiya l-ḥaqībatu llatī taḥta l-maktabi",
        "en": "This is the bag that is under the desk."
      },
      {
        "ar": "السَّيَّارَةُ الَّتِي خَرَجَتِ الآنَ لِي.",
        "translit": "as-sayyāratu llatī kharajati l-āna lī",
        "en": "The car that went out now is mine."
      },
      {
        "ar": "الْقَلَمُ الَّذِي فَوْقَ الْمَكْتَبِ لِنَاصِرٍ.",
        "translit": "al-qalamu lladhī fawqa l-maktabi li-nāṣirin",
        "en": "The pen which is on the desk belongs to Nasir."
      },
      {
        "ar": "تِلْكَ الْهِرَّةُ الَّتِي عَلَى الشَّجَرَةِ لَهَا.",
        "translit": "tilka l-hirratu llatī ʿalā sh-shajarati lahā",
        "en": "That cat which is on the tree belongs to her."
      },
      {
        "ar": "الْفَتَى الَّذِي عِنْدَ السَّبُّورَةِ مِنْ مَالِيزِيَا.",
        "translit": "al-fatā lladhī ʿinda s-sabbūrati min mālīziyā",
        "en": "The young boy who is near the blackboard is from Malaysia."
      },
      {
        "ar": "الْفَتَاةُ الَّتِي ذَهَبَتْ إِلَى السُّوْقِ فَاطِمَةُ.",
        "translit": "al-fatātu llatī dhahabat ilā s-sūqi fāṭimatu",
        "en": "The young lady who went to the market is Fatima."
      },
      {
        "ar": "الْبَيْتُ الَّذِي فِي الشَّارِعِ لِلْوَزِيرِ.",
        "translit": "al-baytu lladhī fī sh-shāriʿi lil-wazīri",
        "en": "The house which is in the street belongs to the minister."
      }
    ]
  },
  "13": {
    "sections": [
      {
        "heading": "Plural demonstratives هَؤُلَاءِ / أُولَئِكَ",
        "body": "When you point at more than one person, the singular هَذَا / هَذِهِ are replaced by a single plural word: هَؤُلَاءِ (\"these\") for people near you, and أُولَئِكَ (\"those\") for people further away. The same word works for both men and women, so هَؤُلَاءِ مُدَرِّسُونَ means \"these are teachers\" and هَؤُلَاءِ مُدَرِّسَاتٌ means \"these are lady teachers\"."
      },
      {
        "heading": "The sound plural جَمْعٌ سَالِمٌ",
        "body": "Many words form their plural by simply adding an ending to the singular, which is why it is called the \"sound\" (intact) plural. Masculine words take ـُونَ in the subject position: مُدَرِّسٌ becomes مُدَرِّسُونَ. Feminine words drop the ة and take ـَاتٌ: مُدَرِّسَةٌ becomes مُدَرِّسَاتٌ, and طَالِبَةٌ becomes طَالِبَاتٌ."
      },
      {
        "heading": "The broken plural جَمْعُ تَكْسِيرٍ",
        "body": "Other words cannot just take an ending; instead their inner shape is reshaped, which is why this is called the \"broken\" plural. For example وَلَدٌ (\"boy\") becomes أَوْلَادٌ, رَجُلٌ (\"man\") becomes رِجَالٌ, and قَلَمٌ (\"pen\") becomes أَقْلَامٌ. There is no single rule — these patterns are learned by exposure, much like irregular plurals in English."
      },
      {
        "heading": "Adjectives agree in number",
        "body": "Unlike English, Arabic adjectives also become plural to match a plural noun. So a single hard-working female student is هَذِهِ الطَّالِبَةُ مُجْتَهِدَةٌ, but several become هَؤُلَاءِ الطَّالِبَاتُ مُجْتَهِدَاتٌ. The noun and its adjective both shift to the plural form together."
      }
    ],
    "sentences": [
      {
        "ar": "هَذَا مُدَرِّسٌ.",
        "translit": "al-mufradu: hādhā mudarrisun",
        "en": "this is a teacher."
      },
      {
        "ar": "هَؤُلاءِ مُدَرِّسُونَ.",
        "translit": "al-jamʿu: hāʾulāʾi mudarrisūn",
        "en": "these are teachers."
      },
      {
        "ar": "هَذِهِ طَالِبَةٌ.",
        "translit": "al-mufradu: hādhihi ṭālibatun",
        "en": "this is a female student."
      },
      {
        "ar": "هَؤُلاءِ طَالِبَاتٌ.",
        "translit": "al-jamʿu: hāʾulāʾi ṭālibātun",
        "en": "these are female students."
      },
      {
        "ar": "هَذَا مُسْلِمٌ.",
        "translit": "hādhā muslimun",
        "en": "This is a Muslim."
      },
      {
        "ar": "هَؤُلاءِ مُسْلِمُونَ.",
        "translit": "hāʾulāʾi muslimūn",
        "en": "These are Muslims."
      },
      {
        "ar": "رَأَيْتُ مُفَتِّشًا.",
        "translit": "raʾaytu mufattishan",
        "en": "I saw an inspector."
      },
      {
        "ar": "رَأَيْتُ مُفَتِّشِينَ.",
        "translit": "raʾaytu mufattishīn",
        "en": "I saw inspectors."
      },
      {
        "ar": "هَذِهِ الطَّالِبَةُ مُجْتَهِدَةٌ.",
        "translit": "hādhihi aṭ-ṭālibatu mujtahidatun",
        "en": "This female student is hard working."
      },
      {
        "ar": "هَؤُلاءِ الطَّالِبَاتُ مُجْتَهِدَاتٌ.",
        "translit": "hāʾulāʾi aṭ-ṭālibātu mujtahidātun",
        "en": "These female students are hard working."
      },
      {
        "ar": "وَلَدٌ \\ أَوْلادٌ",
        "translit": "waladun / awlād",
        "en": "Boy / boys."
      },
      {
        "ar": "رَجُلٌ \\ رِجَالٌ",
        "translit": "rajulun / rijāl",
        "en": "Man / men."
      }
    ]
  },
  "14": {
    "sections": [
      {
        "heading": "The sound masculine plural ـُونَ",
        "body": "To make many masculine nouns plural, simply add the ending ـُونَ. So مُسْلِمٌ (\"a Muslim\") becomes مُسْلِمُونَ (\"Muslims\"), and the same pattern gives you مُؤْمِنُونَ (\"believers\"), كَافِرُونَ (\"disbelievers\"), and فَلَّاحُونَ (\"farmers\"). This is called the جَمْعُ المُذَكَّرِ السَّالِم, the \"sound\" plural, because the singular word stays intact and you only attach a tail to it."
      },
      {
        "heading": "Plural \"those\" with أُولَئِكَ",
        "body": "Just as ذَلِكَ and تِلْكَ mean \"that\" for one masculine or feminine thing far away, أُولَئِكَ means \"those\" for a group of either gender. Compare ذَلِكَ أَبٌ (\"that is a father\") with أُولَئِكَ آبَاءٌ (\"those are fathers\"). You can also ask about a group: مَنْ أُولَئِكَ الرِّجَالُ؟ (\"who are those men?\")."
      },
      {
        "heading": "Plural pronouns: هُمْ, هُنَّ, نَحْنُ",
        "body": "هُمْ means \"they\" for a group of males and هُنَّ means \"they\" for a group of females, while نَحْنُ means \"we\". So هُوَ مُسْلِمٌ (\"he is a Muslim\") becomes هُمْ مُسْلِمُونَ (\"they are Muslims\"). Attached to a noun these pronouns show possession too: بَيْتُهُنَّ (\"their house\") and أَبُوهُمْ (\"their father\")."
      },
      {
        "heading": "Past-tense verbs in the plural",
        "body": "Past-tense verbs change their ending to match a plural subject. A group of males takes ـُوا, as in ذَهَبُوا (\"they went\") and خَرَجُوا (\"they went out\"), while a group of females takes ـنَ, as in وَقَفْنَ (\"they stood\") and جَلَسْنَ (\"they sat\"). Compare the singular وَقَفَتْ (\"she stood\") with the plural وَقَفْنَ."
      }
    ],
    "sentences": [
      {
        "ar": "هُوَ مُسْلِمٌ.",
        "translit": "al-mufradu: huwa muslimun",
        "en": "He is a Muslim"
      },
      {
        "ar": "هُمْ مُسْلِمُونَ.",
        "translit": "al-jamʿu: hum muslimūna",
        "en": "They are Muslims"
      },
      {
        "ar": "ذَلِكَ أَبٌ.",
        "translit": "al-mufradu: dhālika abun",
        "en": "That is a father"
      },
      {
        "ar": "أُولَئِكَ آبَاءٌ.",
        "translit": "al-jamʿu: ulāʾika ābāʾun",
        "en": "Those are fathers"
      },
      {
        "ar": "مَنْ ذَلِكَ الرَّجُلُ؟",
        "translit": "al-mufradu: man dhālika ar-rajulu",
        "en": "Who is that man?"
      },
      {
        "ar": "مَنْ أُولَئِكَ الرِّجَالُ؟",
        "translit": "al-jamʿu: man ulāʾika ar-rijālu",
        "en": "Who are those men?"
      },
      {
        "ar": "هِيَ وَقَفَتْ عِنْدَ الْبَابِ.",
        "translit": "al-mufradu: hiya waqafat ʿinda al-bābi",
        "en": "She stood near the door"
      },
      {
        "ar": "هُنَّ وَقَفْنَ عِنْدَ الْبَابِ.",
        "translit": "al-jamʿu: hunna waqafna ʿinda al-bābi",
        "en": "They stood near the door"
      },
      {
        "ar": "هُوَ ذَهَبَ عِنْدَ الْمُدَرِّسِ.",
        "translit": "al-mufradu: huwa dhahaba ʿinda al-mudarrisi",
        "en": "He went to the teacher"
      },
      {
        "ar": "هُمْ ذَهَبُوْا عِنْدَ الْمُدَرِّسِ.",
        "translit": "al-jamʿu: hum dhahabū ʿinda al-mudarrisi",
        "en": "They went to the teacher"
      },
      {
        "ar": "هَؤُلاءِ الرِّجَالُ حُجَّاجٌ",
        "translit": "hāʾulāʾi ar-rijālu ḥujjājun",
        "en": "These men are pilgrims"
      },
      {
        "ar": "بَعْضُهُمْ مِنَ الْهِنْدِ وَبَعْضُهُمْ مِنَ الصِّيْنِ.",
        "translit": "baʿḍuhum mina al-hindi wa-baʿḍuhum mina aṣ-ṣīni",
        "en": "Some of them are from India and some of them are from China"
      }
    ]
  },
  "17": {
    "sections": [
      {
        "heading": "Plural attached pronouns",
        "body": "Earlier lessons gave you the singular endings (\"my\", \"your\", \"his\", \"her\"). This lesson completes the set with the plural ones: ـنَا (\"our\"), ـكُمْ (\"your\", for a group of men), ـكُنَّ (\"your\", for a group of women), ـهُمْ (\"their\", masculine) and ـهُنَّ (\"their\", feminine). Like the singular endings, they hook onto the back of a noun to show who owns it: بَلَدُنَا means \"our country\" and رَبُّنَا means \"our Lord\"."
      },
      {
        "heading": "Attaching to nouns and prepositions",
        "body": "These endings work just like the singular ones. Add them to a noun for possession, e.g. كِتَابُكُمْ (\"your book\"), or to a preposition such as عِنْدَ to say who has something, e.g. عِنْدَكُمْ (\"you all have\"). Choose ـكُمْ / ـهُمْ for groups that include men and ـكُنَّ / ـهُنَّ for all-female groups, while ـنَا (\"our\") is the same no matter who is in the group."
      },
      {
        "heading": "Rational vs irrational nouns",
        "body": "Arabic sorts nouns into two groups English does not. Rational nouns (عَاقِلٌ) name beings with intellect — humans, angels, and the like — while everything else, such as animals and objects, is irrational (غَيْرُ عَاقِلٍ). This matters because the two groups follow different rules for agreement when you make them plural, so learning to spot which kind a noun is helps you choose the right plural and pronoun."
      },
      {
        "heading": "The broken plural",
        "body": "Many irrational nouns form their plural by reshaping the word from the inside rather than just adding an ending — this is the broken plural, a bit like English \"man → men\". For example كَلْبٌ (\"dog\") becomes كِلابٌ (\"dogs\"), and حِمَارٌ (\"donkey\") becomes حَمِيرٌ (\"donkeys\"). There are over twenty patterns, so the best approach is to memorise each plural together with its singular as you meet it."
      }
    ],
    "sentences": [
      {
        "ar": "غَيْرُ عَاقِلٍ",
        "translit": "ghayru ʿāqilin",
        "en": "Irrational"
      },
      {
        "ar": "كَلْبٌ \\ كِلابٌ",
        "translit": "kalbun / kilābun",
        "en": "Dog / Dogs"
      },
      {
        "ar": "حِمَارٌ \\ حَمِيرٌ",
        "translit": "ḥimārun / ḥamīrun",
        "en": "Donkey / Donkeys"
      },
      {
        "ar": "دَفْتَرٌ \\ دَفَاتِرُ",
        "translit": "daftarun / dafātiru",
        "en": "Note-book / Note-books"
      },
      {
        "ar": "مَكْتَبٌ \\ مَكَاتِبُ",
        "translit": "maktabun / makātibu",
        "en": "Desk / Desks"
      },
      {
        "ar": "فُنْدُقٌ \\ فَنَادِقُ",
        "translit": "funduqun / fanādiqu",
        "en": "Hotel / Hotels"
      }
    ]
  },
  "18": {
    "sections": [
      {
        "heading": "Asking \"how many?\" with كَمْ",
        "body": "To ask about quantity, put كَمْ (\"how many?\") at the start of the question. It is followed directly by the thing you are counting, then the rest of the sentence: كَمْ أَخًا لَكَ؟ means \"how many brothers do you have?\". Notice كَمْ never changes its form, no matter what you are counting."
      },
      {
        "heading": "The counted noun (tamyīz)",
        "body": "The noun right after كَمْ is called the tamyīz, the word that \"specifies\" what is being counted. Unlike earlier lessons, this noun is always singular even when you expect a plural, and it stays indefinite (no الـ). So you say كَمْ عِيدًا, literally \"how many festival?\", not \"festivals\"."
      },
      {
        "heading": "The accusative ending (ـً)",
        "body": "Here you meet the accusative case (mansūb) for the first time in counting. The tamyīz takes a fatḥah with tanwīn, written ـً and pronounced \"-an\": أَخًا (\"a brother\"), عِيدًا (\"a festival\"), عَجَلَةً (\"a wheel\"). This single ending is the signal that the noun is being counted after كَمْ."
      },
      {
        "heading": "Answering a كَمْ question",
        "body": "You answer with a normal statement, not the accusative form. Use لِي (\"I have\") or لَهَا (\"it has\") plus the actual number: لِي أَخٌ وَاحِدٌ (\"I have one brother\") or لَهَا عَجَلَتَانِ (\"it has two wheels\"). The counted noun in the answer returns to its ordinary case."
      }
    ],
    "sentences": [
      {
        "ar": "كَمْ أَخًا لَكَ يَا مُحَمَّدُ؟",
        "translit": "kam akhan laka yā muḥammadu",
        "en": "How many brothers do you have, O Muhammad?"
      },
      {
        "ar": "لِي أَخٌ وَاحِدٌ.",
        "translit": "lī akhun wāḥidun",
        "en": "I have one brother."
      },
      {
        "ar": "وَكَمْ أُخْتًا لَكَ؟",
        "translit": "wa-kam ukhtan laka",
        "en": "And how many sisters do you have?"
      },
      {
        "ar": "لِي أُخْتَانِ.",
        "translit": "lī ukhtāni",
        "en": "I have two sisters."
      },
      {
        "ar": "كَمْ عَجَلَةً لِلدَّرَّاجَةِ يَا حَامِدُ؟",
        "translit": "kam ʿajalatan lid-darrājati yā ḥāmidu",
        "en": "How many wheels does a bicycle have, O Hamid?"
      },
      {
        "ar": "لَهَا عَجَلَتَانِ.",
        "translit": "lahā ʿajalatāni",
        "en": "It has two wheels."
      },
      {
        "ar": "كَمْ عِيدًا فِي السَّنَةِ يَا بَاقِرُ؟",
        "translit": "kam ʿīdan fis-sanati yā bāqiru",
        "en": "How many Eid festivals are there in a year, O Baqir?"
      },
      {
        "ar": "عِيدُ الْفِطْرِ",
        "translit": "ʿīdu l-fiṭri",
        "en": "Eid-ul-Fitr"
      },
      {
        "ar": "عِيدُ الأَضْحَى",
        "translit": "ʿīdu l-aḍḥā",
        "en": "Eid-ul-Adha"
      }
    ]
  },
  "19": {
    "sections": [
      {
        "heading": "The number phrase (الْمُرَكَّبُ الْعَدَدِيُّ)",
        "body": "A \"number phrase\" is simply a number paired with the thing being counted, like \"three books\". For the numbers 3 to 10, the number always comes first and the counted noun follows it: ثَلاثَةُ كُتُبٍ (\"three books\"). The counted noun is plural, since you are talking about more than one."
      },
      {
        "heading": "Counted noun is genitive (مُضَافٌ إِلَيْهِ)",
        "body": "The number works like the first part of an iḍāfa (possession) phrase, so the counted noun after it takes the genitive case, shown by the kasra ending. That is why you hear كُتُبٍ, رِجالٍ, and أَوْلادٍ rather than the nominative form. Think of ثَلاثَةُ أَوْلادٍ as \"a three of boys\"."
      },
      {
        "heading": "Reverse agreement (gender polarity)",
        "body": "Here is the surprising part: with a masculine counted noun, the number 3–10 takes the feminine ـة ending. So \"three boys\" is ثَلاثَةُ أَوْلادٍ and \"four men\" is أَرْبَعَةُ رِجالٍ, even though boys and men are masculine. This flip is called gender polarity, and it applies to all the numbers from 3 to 10."
      },
      {
        "heading": "One and two are different",
        "body": "The numbers one and two do not behave like 3–10. Instead they come after the noun and agree with it normally, like adjectives: كِتَابٌ وَاحِدٌ (\"one book\") and قَلَمَانِ اثْنَانِ (\"two pens\"). Notice the noun for \"two\" is already in its dual form, so the number اثْنَانِ just confirms it."
      }
    ],
    "sentences": [
      {
        "ar": "كِتَابٌ وَاحِدٌ",
        "translit": "kitābun wāḥidun",
        "en": "One book"
      },
      {
        "ar": "قَلَمَانِ اثْنَانِ",
        "translit": "qalamāni ithnāni",
        "en": "Two pens"
      },
      {
        "ar": "ثَلاثَةُ كُتُبٍ",
        "translit": "thalāthatu kutubin",
        "en": "Three books"
      },
      {
        "ar": "أَرْبَعَةُ رِجَالٍ",
        "translit": "arbaʿatu rijālin",
        "en": "Four men"
      },
      {
        "ar": "خَمْسَةُ أَوْلادٍ",
        "translit": "khamsatu awlādin",
        "en": "Five boys"
      },
      {
        "ar": "فِي الْبَيْتِ ثَلاثَةُ أَوْلادٍ.",
        "translit": "fī l-bayti thalāthatu awlādin",
        "en": "In the house, there are three boys."
      },
      {
        "ar": "فِي حَقِيبَتِي خَمْسَةُ أَقْلامٍ.",
        "translit": "fī ḥaqībatī khamsatu aqlāmin",
        "en": "In my bag there are five pens."
      },
      {
        "ar": "فَتَحَ نَاصِرٌ أَرْبَعَةَ أَبْوَابٍ.",
        "translit": "fataḥa nāṣirun arbaʿata abwābin",
        "en": "Nasir opened four doors."
      },
      {
        "ar": "جَلَسَ أَحْمَدُ مَعَ سِتَّةِ مُدَرِّسِينَ.",
        "translit": "jalasa aḥmadu maʿa sittati mudarrisīna",
        "en": "Ahmad sat with six teachers."
      },
      {
        "ar": "أَكَلَ وَاجِدٌ تِسْعَةَ أَعْنَابٍ.",
        "translit": "akala wājidun tisʿata aʿnābin",
        "en": "Wajid ate nine grapes."
      },
      {
        "ar": "عَلَى مَكْتَبِي قَلَمٌ وَاحِدٌ.",
        "translit": "ʿalā maktabī qalamun wāḥidun",
        "en": "One pen is on my desk."
      },
      {
        "ar": "هَذَانِ أَخَوَانِ اثْنَانِ.",
        "translit": "hādhāni akhawāni ithnāni",
        "en": "These are two brothers."
      }
    ]
  },
  "20": {
    "sections": [
      {
        "heading": "Counting feminine nouns (3–10)",
        "body": "For the numbers three to ten, the number comes first and the counted noun follows in its plural form, e.g. ثَلاثُ حَدِيقَاتٍ (\"three gardens\"). The noun is in the genitive case, so you hear the \"-in\" ending (kasratān) at the end. The number itself stays singular regardless of how many things you are counting."
      },
      {
        "heading": "Gender polarity",
        "body": "Arabic numbers 3–10 flip their gender to oppose the noun they count. When the counted noun is feminine, the number takes its plain masculine-looking form with no ـة, e.g. خَمْسُ مُمَرِّضَاتٍ (\"five nurses\") and سِتُّ مُدَرِّسَاتٍ (\"six teachers\"). This is the mirror image of the previous lesson, where masculine nouns took numbers ending in ـة."
      },
      {
        "heading": "One and two are different",
        "body": "The numbers one and two do not follow this rule. For \"one\" you place وَاحِدَةٌ after a single feminine noun, e.g. حَقِيبَةٌ وَاحِدَةٌ (\"one bag\"). For \"two\" you simply use the dual form of the noun itself, optionally adding اثْنَتَانِ for emphasis, e.g. بِنْتَانِ اثْنَتَانِ (\"two daughters\")."
      }
    ],
    "sentences": [
      {
        "ar": "حَقِيبَةٌ وَاحِدَةٌ",
        "translit": "ḥaqībatun wāḥidatun",
        "en": "One bag"
      },
      {
        "ar": "ثَلاثُ حَدِيقَاتٍ",
        "translit": "thalāthu ḥadīqātin",
        "en": "Three gardens"
      },
      {
        "ar": "أَرْبَعُ مَجَلاتٍ",
        "translit": "arbaʿu majallātin",
        "en": "Four magazines"
      },
      {
        "ar": "خَمْسُ مُمَرِّضَاتٍ",
        "translit": "khamsu mumarriḍātin",
        "en": "Five nurses"
      },
      {
        "ar": "سِتُّ مُدَرِّسَاتٍ",
        "translit": "sittu mudarrisātin",
        "en": "Six teachers"
      },
      {
        "ar": "سَبْعُ مَدْرَسَاتٍ",
        "translit": "sabʿu madrasātin",
        "en": "Seven schools"
      },
      {
        "ar": "تِسْعُ بَنَاتٍ",
        "translit": "tisʿu banātin",
        "en": "Nine girls"
      },
      {
        "ar": "عَشْرُ غُرَفٍ",
        "translit": "ʿashru ghurafin",
        "en": "Ten rooms"
      },
      {
        "ar": "لِي بِنْتَانِ اثْنَتَانِ.",
        "translit": "lī bintāni-thnatāni",
        "en": "I have two daughters."
      },
      {
        "ar": "ذَهَبَتْ إِلَى خَمْسِ طَبِيبَاتٍ مُخْتَلِفَاتٍ.",
        "translit": "dhahabat ilā khamsi ṭabībātin mukhtalifātin",
        "en": "She went to five different lady doctors."
      },
      {
        "ar": "جَلَسْتِ مَعَ سِتِّ صَدِيقَاتٍ.",
        "translit": "jalasti maʿa sitti ṣadīqātin",
        "en": "You sat with six friends."
      },
      {
        "ar": "زَارَتْ حَمِيدَةُ ثَمَانِيَ مُدُنٍ.",
        "translit": "zārat ḥamīdatu thamāniya mudunin",
        "en": "Hameeda visited eight cities."
      }
    ]
  },
  "6": {
    "titleEnglish": "This (feminine): هَذِهِ",
    "grammar": "This lesson introduces the feminine demonstrative pronoun هَذِهِ (\"this\"), the counterpart of the masculine هَذَا used in the previous lesson. It is pronounced /hādhihī/ even though it is written without the long alif. The word that follows هَذِهِ must be a feminine noun, such as بِنْتٌ (a girl) or سَيَّارَةٌ (a car). As with هَذَا, the noun after هَذِهِ takes the nominative case: a single ḍammah if it is definite and double ḍammah (tanwīn) if it is indefinite. The lesson also notes that gender in Arabic does not always follow logic — some nouns like الأَرْضُ (the earth) are feminine without any feminine marker — and it presents the preposition لِ meaning \"for\".",
    "vocab": [
      {
        "ar": "هَذِهِ",
        "translit": "hādhihi",
        "en": "this (feminine)"
      },
      {
        "ar": "هَذَا",
        "translit": "hādhā",
        "en": "this (masculine)"
      },
      {
        "ar": "طَبِيبَةٌ",
        "translit": "ṭabībatun",
        "en": "a lady doctor"
      },
      {
        "ar": "فَاكِهَةٌ",
        "translit": "fākihatun",
        "en": "a fruit"
      },
      {
        "ar": "سَيَّارَةٌ",
        "translit": "sayyāratun",
        "en": "a car"
      },
      {
        "ar": "بِنْتٌ",
        "translit": "bintun",
        "en": "a girl / daughter"
      },
      {
        "ar": "حَقِيبَةٌ",
        "translit": "ḥaqībatun",
        "en": "a bag"
      },
      {
        "ar": "وَاقِفَةٌ",
        "translit": "wāqifatun",
        "en": "standing (feminine)"
      },
      {
        "ar": "جَالِسٌ",
        "translit": "jālisun",
        "en": "sitting (masculine)"
      },
      {
        "ar": "الْمُدِيْرِ",
        "translit": "al-mudīri",
        "en": "the principal / manager"
      },
      {
        "ar": "الأَرْضُ",
        "translit": "al-arḍu",
        "en": "the earth"
      },
      {
        "ar": "الْيَدُ",
        "translit": "al-yadu",
        "en": "the hand"
      },
      {
        "ar": "لِ",
        "translit": "li-",
        "en": "for (preposition)"
      }
    ],
    "sections": [
      {
        "heading": "Saying \"this\" for a feminine thing",
        "body": "When you point to a near feminine object, use هَذِهِ instead of the masculine هَذَا. It is read as /hādhihī/ but written without the first alif. The noun that comes after it must be feminine, for example هَذِهِ طَبِيبَةٌ (this is a lady doctor) and هَذِهِ بِنْتٌ (this is a girl)."
      },
      {
        "heading": "Case of the noun after هَذِهِ",
        "body": "Just like هَذَا, the demonstrative هَذِهِ puts the following noun in the nominative case. An indefinite noun takes double ḍammah (tanwīn), as in هَذِهِ سَيَّارَةٌ (this is a car). A definite noun takes a single ḍammah, as in the definite construction هَذِهِ سَيَّارَةُ الْمُدِيْرِ (this is the principal's car)."
      },
      {
        "heading": "Choosing between هَذَا and هَذِهِ",
        "body": "Pick the demonstrative that matches the gender of the noun. Use هَذَا for masculine words and هَذِهِ for feminine ones, often within the same sentence: هَذَا ابْنُ حَامِدٍ وَهَذِهِ بِنْتُ يَاسِرٍ. Be aware that some Arabic nouns are feminine even without a feminine ending, such as الأَرْضُ (the earth) and الْيَدُ (the hand)."
      }
    ],
    "sentences": [
      {
        "ar": "هَذِهِ طَبِيبَةٌ.",
        "translit": "hādhihi ṭabībatun",
        "en": "This is a lady doctor."
      },
      {
        "ar": "هَذِهِ فَاكِهَةٌ.",
        "translit": "hādhihi fākihatun",
        "en": "This is a fruit."
      },
      {
        "ar": "هَذِهِ سَيَّارَةٌ.",
        "translit": "hādhihi sayyāratun",
        "en": "This is a car."
      },
      {
        "ar": "هَذِهِ بِنْتٌ.",
        "translit": "hādhihi bintun",
        "en": "This is a girl."
      },
      {
        "ar": "هَذَا ابْنُ حَامِدٍ.",
        "translit": "hādhā ibnu ḥāmidin",
        "en": "This is the son of Hamid."
      },
      {
        "ar": "وَهَذِهِ بِنْتُ يَاسِرٍ.",
        "translit": "wa-hādhihi bintu yāsirin",
        "en": "And this is the daughter of Yasir."
      },
      {
        "ar": "اِبْنُ حَامِدٍ جَالِسٌ.",
        "translit": "ibnu ḥāmidin jālisun",
        "en": "Hamid's son is sitting."
      },
      {
        "ar": "وَبِنْتُ يَاسِرٍ وَاقِفَةٌ.",
        "translit": "wa-bintu yāsirin wāqifatun",
        "en": "And Yasir's daughter is standing."
      },
      {
        "ar": "سَيَّارَةُ مَنْ هَذِهِ؟",
        "translit": "sayyāratu man hādhihi",
        "en": "Whose car is this?"
      },
      {
        "ar": "هَذِهِ سَيَّارَةُ الْمُدِيْرِ.",
        "translit": "hādhihi sayyāratu al-mudīri",
        "en": "This is the car of the principal."
      }
    ]
  },
  "7": {
    "titleEnglish": "That (feminine): تِلْكَ vs هَذِهِ",
    "grammar": "This lesson introduces the demonstrative noun تِلْكَ (\"that\"), used to point to a distant feminine thing, just as ذَلِكَ points to a distant masculine thing. It contrasts the far demonstratives — أَسْمَاءُ الإِشَارَةِ الْبَعِيدَةِ like ذَلِكَ and تِلْكَ — with the near demonstratives — أَسْمَاءُ الإِشَارَةِ الْقَرِيبَةِ like هَذَا and هَذِهِ. So هَذِهِ means \"this\" for a nearby feminine noun while تِلْكَ means \"that\" for a far one, e.g. تِلْكَ مُدَرِّسَةٌ (\"That is a lady teacher\"). The lesson also notes that when the definite article \"al\" precedes a solar letter, the lām is not pronounced and its assimilation is marked with a shaddah, as in الطَّبِيبُ (\"the doctor\") and السَّمَكُ (\"the fish\").",
    "vocab": [
      {
        "ar": "تِلْكَ",
        "translit": "tilka",
        "en": "that (feminine, far)"
      },
      {
        "ar": "هَذِهِ",
        "translit": "hādhihi",
        "en": "this (feminine, near)"
      },
      {
        "ar": "ذَلِكَ",
        "translit": "dhālika",
        "en": "that (masculine, far)"
      },
      {
        "ar": "امْرَأةٌ",
        "translit": "imra'atun",
        "en": "a lady, a woman"
      },
      {
        "ar": "طِفْلَةٌ",
        "translit": "ṭiflatun",
        "en": "a child (female)"
      },
      {
        "ar": "مُدَرِّسَةٌ",
        "translit": "mudarrisatun",
        "en": "a lady teacher"
      },
      {
        "ar": "حَقِيبَةٌ",
        "translit": "ḥaqībatun",
        "en": "a bag"
      },
      {
        "ar": "كَلْبٌ",
        "translit": "kalbun",
        "en": "a dog"
      },
      {
        "ar": "بَيْضَةٌ",
        "translit": "bayḍatun",
        "en": "an egg"
      },
      {
        "ar": "دَجَاجَةٌ",
        "translit": "dajājatun",
        "en": "a hen"
      },
      {
        "ar": "بَطَّةٌ",
        "translit": "baṭṭatun",
        "en": "a duck"
      },
      {
        "ar": "الطَّبِيبُ",
        "translit": "aṭ-ṭabību",
        "en": "the doctor"
      },
      {
        "ar": "السَّمَكُ",
        "translit": "as-samaku",
        "en": "the fish"
      }
    ],
    "sections": [
      {
        "heading": "Far vs near for feminine nouns",
        "body": "You already know هَذِهِ for \"this\" when pointing at a feminine thing that is close. To point at a feminine thing that is far away, use تِلْكَ (\"that\"). It is the feminine partner of ذَلِكَ, which is used for far masculine things. So you ask مَنْ هَذِهِ؟ about someone near and وَمَنْ تِلْكَ؟ about someone further away."
      },
      {
        "heading": "Two families of demonstratives",
        "body": "Arabic groups demonstratives by distance. The near ones — أَسْمَاءُ الإِشَارَةِ الْقَرِيبَةِ — are هَذَا (masculine) and هَذِهِ (feminine). The far ones — أَسْمَاءُ الإِشَارَةِ الْبَعِيدَةِ — are ذَلِكَ (masculine) and تِلْكَ (feminine). Match the demonstrative to both the gender of the noun and how far away it is."
      },
      {
        "heading": "Putting it together",
        "body": "Use تِلْكَ before a feminine noun to say what something far is, e.g. تِلْكَ طِفْلَةٌ (\"That is a child\") or تِلْكَ بَطَّةٌ (\"That is a duck\"). To turn a statement into a yes/no question, prefix the hamza أَ, as in أَتِلْكَ دَجَاجَةٌ؟ (\"Is that a hen?\"), and answer with لاَ (\"no\") when correcting."
      },
      {
        "heading": "Solar letters and the definite article",
        "body": "When the definite article \"al\" comes before a solar letter, the lām is not pronounced; instead the following letter is doubled with a shaddah. Compare the indefinite طَبِيبٌ (\"a doctor\") with the definite الطَّبِيبُ (\"the doctor\"), and سَمَكٌ (\"a fish\") with السَّمَكُ (\"the fish\")."
      }
    ],
    "sentences": [
      {
        "ar": "مَنْ هَذِهِ؟",
        "translit": "man hādhihi",
        "en": "Who is this?"
      },
      {
        "ar": "هَذِهِ آمِنَةُ.",
        "translit": "hādhihi āminatu",
        "en": "This is Amina."
      },
      {
        "ar": "وَمَنْ تِلْكَ؟",
        "translit": "wa-man tilka",
        "en": "And who is that?"
      },
      {
        "ar": "تِلْكَ فَاطِمَةُ.",
        "translit": "tilka fāṭimatu",
        "en": "That is Fatima."
      },
      {
        "ar": "هَذِهِ امْرَأةٌ.",
        "translit": "hādhihi imra'atun",
        "en": "This is a lady."
      },
      {
        "ar": "تِلْكَ طِفْلَةٌ.",
        "translit": "tilka ṭiflatun",
        "en": "That is a child."
      },
      {
        "ar": "هَذِهِ كَبِيرَةٌ.",
        "translit": "hādhihi kabīratun",
        "en": "This one is big."
      },
      {
        "ar": "وَتِلْكَ صَغِيرَةٌ.",
        "translit": "wa-tilka ṣaghīratun",
        "en": "And that one is small."
      },
      {
        "ar": "مَا ذَلِكَ؟",
        "translit": "mā dhālika",
        "en": "What is that?"
      },
      {
        "ar": "ذَلِكَ كَلْبٌ.",
        "translit": "dhālika kalbun",
        "en": "That is a dog."
      },
      {
        "ar": "أَتِلْكَ دَجَاجَةٌ؟",
        "translit": "a-tilka dajājatun",
        "en": "Is that a hen?"
      },
      {
        "ar": "لاَ، تِلْكَ بَطَّةٌ.",
        "translit": "lā, tilka baṭṭatun",
        "en": "No, that is a duck."
      }
    ]
  },
  "15": {
    "titleEnglish": "Adjectives with iḍāfah, and 'which?' (أَيُّ)",
    "grammar": "This lesson builds on the iḍāfah (possessive) construction by adding an adjective (ṣifah) to it. Because a muḍāf is definite even without al- (ال), any adjective describing it is also definite, as in بَيْتُ الإِمَامِ الْجَدِيدُ (\"the new house of the Imam\"); the same holds when the possessor is a pronoun, e.g. بَيْتُهُ الْجَدِيدُ (\"his new house\"). The adjective always agrees with the muḍāf (not the muḍāf ilaihi) in case and gender, so it follows the case of the possessed noun and takes a feminine ending if that noun is feminine, e.g. حَقِيبَةُ الْوَلَدِ الْقَدِيمَةُ. The lesson also introduces the interrogative أَيُّ (\"which?\"), which behaves as a muḍāf, so the noun after it becomes muḍāf ilaihi and takes the genitive with kasratain, as in أَيُّ بَيْتٍ هَذَا؟. The word أَيُّ itself changes case by its role in the sentence: nominative as a subject (أَيُّ مَدْرَسَةٍ هَذِهِ؟), genitive after a preposition (فِي أَيِّ غُرْفَةٍ), and accusative as a verb's object (أَيَّ لُغَةٍ تُحِبُّ؟).",
    "vocab": [
      {
        "ar": "أَيُّ",
        "translit": "ayyu",
        "en": "which?"
      },
      {
        "ar": "الْمَكْسُورُ",
        "translit": "al-maksūru",
        "en": "broken"
      },
      {
        "ar": "الْمَفْتُوحَةُ",
        "translit": "al-maftūḥatu",
        "en": "opened"
      },
      {
        "ar": "الْقَدِيمَةُ",
        "translit": "al-qadīmatu",
        "en": "old"
      },
      {
        "ar": "الْوَاسِعَةُ",
        "translit": "al-wāsiʿatu",
        "en": "vast, spacious"
      },
      {
        "ar": "سَيَّارَةٌ",
        "translit": "sayyāratun",
        "en": "car"
      },
      {
        "ar": "شَجَرَةُ التُّفَّاحِ",
        "translit": "shajaratu t-tuffāḥi",
        "en": "apple tree"
      },
      {
        "ar": "الْعُصْفُورُ",
        "translit": "al-ʿuṣfūru",
        "en": "the sparrow"
      },
      {
        "ar": "يَوْمٌ",
        "translit": "yawmun",
        "en": "day"
      },
      {
        "ar": "الشَّهْرُ",
        "translit": "ash-shahru",
        "en": "month"
      },
      {
        "ar": "كُلِّيَّةٌ",
        "translit": "kulliyyatun",
        "en": "faculty"
      },
      {
        "ar": "الشَّارِعُ",
        "translit": "ash-shāriʿu",
        "en": "road, street"
      },
      {
        "ar": "الْمَطَارُ",
        "translit": "al-maṭāru",
        "en": "airport"
      },
      {
        "ar": "الأُرْدُن",
        "translit": "al-urdun",
        "en": "Jordan"
      }
    ],
    "sections": [
      {
        "heading": "An adjective on a possessive phrase",
        "body": "A muḍāf is already definite even without al-, so an adjective describing it must also be definite. In بَيْتُ الإِمَامِ الْجَدِيدُ (\"the new house of the Imam\") the adjective الْجَدِيدُ comes after the whole iḍāfah and carries al-. Likewise مَكْتَبُ الْوَلَدِ الْمَكْسُورُ means \"the boy's broken desk\" and نَافِذَةُ الْغُرْفَةِ الْمَفْتُوحَةُ means \"the opened window of the room\"."
      },
      {
        "heading": "Agreement: case and gender follow the muḍāf",
        "body": "The adjective always matches the possessed noun (the muḍāf), not the possessor. It takes the same case as the muḍāf, so in الْكِتَابُ عَلَى مَكْتَبِ الْمُدَرِّسِ الْجَدِيدِ the adjective is genitive to match مَكْتَبِ. It also matches the muḍāf in gender: حَقِيبَةُ الْوَلَدِ الْقَدِيمَةُ uses a feminine adjective because حَقِيبَة is feminine. The same applies when the possessor is a pronoun, e.g. بَيْتُهُ الْجَدِيدُ (\"his new house\") and نَافِذَتُهَا الْمَفْتُوحَةُ (\"its opened window\")."
      },
      {
        "heading": "Asking 'which?' with أَيُّ",
        "body": "أَيُّ (\"which?\") is itself a muḍāf, so the noun after it is muḍāf ilaihi and takes the genitive with kasratain, as in أَيُّ بَيْتٍ هَذَا؟ (\"Which house is this?\"). The form of أَيُّ itself changes by its role: nominative as a subject — أَيُّ مَدْرَسَةٍ هَذِهِ؟; genitive after a preposition — فِي أَيِّ غُرْفَةٍ دَخَلْتَ؟; and accusative as the object of a verb — أَيَّ لُغَةٍ تُحِبُّ؟."
      }
    ],
    "sentences": [
      {
        "ar": "مَكْتَبُ الْوَلَدِ الْمَكْسُورُ",
        "translit": "maktabu l-waladi l-maksūru",
        "en": "The boy's broken desk"
      },
      {
        "ar": "بَيْتُهُ الْجَدِيدُ",
        "translit": "baytuhu l-jadīdu",
        "en": "His new house"
      },
      {
        "ar": "نَافِذَتُهَا الْمَفْتُوحَةُ",
        "translit": "nāfidhatuhā l-maftūḥatu",
        "en": "Its opened window"
      },
      {
        "ar": "هَذِهِ سَيَّارَةُ الْمُدِيرِ الْقَدِيمَةُ.",
        "translit": "hādhihi sayyāratu l-mudīri l-qadīmatu",
        "en": "This is the old car of the director."
      },
      {
        "ar": "الْعُصْفُورُ عَلَى شَجَرَةِ التُّفَّاحِ الْكَبِيرَةِ.",
        "translit": "al-ʿuṣfūru ʿalā shajarati t-tuffāḥi l-kabīrati",
        "en": "The sparrow is on the big apple tree."
      },
      {
        "ar": "أَيُّ بَيْتٍ هَذَا؟",
        "translit": "ayyu baytin hādhā",
        "en": "Which house is this?"
      },
      {
        "ar": "أَيُّ مَدْرَسَةٍ هَذِهِ؟",
        "translit": "ayyu madrasatin hādhihi",
        "en": "Which school is this?"
      },
      {
        "ar": "فِي أَيِّ غُرْفَةٍ دَخَلْتَ؟",
        "translit": "fī ayyi ghurfatin dakhalta",
        "en": "In which room did you enter?"
      },
      {
        "ar": "أَيَّ لُغَةٍ تُحِبُّ؟",
        "translit": "ayya lughatin tuḥibbu",
        "en": "Which language do you like?"
      },
      {
        "ar": "هَذَا شَهْرُ رَجَبٍ.",
        "translit": "hādhā shahru rajabin",
        "en": "This is the month of Rajab."
      },
      {
        "ar": "مِنْ أَيِّ بَلَدٍ أَنْتَ؟",
        "translit": "min ayyi baladin anta",
        "en": "From which country are you?"
      },
      {
        "ar": "أَيَّ كِتَابٍ تُحِبُّونَ؟",
        "translit": "ayya kitābin tuḥibbūna",
        "en": "Which book do you all like?"
      }
    ]
  },
  "16": {
    "titleEnglish": "Feminine Plural Pronouns and Verbs",
    "grammar": "This lesson teaches the feminine plural pronouns and how to form feminine plural past-tense verbs. The detached pronoun for a single female أَنْتِ ('you') becomes أَنْتُنَّ ('you all') in the plural, and the attached possessive كِ ('your') becomes كُنَّ — so كِتَابُكِ ('your book') becomes كِتَابُكُنَّ. For the past-tense (feminine) verb, the singular ذَهَبْتِ becomes the plural ذَهَبْتُنَّ: the /kasrah/ on the تِ is replaced with a /ḍammah/, and a final نّ with /shaddah/ and /fatḥah/ is added. These pronouns are indeclinable, keeping the same ending in every case. The lesson also introduces the time adverbs قَبْلَ ('before') and بَعْدَ ('after') and the new verb رَجَعَ ('he returned').",
    "vocab": [
      {
        "ar": "أَنْتُنَّ",
        "translit": "antunna",
        "en": "you (feminine plural)"
      },
      {
        "ar": "هُنَّ",
        "translit": "hunna",
        "en": "they (feminine plural)"
      },
      {
        "ar": "كُنَّ",
        "translit": "-kunna",
        "en": "your (feminine plural, attached)"
      },
      {
        "ar": "ذَهَبْتُنَّ",
        "translit": "dhahabtunna",
        "en": "you (all, f.) went"
      },
      {
        "ar": "قَبْلَ",
        "translit": "qabla",
        "en": "before"
      },
      {
        "ar": "بَعْدَ",
        "translit": "baʿda",
        "en": "after"
      },
      {
        "ar": "رَجَعَ",
        "translit": "rajaʿa",
        "en": "he returned"
      },
      {
        "ar": "أُسْبُوعٍ",
        "translit": "usbūʿin",
        "en": "a week"
      },
      {
        "ar": "الصَّلاةِ",
        "translit": "aṣ-ṣalāti",
        "en": "the prayer"
      },
      {
        "ar": "الْحَفْلَةِ",
        "translit": "al-ḥaflati",
        "en": "the function/party"
      },
      {
        "ar": "قَرْيَتِي",
        "translit": "qaryatī",
        "en": "my village"
      },
      {
        "ar": "الْقِصَّةَ",
        "translit": "al-qiṣṣata",
        "en": "the story"
      }
    ],
    "sections": [
      {
        "heading": "Feminine plural pronouns",
        "body": "When you address more than one female, the singular detached pronoun أَنْتِ ('you') becomes the plural أَنْتُنَّ ('you all'). Likewise the attached possessive ending كِ ('your') becomes كُنَّ: أُمُّكِ ('your mother') becomes أُمُّكُنَّ ('your mother', for all of you). These pronouns are indeclinable, so the final نّ keeps its /shaddah/ and /fatḥah/ no matter the case. The pronoun هُنَّ ('they', f.) is used for a group of females."
      },
      {
        "heading": "Making the past verb plural",
        "body": "To turn a singular feminine past-tense verb into its plural, change the /kasrah/ on the final تِ into a /ḍammah/ and add a نّ with /shaddah/ and /fatḥah/. So ذَهَبْتِ ('you went') becomes ذَهَبْتُنَّ ('you all went'), and خَرَجْتِ becomes خَرَجْتُنَّ. The verb agrees with the plural female subject: أَنْتُنَّ ذَهَبْتُنَّ."
      },
      {
        "heading": "Before, after, and 'he returned'",
        "body": "The adverbs قَبْلَ ('before') and بَعْدَ ('after') are placed before the noun they relate to, which then takes the genitive case: بَعْدَ الصَّلاةِ ('after the prayer'), قَبْلَ الدَّرْسِ ('before the lesson'). The new verb رَجَعَ ('he returned') is used with مِنْ to say where someone is coming back from, e.g. رَجَعَ خَالِدٌ مِنَ الْمَدْرَسَةِ ('Khalid returned from school')."
      }
    ],
    "sentences": [
      {
        "ar": "أَنْتُنَّ ذَهَبْتُنَّ",
        "translit": "antunna dhahabtunna",
        "en": "You (all) went."
      },
      {
        "ar": "هُنَّ كَتَبْنَ الْقِصَّةَ بَعْدَ أُسْبُوعٍ.",
        "translit": "hunna katabna al-qiṣṣata baʿda usbūʿin",
        "en": "They (fem.) wrote the story after one week."
      },
      {
        "ar": "دَخَلْتُ الْبَيْتَ بَعْدَ الصَّلاةِ.",
        "translit": "dakhaltu al-bayta baʿda aṣ-ṣalāti",
        "en": "I entered the house after the prayer."
      },
      {
        "ar": "ذَهَبْتُ إِلَى الْمَدْرَسَةِ قَبْلَ أَحْمَدَ.",
        "translit": "dhahabtu ilā al-madrasati qabla aḥmada",
        "en": "I went to the school before Ahmad."
      },
      {
        "ar": "ذَهَبَتْ عَائِشَةُ إِلَى الْجَامِعَةِ قَبْلَ الدَّرْسِ.",
        "translit": "dhahabat ʿāʾishatu ilā al-jāmiʿati qabla ad-darsi",
        "en": "Ayesha went to the university before the lesson."
      },
      {
        "ar": "رَجَعَ خَالِدٌ مِنَ الْمَدْرَسَةِ.",
        "translit": "rajaʿa khālidun mina al-madrasati",
        "en": "Khalid returned from school."
      },
      {
        "ar": "تَرْجِعُ آمِنَةُ مِنْ إِيرَانَ.",
        "translit": "tarjiʿu āminatu min īrāna",
        "en": "Aminah is returning from Iran."
      },
      {
        "ar": "هُوَ يَرْجِعُ مِنَ الْحَفْلَةِ.",
        "translit": "huwa yarjiʿu mina al-ḥaflati",
        "en": "He is returning from the function."
      },
      {
        "ar": "أَنَا أَرْجِعُ مِنْ قَرْيَتِي.",
        "translit": "anā arjiʿu min qaryatī",
        "en": "I am returning from my village."
      },
      {
        "ar": "نَحْنُ نَرْجِعُ مِنَ اليُونَانِ.",
        "translit": "naḥnu narjiʿu mina al-yūnāni",
        "en": "We are returning from Greece."
      }
    ]
  },
  "21": {
    "titleEnglish": "Diptotes: Nouns That Refuse Tanwin",
    "grammar": "Most Arabic nouns and adjectives take tanwīn (the double vowel on the final letter), but a class of words called diptotes — الْمَمْنُوعُ مِنَ الصَّرْفِ — never accept it. A word becomes a diptote for specific reasons: feminine proper nouns (فَاطِمَةُ، حَسْنَاءُ), masculine proper nouns ending in tā' marbūṭah (حَمْزَةُ) or on the pattern أَفْعَلُ (أَنْوَرُ), non-Arabic proper nouns (بَاكِسْتَانُ), adjectives on the patterns أَفْعَلُ (أَسْوَدُ) or فَعْلاَنُ (عَطْشَانُ), and many broken-plural patterns such as مَفَاعِلُ (مَسَاجِدُ) and مَفَاعِيلُ (مَفَاتِيحُ). In place of tanwīn, a diptote takes a single ḍammah when otherwise indefinite. Note that tanwīn is also dropped for ordinary reasons — when a noun carries the definite article الْ, when it is a muḍāf in a possessive construction, or when it follows the vocative particle يَا — but diptotes lack tanwīn by their very nature.",
    "vocab": [
      {
        "ar": "فَاطِمَةُ",
        "translit": "Fāṭimatu",
        "en": "Fatima (a name)"
      },
      {
        "ar": "حَسْنَاءُ",
        "translit": "Ḥasnā'u",
        "en": "Hasnaa (a name)"
      },
      {
        "ar": "حَمْزَةُ",
        "translit": "Ḥamzatu",
        "en": "Hamza (a name)"
      },
      {
        "ar": "أَنْوَرُ",
        "translit": "Anwaru",
        "en": "Anwar (a name)"
      },
      {
        "ar": "أَسْوَدُ",
        "translit": "aswadu",
        "en": "black"
      },
      {
        "ar": "عَطْشَانُ",
        "translit": "'aṭshānu",
        "en": "thirsty"
      },
      {
        "ar": "بَاكِسْتَانُ",
        "translit": "Bākistānu",
        "en": "Pakistan"
      },
      {
        "ar": "أَطِبَّاءُ",
        "translit": "aṭibbā'u",
        "en": "doctors"
      },
      {
        "ar": "وُكَلاءُ",
        "translit": "wukalā'u",
        "en": "agents"
      },
      {
        "ar": "مَسَاجِدُ",
        "translit": "masājidu",
        "en": "mosques"
      },
      {
        "ar": "مَفَاتِيحُ",
        "translit": "mafātīḥu",
        "en": "keys"
      },
      {
        "ar": "مَنَادِيلُ",
        "translit": "manādīlu",
        "en": "handkerchiefs"
      },
      {
        "ar": "فُقَرَاءُ",
        "translit": "fuqarā'u",
        "en": "poor people"
      },
      {
        "ar": "أَغْنِيَاءُ",
        "translit": "aghniyā'u",
        "en": "rich people"
      }
    ],
    "sections": [
      {
        "heading": "What a diptote is",
        "body": "A diptote is a noun or adjective that, by its own nature, refuses tanwīn — the double vowel sign on the final letter. In Arabic this category is called الْمَمْنُوعُ مِنَ الصَّرْفِ, and in English we call such words diptotes. Where an ordinary indefinite noun would end in a double ḍammah, a diptote takes only a single ḍammah, as in هَذِهِ مَسَاجِدُ جَمِيلَةٌ."
      },
      {
        "heading": "Names and adjectives that are diptotes",
        "body": "Proper nouns are a major source of diptotes: feminine names like فَاطِمَةُ and حَسْنَاءُ, masculine names ending in tā' marbūṭah like حَمْزَةُ, names on the pattern أَفْعَلُ like أَنْوَرُ, and non-Arabic names like بَاكِسْتَانُ. Adjectives also become diptotes when they follow the patterns أَفْعَلُ (e.g. أَسْوَدُ, 'black') or فَعْلاَنُ (e.g. عَطْشَانُ, 'thirsty')."
      },
      {
        "heading": "Broken plurals as diptotes",
        "body": "Many broken-plural patterns are diptotes and never take tanwīn — for example مَفَاعِلُ (مَسَاجِدُ, mosques), مَفَاعِيلُ (مَفَاتِيحُ، مَنَادِيلُ), أَفْعِلاءُ (أَطِبَّاءُ, doctors), and فُعَلاءُ (وُكَلاءُ, agents; also فُقَرَاءُ and أَغْنِيَاءُ). Notice the single final ḍammah in هَؤُلاءُ التُّجَارُ أَغْنِيَاءُ."
      },
      {
        "heading": "Tanwin dropped for other reasons too",
        "body": "Separately from diptotes, an ordinary noun also loses its tanwīn in three familiar situations: when it carries the definite article الْ (كِتَابٌ → الْكِتَابُ), when it is the first term of a possessive construction, a muḍāf (كِتَابُ بِلالٍ), and when it follows the vocative particle يَا (أُسْتَاذٌ → يَا أُسْتَاذُ). In these cases the word would otherwise be fully declinable; with a diptote, the tanwīn is absent regardless."
      }
    ],
    "sentences": [
      {
        "ar": "هَذِهِ أسْمَاءُ، هِيَ أُخْتِي.",
        "translit": "hādhihi Asmā'u, hiya ukhtī",
        "en": "This is Asma, she is my sister."
      },
      {
        "ar": "أَكَلَتْ مَرْيَمُ الطَّعَامَ.",
        "translit": "akalat Maryamu aṭ-ṭa'āma",
        "en": "Maryam ate the food."
      },
      {
        "ar": "فِي الشَّوَارِعِ فُقَرَاءُ.",
        "translit": "fī ash-shawāri'i fuqarā'u",
        "en": "In the streets there are poor people."
      },
      {
        "ar": "شُرَكَاءُ كَثِيرُونَ ذَهَبُوا مَعًا.",
        "translit": "shurakā'u kathīrūna dhahabū ma'an",
        "en": "Many partners went together."
      },
      {
        "ar": "هَؤُلاءُ التُّجَارُ أَغْنِيَاءُ.",
        "translit": "hā'ulā'i at-tujjāru aghniyā'u",
        "en": "These merchants are rich."
      },
      {
        "ar": "هَذِهِ مَسَاجِدُ جَمِيلَةٌ.",
        "translit": "hādhihi masājidu jamīlatun",
        "en": "These are beautiful mosques."
      },
      {
        "ar": "هَذِهِ مَكَاتِبُ خَشَبِيَّةٌ.",
        "translit": "hādhihi makātibu khashabiyyatun",
        "en": "These are wooden desks."
      },
      {
        "ar": "هَذِهِ مَنَادِيلُ وَسِخَةٌ.",
        "translit": "hādhihi manādīlu wasikhatun",
        "en": "These handkerchiefs are dirty."
      },
      {
        "ar": "رَبُّ الْعَالَمِينِ",
        "translit": "rabbu al-'ālamīn",
        "en": "The Lord of the Universe."
      },
      {
        "ar": "خَالِقُ الْكَوْنِ",
        "translit": "khāliqu al-kawn",
        "en": "The Creator of the Universe."
      }
    ]
  },
  "22": {
    "titleEnglish": "Cases of Diptotes",
    "grammar": "This lesson teaches how diptotes (اَلْمَمْنُوعُ مِنَ الصَّرْفِ) take their case endings. Unlike ordinary nouns, diptotes never take /tanwīn/ (the double vowel mark), and in the genitive case they refuse the usual /kasrah/. So whenever a diptote follows a preposition or is the possessed noun (مُضَافٌ إِلَيْهِ) of an annexation, it takes a single /fatħah/ instead of a /kasrah/, as in كِتَابُ أَحْمَدَ and خَرَجَ الضُّيُوفُ مِنْ فَنَادِقَ. In the accusative case, where a diptote is the object of a verb (مَفْعُولٌ), it likewise takes a single /fatħah/ rather than the double vowels of an ordinary noun, as in زَارَ طَاهِرٌ مَسَاجِدَ كَثِيرَةً. In short, a diptote shows nominative with a single /ḍammah/ but uses a single /fatħah/ for both the accusative and the genitive.",
    "vocab": [
      {
        "ar": "سَمَكَةٌ",
        "translit": "samakatun",
        "en": "a fish"
      },
      {
        "ar": "اَلْغَدَاءُ",
        "translit": "al-ghadā'u",
        "en": "the meal / lunch"
      },
      {
        "ar": "اَلذَّهَبِيَّةُ",
        "translit": "adh-dhahabiyyatu",
        "en": "golden"
      },
      {
        "ar": "خَشَبِيَّةٌ",
        "translit": "khashabiyyatun",
        "en": "wooden"
      },
      {
        "ar": "اَلضُّيُوفُ",
        "translit": "aḍ-ḍuyūfu",
        "en": "the guests"
      },
      {
        "ar": "فَنَادِقَ",
        "translit": "fanādiqa",
        "en": "hotels (diptote)"
      },
      {
        "ar": "مَنَازِلَ",
        "translit": "manāzila",
        "en": "buildings / dwellings (diptote)"
      },
      {
        "ar": "مَكَاتِبَ",
        "translit": "makātiba",
        "en": "desks (diptote)"
      },
      {
        "ar": "مَفَاتِيحَ",
        "translit": "mafātīḥa",
        "en": "keys (diptote)"
      },
      {
        "ar": "مَسَاجِدَ",
        "translit": "masājida",
        "en": "mosques (diptote)"
      },
      {
        "ar": "أَسْوَدَ",
        "translit": "aswada",
        "en": "black (diptote)"
      },
      {
        "ar": "بَارِيسُ",
        "translit": "bārīsu",
        "en": "Paris"
      },
      {
        "ar": "لَنْدَنُ",
        "translit": "landanu",
        "en": "London"
      },
      {
        "ar": "جُدَّةُ",
        "translit": "juddatu",
        "en": "Jeddah"
      }
    ],
    "sections": [
      {
        "heading": "What is a diptote?",
        "body": "A diptote is a noun or adjective that never accepts /tanwīn/. Where an ordinary noun would show double vowels (e.g. تُفَّاحًا, مَسْجِدٍ), a diptote refuses them and works with single vowel marks instead. You already met these words in earlier lessons; here you learn how they behave grammatically across the cases."
      },
      {
        "heading": "The genitive: fatḥah, not kasrah",
        "body": "Ordinary nouns take /kasrah/ in the genitive — single after ال (مِنَ الْبَيْتِ) and double when indefinite (فِي مَسْجِدٍ). A diptote breaks this rule: after a preposition or as the possessed noun of an annexation it takes a single /fatḥah/ instead, as in خَرَجَ الضُّيُوفُ مِنْ فَنَادِقَ and كِتَابُ أَحْمَدَ."
      },
      {
        "heading": "The accusative: a single fatḥah",
        "body": "When a noun is the object of a verb (مَفْعُولٌ), an ordinary noun takes double fatḥah (أَكَلَ خَالِدٌ تُفَّاحًا). A diptote, having no /tanwīn/, takes only a single /fatḥah/, as in زَارَ طَاهِرٌ مَسَاجِدَ كَثِيرَةً and دَخَلَ يُوسُفُ مَنَازِلَ."
      },
      {
        "heading": "Putting it together",
        "body": "Remember the simple pattern: a diptote shows the nominative with a single /ḍammah/, and uses the same single /fatḥah/ for both the accusative and the genitive. Watch the case endings in the example sentences — the noun ending in a single fatḥah where you might expect a kasrah or tanwīn is the tell-tale sign of a diptote."
      }
    ],
    "sentences": [
      {
        "ar": "دَخَلَ يُوسُفُ مَنَازِلَ.",
        "translit": "dakhala yūsufu manāzila",
        "en": "Yusuf entered buildings."
      },
      {
        "ar": "خَرَجَ الضُّيُوفُ مِنْ فَنَادِقَ.",
        "translit": "kharaja aḍ-ḍuyūfu min fanādiqa",
        "en": "The guests went out of hotels."
      },
      {
        "ar": "اِشْتَرَيْتُ مَكَاتِبَ خَشَبِيَّةً.",
        "translit": "ishtaraytu makātiba khashabiyyatan",
        "en": "I bought wooden desks."
      },
      {
        "ar": "أَخَذَ نَاصِرٌ مَفَاتِيحَ الْبَيْتِ.",
        "translit": "akhadha nāṣirun mafātīḥa al-bayti",
        "en": "Nasir took the keys of the house."
      },
      {
        "ar": "اِشْتَرَى الْوَلَدُ قَلَمًا أَسْوَدَ.",
        "translit": "ishtarā al-waladu qalaman aswada",
        "en": "The boy bought a black pen."
      },
      {
        "ar": "زَارَ طَاهِرٌ مَسَاجِدَ كَثِيرَةً",
        "translit": "zāra ṭāhirun masājida kathīratan",
        "en": "Tahir visited many mosques."
      },
      {
        "ar": "أَنَا مِنْ بَاكِسْتَانَ .",
        "translit": "anā min bākistāna",
        "en": "I am from Pakistan."
      },
      {
        "ar": "اِسْمِي أَنْوَرُ .",
        "translit": "ismī anwaru",
        "en": "My name is Anwar."
      }
    ]
  },
  "23": {
    "titleEnglish": "Arabic Nouns and Their Types",
    "grammar": "In Arabic a meaningful word falls into three categories: the noun اَلاسْمُ, the verb اَلْفِعْلُ, and the particle اَلْحَرْفُ. A noun names a person, place, or thing, and it is either definite اَلْمَعْرِفَةُ (a specific person, place, or thing, e.g. مُحَمَّدٌ, مَكَّةُ) or indefinite اَلنَّكِرَةُ (an unspecific one, e.g. رَجُلٌ, كِتَابٌ). Nouns are also classed by gender — masculine اَلْمُذَكَّرُ and feminine اَلْمُؤَنَّثُ — and by number: singular الْمُفْرَدُ, dual الْمُثَنَّى, and plural اَلْجَمْعُ. A definite noun has six types, the first of which is the proper noun اَلْعَلَمُ, the name of a particular person, place, or thing such as a country, river, mountain, or tribe. Like ordinary nouns, the proper noun takes a ḍammah in the nominative, a fatḥah in the accusative, and a kasrah in the genitive, unless it is a diptote, which follows the diptote rule.",
    "vocab": [
      {
        "ar": "اَلاسْمُ",
        "translit": "al-ism",
        "en": "noun"
      },
      {
        "ar": "اَلْفِعْلُ",
        "translit": "al-fiʿl",
        "en": "verb"
      },
      {
        "ar": "اَلْحَرْفُ",
        "translit": "al-ḥarf",
        "en": "particle"
      },
      {
        "ar": "الْمَعْرِفَةُ",
        "translit": "al-maʿrifah",
        "en": "definite noun"
      },
      {
        "ar": "اَلنَّكِرَةُ",
        "translit": "an-nakirah",
        "en": "indefinite noun"
      },
      {
        "ar": "اَلْعَلَمُ",
        "translit": "al-ʿalam",
        "en": "proper noun"
      },
      {
        "ar": "اَلْمُذَكَّرُ",
        "translit": "al-mudhakkar",
        "en": "masculine"
      },
      {
        "ar": "اَلْمُؤَنَّثُ",
        "translit": "al-muʾannath",
        "en": "feminine"
      },
      {
        "ar": "الْمُفْرَدُ",
        "translit": "al-mufrad",
        "en": "singular"
      },
      {
        "ar": "الْمُثَنَّى",
        "translit": "al-muthannā",
        "en": "dual"
      },
      {
        "ar": "اَلْجَمْعُ",
        "translit": "al-jamʿ",
        "en": "plural"
      },
      {
        "ar": "رَجُلٌ",
        "translit": "rajulun",
        "en": "a man"
      },
      {
        "ar": "كِتَابٌ",
        "translit": "kitābun",
        "en": "a book"
      },
      {
        "ar": "مَدِينَةٌ",
        "translit": "madīnatun",
        "en": "a city"
      }
    ],
    "sections": [
      {
        "heading": "The three kinds of words",
        "body": "Every meaningful Arabic word is a noun اَلاسْمُ, a verb اَلْفِعْلُ, or a particle اَلْحَرْفُ. A noun is simply a word that names a person, a place, or a thing. This lesson focuses on the noun and its types, beginning with how nouns are classified."
      },
      {
        "heading": "Definite vs. indefinite",
        "body": "An indefinite noun (اَلنَّكِرَةُ) names something unspecific — a man رَجُلٌ, a book كِتَابٌ, a city مَدِينَةٌ. A definite noun (الْمَعْرِفَةُ) names something specific — Muhammad مُحَمَّدٌ, Makkah مَكَّةُ, or the Black Stone اَلْحَجَرُ الأَسْوَدُ. Nouns are further sorted by gender (masculine اَلْمُذَكَّرُ, feminine اَلْمُؤَنَّثُ) and by number (singular, dual, and plural)."
      },
      {
        "heading": "The proper noun (اَلْعَلَمُ)",
        "body": "A proper noun is the name of one specific person, place, or thing — for example حَامِدٌ (Hamid), قُرْآنٌ (Qur'an), or مَدِينَةٌ (Madinah). It can be the name of a country, person, tribe, river, ocean, or mountain. It takes the same case endings as ordinary nouns: ḍammah for nominative, fatḥah for accusative, and kasrah for genitive — except diptotes, which follow their own rule."
      }
    ],
    "sentences": [
      {
        "ar": "الْحَجَرُ الأَسْوَدُ",
        "translit": "al-ḥajaru al-aswadu",
        "en": "The Black Stone"
      },
      {
        "ar": "شَاطِئُ الْبَحْرِ",
        "translit": "shāṭiʾu al-baḥri",
        "en": "The beach"
      },
      {
        "ar": "الْبَحْرُ الأَحْمَرُ",
        "translit": "al-baḥru al-aḥmaru",
        "en": "The Red Sea"
      },
      {
        "ar": "مَاءُ زَمْزَمَ",
        "translit": "māʾu zamzama",
        "en": "The Zamzam water"
      },
      {
        "ar": "كِتَابُ اللهِ",
        "translit": "kitābu llāhi",
        "en": "Book of Allah (God)"
      },
      {
        "ar": "غَارُ حِرَاءَ",
        "translit": "ghāru ḥirāʾa",
        "en": "Cave of Hira"
      },
      {
        "ar": "اِبْنُ مَرْيَمَ",
        "translit": "ibnu maryama",
        "en": "Son of Mary"
      },
      {
        "ar": "بَيْتُ الْمَقْدِسِ",
        "translit": "baytu al-maqdisi",
        "en": "The Holy House"
      },
      {
        "ar": "مَسَحْتُ الْحَجَرَ الأَسْوَدَ",
        "translit": "masaḥtu al-ḥajara al-aswada",
        "en": "I rubbed the Black Stone"
      },
      {
        "ar": "شَرِبْتُ مَاءَ زَمْزَمَ",
        "translit": "sharibtu māʾa zamzama",
        "en": "I drank the Zamzam water"
      },
      {
        "ar": "هَذَا جَبَلُ طَارِقٍ",
        "translit": "hādhā jabalu ṭāriqin",
        "en": "This is the Mountain of Tariq"
      }
    ]
  }
};
