package com;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class TimeFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        long start = System.currentTimeMillis();
        filterChain.doFilter(servletRequest, servletResponse);
        long end = System.currentTimeMillis();

        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        String path = httpRequest.getRequestURI();
        String method = httpRequest.getMethod();

        System.out.println(String.format("%s '%s' done (%d ms)", method, path, end - start));
    }

    @Override
    public void destroy() {

    }
}
