package com;

import java.io.Serializable;
import java.util.Date;

public class Ad implements Serializable {
    private String id;
    private String description;
    private Date createdAt;
    private String link;
    private String vendor;
    private String photoLink;
    private String[] hashTags;
    private String discount;
    private Date validUntil;
    private int rating;
    private String[] reviews;

    public Ad(){}

    public Ad(String id, String description, Date createdAt, String link, String vendor, String photoLink,
              String[] hashTags, String discount, Date validUntil, int rating, String[] reviews) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.link = link;
        this.vendor = vendor;
        this.photoLink = photoLink;
        this.hashTags = hashTags;
        this.discount = discount;
        this.validUntil = validUntil;
        this.rating = rating;
        this.reviews = reviews;
    }

    public Ad(Ad another){
        this.id = another.id;
        this.description = another.description;
        this.createdAt = another.createdAt;
        this.link = another.link;
        this.vendor = another.vendor;
        this.photoLink = another.photoLink;
        this.hashTags = another.hashTags;
        this.discount = another.discount;
        this.validUntil = another.validUntil;
        this.rating = another.rating;
        this.reviews = another.reviews;
    }

    public static boolean validate(Ad item) {
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
        System.out.println(toString());
    }

    public String toString() {
        return this.id + " - " + this.description + " - " + this.createdAt + " - " + this.link + " - " +
                this.vendor + " - " + this.photoLink + " - " + this.hashTags + " - " + this.discount + " - " +
                this.validUntil + " - " + this.rating + " - " + this.reviews;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public void setHashTags(String[] hashTags) {
        this.hashTags = hashTags;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }

    public void setValidUntil(Date validUntil) {
        this.validUntil = validUntil;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setReviews(String[] reviews) {
        this.reviews = reviews;
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public String getLink() {
        return link;
    }

    public String getVendor() {
        return vendor;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public String[] getHashTags() {
        return hashTags;
    }

    public String getDiscount() {
        return discount;
    }

    public Date getValidUntil() {
        return validUntil;
    }

    public int getRating() {
        return rating;
    }

    public String[] getReviews() {
        return reviews;
    }
}
