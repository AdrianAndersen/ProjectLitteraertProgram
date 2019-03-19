// jshint esversion: 6

let dialketKjennetegn = [
    vestlandsk = {
        fylker: ["Aust-Agder", "Vest-Agder", "Rogaland", "Sogn og Fjordane", "Møre og Romsdal"],
        tjukkL: "Nei\n" + "Bortsett fra noen områder i Møre og Romsdal",
        palatalisering: "Nei\n" + "Bortsett fra området nord for Sognefjorden",
        infinitiv: "E-infinitiv i Agder og i Møre og Romsdal" + "A-infinitiv i Rogaland og Hordaland",
        personligePronomen: "Mest \"eg/e/i\" i entall \n" +
            "og \"me/mi\" i flertall",
        svakeHunkjonnsord: "Mest -o/-å \n" +
            "(eks:: \"klokkå\")\n" +
            "Men en del -a i Agder og S og Fj\n",
        sterkeHunkjonnsord: "Svært blandet.\n" +
            "-a i sør og nord (\"eks.: \"boka\")\n" +
            "Ellers -o/-å (kysten) \n" +
            "eller -e/-i/-æ/-ei (innlandet)",
        skarreR: "Ja.\n" +
            "Minus området nord for Sognefjordane",
        bloteKonsonanter: "Ja,\n" +
            "på Agderkysten og i det meste av Rogaland. \n" +
            "Ellers harde kons."
    },

    østlandsk = {
        fylker: ["Telemark", "Vestfold", "Østfold", "Akershus", "Buskerud", "Oppland", "Hedmark"],
        tjukkL: "Ja\n" + "Bortsett fra Vest-Telemark",
        palatalisering: "Nei\n" + "Bortsett fra Hedmark og nordlige Oppland",
        infinitiv: "Kløyvd infinitiv\n" +
            "a-ending i noen verb.\n" +
            "e-ending i de andre.",
        personligePronomen: "Lavlandet har mest \"jeg/je\" og \"vi/ve\"\n" +
            "Fjellbygdene i vest følger Vestlandsk.\n" +
            "Nordlige Oppland har flertall \"oss\".",
        svakeHunkjonnsord: "Bare -a (eks.: \"klokka\")",
        sterkeHunkjonnsord: "Mest -a.\n" +
            "Men -e/-i/-æ/-ei i fjellbygdene i vest.",
        skarreR: "Nei",
        bloteKonsonanter: "Nei"
    },

    trøndsk = {
        fylker: ["Møre og Romsdal", "Sør-Trøndelag", "Nord-Trøndelag"],
        tjukkL: "Ja",
        palatalisering: "Ja",
        infinitiv: "Kløyvd infinitiv\n" +
            "a- eller å-ending i noen verb.\n" +
            "Ingen ending i de andre (apokope).",
        personligePronomen: "Svært vekslende",
        svakeHunkjonnsord: "Mest -a\n" +
            "Men noe -o/-å på kysten sør for Trondh.fjorden",
        sterkeHunkjonnsord: "Bare -a",
        skarreR: "Nei",
        bloteKonsonanter: "Nei"
    },

    nordnorsk = {
        fylker: ["Nordland", "Troms", "Finnmark"],
        tjukkL: "Nei\n" +
            "Bortsett fra i det meste av Nordland og i Bardu og Målselv",
        palatalisering: "Ja",
        infinitiv: "E-infinitiv.\n" +
            "Men ending forsvinner i alle eller de fleste verb i Nordland.\n" +
            "Kløyvd inf. i Bardu og Målselv.",
        personligePronomen: "Mest \"æg/æ\" i entall\n" +
            "og \"vi/ve\" i flertall",
        svakeHunkjonnsord: "Mest -a\n" +
            "Minus Nordland hvor det veksler svært.",
        sterkeHunkjonnsord: "Bare -a",
        skarreR: "Nei",
        bloteKonsonanter: "Nei"
    }
];
