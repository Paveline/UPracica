package com;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

public class AdCollection {
    private List<Ad> adList;

    public AdCollection() {
        this.adList = new ArrayList<Ad>();
    }

    public AdCollection(List<Ad> adList) {
        this.adList = adList;
    }

    //getAds(1,4,"vendor:Adobe");
    public List<Ad> getAds(int skip, int top, String filter) {

        List<Ad> resultAds;

        if (filter != null) {
            String[] filterOptions = filter.split(":");
            if (filterOptions[0].equals("vendor")) {
                resultAds = this.getAdsByVendor(filterOptions[1]);
            } else {
                resultAds = new ArrayList<Ad>(this.adList);
            }
        } else {
            resultAds = new ArrayList<Ad>(this.adList);
        }

        resultAds.sort(Comparator.comparing(Ad::getCreatedAt));

        if (resultAds.size() != 0) {
            int border = skip + top;
            if (skip > resultAds.size()) {
                return resultAds;
            } else if (border > resultAds.size()) {
                resultAds = resultAds.subList(skip, resultAds.size());
            } else {
                resultAds = resultAds.subList(skip, border);
            }
        }

        return resultAds;
    }

    private List<Ad> getAdsByVendor(String vendorName) {
        List<Ad> resultAds = new ArrayList<>();

        for (Ad ad : this.adList) {
            if (ad.getVendor().equals(vendorName)) {
                resultAds.add(ad);
            }
        }

        return resultAds;
    }

    public List<Ad> getAllAds(){
        return this.adList;
    }

    public Ad get(String id) {
        Ad resultAd = null;

        for (int i = 0; i < this.adList.size(); i++) {
            if (this.adList.get(i).getId().equals(id)) {
                resultAd = this.adList.get(i);
            }
        }

        if (resultAd != null)
            return resultAd;
        else
            return new Ad();
    }

    public boolean add(Ad item) {
        for (int i = 0; i < this.adList.size(); i++) {
            if (this.adList.get(i).getId().equals(item.getId())) {
                return false;
            }
        }

        if (AdCollection.validate(item)) {
            this.adList.add(item);
            return true;
        } else {
            return false;
        }
    }

    public List<Ad> addAll(List<Ad> ads) {
        List<Ad> notValidatedAds = new ArrayList<>();
        for (Ad ad : ads) {
            if (!this.add(ad)) {
                notValidatedAds.add(ad);
            }
        }

        return notValidatedAds;
    }

    public boolean edit(String id, Ad item) {
        Ad currentAd = get(id);

        if (currentAd == null) {
            return false;
        }

        Ad cloneAd = new Ad(currentAd);

        Field[] fields = cloneAd.getClass().getDeclaredFields();
        for (Field f : fields) {
            switch (f.getName()) {
                case "description": {
                    cloneAd.setDescription(item.getDescription());
                    break;
                }
                case "link": {
                    cloneAd.setLink(item.getLink());
                    break;
                }
                case "photoLink": {
                    cloneAd.setPhotoLink(item.getPhotoLink());
                    break;
                }
                case "hashTags": {
                    cloneAd.setHashTags(item.getHashTags());
                    break;
                }
                case "discount": {
                    cloneAd.setDiscount(item.getDiscount());
                    break;
                }
                case "validUntil": {
                    cloneAd.setValidUntil(item.getValidUntil());
                    break;
                }
                case "rating": {
                    cloneAd.setRating(item.getRating());
                    break;
                }
                case "reviews": {
                    cloneAd.setReviews(item.getReviews());
                    break;
                }
                default:
                    break;
            }
        }

        if (this.validate(cloneAd)) {
            for (int i = 0; i < this.adList.size(); i++) {
                if (this.adList.get(i).getId().equals(id)) {
                    this.adList.set(i, cloneAd);
                    return true;
                }
            }
        }

        return false;
    }

    public boolean remove(String id) {
        for (int i = 0; i < this.adList.size(); i++) {
            if (this.adList.get(i).getId().equals(id)) {
                this.adList.remove(i);
                return true;
            }
        }

        return false;
    }

    public void clear() {
        this.adList.clear();
    }

    static boolean validate(Ad item) {
        return (item.getId() instanceof String &&
                item.getDescription() instanceof String &&
                item.getCreatedAt() instanceof Date &&
                item.getLink() instanceof String &&
                item.getVendor() instanceof String &&
                item.getVendor().length() != 0 &&
                item.getHashTags() instanceof String[] &&
                item.getHashTags().length != 0 &&
                item.getDiscount() instanceof String &&
                item.getValidUntil() instanceof Date
        );
    }

    public void print() {
        this.adList.forEach(elem -> elem.print());
    }

    public String toString() {
        String result = "";

        for (int i = 0; i < this.adList.size(); i++) {
            result += this.adList.get(i).toString() + "\n";
        }

        return result;
    }
}
