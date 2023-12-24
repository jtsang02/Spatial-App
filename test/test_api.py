import requests

ENDPOINT = "http://localhost:9000"
ENDPOINT_CALCULATE = "http://localhost:9000/calculate"

# test that the endpoint is up and running
def test_can_call_endpoint():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200

# test that the endpoint returns the correct data when all required data is provided
def test_can_calculate():
    payload = new_payload(4, 3, 4.23, 7, True, 'F-2')
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': '58.33',
        'unprotectedOpenings': '88.30',
        'frr': '1 h',
        'construction': 'Combustible / EMT / Noncombustible',
        'cladding': 'Combustible / Noncombustible'
    }

# when missing non required data, numbers are calculated with defaults
def test_can_calculate_with_missing_data():
    payload = new_payload(4, 3, 4.23, 0, True, 'F-2')
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': '0.00',
        'unprotectedOpenings': '88.30',
        'frr': '1 h',
        'construction': 'Combustible / EMT / Noncombustible',
        'cladding': 'Combustible / Noncombustible'
    }

# when limiting distance is less than 1.2 m, no openings are permitted
def test_no_openings_permitted():
    payload = new_payload(4, 3, 1.1, 0, True, 'C')
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': '0.00',
        'unprotectedOpenings': '0.00',
        'frr': '1 h',
        'construction': 'Noncombustible',
        'cladding': 'Noncombustible'
    }

def test_min_openings_permitted():
    payload = new_payload(3, 4, 1.2, 0, False, 'E')
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': '0.00',
        'unprotectedOpenings': '4.00',
        'frr': '2 h',
        'construction': 'Noncombustible',
        'cladding': 'Noncombustible'
    }

############################ Helper Functions ############################

# helper function to create a new task payload
def new_payload(h, w, ld, act_opns, sprk, group):
    return {
        'h' : h,
        'w' :  w,
        'LD' : ld,
        'actOpns' : act_opns,
        'sprk' : sprk,
        'group' : group
    }

# run command python -m pytest -vv