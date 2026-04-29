package models;

public class MathFactsResult {
    public final int value;
    public final boolean isPrime;
    public final boolean isPalindrome;

    public MathFactsResult(int value, boolean isPrime, boolean isPalindrome) {
        this.value = value;
        this.isPrime = isPrime;
        this.isPalindrome = isPalindrome;
    }
}
