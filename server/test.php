<?php


$test_bills = '[
    {
      "billName": "Rent",
      "nextDue": "2022-02-01",
      "amtDue": 635,
      "status": "current",
      "freq": "monthly",
      "type": "home",
      "datePaid": null
    },
    {
      "billName": "PG&E",
      "nextDue": "2022-02-24",
      "amtDue": 85,
      "status": "current",
      "freq": "monthly",
      "type": "home",
      "datePaid": "2022-02-24"
    },
    {
      "billName": "Car Payment",
      "nextDue": "2022-02-13",
      "amtDue": 100,
      "status": "current",
      "freq": "weekly",
      "type": "home",
      "datePaid": null
    }
  ]';

  echo $test_bills;

?>