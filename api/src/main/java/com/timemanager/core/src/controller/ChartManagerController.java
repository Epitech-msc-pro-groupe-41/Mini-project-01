package com.timemanager.core.src.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;


@Api(value = "ChartManager", consumes = MediaType.APPLICATION_JSON_VALUE, tags = "ChartManager")
@RestController
@RequestMapping("/chartManager")
public class ChartManagerController {

}