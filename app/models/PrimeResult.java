package models;

public class PrimeResult {
    public final int value;
    public final boolean isPrime;
    public final boolean isPalindrome;

    public PrimeResult(int value, boolean isPrime, boolean isPalindrome) {
        this.value = value;
        this.isPrime = isPrime;
        this.isPalindrome = isPalindrome;
    }
}
