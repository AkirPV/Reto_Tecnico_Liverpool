package runners;

import com.intuit.karate.junit5.Karate;

class AndroidTestRunner {

    @Karate.Test
    Karate runLiverpoolMobileTests() {
        return Karate.run("classpath:features")
                .tags("~@ignore")
                .relativeTo(getClass());
    }
}
