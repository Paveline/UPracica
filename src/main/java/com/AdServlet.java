package com;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@WebServlet("/ads/*")
public class AdServlet extends HttpServlet {
    private static AdCollection adCollection = AdDataBase.adCollection;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String id = req.getParameter("id");
        resp.setContentType("application/json");
        Ad ad = adCollection.get(id);
        resp.getWriter().print((new Gson()).toJson(ad));
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        resp.setContentType("application/json");
        boolean ifRemove = adCollection.remove(id);
        resp.getWriter().print((new Gson()).toJson(ifRemove));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        String[] urlAddress = req.getRequestURI().split("/");
        if (urlAddress[2].equals("search")) {
            List<Ad> adList = adCollection.getAllAds();
            for(Ad ad:adList){
                resp.getWriter().print((new Gson()).toJson(ad));
            }
        }
    }
}