package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.PrimeResult;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import services.PrimeService;

import javax.inject.Inject;

public class HomeController extends Controller {

    private final PrimeService primeService;

    @Inject
    public HomeController(PrimeService primeService) {
        this.primeService = primeService;
    }

    public Result index() {
        return ok(views.html.index.render());
    }

    public Result check(Http.Request request) {
        JsonNode body = request.body().asJson();
        if (body == null || !body.hasNonNull("value")) {
            return badRequest(errorJson("Missing 'value' field"));
        }

        JsonNode valueNode = body.get("value");
        if (!valueNode.isInt()) {
            return badRequest(errorJson("'value' must be an integer"));
        }

        int n = valueNode.asInt();
        PrimeResult result = new PrimeResult(n, primeService.isPrime(n), primeService.isPalindrome(n));

        ObjectNode json = Json.newObject();
        json.put("value", result.value);
        json.put("isPrime", result.isPrime);
        json.put("isPalindrome", result.isPalindrome);
        return ok(json);
    }

    private ObjectNode errorJson(String message) {
        ObjectNode node = Json.newObject();
        node.put("error", message);
        return node;
    }
}
