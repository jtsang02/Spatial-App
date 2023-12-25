import requests

ENDPOINT = "http://localhost:9000"
ENDPOINT_CALCULATE = "http://localhost:9000/calculate"

# test that the endpoint is up and running
def test_can_call_endpoint():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200

############################ Tests to check valid inputs ############################

# test that the endpoint returns the correct data when all required data is provided
def test_can_calculate():
    payload = new_payload(4, 3, 4.23, 7, True, 'F-2')
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': 58.33,
        'unprotectedOpenings': 88.3,
        'frr': '1 h',
        'construction': 'Combustible / EMT / Noncombustible',
        'cladding': 'Combustible / Noncombustible'
    }

# test that numbers are calculated when missing non required data
def test_can_calculate_with_missing_data():
    payload = {
        'h' : 4,
        'w' :  3,
        'LD' : 4.23,
        'sprk' : True,
        'group' : 'F-2'
    }
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': 0,
        'unprotectedOpenings': 88.3,
        'frr': '1 h',
        'construction': 'Combustible / EMT / Noncombustible',
        'cladding': 'Combustible / Noncombustible'
    }

# test that the endpoint returns an error when invalid data is provided
def test_invalid_payload():
    payload = new_payload('a', 3, 4.23, 7, True, 'F-2')
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 400
    assert data == {
        'errors': ['must be number']
    }

# test when actual openings is greater than unprotected openings, error code 400 is returned
def test_actual_openings_greater_than_unprotected_openings():
    payload = new_payload(2, 4, 1.1, 10, True, 'F-2')
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 400
    assert data == {
        'errors': ['actual openings must be less than or equal to unprotected openings']
    }

# test when area is 0 m2, error code 400 is returned
def test_zero_area():
    payload = new_payload(0, 0, 1.2, 0, False, 'E')
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 400
    assert data == {
        'errors': ['area must be greater than 0']
    }

############################ Tests to check calculations ############################

# when limiting distance is less than 1.2 m, no openings are permitted
def test_no_openings_permitted():
    payload = new_payload(4, 3, 1.1, 0, True, 'C')
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': 0,
        'unprotectedOpenings': 0,
        'frr': '1 h',
        'construction': 'Noncombustible',
        'cladding': 'Noncombustible'
    }

# when limiting distance is 1.2 m, minimum openings are permitted
def test_min_openings_permitted():
    payload = new_payload(3, 4, 1.2, 0, False, 'E')
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': 0,
        'unprotectedOpenings': 4,
        'frr': '2 h',
        'construction': 'Noncombustible',
        'cladding': 'Noncombustible'
    }

# test large area, unsprinklered, min LD
def test_bottom_left_corner_table_b():
    payload = new_payload(4, 625, 1.1, 1000, False, 'C')
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': 40,
        'unprotectedOpenings': 0,
        'frr': '1 h',
        'construction': 'Noncombustible',
        'cladding': 'Noncombustible'
    }

# test large area, unsprinklered, max LD
def test_bottom_right_corner_table_b():
    payload = new_payload(4, 625, 52, 1000, False, 'C')
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': 40,
        'unprotectedOpenings': 100,
        'frr': 'None',
        'construction': 'None',
        'cladding': 'None'
    }

# test small area, unsprinklered, max LD
def test_top_right_corner_table_b():
    payload = new_payload(2, 4, 52, 0, False, 'C')
    response = requests.post(ENDPOINT_CALCULATE, json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': 0,
        'unprotectedOpenings': 100,
        'frr': 'None',
        'construction': 'None',
        'cladding': 'None'
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