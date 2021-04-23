package com;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class AdDataBase {
    static List<Ad> ads = Arrays.asList(
            new Ad("1", "Adobe PHOTOSHOP - 12% off", new Date(), "https://www.adobe.com/", "Adobe",
                    "https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg", new String[]{"adobe", "art", "program"}, "12%",
                    new Date(), 5, new String[]{"Wow!", "Norm!", "Super!"}),
            new Ad("2", "Apple - 50% off", new Date(), "https://www.adobe.com/", "Adobe",
                    "https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg", new String[]{"adobe", "art", "program"}, "12%",
                    new Date(), 5, new String[]{"Wow!", "Norm!", "Super!"}),
            new Ad("3", "Tilda - 99% off", new Date(), "https://www.adobe.com/", "Adobe",
                    "https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg", new String[]{"adobe", "art", "program"}, "12%",
                    new Date(), 5, new String[]{"Wow!", "Norm!", "Super!"}));

    public static AdCollection adCollection = new AdCollection(ads);
}
